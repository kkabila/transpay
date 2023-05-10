require("dotenv").config()
const cloudinary = require("cloudinary").v2;



const uploadImage = async (imagePath) => {
    cloudinary.config({
        secure: true,
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret
    })

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    }

    try {
        const result = await cloudinary.uploader.upload(imagePath, options)
        return result;

    } catch (error) {
        console.log(error);
    }
}

module.exports = uploadImage;
