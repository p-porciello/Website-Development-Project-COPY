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
  //let db = database.getDb();
  console.log(req.body.url)
  console.log(req.body.mime)
  let testResponses: (string | undefined)[] = [];
  //let itemImages = await db.collection('lostItem').find({ adminApproved: true }).project({ imgFileName: 1, imgMimeType: 1, _id: 0 }).toArray();


 
  //const imageUrl = await fetch(itemImages?.[0]?.imgFileName)
    const imageUrl = req.body.url;
    const mime = req.body.mime;
    const imageArrayBuffer = await imageUrl.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');
    const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
            {
                inlineData: {
                    mimeType: mime,
                    data: base64ImageData,
                },
            },
            { text: "Write alternative text for this image meant to be read using a screen reader.  Describe the image in detail in 50 to 100 words.  Generate a single description, not a list of options." }
        ],
    });
    console.log(result)
    testResponses.push(result.text)
    res.json(result.text)
});

export default router;
