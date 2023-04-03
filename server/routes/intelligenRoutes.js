import express from 'express';
import * as dotenv from 'dotenv';
//connect to OpenAI API 
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

//configure API key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

//create instance of open API
const openai = new OpenAIApi(configuration);

//test route for OpenAI
router.route('/').get((req, res) => {
    res.send('Hello from IntelliGen!');
});

//route makes call to openAI APi, and based on prompt return AI generated image
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        //get image and send back to front end
        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({ photo: image });
    } catch (error) {
      console.log(error);
      res.status(500).send(error?.response.data.error.message)
    }
})

export default router;
