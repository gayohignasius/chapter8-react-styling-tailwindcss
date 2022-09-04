import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils";

const PostItem = ({ item }) => {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRandomImages();
  }, []);

  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }
  const getRandomImages = () => {
    setIsLoading(true);
    axios
      .get("https://source.unsplash.com/random/300x300/?landscape")
      .then((res) => {
        const { config } = res;
        setImage(config.url);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-2xl m-4 bg-gray-100 dark:bg-gray-900 h-full">
      <Link to={`/posts/${item.id}`}>
        {validURL(item.image) ? (
          <img
            className="w-full"
            src={validURL(item.image) ? item.image : null}
            alt="landscape view"
          />
        ) : (
          !isLoading && (
            <img className="w-full" src={image} alt="landscape view" />
          )
        )}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-200">
            {capitalizeFirstLetter(item.title)}
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-base">
            {item.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
