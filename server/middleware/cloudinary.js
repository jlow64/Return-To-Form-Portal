const Formidable = require('formidable');
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUDINARY_SECRET 
  });
  
cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" }, 
function(error, result) {console.log(result); });

// https://api.cloudinary.com/v1_1/return-to-form-cloud/video/upload