"use client"
import { FetchData } from "@/hooks/Fetchdata";
import { useEffect, useState } from "react";
import { FoodCard } from "./components/FoodCard";
import { Food } from "@/interface/Food";
import InserFood from "./components/InserFood";
export default function Home() {
  const [data, setData] = useState<Food[]>([])
  const [showForm, setShowForm] = useState(false)
  const handleShowForm = () => {
    setShowForm(prev => !prev)
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await FetchData()
      setData(result.data.Cardapio)
    }
    fetchData()
  }, [])
  return (
    <div className="w-screen h-screen relative">
      <div className="flex justify-center text-5xl font-bold">
        <h1>Menu</h1>
      </div>
      <div className="grid grid-cols-4">
        {data.map((item) => (
          <FoodCard
            title={item.title}
            price={item.price}
            image={item.image_url}
            key={item.id}
          />
        ))}
      </div>
      <div className="absolute bottom-5 right-5">
        <button onClick={handleShowForm} className="bg-pink-800 h-16 w-16 rounded-full text-white hover:h-20 hover:w-20 transition-transform transform hover:scale-110 ">+</button>
      </div>
      {showForm && <InserFood handleShowForm={handleShowForm} />}
    </div>

  );
}
