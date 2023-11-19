import React, { useState } from "react";
import "./AddNewTeacherComponent.css";
import axios from "axios";

const AddNewTeacherComponent = () => {
  const [teacherInfo, setTeacherInfo] = useState({
    fullName: "",
    age: "",
    dateOfBirth: "",
    numOfClasses: "",
  });

  const fullNameHandler = (event) => {
    setTeacherInfo({
      ...teacherInfo,
      fullName: event.target.value,
    });
  };

  const ageHandler = (event) => {
    setTeacherInfo({
      ...teacherInfo,
      age: event.target.value,
    });
  };

  const dateOfBirthHandler = (event) => {
    setTeacherInfo({
      ...teacherInfo,
      dateOfBirth: event.target.value,
    });
  };

  const numOfClassesHandler = (event) => {
    setTeacherInfo({
      ...teacherInfo,
      numOfClasses: event.target.value,
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .post(
        `https://teacher-management-backend-omega.vercel.app/api/v1/teachers/`,
        teacherInfo
      )
      .then((response) => {
        console.log(response);
        alert(`${response.data.fullName} is added successfully.`);
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response) {
          alert(
            `(Status : ${error.response.status}) ${error.response.data.message}`
          );
        }
      });
  };

  const { fullName, age, dateOfBirth, numOfClasses } = teacherInfo;

  return (
    <form className="form-container" onSubmit={formSubmitHandler}>
      <h2>Adding a new teacher</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter the full name"
          value={fullName}
          onChange={fullNameHandler}
          required
        />
      </div>

      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          placeholder="Enter the age"
          value={age}
          onChange={ageHandler}
          required
        />
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          placeholder="Enter the date of birth"
          value={dateOfBirth}
          onChange={dateOfBirthHandler}
          required
        />
      </div>

      <div className="form-group">
        <label>Number of Classes</label>
        <input
          type="number"
          placeholder="Enter the number of classes"
          value={numOfClasses}
          onChange={numOfClassesHandler}
          required
        />
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

export default AddNewTeacherComponent;
