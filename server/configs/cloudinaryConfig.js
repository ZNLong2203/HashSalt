const cloudinary = require('cloudinary').v2
const multer = require('multer')
const dotenv = require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.uploadImage = async (imagePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folder,
      upload_preset: uploadPreset,
      timeout: 100000,
    });
    console.log("Upload successful: ", result);
    return result.url; // This is the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading to Cloudinary: ", error);
    throw error;
  }
}

exports.deleteImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePath, {
      invalidate: true,
      timeout: 100000,
    });
    console.log("Delete successful: ", result);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary: ", error);
    throw error;
  }
}
