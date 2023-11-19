import React, { useState, useEffect } from "react";
import TeacherComponent from "./TeacherComponent";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GetAllTeachersComponent.css";

import axios from "axios";

const GetAllTeachersComponent = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [classesFilter, setClassesFilter] = useState("");
  const [averageClasses, setAverageClasses] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://teacher-management-backend-omega.vercel.app/api/v1/teachers`
      )
      .then((response) => {
        setTeachers(response.data);
        calculateAverage(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const calculateAverage = (teachersData) => {
    const totalClasses = teachersData.reduce(
      (sum, teacher) => sum + teacher.numOfClasses,
      0
    );
    const average =
      teachersData.length > 0 ? totalClasses / teachersData.length : 0;
    setAverageClasses(parseInt(average));
  };

  const applyFilters = () => {
    let filteredTeachers = teachers;

    filteredTeachers = filteredTeachers.filter((teacher) =>
      teacher.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (ageFilter) {
      const [minAge, maxAge] = ageFilter.split("-");
      if (minAge === "60") {
        filteredTeachers = filteredTeachers.filter(
          (teacher) => teacher.age >= parseInt(minAge, 10)
        );
      } else {
        filteredTeachers = filteredTeachers.filter(
          (teacher) =>
            teacher.age >= parseInt(minAge, 10) &&
            teacher.age <= parseInt(maxAge, 10)
        );
      }
    }

    if (classesFilter) {
      const [minClasses, maxClasses] = classesFilter.split("-");
      if (minClasses === "20") {
        filteredTeachers = filteredTeachers.filter(
          (teacher) => teacher.numOfClasses >= parseInt(minClasses, 10)
        );
      } else {
        filteredTeachers = filteredTeachers.filter(
          (teacher) =>
            teacher.numOfClasses >= parseInt(minClasses, 10) &&
            teacher.numOfClasses <= parseInt(maxClasses, 10)
        );
      }
    }

    return filteredTeachers;
  };

  return (
    <div className="teachers">
      <Form>
        <InputGroup className="mb-3">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teachers by name"
          />
        </InputGroup>

        <div className="i-container">
          <InputGroup className="mb-3 i-cont mr-n3" id="gap">
            <Form.Label>Filter by Age:</Form.Label>
            <div>
              <Form.Select onChange={(e) => setAgeFilter(e.target.value)}>
                <option value="">All Ages</option>
                <option value="20-30">20-30 years old</option>
                <option value="30-40">30-40 years old</option>
                <option value="40-50">40-50 years old</option>
                <option value="50-60">50-60 years old</option>
                <option value="60-">60 years old or older</option>
              </Form.Select>
            </div>
          </InputGroup>

          <InputGroup className="mb-3 i-cont">
            <Form.Label>Filter by Number of Classes:</Form.Label>
            <div className="selectfilter">
              <Form.Select onChange={(e) => setClassesFilter(e.target.value)}>
                <option value="">All Classes</option>
                <option value="1-5">1-5 classes</option>
                <option value="5-10">5-10 classes</option>
                <option value="10-15">10-15 classes</option>
                <option value="15-20">15-20 classes</option>
                <option value="20-">20 classes or more</option>
              </Form.Select>
            </div>
          </InputGroup>
        </div>
      </Form>
      <br />
      <div>
        <p style={{ color: "aqua", fontSize: "1.5rem", textAlign: "center" }}>
          Average Number of Classes: {averageClasses}
        </p>
      </div>
      <br />
      <br />
      <div className="list-container">
        {applyFilters().map((teacher, index) => (
          <TeacherComponent teacher={teacher} key={index} />
        ))}
      </div>
    </div>
  );
};

export default GetAllTeachersComponent;
