import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import database from '../mongoConnect';
import { GenerateContentResponse, GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({})

const router = express();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

interface img {
    imgFileName: string;
    imgMimeType: string;
}

router.get('/',  /*verifyToken,*/ async (req: Request, res: Response) => {
  let db = database.getDb();
  let testResponses: GenerateContentResponse[] = [];
  let itemImages = await db.collection('lostItem').find({ adminApproved: true }).project({ imgFileName: 1, imgMimeType: 1, _id: 0 }).toArray();

  itemImages.map(async (image) => {
    const imageUrl = await fetch(image.imgFileName)
    const imageArrayBuffer = await imageUrl.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');
    const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
            {
                inlineData: {
                    mimeType: image.imgMimeType,
                    data: base64ImageData,
                },
            },
            { text: "Caption this image." }
        ],
    });
    console.log(result)
    testResponses.push(result)
  })

  if (itemImages) {
    res.json({imageinfo: itemImages, responses: testResponses});
  } else {
    res.json({message: "images couldn't be found :("})
  }
});

export default router;
