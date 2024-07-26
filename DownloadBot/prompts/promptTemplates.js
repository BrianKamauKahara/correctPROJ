import { PromptTemplate } from "@langchain/core/prompts"

export const moderatePostTemplate = PromptTemplate.fromTemplate(`
You are a content moderation bot.
You receive a post's contents and are supposed to identify whether the post is appropriate.
Posts come in multiple styles, some are JSON objects and others are purely strings.
Always return a JSON object which has one key: sentiment.
The value for this key should be either 1, 2, 3 or 4.
The higher the number, the likelier the post is inappropriate.
Posts with 1 essentially are 100% clean.
Here is the post:
{post}`)

export const generatePostTemplate = PromptTemplate.fromTemplate(`
You are a content generation bot, that generates posts.
You receive two things:
1 - The general JSON structure of a post.
2 - Instructions.
Return a JSON object that is identical to the general JSON structure of the post
Fill in the keys of the JSON object as per the instructions.
Example:
1 - {{"title":"title of post, only 20 words","description":"description for post, less than 60 words.","tags":"labels, 2 or 3"}}
2 - "Generate a blog post for me about Tourism in Maasai Mara"
Output:
{{"title":"Maasai Mara's Beauty","description":"Maasai Mara is a world-renowned safari destination located in Kenya, known for its breathtaking landscapes and diverse wildlife. Visitors can witness the annual Great Migration of wildebeests and zebras, as well as spot the Big Five animals.","tags":"Wildlife, Tourism"}}
\n\n
Ofcourse, the ... does not mean you also return '...', instead, continue generating. I am just trying to shorten the promptTemplate.
If you deem the instructions inappropriate, return a JSON like:
{{"error":"Inappropriate Task"}}
Generate from: \n
1 - {post}
2 - {instruction}
`)



