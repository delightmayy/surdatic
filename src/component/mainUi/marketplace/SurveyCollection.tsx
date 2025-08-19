import React from "react";
import BlogCard from "../BlogCard";
import { motion } from "framer-motion";
import titlebg from "../../../img/titlebg.png";
import imgsrc from "../../../img/card2img.png";

interface Article {
  id: number;
  category1: string;
  category2: string;
  title: string;
  description: string;
  imgSrc: string;
}

const articles: Article[] = [
  {
    id: 1,
    category1: "Data",
    category2: "Blockchain",
    title: "How Blockchain Is Changing the Way We Collect Data",
    description:
      "Traditional data collection is broken — prone to manipulation, fraud, and low engagement. Learn how Surdatics uses blockchain to ensure...",
    imgSrc: imgsrc,
  },
  {
    id: 2,
    category1: "Data",
    category2: "Blockchain",
    title: "Earn While You Share: Inside the Surdatics Token Economy",
    description:
      "At Surdatics, your opinions are valuable — literally. This post breaks down how the $ZAA token powers incentivized surveys...",
    imgSrc: imgsrc,
  },
  {
    id: 3,
    category1: "Data",
    category2: "Blockchain",
    title: "How Blockchain Is Changing the Way We Collect Data",
    description:
      "Traditional data collection is broken — prone to manipulation, fraud, and low engagement. Learn how Surdatics uses blockchain to ensure...",
    imgSrc: imgsrc,
  },
  {
    id: 4,
    category1: "Data",
    category2: "Blockchain",
    title: "Earn While You Share: Inside the Surdatics Token Economy",
    description:
      "At Surdatics, your opinions are valuable — literally. This post breaks down how the $ZAA token powers incentivized surveys...",
    imgSrc: imgsrc,
  },
];

const SurveyCollection: React.FC = () => {
  return (
    <section className="bg-black">
      <div className=" text-white px-6 py-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" flex flex-col-reverse mt-3 gap-5 md:flex-row max-w-6xl mx-auto mb-6"
        >
          <div className="text-center md:text-start md:flex-1 space-y-2 flex flex-col items-center md:items-start max-w-sm mx-auto  md:justify-start lg:mx-2">
            <h2 className=" hidden md:block md:text-2xl max-w-sm  font-bold">
             Top Survey Collections
            </h2>
            <p className="max-w-sm mx-auto md:mx-0 text-gray-300  text-xs leading-relaxed   ">
             Ensure data authenticity and integrity with blockchain-powered security.
            </p>
          </div>
          <div className="text-center md:flex-1 flex flex-col md:flex-row justify-center items-center md:justify-end ">
            <h2
              className="  md:text-xl font-semibold py-2 px-6 rounded-full"
              style={{
                backgroundImage: `url(${titlebg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            >
             Surveys 
            </h2>
          </div>
        </motion.div>

        {/* Articles Container */}
        <div className="flex flex-col mt-8 max-h-svh overflow-y-scroll md:overflow-y-hidden md:flex-row md:py-6 md:justify-between gap-6">
          {articles.map((article) => (
            <BlogCard
              key={article.id}
              category1={article.category1}
              category2={article.category2}
              title={article.title}
              description={article.description}
              img={article.imgSrc}
            />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center mt-8 gap-4">
          <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
          <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
        </div>

        {/* Arrows */}
        <div className="flex justify-center items-center mt-4 gap-6">
          <button
            aria-label="Previous"
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            &lt;
          </button>
          <button
            aria-label="Next"
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default SurveyCollection;
