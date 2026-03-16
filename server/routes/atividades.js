import express from 'express';
import pool from '../config/db.js';

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
  try {
    const { lead_id, tipo, descricao, data_atividade, status } = req.body;
    
    // Inserir a nova atividade
    const [result] = await pool.query(
      `INSERT INTO atividades_leads (lead_id, tipo, descricao, data_atividade, status) 
       VALUES (?, ?, ?, ?, ?)`,
      [lead_id, tipo, descricao, data_atividade || new Date(), status || 'Pendente']
    );

    // Salvar isso também no log principal de movimentações do Lead
    await pool.query(
      `INSERT INTO movimentacoes_leads (lead_id, acao, campo_alterado, valor_antigo, valor_novo) VALUES (?, ?, ?, ?, ?)`,
      [lead_id, 'Nova Atividade', tipo, '', descricao]
    );

    const [novaItem] = await pool.query('SELECT * FROM atividades_leads WHERE id = ?', [result.insertId]);
    res.status(201).json({ message: 'Atividade criada', atividade: novaItem[0] });

  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    res.status(500).json({ message: 'Erro interno' });
  }
});

// ATUALIZAR: Marcar como concluída ou alterar status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, descricao, data_atividade } = req.body;

    await pool.query(
      `UPDATE atividades_leads 
       SET status = COALESCE(?, status), 
           descricao = COALESCE(?, descricao), 
           data_atividade = COALESCE(?, data_atividade) 
       WHERE id = ?`,
      [status || null, descricao || null, data_atividade || null, id]
    );

    res.json({ message: 'Atividade atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar' });
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
