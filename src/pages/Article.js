import React, { useEffect, useState } from "react";
import ArticleItem from "../components/ArticleItem";
import articleList from "../dummy/tugasListArtikel.json";

const Article = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(articleList);
  }, []);
  return data.map((item, index) => <ArticleItem key={index} item={item} />);
};

export default Article;
