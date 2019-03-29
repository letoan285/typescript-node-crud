import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';

import indexRoutes from './routes';

class Application {
    app: express.Application;
    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', 3000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', exphbs({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }));
        this.app.set('view engine', '.hbs');
    }
    middlewares() {
        this.app.use(morgan('dev'));
    }
    routes() {
        this.app.use(indexRoutes);
        this.app.use(express.static(path.join(__dirname)));
    }
    start() {
        this.app.listen(6000, () => {
            console.log('Server is running on port 3000');
        });
    }
}
export default Application;