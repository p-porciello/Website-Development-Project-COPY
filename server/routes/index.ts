import express from 'express';

const router = express();

router.get('/', (req, res) => {
  res.send('Hello world');
});

export default router;
