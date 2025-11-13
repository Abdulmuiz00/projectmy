import React, { useState } from "react";
import menu from "../src/assets/menu4.PNG";
import menu2 from "../src/assets/menu6.PNG";
import menu3 from "../src/assets/menu7.PNG";

function StarRating({ value = 0, onChange = () => {}, max = 5, size = 24 }) {
  const [selected, setSelected] = useState(value);

  const handleClick = (index) => {
    setSelected(index);
    onChange(index);
  };

  const Star = ({ filled }) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className="inline-block"
    >
      <path
        d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.172L12 18.896l-7.336 3.874 1.402-8.172L.132 9.21l8.2-1.192z"
        fill={filled ? "#f59e0b" : "none"}
        stroke="#f59e0b"
        strokeWidth="1.5"
      />
    </svg>
  );

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => {
        const index = i + 1;
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            className="cursor-pointer p-1"
          >
            <Star filled={index <= selected} />
          </button>
        );
      })}
      <span className="ml-2 text-sm text-gray-700">
        {selected}/{max}
      </span>
    </div>
  );
}

export default function ProductCard() {
  const [rating, setRating] = useState(0);

  return (
   <div>
    <h1 className="text-center text-4xl font-bold my-10">Pastry Rating Page </h1>
     <div className="flex gap-4">
      <div className="max-w-sm bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <img
          src={menu}
          alt="Product"
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-semibold mb-2">Cheese cake</h2>
        <p className="text-gray-600 mb-3">
          Delicious delicacy that helps satisfy your taste bud
        </p>
        <StarRating value={rating} onChange={setRating} />
        <p className="mt-3 text-sm text-gray-700">
          Product rated: {rating} star{rating !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="max-w-sm bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <img
          src={menu2}
          alt="Product"
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-semibold mb-2">Ice Cream</h2>
        <p className="text-gray-600 mb-3">
          Delicious delicacy that helps satisfy your taste bud
        </p>
        <StarRating value={rating} onChange={setRating} />
        <p className="mt-3 text-sm text-gray-700">
          Product rated: {rating} star{rating !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="max-w-sm bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <img
          src={menu3}
          alt="Product"
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-semibold mb-2">Double Bacon Cheese Burger</h2>
        <p className="text-gray-600 mb-3">
          Delicious delicacy that helps satisfy your taste bud
        </p>
        <StarRating value={rating} onChange={setRating} />
        <p className="mt-3 text-sm text-gray-700">
          Product rated: {rating} star{rating !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
   </div>
  );
}
