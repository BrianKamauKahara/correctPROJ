import express, { json } from 'express'
import {
    generatePost,
    generateImage,
    moderateImage,
    moderatePost,
} from '../main.js'
/* import { lastFile } from '../models/getLastFileMade.js' */

const router = express.Router()

//Generating a post
router.post('/generatePost', async (req, res) => {
    const { postStructure, instructions } = req.body
    const newPost = await generatePost({post_structure:postStructure,instructions:instructions})
    res.status(200).json(newPost)
})

router.post('/moderatePost', async (req, res) => {
    const { postStructure }  = req.body
    const Sentiment = await moderatePost({post_structure:postStructure})
    res.status(200).json(Sentiment)
})

router.post('/generateImage', async (req, res) => {
    const { desc, path } = req.body
    

    const ImageData = await generateImage({"image_desc":desc})
    res.status(200).json(ImageData)
    /* res.status(200) */
})

router.post('/moderateImage', async (req, res) => {
    const { url, fileName } = req.body
    const status = await moderateImage({"url":url,"file_name":fileName})
    res.status(200).json(status)
})

/* router.get('/lastImage', async (req, res) => {
    const imageName = await lastFile()
    res.status(200).json({image:imageName})
  });
 */
export default router