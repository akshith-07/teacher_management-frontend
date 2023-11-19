import React, { useState } from "react";
// import "./EditTeacherComponent.css";
import "../DeleteTeacherComponent/DeleteTeacherComponent.css";
// You can create this CSS file for styling
import axios from "axios";
import { formatDateString } from "../DeleteTeacherComponent/DeleteTeacherComponent";

const EditTeacherComponent = () => {
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

  const validateTeacher = () => {
    axios
      .post("http://localhost:3500/api/v1/teachers/validate", {
        fullName: teacherInfo.fullName,
      })
      .then((response) => {
        if (response.data) {
          // Teacher exists, populate form with existing details
          setTeacherInfo(response.data);
        } else {
          alert(`No teacher found with the name ${teacherInfo.fullName}`);
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(
            `(Status : ${error.response.status}) ${error.response.data.message}`
          );
        }
      });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .patch("http://localhost:3500/api/v1/teachers", teacherInfo)
      .then((response) => {
        if (response.data.acknowledged === true) {
          alert(`${teacherInfo.fullName} is updated successfully`);
          window.location.href = "/";
        }
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
      <h2>Updating teachers</h2>

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

      <div>
        <button
          className="secondbutton"
          type="button"
          onClick={validateTeacher}
        >
          Check
        </button>
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
          value={formatDateString(dateOfBirth)}
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

      <div>
        <button type="submit" disabled={!fullName}>
          Update
        </button>
      </div>
    </form>
  );
};

export default EditTeacherComponent;
