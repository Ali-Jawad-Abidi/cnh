import React, { useEffect } from "react";
import Footer from "./Footer";
import CommentBox from "./CommentBox";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Loading from "./Loading";
import HtmlParser from "./HtmlParser";

export default function BlogDisplay(prop) {
  var [blog, setBlog] = useState(null);
  const blogid = useParams().id;
  useEffect(() => {
    var config = {
      method: "get",
      url: process.env.REACT_APP_API_BASE_URL + "/blog",
      params: { id: blogid },
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        setBlog(response.data[0]);
      }
    });
  }, [blogid]);

  return blog ? (
    <div className="dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="lg:mx-28 mx-4 mb-4">
        <div className="flex flex-col gap-2 shadow-lg my-4 dark:bg-gray-800 rounded-lg p-4 pb-8">
          <div className="shadow-xl p-4 rounded-lg dark:bg-gray-800">
            <p className="text-2xl font-bold text-left mb-4">{blog.title}</p>
            <img
              src={blog.image}
              alt="blog image"
              className="w-full h-96 lg:px-1 px-1 object-cover"
            />

            {/* <div
              dangerouslySetInnerHTML={{ __html: blog.text }}
              className="list-disc list-inside" // Apply Tailwind CSS classes for list styling
            ></div> */}
            <HtmlParser htmlContent={blog.text} />
          </div>
        </div>

        <CommentBox
          type="blog"
          post={blog._id}
          comments={blog.comments}
          disableComments={blog.disableComments}
        />
      </div>
      <Footer />
    </div>
  ) : (
    <Loading />
  );
}
