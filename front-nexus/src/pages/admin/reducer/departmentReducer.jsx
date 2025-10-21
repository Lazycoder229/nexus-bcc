// src/reducer/departmentReducer.js

export const initialState = {
  departments: [
    {
      code: "CS",
      name: "Computer Science",
      head: "Dr. Smith",
      faculty: 10,
      programs: 5,
      status: "Active",
      description: "Handles programming and AI.",
    },
    {
      code: "ENG",
      name: "BSIT",
      head: "Dr. Brown",
      faculty: 12,
      programs: 4,
      status: "Active",
      description: "Engineering division.",
    },
  ],
  selected: null, // 👈 for "view" or "edit"
};

export function departmentReducer(state, action) {
  switch (action.type) {
    // 🔹 Add Department
    case "ADD_DEPARTMENT":
      return {
        ...state,
        departments: [...state.departments, action.payload],
      };

    // 🔹 Edit Department
    case "EDIT_DEPARTMENT":
      return {
        ...state,
        departments: state.departments.map((dep) =>
          dep.code === action.payload.code ? action.payload : dep
        ),
        selected: null,
      };

    // 🔹 Delete Department
    case "DELETE_DEPARTMENT":
      return {
        ...state,
        departments: state.departments.filter(
          (dep) => dep.code !== action.payload.code
        ),
      };

    // 🔹 View Department
    case "VIEW_DEPARTMENT":
      return {
        ...state,
        selected: action.payload, // save the viewed department
      };

    // 🔹 Clear Selected (close view)
    case "CLEAR_SELECTED":
      return {
        ...state,
        selected: null,
      };

    default:
      return state;
  }
}
