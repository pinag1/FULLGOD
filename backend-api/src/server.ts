import cookieParser from 'cookie-parser'; // cookie-parser deve ser importado uma vez
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import bonusBuyBattleRoutes from './routes/bonusBuyBattleRoutes';
import bonusHuntRoutes from './routes/bonusHuntRoutes';
import bonusHuntSummaryRoutes from './routes/bonusHuntSummaryRoutes';
import climbRouter from './routes/climbRouter';
import eloRouter from './routes/eloRouter';
import kingRouter from './routes/kingRouter';
import slotPaymentsRoutes from './routes/slotPaymentsRoutes';
import slotRoutes from './routes/slotRoutes';
import tournamentRoutes from './routes/tournamentRoutes';
import userRoutes from './routes/userRoutes';

// Carregar variáveis de ambiente do .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Rota de teste
app.get('/', (req: Request, res: Response): void => {
  res.send('API está funcionando 🚀');
});
const corsOptions = {
  origin: 'http://localhost:3000',  // Frontend na porta 3000
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Permitir métodos HTTP específicos, como PATCH
  credentials: true,  // Permite que os cookies sejam enviados e recebidos
};
// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Teste de conexão com MySQL (se você usa o MySQL)

// Usando as rotas
app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/slot-payments', slotPaymentsRoutes);
app.use('/api/bonus-hunts', bonusHuntRoutes);
app.use('/api/bonus-hunt-summary', bonusHuntSummaryRoutes);
app.use('/api/bonus-buy-battles', bonusBuyBattleRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/elo-mais-fraco', eloRouter);
app.use('/api/climb-the-quest', climbRouter);
app.use('/api/king-of-the-hill', kingRouter);
app.use('/api/users', userRoutes);
// Inicializando o servidor
app.listen(port, (): void => {
  console.log(`Servidor rodando na porta ${port}`);
});
