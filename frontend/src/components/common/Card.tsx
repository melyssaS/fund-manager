import React from 'react';

interface CardProps{
    title: string;
    value: number;
    backgroundClassname: string;
    icon: React.ReactNode;
}

function Card({title, value,backgroundClassname, icon}: CardProps) {
  return (
    <div className={`${backgroundClassname} rounded-lg shadow-lg p-6 max-w-sm`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="text-3xl rounded-lg p-1 bg-white bg-opacity-50 h-8 w-8 ">{icon}</div>
      </div>
      <div className="mt-8">
        <p className="text-5xl text-white">{value}</p>
        <p className="text-gray-600">COP</p>
      </div>
    </div>
  );
}

export default Card;