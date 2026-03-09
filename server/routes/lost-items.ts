import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import database from '../mongoConnect';

const router = express();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

interface Inquiry {
  inquirerId: string;
  inquirerName: string;
  receiverId: string;
  receiverName: string;
  dateSent: string;
  content: string;
}

//Retrieve all items in lostItems collection
router.get('/',  /*verifyToken,*/ async (req: Request, res: Response) => {
  let db = database.getDb();
  let lostItemData = await db.collection('lostItem').find({}).toArray();
  if (lostItemData.length > 0) {
    res.json(lostItemData);
  } else {
    throw new Error('Data not found');
  }
});

//Retrieves all items with names matching patterns user entered in search bar
router.get('/search/:q', /*verifyToken,*/ async (req: Request, res: Response) => {
  let db = database.getDb();
  const query = req.params.q as string;
  console.log(query);
  if (query.length > 0) {
    const results = await db
      .collection('lostItem')
      .find({
        itemName: { $regex: new RegExp(query, 'i') },
        adminApproved: true,
      })
      .toArray();
    res.json(results);
  } else {
    res.json([]);
  }
});

//Retrieves all admin-approved items in lostItems collection
router.get('/admin-approved/:q',  /*verifyToken,*/ async (req: Request, res: Response) => {
    let db = database.getDb();
    const query = req.params.q as string;
    let status: boolean = convertToBoolean(query);
    let lostItemData = await db
      .collection('lostItem')
      .find({ adminApproved: status })
      .toArray();
    if (lostItemData.length > 0) {
      res.json(lostItemData);
    } else {
      const empty: never[] = []
      res.json(empty);
    }
  },
);

//Retrieve a specific item in lostItems collection
router.get('/:id', /*verifyToken,*/ async (req: Request, res: Response) => {
  let db = database.getDb();
  let lostItemData = await db
    .collection('lostItem')
    .findOne({ _id: new ObjectId(req.params.id as string) });
  if (lostItemData && Object.keys(lostItemData).length > 0) {
    res.json(lostItemData);
  } else {
    throw new Error('Data not found or returned as an array correctly');
  }
});

//Create a new object in lostItems collection
router.post('/', /*verifyToken,*/ async (req: Request, res: Response) => {
  try {
    let db = database.getDb();
    let newItem = {
      itemName: req.body.itemName,
      description: req.body.description,
      imgFileName: req.body.imgFileName,
      dateUploaded: req.body.dateUploaded,
      itemType: req.body.itemType,
      color: req.body.color,
      brand: req.body.brand,
      schoolFoundIn: req.body.schoolFoundIn,
      currentLocation: req.body.currentLocation,
      postedBy: req.body.postedBy,
      claimedBy: req.body.claimedBy,
      adminApproved: req.body.adminApproved,
      inquiries: req.body.inquiries //as Inquiry[]
    };

    let lostItemData = await db.collection('lostItem').insertOne(newItem);
    res.json(lostItemData);
  } catch (error) {
    console.error('Error creating lost item:', error);
    res.status(500).json({ error: 'Failed to create lost item' });
  }
});

//Update an existing object in lostItems collection
router.put('/:id', /*verifyToken,*/ async (req: Request, res: Response) => {
  let db = database.getDb();
  let newItem = {
    $set: {
      itemName: req.body.itemName,
      description: req.body.description,
      imgFileName: req.body.imgFileName,
      dateUploaded: Date.now,
      itemType: req.body.itemType,
      color: req.body.color,
      brand: req.body.brand,
      schoolFoundIn: req.body.schoolFoundIn,
      currentLocation: req.body.currentLocation,
      postedBy: req.body.postedBy,
      claimedBy: req.body.claimedBy,
      adminApproved: req.body.adminApproved,
      inquiries: []
    },
  };
  let lostItemData = await db
    .collection('lostItem')
    .updateOne({ _id: new ObjectId(req.params.id as string) }, newItem);
  res.json(lostItemData);
});

router.put('/updateInquiries/:id', async (req: Request, res: Response) => {
  let db = database.getDb();
  console.log(req);
  let newInquiry: Inquiry = {
    inquirerId: req.body.inquirerId,
    inquirerName: req.body.inquirerName,
    receiverId: req.body.receiverId,
    receiverName: req.body.receiverName,
    dateSent: req.body.dateSent,
    content: req.body.content
  }
  let lostItemData = await db
    .collection('lostItem')
    //@ts-ignore
    .updateOne({ _id: new ObjectId(req.params.id as string) }, { $push: {inquiries: newInquiry}})
  res.json(lostItemData);
});

//Delete a specific item in lostItems collection
router.delete('/:id', /*verifyToken,*/ async (req: Request, res: Response) => {
  let db = database.getDb();
  let lostItemData = await db
    .collection('lostItem')
    .deleteOne({ _id: new ObjectId(req.params.id as string) });
  if (Object.keys(lostItemData).length > 0) {
    res.json(lostItemData);
  } else {
    throw new Error('Data not found or returned as an array correctly');
  }
});

function convertToBoolean(query: string): boolean {
  if (query === "true") {
    return true;
  } else {
    return false;
  }
}

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
