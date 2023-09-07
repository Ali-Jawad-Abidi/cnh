import React from "react";
import sanitizeHtml from "sanitize-html";

const HtmlParser = ({ htmlContent }) => {
  // Define custom HTML sanitization options
  const cleanHtml = sanitizeHtml(htmlContent, {
    allowedTags: [
      "p",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "code",
      "h1",
      "h2",
      "s",
      "u",
      // "a",
    ],
    allowedAttributes: {},
  });

  // Parse the cleaned HTML content and apply Tailwind CSS classes
  const parsedHtml = cleanHtml
    .replace(/<p>/g, '<p class="dark:text-white">')
    .replace(
      /<ul>/g,
      '<ul class="max-w-md space-y-1 list-disc list-inside dark:text-white text-left">'
    )
    .replace(
      /<ol>/g,
      '<ol class="max-w-md space-y-1 list-decimal list-inside dark:text-white text-left">'
    )
    .replace(/<li>/g, '<li class="mb-1">')
    // .replace(/<a>/g, '<a class="mb-1 text-blue-600 underline">')
    .replace(/<strong>/g, '<strong class="font-bold dark:text-white">')
    .replace(/<em>/g, '<em class="italic dark:text-white">')
    .replace(
      /<code>/g,
      '<code class="bg-gray-200 dark:bg-gray-700 p-1 rounded text-sm dark:text-white">'
    )
    .replace(/<h1>/g, '<h1 class="text-3xl font-bold mb-2 dark:text-white">')
    .replace(/<h2>/g, '<h2 class="text-2xl font-bold mb-2 dark:text-white">')
    .replace(/<s>/g, '<s class="line-through dark:text-white">')
    .replace(/<u>/g, '<u class="underline dark:text-white">');

  // console.log(cleanHtml);

  return (
    <div
      className="dark:text-white"
      dangerouslySetInnerHTML={{ __html: parsedHtml }}
    />
  );
};

export default HtmlParser;
