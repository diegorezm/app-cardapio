import React from 'react';

interface Props {
  title: string;
  price: number;
  image: string;
}

export function FoodCard({ title, price, image }: Props) {
  return (
    <div className='flex flex-col max-w-4xl rounded m-5 bg-gray-100 shadow-xl z-10 relative'>
      <div className='flex justify-center my-2 h-[110px] w-full'>
        <img src={image} alt={title} className='w-1/2 rounded-full' />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h2>{title}</h2>
        <p><b>Preço:</b> {price}</p>
      </div>
    </div>
  );
}

