import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function updateDB() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Conexão estabelecida.');

    // Adicionar colunas na tabela atividades_leads
    console.log('Adicionando colunas de data em atividades_leads...');
    
    try {
      await connection.execute(`ALTER TABLE atividades_leads ADD COLUMN data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
      console.log('Coluna data_criacao adicionada.');
    } catch (e) {
      console.log('Coluna data_criacao já existe ou erro:', e.message);
    }

    try {
      await connection.execute(`ALTER TABLE atividades_leads ADD COLUMN data_concluida TIMESTAMP NULL DEFAULT NULL`);
      console.log('Coluna data_concluida adicionada.');
    } catch (e) {
      console.log('Coluna data_concluida já existe ou erro:', e.message);
    }

    console.log('Migração concluída com sucesso!');

  } catch (error) {
    console.error('Erro na migração:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

updateDB();
