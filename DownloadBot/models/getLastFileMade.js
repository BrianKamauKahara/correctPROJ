import fs from 'fs';
import path from 'path';
import { cwd } from 'process'
console.log(cwd())

// Function to get the last created image
export const lastFile = async () => {
    const directory = path.join(cwd(),'images')
  try {
    // List all files in the directory
    const files = await fs.promises.readdir(directory);

    // Get file stats and sort by creation time
    const fileStats = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(directory, file);
        const stats = await fs.promises.stat(filePath);
        return { file, stats };
      })
    );

    // Filter for image files if needed (e.g., .png, .jpg)
    const imageFiles = fileStats.filter(({ file }) =>
      file.match(/\.(png|jpg|jpeg)$/i)
    );

    // Sort by creation time (newest first)
    imageFiles.sort((a, b) => b.stats.birthtime - a.stats.birthtime);

    // Get the most recently created file
    const latestFile = imageFiles[0];

    if (latestFile) {
      return path.join(directory, latestFile.file);
    } else {
      return 'No images found';
    }
  } catch (error) {
    console.error('Error reading directory or getting file stats:', error);
    return null;
  }
};

// Usage example
/* const imagesDirectory = path.join(cwd(),'DownloadBot', 'images'); */
/* lastFile()
  .then((latestImagePath) => console.log('Last created image:', latestImagePath))
  .catch(console.error); */