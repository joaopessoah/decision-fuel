import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/leads.js';
import atividadesRoutes from './routes/atividades.js';

dotenv.config();

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
