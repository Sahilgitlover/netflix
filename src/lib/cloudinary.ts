
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY , 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async(localFilePath:string) => {
  try {
    if(!localFilePath) return null

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto'
    })
  
    fs.unlinkSync(localFilePath)
    return response

  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null
  }

}

const deleteFromCloudinary = async(fileUrl:string) =>{
  try{
    const response = await cloudinary.uploader.destroy(fileUrl, {
      resource_type: 'auto'
    })
    return response

  } catch(error){
    console.error(error)
    return null
  }
}

const deleteVideoFromCloudinary = async(fileUrl:string) =>{
  try{
    const response = await cloudinary.uploader.destroy(fileUrl, {
      resource_type: 'auto'
    })
    return response

  } catch(error){
    console.error(error)
    return null
  }
}



export {uploadOnCloudinary, deleteFromCloudinary, deleteVideoFromCloudinary}
export default cloudinary;