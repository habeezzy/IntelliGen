import express from 'express';
import * as dotenv from 'dotenv';
//cloudinary API for uploading posts, media, images, etc
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

//configure cloudinary API
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POSTS
router.route('/').get(async(req, res) => {
    try {
      const posts = await Post.find({});

      res.status(200).json({ success: true, data: posts })
    }
    catch (error) {
     res.status(500).json({ sucess: false, message: error })
    }
});

//CREATE A POST
//uploading into cloudinary and get cloudinary optimized URL
router.route('/').post(async(req, res) => {
   try {
   const { name, prompt, photo } = req.body;
   const photoUrl = await cloudinary.uploader.upload(photo);

//creates new post in our cloudinary database
   const newPost = await Post.create({
    name,
    prompt,
    photo: photoUrl.url,
   })

   res.status(201).json({ success: true, data: newPost})
   }
   catch {
    res.status(500).json({ success: false, message: error })
   }
});




export default router;
