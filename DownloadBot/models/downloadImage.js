import axios from 'axios'
import fs from 'fs'
import path from 'path'


export async function downloadImage(url) {
  const to = [await generateRandomString(),".png"].join("")
  const filepath = path.join('images', '../images', to)
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('error', reject)
      .once('close', () => resolve(filepath));
  });
}

const generateRandomString = async () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
  }



/* (async () => {
  const imageURL = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-1A1r7faLZ9FUQHi1YEfRxNxj/user-jVfdAL0D7ja7JvPWlZylcU9A/img-BzfkQrM13a3tVMoAaMxUw1MC.png?st=2024-07-26T14%3A18%3A34Z&se=2024-07-26T16%3A18%3A34Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-25T23%3A32%3A54Z&ske=2024-07-26T23%3A32%3A54Z&sks=b&skv=2023-11-03&sig=PqeqEN8krXL81WMmSI%2BW0N%2BF3XRwlY4CAydbIDmdLk8%3D';
  const filepath = path.join('images', '../images', 'downloaded_image.png');

  try {
    const imagePath = await downloadImage(imageURL, filepath);
    console.log(`Image downloaded to: ${imagePath}`);
  } catch (error) {
    console.error('Error downloading image:');
  }
})()
 */