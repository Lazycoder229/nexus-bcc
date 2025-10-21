import React from "react";

export default function DeleteConfirmationModal({
  itemName = "this item",
  onConfirm,
  onCancel,
}) {
  return (
    <div className="p-4 text-center">
      <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
      <p className="text-sm text-gray-600 mb-4">
        Are you sure you want to delete{" "}
        <span className="font-medium">{itemName}</span>?
      </p>
      <div className="flex justify-center gap-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
