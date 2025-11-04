import React, { useEffect, useState } from "react";
import axios from "axios";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/everything?q=Apple&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_KEY}`
        );
        console.log(res.data);
        setArticles(res.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading headlines...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">📰 Latest News Headlines</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="border rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">{article.title}</h2>
              <p className="text-sm text-gray-700 mb-4">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
