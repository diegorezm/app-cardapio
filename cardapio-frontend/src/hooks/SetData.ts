import { Food } from "@/interface/Food";
import axios from "axios";
const url = "http://127.0.0.1:5000"

export const postData = async ( data : Food) => {
  try {
    const response = await axios.post(url+"/api/food",data)
    return response.data
  } catch (error) {
    return error 
  }
}
