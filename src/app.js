import express from 'express';
import helmet from 'helmet';
import router from './routes';
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(helmet());

app.use(morgan("tiny"));
app.use(cors());

app.use(express.json());
app.use(router);

export default app;