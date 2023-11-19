import React, { useState } from "react";
import "./DeleteTeacherComponent.css";
import axios from "axios";

export const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", {
    month: "2-digit",
  });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return [year, month, day].join("-");
};

const DeleteTeacherComponent = () => {
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

  const fullNameValidator = () => {
    axios
      .post(
        "https://teacher-management-backend-omega.vercel.app/api/v1/teachers/validate",
        {
          fullName: teacherInfo.fullName,
        }
      )
      .then((response) => {
        setTeacherInfo({
          fullName: response.data.fullName,
          age: response.data.age,
          dateOfBirth: response.data.dateOfBirth,
          numOfClasses: response.data.numOfClasses,
        });
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
      .delete(
        "https://teacher-management-backend-omega.vercel.app/api/v1/teachers",
        { data: teacherInfo }
      )
      .then((response) => {
        if (response.data.acknowledged === true) {
          alert(`${teacherInfo.fullName} is deleted successfully`);
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
      <h2>Delete teacher</h2>

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
          onClick={fullNameValidator}
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
        <button type="submit">Delete</button>
      </div>
    </form>
  );
};

export default DeleteTeacherComponent;
