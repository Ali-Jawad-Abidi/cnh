import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import icon from "./img/defaulticon.webp";

export default function CommentBox(props) {
  console.log(props);
  var [text, setText] = useState("");
  var [comments, setComments] = useState([]);
  console.log(comments);

  var [isAdmin, setIsAdmin] = useState(false);
  var id =
    "userid" in localStorage
      ? JSON.parse(localStorage.getItem("userid"))
      : null;
  var token =
    "token" in localStorage
      ? JSON.parse(localStorage.getItem("token")).token
      : null;

  useEffect(() => {
    if (props.comments !== undefined && props.comments.length > 0) {
      var config = {
        method: "get",
        url: process.env.REACT_APP_API_BASE_URL + "/getcomments",
        params: { id: props.comments },
      };

      axios(config).then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setComments(response.data);
        }
      });
    }

    if (id !== null && token !== null) {
      var config = {
        method: "post",
        url: process.env.REACT_APP_API_BASE_URL + "/isadmin",
        data: { id: id, token: token },
      };

      axios(config).then((response) => {
        if (response.status === 200) {
          setIsAdmin(true);
        }
      });
    } else {
      setIsAdmin(false);
    }
  }, []);

  function PostComment(e) {
    e.preventDefault();
    var d = new Date();
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var dateToAdd =
      d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();

    var CommentObject = Object();
    CommentObject.text = text;
    CommentObject.post = props.post;
    CommentObject.posttype = props.type;
    CommentObject.username = JSON.parse(localStorage.getItem("username"));
    CommentObject.user = JSON.parse(localStorage.getItem("userid"));
    CommentObject.date = dateToAdd;

    var config = {
      method: "post",
      url: process.env.REACT_APP_API_BASE_URL + "/addcomment",
      data: CommentObject,
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        CommentObject.profilephoto =
          "profileImage" in localStorage
            ? JSON.parse(localStorage.getItem("profileImage"))
            : icon;
        setComments((oldArray) => [...oldArray, CommentObject]);
        setText("");
      }
    });
  }

  if ("userid" in localStorage)
    return (
      <div className="dark:bg-gray-800 shadow-lg p-4 rounded-lg w-full">
        <div className="comments text-left font-bold text-xl text-bold dark:text-white">
          Discussions({comments.length})
        </div>
        <div className="flex flex-col">
          {!props.disableComments && (
            <div>
              <textarea
                id="message"
                rows="4"
                value={text}
                class="bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mt-2"
                placeholder="Comment..."
                onChange={(e, v) => setText(e.target.value)}
              ></textarea>
              <button
                onClick={(e) => {
                  PostComment(e);
                }}
                className="button mt-2 lg:w-1/5 w-2/5 float-left no-wrap text-xs lg:text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-2"
              >
                Post Comment
              </button>
            </div>
          )}

          <div className="mt-10">
            {comments.map((comment) => (
              <div>
                <div className="flex flex-row ml-4 cursor-pointer">
                  <Link
                    to={`/profilepage/${comment.user}`}
                    // className="bg-blue-600 text-white px-1 py-2 rounded-lg"
                  >
                    <img
                      src={
                        comment.profilephoto
                          ? comment.profilephoto
                          : "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      }
                      alt="profile photo"
                      className="w-8 h-8 rounded-full object-fit"
                    />
                  </Link>
                  <Link
                    to={`/profilepage/${comment.user}`}
                    // className="bg-blue-600 text-white px-1 py-2 rounded-lg"
                  >
                    <div className="dark:text-white text-sm object-center m-2">
                      <span>{comment.username}</span>
                      <span className="ml-4 dark:text-gray-300">
                        {comment.date || "Feb. 12, 2022"}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="ml-6 text-left dark:text-gray-300">
                  {comment.text}
                </div>
                <div>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this comment?"
                          )
                        ) {
                          const config = {
                            method: "post",
                            url:
                              process.env.REACT_APP_API_BASE_URL +
                              "/deleteComment",
                            data: {
                              postId: props.post,
                              commentId: comment._id,
                              postType: props.type,
                            },
                          };
                          axios(config).then((response) => {
                            if (response.status === 200) {
                              setComments(
                                comments.filter((cmt) => {
                                  return cmt._id !== comment._id;
                                })
                              );
                            } else {
                              alert("Error Deleting Comment");
                            }
                          });
                        }
                      }}
                      className=" ml-6 text-sm bg-red-600 hover:bg-red-700 text-white px-1 rounded-lg float-left"
                    >
                      Delete Comment
                    </button>
                  )}
                </div>
                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="dark:bg-gray-800 shadow-lg p-4 rounded-lg w-full">
        <div className="comments text-left font-bold text-xl text-bold dark:text-white">
          Discussions({comments.length})
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-left dark:text-white">
            <a
              href="/login"
              onClick={() => {
                localStorage.setItem(
                  "redirectTo",
                  JSON.stringify(window.location.href)
                );
              }}
              className="text-blue-600 hover:underline"
            >
              Login or Sign Up
            </a>{" "}
            to post comments...
          </p>

          <div className="mt-4">
            {comments.map((comment) => (
              <div>
                <div className="flex flex-row ml-4">
                  {/* <Link to={`/profile/${comment.user}`}> */}
                  <img
                    src={
                      comment.profilephoto
                        ? comment.profilephoto
                        : "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    }
                    alt="profile photo"
                    className="w-8 h-8 rounded-full object-fit"
                  />
                  {/* </Link> */}
                  {/* <Link to={`/profile/${comment.user}`}> */}
                  <div className="dark:text-white text-sm object-center m-2">
                    <span>{comment.username}</span>
                    <span className="ml-4 dark:text-gray-300">
                      {comment.date || "Feb. 12, 2022"}
                    </span>
                  </div>

                  {/* </Link> */}
                </div>
                <div className="ml-6 text-left dark:text-gray-300">
                  {comment.text}
                </div>

                <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
