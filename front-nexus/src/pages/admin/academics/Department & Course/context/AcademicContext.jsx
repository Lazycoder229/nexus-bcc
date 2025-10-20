// /src/modules/academics/context/AcademicContext.jsx
import React, { createContext, useContext, useState } from "react";

const AcademicContext = createContext();

export const AcademicProvider = ({ children }) => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Information Technology", head: "Dr. Cruz" },
    { id: 2, name: "Business Administration", head: "Prof. Santos" },
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "IT101",
      title: "Intro to Programming",
      deptId: 1,
      units: 3,
    },
    { id: 2, code: "BA201", title: "Marketing Basics", deptId: 2, units: 2 },
  ]);

  const [academicYears, setAcademicYears] = useState([
    { id: 1, year: "2025-2026", semesters: ["1st Sem", "2nd Sem"] },
  ]);

  const addDepartment = (dept) =>
    setDepartments([...departments, { ...dept, id: Date.now() }]);
  const addCourse = (course) =>
    setCourses([...courses, { ...course, id: Date.now() }]);
  const updateCourse = (id, data) =>
    setCourses(courses.map((c) => (c.id === id ? { ...c, ...data } : c)));
  const deleteCourse = (id) => setCourses(courses.filter((c) => c.id !== id));

  return (
    <AcademicContext.Provider
      value={{
        departments,
        courses,
        academicYears,
        addDepartment,
        addCourse,
        updateCourse,
        deleteCourse,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademics = () => useContext(AcademicContext);
