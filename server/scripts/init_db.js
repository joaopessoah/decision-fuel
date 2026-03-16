import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log('Conectando ao banco de dados...');

async function initDB() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Conexão estabelecida com sucesso!');

    // Criar Tabela de Leads
    const createLeadsTableQuery = `
      CREATE TABLE IF NOT EXISTS leads (
         id INT AUTO_INCREMENT PRIMARY KEY,
         produto VARCHAR(255) NOT NULL,
         etapa VARCHAR(50) DEFAULT 'Prospecção',
         fase VARCHAR(50) DEFAULT 'Frio',
         origem VARCHAR(100) DEFAULT 'Inbound',
         nome_empresa VARCHAR(255) NOT NULL,
         estado VARCHAR(2),
         cnpj VARCHAR(20),
         valor_implantacao DECIMAL(10,2) DEFAULT NULL,
         valor_mensal DECIMAL(10,2) DEFAULT NULL,
         valor_unico DECIMAL(10,2) DEFAULT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.execute(createLeadsTableQuery);
    
    try {
      await connection.execute(`ALTER TABLE leads ADD COLUMN valor_implantacao DECIMAL(10,2) DEFAULT NULL`);
      await connection.execute(`ALTER TABLE leads ADD COLUMN valor_mensal DECIMAL(10,2) DEFAULT NULL`);
      await connection.execute(`ALTER TABLE leads ADD COLUMN valor_unico DECIMAL(10,2) DEFAULT NULL`);
      console.log('Colunas de valor adicionadas na tabela "leads".');
    } catch(e) {
      // Ignora erro se as colunas já existirem
    }
    
    console.log('Tabela "leads" verificada/criada.');

    // Criar Tabela de Contatos
    const createContatosTableQuery = `
      CREATE TABLE IF NOT EXISTS contatos (
         id INT AUTO_INCREMENT PRIMARY KEY,
         lead_id INT NOT NULL,
         nome VARCHAR(255) NOT NULL,
         email VARCHAR(255),
         celular VARCHAR(20),
         cargo VARCHAR(100),
         FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.execute(createContatosTableQuery);
    console.log('Tabela "contatos" verificada/criada.');

    // Criar Tabela de Movimentações
    const createMovimentacoesTableQuery = `
      CREATE TABLE IF NOT EXISTS movimentacoes_leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lead_id INT NOT NULL,
        acao VARCHAR(50) NOT NULL,
        campo_alterado VARCHAR(50),
        valor_antigo VARCHAR(255),
        valor_novo VARCHAR(255),
        data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.execute(createMovimentacoesTableQuery);
    console.log('Tabela "movimentacoes_leads" verificada/criada.');

    // Criar Tabela de Atividades
    const createAtividadesTableQuery = `
      CREATE TABLE IF NOT EXISTS atividades_leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lead_id INT NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        descricao TEXT NOT NULL,
        data_atividade TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'Pendente',
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.execute(createAtividadesTableQuery);
    console.log('Tabela "atividades_leads" verificada/criada.');

    console.log('--- Configuração do Banco de Dados concluída com sucesso! ---');

  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Conexão encerrada.');
    }
    process.exit(0);
  }
}

initDB();
