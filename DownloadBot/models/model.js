import dotenv from 'dotenv'
import fs from 'fs'
import OpenAI from "openai";
import { ChatOpenAI } from '@langchain/openai'
import { downloadImage } from './downloadImage.js'
import { error } from 'console';
import sizeOf from 'image-size'
dotenv.config()


const openai = new OpenAI();


export const postModel = new ChatOpenAI({
    temperature: 0.5, 
    model: "gpt-3.5-turbo",
}).bind({
    response_format: {
    type: "json_object",
    }})


export const imageGenerationModel = async (prompt) => {
    try {
        const image = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: 1,
            size: "256x256",
            })
        
        const imageURL = image.data[0].url
        /* const path = await downloadImage(imageURL) */
        return { url:imageURL }
    } catch(error){
        console.log(error)
        return {error:error.type}
    }
    }

export const imageModerationModel = async ({"path":path = null, "url":url = null}) => {
    let usePath = ""
    if (url && path){
        return {"error":"Provide either file path or url, not both"}
    } 
    if (!url && !path){
        return {"error":"Missing URL or file path"}
    }
    if (path){
        usePath = path
    } else {
        try {
            usePath = await downloadImage(url)
        } catch(error){
            return {"error":"Unable to download image for moderation. Have you provided the correct url?"}
        }
    }
    try {
        const image = await openai.images.createVariation({
            model: "dall-e-2",
            image: fs.createReadStream(usePath),
            n: 1,
            size: "512x512"
            })
    } catch(error){
        console.log(error)
        if (error.type === 'invalid_request_error'){
            return {"error":"Try again in a few minutes. Make sure your URL is correct."}
        }
        if (!path){
            fs.unlink(usePath, (err) => {
            if (err) {
              console.error('Error deleting the file:', err.type);
            } 
          })}
        return {"status":"Inappropriate"}
    }
    if (!path){
        fs.unlink(usePath, (err) => {
        if (err) {
          console.error('Error deleting the file:', err.type);
        } 
      })}
    
    return {"status":"Valid"}  
    }








