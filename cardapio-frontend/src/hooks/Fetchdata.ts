import { Food } from "@/interface/Food"
import axios from "axios";
const url = "http://127.0.0.1:5000"

export const FetchData = async () => {
  const response = await axios.get(url+"/api/food");
  return response
};
