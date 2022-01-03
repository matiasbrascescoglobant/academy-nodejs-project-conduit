import app from './app';
import debug from 'debug';
import { connectDB } from './database/mongo'

connectDB();

const log = debug('globant:index');
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    log(`Server is running on port ${PORT}`);
});