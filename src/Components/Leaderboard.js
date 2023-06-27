import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [students, setStudents] = useState([]);
  const SPREADSHEET_ID = "1s4IKy6gO19sTnE8uxd4i6wJGs-XlAaq2psPvFvMEoCs";
  const RANGE = "LeaderBoard!A2:D";
  const API_KEY = "AIzaSyC89H0IcqZVTPdIGTGK3D8ocqR7LWGoRjk";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );

        const data = response.data.values;
        // const headers = data[0];
        // const studentRows = data.slice(1);
        // console.log(data.slice(1));

        // const students = studentRows.map((row) => {
        //   const student = {};

        //   headers.forEach((header, index) => {
        //     student[header] = row[index];
        //   });

        //   return student;
        // });

        // setStudents(students);

        const students = data.map((row) => {
          const student = {
            studentId: row[0],
            studentName: row[1],
            totalMarks: row[2],
          };

          return student;
        });

        setStudents(students);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-5">Leaderboard</h1>
      <table className="table table-bordered table-striped mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Rank</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className={index < 3 ? "ranked-row" : ""}>
              <td
                className={
                  index < 3 && index === 0
                    ? "golden"
                    : index === 1
                    ? "silver"
                    : "bronze"
                }
              >
                {index < 3 && (
                  <span
                    className={
                      index === 1 ? "golden" : index === 2 ? "silver" : "bronze"
                    }
                  ></span>
                )}
                {index + 1}
              </td>
              <td className="makeCenter">{student.studentId}</td>
              <td>{student.studentName}</td>
              <td className="makeCenter">{student.totalMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
