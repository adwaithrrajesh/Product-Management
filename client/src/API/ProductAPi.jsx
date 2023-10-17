import instance from "../instance/instance";
import axios from "axios";
import toast, { useToasterStore } from "react-hot-toast";

export const addProduct = async (value) => {
  try {
    toast.loading('Adding product...')
    const response = await instance.post('/addProduct', value);
    toast.dismiss()
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const uploadToCDN = async (value) => {
  try {
    const uploadImage = async (image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "drcareStorage");
      const response = await axios.post("https://api.cloudinary.com/v1_1/dg047twga/image/upload",data);
      return response.data.url;
    };
    const uploadPromises = value.map(uploadImage);
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.log(error)
    toast.error("Unable to upload your image try again later.")
  }
};


export const getProduct = async(page,limit) =>{
  try {    
    const response = await instance.get(`/getProducts?page=${page}&limit=${limit}`);
    return response
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

export const deleteProduct = async(productId) =>{
  try {
    const response = await instance.delete('/deleteProduct',{ data: { productId } })
    return response
  } catch (error) {
    toast.error(error.response.data.message)
  }
}