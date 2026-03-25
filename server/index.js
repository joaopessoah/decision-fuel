import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import leadRoutes from './routes/leads.js';
import atividadesRoutes from './routes/atividades.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/leads', leadRoutes);
app.use('/api/atividades', atividadesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running securely' });
});

// Servir frontend estático (build do Vite)
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Qualquer rota não-API retorna o index.html (SPA)
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
