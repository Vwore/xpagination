import { use, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [page, setPage] = useState(0);
  const [employee, setEmployee] = useState([]);
  const [filterEmployee, setFilterEmployee] = useState([]);

  async function fetchEmployee() {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setEmployee(response.data);
      setPage(1);
    } catch (e) {
      console.log(e);
      alert("failed to fetch data");
    }
  }

  function handlePage(page) {
    if (page < 1 || page > Math.ceil(employee.length / 10)) return;
    setPage(page);
  }

  useEffect(() => {
    fetchEmployee();
  }, []);
  useEffect(() => {
    const arr = employee.filter(
      (val, index) => index >= (page - 1) * 10 && index < page * 10
    );
    console.log(arr, page);
    setFilterEmployee(arr);
  }, [page]);
  return (
    <div className="App">
      <div className="heading">
        <h1>Employee Data Table</h1>
      </div>
      <table className="table">
        <tr className="table-head">
          <th className="head-cell">ID</th>
          <th className="head-cell"> Name</th>
          <th className="head-cell">Email</th>
          <th className="head-cell">Role</th>
        </tr>
        {filterEmployee.map((value) => (
          <tr>
            <td className="row-cell">{value.id}</td>
            <td className="row-cell">{value.name}</td>
            <td className="row-cell">{value.email}</td>
            <td className="row-cell">{value.role}</td>
          </tr>
        ))}
      </table>
      <div className="pagination">
        <button
          className="btn"
          onClick={() => {
            handlePage(page - 1);
          }}
        >
          Previous
        </button>
        <div className="btn">{page}</div>
        <button
          className="btn"
          onClick={() => {
            handlePage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
