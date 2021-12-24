import app from './app';
import debug from 'debug';
import mongo from './database/mongo'


const log = debug('globant:index');
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    log(`Server is running on port ${PORT}`);
});