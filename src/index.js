import app from './app';
import debug from 'debug';
import { connect } from './database/mongo'

connect();

const log = debug('globant:index');
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    log(`Server is running on port ${PORT}`);
});