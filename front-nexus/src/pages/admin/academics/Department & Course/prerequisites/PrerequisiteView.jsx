// src/pages/course/prerequisites/PrerequisiteView.js
import React from "react";

export default function PrerequisiteView({ prerequisite, closeModal }) {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-3">View Prerequisite</h2>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Code: </span>
          {prerequisite.code}
        </p>
        <p>
          <span className="font-semibold">Title: </span>
          {prerequisite.title}
        </p>
        <p>
          <span className="font-semibold">Status: </span>
          {prerequisite.status}
        </p>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={closeModal}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
