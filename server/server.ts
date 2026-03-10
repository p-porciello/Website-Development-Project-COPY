import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createRouteHandler } from 'uploadthing/express';
import { uploadRouter } from './routes/image-router';
import indexRouter from './routes/index';
import lostItemsRouter from './routes/lost-items';
import userRouter from './routes/users';
import database from './mongoConnect';

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', indexRouter);
app.use('/lost-items', lostItemsRouter);
app.use('/user', userRouter);
app.use('/api/uploadthing', createRouteHandler({ router: uploadRouter }));

app.get('/api', (req, res) => {
  res.json({ lostInfo: ['lost items', 'poster'] });
});

database.connectToDb().then(() => {
  app.listen(8080, () => {
    console.log('Server has started on port 8080');
  });
});
