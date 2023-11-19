import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GetAllTeachersComponent from "./components/GetAllTeachersComponent/GetAllTeachersComponent";
import AddNewTeacherComponent from "./components/AddNewTeacherComponent/AddNewTeacherComponent";
import EditTeacherComponent from "./components/EditTeacherComponent/EditTeacherComponent";
import DeleteTeacherComponent from "./components/DeleteTeacherComponent/DeleteTeacherComponent";

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="header">TEACHER MANAGEMENT APPLICATION</h1>

        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/admin/add">Add Teacher</Link>
          <Link to="/admin/edit">Edit Teacher</Link>
          <Link to="/admin/delete">Delete Teacher</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<GetAllTeachersComponent />}></Route>
          <Route path="/admin/add" element={<AddNewTeacherComponent />}></Route>
          <Route path="/admin/edit" element={<EditTeacherComponent />}></Route>
          <Route
            path="/admin/delete"
            element={<DeleteTeacherComponent />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
