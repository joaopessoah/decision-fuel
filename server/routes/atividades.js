import express from 'express';
import pool, { getBrasiliaTime } from '../config/db.js';

const router = express.Router();

// LER: Retorna todas as atividades de um lead específico
router.get('/lead/:leadId', async (req, res) => {
  try {
    const { leadId } = req.params;
    const [atividades] = await pool.query(
      'SELECT * FROM atividades_leads WHERE lead_id = ? ORDER BY data_atividade DESC',
      [leadId]
    );
    res.json(atividades);
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
    res.status(500).json({ message: 'Erro interno ao buscar atividades' });
  }
});

// LER: Retorna todas as atividades pendentes globais (dashboards)
router.get('/pendentes', async (req, res) => {
  try {
    const [atividades] = await pool.query(`
      SELECT a.*, l.nome_empresa, l.produto 
      FROM atividades_leads a 
      JOIN leads l ON a.lead_id = l.id 
      WHERE a.status = 'Pendente' 
      ORDER BY a.data_atividade ASC
    `);
    res.json(atividades);
  } catch (error) {
    console.error('Erro ao buscar atividades pendentes:', error);
    res.status(500).json({ message: 'Erro interno' });
  }
});

// CRIAR: Nova Atividade
router.post('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { lead_id, tipo, descricao, data_atividade, status } = req.body;
    const agora = getBrasiliaTime();
    
    const [result] = await connection.query(
      `INSERT INTO atividades_leads (lead_id, tipo, descricao, data_atividade, status, data_criacao) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [lead_id, tipo, descricao, data_atividade || agora, status || 'Pendente', agora]
    );

    // Log de movimentações do Lead
    await connection.query(
      `INSERT INTO movimentacoes_leads (lead_id, acao, campo_alterado, valor_antigo, valor_novo) VALUES (?, ?, ?, ?, ?)`,
      [lead_id, 'Nova Atividade', tipo, '', descricao]
    );

    const [novaItem] = await connection.query('SELECT * FROM atividades_leads WHERE id = ?', [result.insertId]);
    res.status(201).json({ message: 'Atividade criada', atividade: novaItem[0] });

  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    res.status(500).json({ message: 'Erro interno' });
  } finally {
    connection.release();
  }
});

// ATUALIZAR: Marcar como concluída ou alterar status
router.put('/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const { status, descricao, data_atividade } = req.body;

    // Se estiver concluindo, registrar no log de movimentações
    if (status === 'Concluída') {
      const [atividades] = await connection.query('SELECT lead_id, tipo, descricao FROM atividades_leads WHERE id = ?', [id]);
      
      if (atividades.length > 0) {
        const ativ = atividades[0];
        await connection.query(
          `INSERT INTO movimentacoes_leads (lead_id, acao, campo_alterado, valor_antigo, valor_novo) 
           VALUES (?, ?, ?, ?, ?)`,
          [ativ.lead_id, 'Atividade Concluída', ativ.tipo, 'Pendente', 'Concluída']
        );
      }
    }

    // Montar o UPDATE dinamicamente
    let updateFields = [];
    const params = [];

    if (status !== undefined) {
      updateFields.push('status = ?');
      params.push(status);
    }
    if (descricao !== undefined) {
      updateFields.push('descricao = ?');
      params.push(descricao);
    }
    if (data_atividade !== undefined) {
      updateFields.push('data_atividade = ?');
      params.push(data_atividade);
    }
    if (status === 'Concluída') {
      updateFields.push('data_concluida = ?');
      params.push(getBrasiliaTime());
    }

    if (updateFields.length === 0) {
      connection.release();
      return res.json({ message: 'Nenhuma alteração enviada' });
    }

    const query = `UPDATE atividades_leads SET ${updateFields.join(', ')} WHERE id = ?`;
    params.push(id);

    await connection.query(query, params);

    res.json({ message: 'Atividade atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar' });
  } finally {
    connection.release();
  }
});

// DELETAR: Excluir Atividade
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM atividades_leads WHERE id = ?', [id]);
    res.json({ message: 'Atividade excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar atividade:', error);
    res.status(500).json({ message: 'Erro interno ao deletar' });
  }
});

export default router;
