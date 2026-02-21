import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import database from '../mongoConnect';

const router = express();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//Retrieve all items in inquiries collection
router.get('/',  /*verifyToken,*/ async (req: Request, res: Response) => {
  let db = database.getDb();
  let inquiryData = await db.collection('inquiry').find({}).toArray();
  if (inquiryData.length > 0) {
    res.json(inquiryData);
  } else {
    throw new Error('Data not found');
  }
});

//Retrieve a specific item in inquiries collection
router.get('/:id', /*verifyToken,*/ async (req: Request, res: Response) => {
  let db = database.getDb();
  let inquiryData = await db
    .collection('inquiry')
    .findOne({ _id: new ObjectId(req.params.id as string) });
  if (inquiryData && Object.keys(inquiryData).length > 0) {
    res.json(inquiryData);
  } else {
    throw new Error('Data not found');
  }
});

//Create a new object in inquiries collection
router.post('/', /*verifyToken,*/ async (req: Request, res: Response) => {
  let db = database.getDb();
  let newItem = {
    inquirer: req.body.inquirer,
    receiver: req.body.receiver,
    itemInquiring: req.body.itemInquiring,
    dateUploaded: req.body.dateUploaded,
    content: req.body.request
  };

  let inquiryData = await db.collection('inquiry').insertOne(newItem);
  res.json(inquiryData);
});

//Update an existing object in inquiries collection
router.put('/:id', /*verifyToken,*/ async (req: Request, res: Response) => {
  let db = database.getDb();
  let newItem = {
    $set: {
        inquirer: req.body.inquirer,
        receiver: req.body.receiver,
        itemInquiring: req.body.itemInquiring,
        dateUploaded: req.body.dateUploaded,
        content: req.body.request
    },
  };
  let inquiryData = await db
    .collection('inquiry')
    .updateOne({ _id: new ObjectId(req.params.id as string) }, newItem);
  res.json(inquiryData);
});

//Delete a specific item in inquiries collection
router.delete('/:id', /*verifyToken,*/ async (req: Request, res: Response) => {
  let db = database.getDb();
  let inquiryData = await db
    .collection('inquiry')
    .deleteOne({ _id: new ObjectId(req.params.id as string) });
  if (Object.keys(inquiryData).length > 0) {
    res.json(inquiryData);
  } else {
    throw new Error('Data not found or returned as an array correctly');
  }
});

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeaders = req.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authentication token is missing.' });
  }

  jwt.verify(token, process.env.SECRETKEY as string, (error, user) => {
    if (error) {
      return res.json({ message: 'Invalid token.' });
    }

    (req as any).user = user;
    next();
  });
}

export default router;