"use client"
import { useState } from "react";
import { postData } from '@/hooks/SetData'
import { Food } from "@/interface/Food";

interface InputProps {
  label: String,
  updateValue(value: any): void
}

const Input = ({ label, updateValue }: InputProps) => {
  return (
    <>
      <label className="text-gray-600 text-lg">{label}</label>
      <input className="bg-gray-300 m-2 w-[50%] rounded text-center focus:border-red-50 text-gray-700" onChange={e => updateValue(e.target.value)} />
    </>
  )
}

const Loading = () => {
  return (
    <div role="status">
      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface props {
  handleShowForm(): void
}

export default function InserFood({ handleShowForm }: props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image_url, setImage] = useState("");
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const data: Food = {
      title,
      image_url,
      price
    }
    setLoading(true)
    try {
      const response = await postData(data)
      console.log("Sucess!", response)
    } catch (error) {
      console.log("Error", error)
    } finally {
      setLoading(false)
      handleShowForm()
      window.location.reload()
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100vh] bg-[rgba(0,0,0,0.4)] shadow-lg">
      <div className="bg-gray-100 h-full w-full m-auto rounded-lg">
        <div className="absolute p-2 right-5 top-5">
          <button onClick={handleShowForm} className="bg-gray-300 w-11 h-9 rounded-full" >x</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-h-full items-center justify-center m-auto p-36">
          <Input label="title" updateValue={setTitle} />
          <Input label="price" updateValue={setPrice} />
          <Input label="image" updateValue={setImage} />
          <div className="flex justify-center mx-auto w-32 h-10 rounded-full  text-gray-200 items-center text-center bg-pink-800">
            <button type="submit">
            {isLoading ? <Loading/> : "Enviar"}
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}
