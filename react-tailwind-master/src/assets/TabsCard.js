import React, { useState } from "react";

function TabbedContent() {
  const [activeTab, setActiveTab] = useState("about"); // Initialize the active tab state

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Tab buttons */}
      <ul
        className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
        role="tablist"
      >
        <li className="mr-2">
          <button
            onClick={() => handleTabClick("about")}
            type="button"
            role="tab"
            aria-controls="about"
            aria-selected={activeTab === "about"}
            className={`inline-block p-4 rounded-tl-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700  ${
              activeTab === "about"
                ? "bg-gray-100 dark:bg-gray-700 dark:text-blue-500 text-blue-600"
                : ""
            }`}
          >
            About
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => handleTabClick("services")}
            type="button"
            role="tab"
            aria-controls="services"
            aria-selected={activeTab === "services"}
            className={`inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${
              activeTab === "services"
                ? "bg-gray-100 dark:bg-gray-700 dark:text-blue-500 text-blue-600"
                : ""
            }`}
          >
            Services
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={() => handleTabClick("statistics")}
            type="button"
            role="tab"
            aria-controls="statistics"
            aria-selected={activeTab === "statistics"}
            className={`inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ${
              activeTab === "statistics"
                ? "bg-gray-100 dark:bg-gray-700 dark:text-blue-500 text-blue-600"
                : ""
            }`}
          >
            Facts
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div id="defaultTabContent">
        <div
          className={`${
            activeTab === "about" ? "" : "hidden"
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          About
          {/* About content */}
          {/* ... */}
        </div>
        <div
          className={`${
            activeTab === "services" ? "" : "hidden"
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          id="services"
          role="tabpanel"
          aria-labelledby="services-tab"
        >
          Services
          {/* Services content */}
          {/* ... */}
        </div>
        <div
          className={`${
            activeTab === "statistics" ? "" : "hidden"
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          id="statistics"
          role="tabpanel"
          aria-labelledby="statistics-tab"
        >
          Statistics
          {/* Statistics content */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
}

export default TabbedContent;
