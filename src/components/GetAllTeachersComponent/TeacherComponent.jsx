import React from "react";
import { formatDateString } from "../DeleteTeacherComponent/DeleteTeacherComponent";

const TeacherComponent = ({ teacher }) => {
  return (
    <div>
      <div className="card">
        <div className="text-container">
          <h3 className="fullname">{teacher.fullName}</h3>
          <p className="status">Age: {teacher.age}</p>
          <p className="status">Number of Classes: {teacher.numOfClasses}</p>
          <p className="dob">
            Date of Birth: {formatDateString(teacher.dateOfBirth)}
          </p>
        </div>
      </div>
      <br />
    </div>
  );
};

export default TeacherComponent;
