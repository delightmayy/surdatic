import React from "react";
import specialArr from "../../img/cardspecialarrow.png";

interface BlogCardProps {
  category1: string;
  category2: string;
  title: string;
  description: string;
  img: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  category1,
  category2,
  title,
  description,
  img,
}) => {
  return (
    <div
      className="cursor-pointer bg-white/5  rounded-xl overflow-hidden select-none
         flex flex-col flex-shrink-0 w-full mx-auto sm:w-[320px] min-h-96 border border-white/20"
    >
      <img
        src={img}
        alt="card"
        className="object-cover w-full rounded-t-3xl transition-transform duration-500 p-2 h-52 border-b border-b-white/20"
      />

      <div className="p-4 flex flex-col justify-between  text-white/50 flex-grow">
        <h3 className="  text-xs mb-1 flex gap-2 items-center">
          <p className="">{category1}</p>
          <p className="">{category2}</p>
        </h3>
        <h2 className=" font-semibold text-sm md:text-sm mb-4">{title}</h2>

        <p className=" text-xs mb-4">{description}</p>
        <div className="flex items-start">
          <button className="bg-sky-500 text-black/80 text-sm px-3 py-1 rounded-full hover:bg-sky-700 transition  hover:scale-95 cursor-pointer flex items-center gap-1">
            Read More
            <img src={specialArr} alt="icon" className="w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
