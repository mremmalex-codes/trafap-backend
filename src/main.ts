import express, { Express } from 'express';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import auth from './modules/auth/auth.routes';
import traffic from './modules/traffic/traffic.routes';

const app: Express = express();

const PORT = process.env.PORT || 8080;

/**
 * @middleware declaration
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
app.use(cors());

app.use('/api/auth', auth);
app.use('/api/traffic', traffic);

app.listen(PORT, () => {
    console.log(`application is runing on port ${PORT}`);
});
