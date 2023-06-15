import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Loading from "./Loading";

export function BlogItem(props) {
  return (
    <Link to={`/blogs/${props.item._id}`}>
      <div class="max-w-sm min-h-[60vh] bg-white border hover:scale-105 items-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          class="object-cover w-full h-[25vh] cursor-pointer  "
          src={props.item.thumbnail}
          alt=""
        />

        <div class="p-2 h-[30vh]">
          <a href="#">
            <h5 class="mb-2 line-clamp-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {props.item.title}
            </h5>
          </a>
          <p class="mb-2 line-clamp-3 font-normal text-gray-700 dark:text-gray-400">
            {props.item.info}
          </p>
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              aria-hidden="true"
              class="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </Link>
  );
}

export function BlogsGrid(props) {
  var blogs = props.blogs;
  return (
    <div className="mx-3 p-2 min-h-screen border-2 mb-4">
      <Grid container columnSpacing={2} rowSpacing={2}>
        {blogs.map((blog) => (
          <Grid item xs={6} sm={6} md={3}>
            <BlogItem item={blog} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default function Blog() {
  var [blogs, setBlogs] = useState([]);
  var [showMore, setShowMore] = useState(true);

  function fetchBlogs() {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/blogs",
      params: { start: blogs.length },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        var tempArr = blogs;
        tempArr = tempArr.concat(response.data.blogs || []);
        setBlogs(tempArr);
        setShowMore(!response.data.isEnd);
      } else setBlogs([]);
    });
  }
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="dark:bg-gray-900">
      <Header />
      <p className="text-4xl dark:text-emerald-400 p-2">Blogs and Articles</p>
      <div className="min-h-screen">
        <BlogsGrid blogs={blogs} />
        {showMore && (
          <div className="flex pt-3 pb-3 justify-center w-full">
            <div
              onClick={() => {
                fetchBlogs();
              }}
              className="button  w-2/5 ml-10 px-10 py-3 bg-blue-700 rounded-lg lg:rounded-xl shadow-bg-blue-700 shadow-2xl text-white flex justify-center cursor-pointer hover:opacity-60"
            >
              Show More
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
