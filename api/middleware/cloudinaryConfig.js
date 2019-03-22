const { config, uploader } = require("cloudinary");
const cloudinaryConfig = () =>
  config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

module.exports = { cloudinaryConfig, uploader };
