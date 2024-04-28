import { v2 as cloudinary } from 'cloudinary';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const mapFiles = async (files: any) => {
  let fls: Array<{}> = [];

  if (files && files?.length > 0) {
    for await (let file of files) {
      fls.push({
        name: file?.filename,
        type: file?.filetype,
        uri: file?.base64Str.includes('res.cloudinary.com')
          ? file?.base64Str
          : await upLoadFiles(file?.base64Str, file?.filename),
      });
    }
  }

  return fls;
};

const upLoadFiles = async (file: string, fileName?: string) => {
  const uri = await cloudinary.uploader.upload(file, {
    public_id: fileName,
    width: 2000,
    height: 1000,
  });

  return uri?.secure_url;
};

export const generativeAI = async (text: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(text);

  return result.response;
};

// const result = generativeAI('hello')
// result.then((res) => console.log(res))
