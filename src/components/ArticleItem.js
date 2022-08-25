import React from "react";
import { capitalizeFirstLetter } from "../utils";

const ArticleItem = ({ item }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-2xl m-4 bg-gray-100 dark:bg-gray-900">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-200">
          {capitalizeFirstLetter(item.title)}
        </div>
        <p className="text-gray-800 dark:text-gray-200 text-base">
          {item.body}
        </p>
      </div>
    </div>
  );
};

export default ArticleItem;
