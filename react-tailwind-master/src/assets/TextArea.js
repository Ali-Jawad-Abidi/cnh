// RichTextEditor.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import "./CSS/WysiwygEditor.css"; // Custom CSS for the editor
import "react-quill/dist/quill.snow.css"; // Import the styles

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "code"],
    [{ color: [] }, { background: [] }],
    // ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "list",
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "color",
  "background",
  "link",
];

const WysiwygEditor = (props) => {
  return (
    <div className="p-4 h-52 overflow-y-scroll border border-gray-300 dark:text-white">
      <ReactQuill
        value={props.text}
        onChange={(html) => {
          props.setText(html);
        }}
        modules={modules}
        formats={formats}
        className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
        theme="snow"
      />
    </div>
  );
};

export default WysiwygEditor;
