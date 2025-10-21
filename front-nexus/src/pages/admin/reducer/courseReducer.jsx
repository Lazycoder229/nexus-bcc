export const initialState = {
  courses: [
    {
      id: 1,
      code: "HC1",
      title: "Intro to Programming",
      type: "Major",
      departmentId: 1,
      status: "Active",
      units: 222,
      students: 50,
      prerequisites: ["PrAHAJSHJA"], // <-- default
    },
  ],
  departments: [
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Mathematics" },
  ],
  selectedCourse: null,
};

// Helper for unique IDs
const getNextId = (items) =>
  items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;

export function courseReducer(state, action) {
  switch (action.type) {
    case "ADD_COURSE": {
      const newCourse = { id: getNextId(state.courses), ...action.payload };
      return {
        ...state,
        courses: [...state.courses, newCourse],
      };
    }

    case "EDIT_COURSE": {
      const updatedCourses = state.courses.map((c) =>
        c.id === action.payload.id ? action.payload : c
      );
      return {
        ...state,
        courses: updatedCourses,
      };
    }

    case "DELETE_COURSE": {
      const updatedCourses = state.courses.filter(
        (c) => c.id !== action.payload.id
      );
      return {
        ...state,
        courses: updatedCourses,
      };
    }

    default:
      return state;
  }
}
