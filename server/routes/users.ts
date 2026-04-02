import 'dotenv/config';
import express from 'express';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import database from '../mongoConnect';

const router = express();

const SALT_ROUNDS = 8;

router.get('/', async (req, res) => {
  let db = database.getDb();
  let userData = await db.collection('user').find({}).toArray();
  if (userData.length > 0) {
    res.json(userData);
  } else {
    throw new Error('Data not found or returned as an array correctly');
  }
});

router.get('/:id', async (req, res) => {
  let db = database.getDb();
  let userData = await db
    .collection('user')
    .findOne({ _id: new ObjectId(req.params.id) });
  if (userData && Object.keys(userData).length > 0) {
    res.json(userData);
  } else {
    throw new Error('Data not found or returned as an array correctly');
  }
});

router.post('/', async (req, res) => {
  let db = database.getDb();

  const takenEmail = await db
    .collection('user')
    .findOne({ email: req.body.email });

  if (takenEmail) {
    res.json({ message: 'This email is taken.' });
  } else {
    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    let newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      school: req.body.school,
      grade: req.body.grade,
      bio: req.body.bio,
      role: req.body.role,
      joinDate: req.body.joinDate,
      postedItems: req.body.postedItems,
      profileImageName: req.body.profileImageName,
      darkMode: req.body.darkMode
    };
    let userData = await db.collection('user').insertOne(newUser);
    console.log(hash);
    res.json(userData);
  }
});

router.put('/:id', async (req, res) => {
  let db = database.getDb();
  let updatedUser = {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      school: req.body.school,
      grade: req.body.grade,
      bio: req.body.bio,
      role: req.body.role,
      joinDate: req.body.joinDate,
      postedItems: req.body.postedItems,
      profileImageName: req.body.profileImageName,
      darkMode: req.body.darkMode
    },
  };
  let userData = await db
    .collection('user')
    .insertOne({ _id: new ObjectId(req.params.id) } as any, updatedUser as any);
  res.json(userData);
});

router.put('/change-mode/:id', async (req, res) => {
  let db = database.getDb();
  console.log(`req: ${req.body.darkMode}`)

  let userData = await db
    .collection('user')
    .updateOne({ _id: new ObjectId(req.params.id as string) }, { $set: {darkMode: req.body.darkMode}})
  res.json(userData);
});

router.delete('/:id', async (req, res) => {
  let db = database.getDb();
  let userData = await db
    .collection('user')
    .deleteOne({ _id: new ObjectId(req.params.id) });
  if (Object.keys(userData).length > 0) {
    res.json(userData);
  } else {
    throw new Error('Data not found or returned as an array correctly');
  }
});

router.post('/login', async (req, res) => {
  let db = database.getDb();

  const user = await db.collection('user').findOne({ email: req.body.email });

  if (user) {
    let confirmation = await bcrypt.compare(req.body.password, user.password);
    if (confirmation) {
      const token = jwt.sign(user as any, process.env.SECRETKEY as string, {
        expiresIn: '1h',
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Incorrect password' });
    }
  } else {
    res.json({ success: false, message: 'User not found' });
  }
});

export default router;
