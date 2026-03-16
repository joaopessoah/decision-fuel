import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Migração: Trocar TIMESTAMP → DATETIME em todas as tabelas.
 * DATETIME não faz conversão de timezone, armazena o valor exatamente como é passado.
 */
async function migrate() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Conectado. Iniciando migração TIMESTAMP → DATETIME...\n');

    // 1. Tabela leads: created_at, updated_at
    console.log('1. Alterando tabela leads...');
    await connection.query(`ALTER TABLE leads MODIFY COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP`);
    await connection.query(`ALTER TABLE leads MODIFY COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
    console.log('   ✓ created_at e updated_at alterados para DATETIME\n');

    // 2. Tabela movimentacoes_leads: data_alteracao
    console.log('2. Alterando tabela movimentacoes_leads...');
    await connection.query(`ALTER TABLE movimentacoes_leads MODIFY COLUMN data_alteracao DATETIME DEFAULT CURRENT_TIMESTAMP`);
    console.log('   ✓ data_alteracao alterado para DATETIME\n');

    // 3. Tabela atividades_leads: data_atividade, data_criacao, data_concluida
    console.log('3. Alterando tabela atividades_leads...');
    await connection.query(`ALTER TABLE atividades_leads MODIFY COLUMN data_atividade DATETIME DEFAULT CURRENT_TIMESTAMP`);
    await connection.query(`ALTER TABLE atividades_leads MODIFY COLUMN data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP`);
    await connection.query(`ALTER TABLE atividades_leads MODIFY COLUMN data_concluida DATETIME NULL`);
    console.log('   ✓ data_atividade, data_criacao e data_concluida alterados para DATETIME\n');

    console.log('=== Migração concluída com sucesso! ===');

  } catch (error) {
    console.error('Erro na migração:', error);
  } finally {
    if (connection) await connection.end();
    process.exit(0);
  }
}

migrate();
