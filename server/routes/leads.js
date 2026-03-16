import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// LER: Retorna todos os leads cadastrados
router.get('/', async (req, res) => {
  try {
    const [leads] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    
    // Buscar contatos para cada lead (Apenas para fins de simplificação, em produção idealmente faríamos uma join melhor ou queries otimizadas)
    for (const lead of leads) {
      const [contatos] = await pool.query('SELECT * FROM contatos WHERE lead_id = ?', [lead.id]);
      lead.contatos = contatos;
      
      const [movimentacoes] = await pool.query('SELECT * FROM movimentacoes_leads WHERE lead_id = ? ORDER BY data_alteracao DESC', [lead.id]);
      lead.movimentacoes = movimentacoes;

      const [atividades] = await pool.query('SELECT * FROM atividades_leads WHERE lead_id = ? ORDER BY data_atividade DESC', [lead.id]);
      lead.atividades = atividades;
    }

    res.json(leads);
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    res.status(500).json({ message: 'Erro interno ao buscar leads' });
  }
});

// LER: Retorna um lead específico e seus contatos
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [leads] = await pool.query('SELECT * FROM leads WHERE id = ?', [id]);
    
    if (leads.length === 0) {
       return res.status(404).json({ message: 'Lead não encontrado' });
    }

    const lead = leads[0];
    const [contatos] = await pool.query('SELECT * FROM contatos WHERE lead_id = ?', [id]);
    lead.contatos = contatos;

    const [movimentacoes] = await pool.query('SELECT * FROM movimentacoes_leads WHERE lead_id = ? ORDER BY data_alteracao DESC', [id]);
    lead.movimentacoes = movimentacoes;

    const [atividades] = await pool.query('SELECT * FROM atividades_leads WHERE lead_id = ? ORDER BY data_atividade DESC', [id]);
    lead.atividades = atividades;

    res.json(lead);
  } catch (error) {
    console.error('Erro ao buscar lead específico:', error);
    res.status(500).json({ message: 'Erro interno' });
  }
});

// CRIAR: Novo Lead com Contatos
router.post('/', async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { 
      produto, etapa, fase, origem, nome_empresa, estado, cnpj, contatos,
      valor_implantacao, valor_mensal, valor_unico 
    } = req.body;

    // Iniciar Transação (Garantir que Lead e Contatos salvam juntos)
    await connection.beginTransaction();

    const [leadResult] = await connection.query(
      `INSERT INTO leads (produto, etapa, fase, origem, nome_empresa, estado, cnpj, valor_implantacao, valor_mensal, valor_unico) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
         produto, etapa, fase, origem, nome_empresa, estado, cnpj, 
         valor_implantacao !== '' && valor_implantacao !== undefined ? valor_implantacao : null, 
         valor_mensal !== '' && valor_mensal !== undefined ? valor_mensal : null, 
         valor_unico !== '' && valor_unico !== undefined ? valor_unico : null
      ]
    );

    const leadId = leadResult.insertId;

    // Registrar movimentação de criação
    await connection.query(
      `INSERT INTO movimentacoes_leads (lead_id, acao, campo_alterado, valor_antigo, valor_novo) VALUES (?, ?, ?, ?, ?)`,
      [leadId, 'Criação', 'Geral', '', 'Lead ingressado no CRM']
    );

    if (contatos && Array.isArray(contatos) && contatos.length > 0) {
      for (const contato of contatos) {
         await connection.query(
            `INSERT INTO contatos (lead_id, nome, email, celular, cargo) VALUES (?, ?, ?, ?, ?)`,
            [leadId, contato.nome, contato.email, contato.celular, contato.cargo]
         );
      }
    }

    // Comitar Transação se tudo ocorrer bem
    await connection.commit();

    const [newLeadRaw] = await connection.query('SELECT * FROM leads WHERE id = ?', [leadId]);
    const newLead = newLeadRaw[0];
    const [novasMovs] = await connection.query('SELECT * FROM movimentacoes_leads WHERE lead_id = ? ORDER BY data_alteracao DESC', [leadId]);
    newLead.movimentacoes = novasMovs;
    
    res.status(201).json({ message: 'Lead criado com sucesso', lead: newLead });

  } catch (error) {
    await connection.rollback();
    console.error('Erro ao criar lead:', error);
    res.status(500).json({ message: 'Erro ao criar lead e contatos vinculados' });
  } finally {
    connection.release();
  }
});

// ATUALIZAR: Editar Lead e Contatos vinculados
router.put('/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const { 
      produto, etapa, fase, origem, nome_empresa, estado, cnpj, contatos,
      valor_implantacao, valor_mensal, valor_unico 
    } = req.body;

    await connection.beginTransaction();

    const [oldLeads] = await connection.query('SELECT * FROM leads WHERE id = ?', [id]);
    if (oldLeads.length === 0) {
       await connection.rollback();
       return res.status(404).json({ message: 'Lead não encontrado' });
    }
    const oldLead = oldLeads[0];

    // Atualiza os dados principais do Lead
    await connection.query(
      `UPDATE leads SET produto=?, etapa=?, fase=?, origem=?, nome_empresa=?, estado=?, cnpj=?,
       valor_implantacao=?, valor_mensal=?, valor_unico=? WHERE id=?`,
      [
         produto, etapa, fase, origem, nome_empresa, estado, cnpj, 
         valor_implantacao !== '' && valor_implantacao !== undefined ? valor_implantacao : null, 
         valor_mensal !== '' && valor_mensal !== undefined ? valor_mensal : null, 
         valor_unico !== '' && valor_unico !== undefined ? valor_unico : null, 
         id
      ]
    );

    // Registrar movimentações de campos importantes
    const fieldsToTrack = ['etapa', 'fase', 'origem', 'valor_implantacao', 'valor_mensal', 'valor_unico'];
    for (const field of fieldsToTrack) {
      if (oldLead[field] !== req.body[field] && req.body[field] !== undefined) {
         // Trata conversão de nulo para string vazia nas verificações numéricas
         const antigo = oldLead[field] === null ? '' : String(oldLead[field]);
         const novo = req.body[field] === null ? '' : String(req.body[field]);
         
         if (antigo !== novo) {
           await connection.query(
            `INSERT INTO movimentacoes_leads (lead_id, acao, campo_alterado, valor_antigo, valor_novo) VALUES (?, ?, ?, ?, ?)`,
            [id, 'Atualização', field, antigo, novo]
           );
         }
      }
    }

    // Estratégia simples para Contatos: Exclui todos os antigos e insere os novos recebidos no Array
    await connection.query('DELETE FROM contatos WHERE lead_id = ?', [id]);
    
    if (contatos && Array.isArray(contatos) && contatos.length > 0) {
      for (const contato of contatos) {
         await connection.query(
            `INSERT INTO contatos (lead_id, nome, email, celular, cargo) VALUES (?, ?, ?, ?, ?)`,
            [id, contato.nome, contato.email, contato.celular, contato.cargo]
         );
      }
    }

    await connection.commit();
    res.json({ message: 'Lead atualizado com sucesso' });

  } catch (error) {
    await connection.rollback();
    console.error('Erro ao atualizar lead:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar' });
  } finally {
    connection.release();
  }
});

// DELETAR: Excluir Lead (Contatos são deletados automaticamente pela FK CASCADE no DB)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM leads WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
       return res.status(404).json({ message: 'Lead não encontrado' });
    }

    res.json({ message: 'Lead excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar lead:', error);
    res.status(500).json({ message: 'Erro interno ao deletar' });
  }
});

export default router;
