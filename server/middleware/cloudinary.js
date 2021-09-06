var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'return-to-form-cloud', 
    api_key: '562263172261812', 
    api_secret: 'D4S3WGrSE-6NyMKEwimMRjBGYvY' 
  });
  
cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" }, 
function(error, result) {console.log(result); });

// https://api.cloudinary.com/v1_1/return-to-form-cloud