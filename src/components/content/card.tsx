import React from "react";
import Button from "../buttons";

interface CardProps {
  thumbnail?: string;
  name: string;
  category: string;
  price: string;
}
const ProductCard: React.FC<CardProps> = ({
  name,
  thumbnail,
  category,
  price,
}) => {
  return (
    <article className="flex w-min cursor-pointer select-none flex-col items-center gap-1 rounded-lg px-2 py-3 hover:shadow-lg hover:shadow-slate-400">
      <figure className="relative flex h-44 w-48 items-center justify-center ">
        <i className="bi-card-image absolute inset-0 z-0 flex items-center justify-center rounded-xl bg-slate-200 text-slate-400 " />
        <img
          src={thumbnail}
          className={
            "z-10 h-full w-full rounded-xl bg-white object-contain " +
            !thumbnail
              ? "hidden"
              : ""
          }
        />
      </figure>
      <div className="flex w-full flex-col px-2 ">
        <p className="text-xs font-semibold text-slate-500">{category}</p>
        <h3 className="whitespace-nowrap font-semibold text-sky-700">{name}</h3>
      </div>
      <div className="flex justify-between">
        <p className="text-xl font-bold text-slate-800">{price} DH</p>
      </div>
      <Button
        className="bg-slate-800 text-white hover:bg-slate-700"
        minWidth="w-full"
        icon="bi-bag-plus text-sm"
      >
        Add to cart
      </Button>
    </article>
  );
};

export default ProductCard;
