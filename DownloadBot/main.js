import { JsonOutputParser } from "@langchain/core/output_parsers"

import {
    generatePostTemplate,
    moderatePostTemplate,
} from './prompts/promptTemplates.js'

import {
    postModel,
    imageGenerationModel,
    imageModerationModel
} from './models/model.js'

export const generatePost = async ({"post_structure":postJSON, "instructions":instructionStr}) => {
    console.log('Generating new post')
    if (typeof(postJSON) !== 'object'){
        return {"error":"Invalid Post Type: Post should be an Object."}
    }
    if (typeof(instructionStr) !== 'string'){
        return {"error":"Invalid Instructions: Instructions should be a string"}
    }
    const generatePostChain = generatePostTemplate.pipe(postModel).pipe(new JsonOutputParser())
    const newPost = await generatePostChain.invoke({
        post: JSON.stringify(postJSON),
        instruction: instructionStr
    })
    return newPost
}

export const generateImage = async({"image_desc":imageDesc}) => {
    console.log('Generating Image')
    if (typeof(imageDesc) !== 'string'){
        return {"error":"Invalid Image Description: Image Description should be a string"}
    }

    const result = await imageGenerationModel(imageDesc)
    return result
}

export const moderatePost = async ({"post_structure":postJSON}) => {
    if (typeof(postJSON) !== 'object'){
        return {"error":"Invalid Post Type: Post should be an Object."}
    }
    const moderatePostChain = moderatePostTemplate.pipe(postModel).pipe(new JsonOutputParser())
    const postREL = await moderatePostChain.invoke({
        post: JSON.stringify(postJSON)
        })
    return postREL
}
export const moderateImage = async ({"url":url = null,"file_name":fileName=null}) => {
    if (fileName){
        let setPath = `images//${fileName}`
        if (!fileName.endsWith('.png')){
            setPath = `images//${fileName}.png`
        }
        console.log(setPath)
        return await imageModerationModel({"path":setPath})
    } else {
        return await imageModerationModel({"url":url})
    }    
}   


/* console.log(await generateImage({"image_desc":'Man marrying woman!'}))
 *//* console.log(await generatePost({
    post_structure:{
        title:"Summary of description. 2 words max.",
        description:"Summary of description. 30 words max.",
        main:"Main issue being described. 1 sentence.",
        creator:"Name of creator of post."
    },
    instructions:"Create a post on why Messi is the greates footballer ever."
})) */
/* console.log(await moderatePost({
    post_structure:{
        title:"Dating",
        description:"When looking for a romantic partner, do not be interested in physical features, rather, what is in the heart.",
        creator:"WatrType"
    }
})) */
/* {
  url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-1A1r7faLZ9FUQHi1YEfRxNxj/user-jVfdAL0D7ja7JvPWlZylcU9A/img-BDLjleX1BWAU2QUCsMsKEnZ1.png?st=2024-07-26T16%3A32%3A12Z&se=2024-07-26T18%3A32%3A12Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-25T21%3A51%3A16Z&ske=2024-07-26T21%3A51%3A16Z&sks=b&skv=2023-11-03&sig=lwI5Yr%2BIoHU1dxf88R00HHfkbHvvvF3gsDCrvE3D6bA%3D',
  path: 'images\\DcdJljHSD3.png'
} */

/* console.log(await moderateImage({url: `https://web.whatsapp.com/761483c4-1d29-491f-9a50-e74f59facdaf`,})) */
/* console.log(await moderateImage({file_name:'3Syd62oTqL',})) */