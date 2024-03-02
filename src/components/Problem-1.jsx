import React, { useEffect, useState } from "react";

const initialValue = { name: "", status: "" };

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [currentTask, setCurrentTask] = useState(initialValue);
  const [taskList, setTaskList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTaskList((prev) => [...prev, currentTask]);
    setCurrentTask(initialValue);
  };

  const sortTasksList = [...filteredList].sort((a, b) => {
    if (
      a.status.toLowerCase() === "active" &&
      b.status.toLowerCase() !== "active"
    )
      return -1;
    if (
      a.status.toLowerCase() === "completed" &&
      b.status.toLowerCase() !== "active" &&
      b.status.toLowerCase() !== "completed"
    )
      return -1;
    if (
      b.status.toLowerCase() === "active" &&
      a.status.toLowerCase() !== "active"
    )
      return 1;
    if (
      b.status.toLowerCase() === "completed" &&
      a.status.toLowerCase() !== "active" &&
      a.status.toLowerCase() !== "completed"
    )
      return 1;
    return a.status.toLowerCase().localeCompare(b.status.toLowerCase());
  });

  useEffect(() => {
    if (show === "all") {
      setFilteredList([...taskList]);
    } else if (show === "active") {
      setFilteredList(
        [...taskList].filter((task) => task.status.toLowerCase() === "active")
      );
    } else if (show === "completed") {
      setFilteredList(
        [...taskList].filter(
          (task) => task.status.toLowerCase() === "completed"
        )
      );
    } else {
      setFilteredList([...taskList]);
    }
  }, [show, taskList]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={currentTask.name}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, name: e.target.value })
                }
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={currentTask.status}
                onChange={(e) =>
                  setCurrentTask({ ...currentTask, status: e.target.value })
                }
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortTasksList?.map((task, index) => {
                return (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
