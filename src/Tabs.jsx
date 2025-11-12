import React, { useState } from "react";

function Tabs() {
  // Define all tab items and their content dynamically
  const tabs = [
    { id: 1, label: "Home", content: "Welcome to the Home tab content!" },
    { id: 2, label: "Profile", content: "This is your Profile tab content." },
    { id: 3, label: "Settings", content: "Adjust your preferences in Settings." },
    { id: 4, label: "About", content: "This tab contains information about us." },
  ];

  const [activeTab, setActiveTab] = useState(1); // Default active tab

  return (
    <div className="w-full px-8 mx-auto mt-10 h-screen">
      {/* Tabs Header */}
      <div className="flex border-b my-10 border-gray-300 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-center font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="p-4 bg-white border mt-10 h-full border-gray-200 rounded-3xl shadow-sm">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="text-gray-700">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Tabs;
