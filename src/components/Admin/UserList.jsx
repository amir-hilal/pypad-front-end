import React, { useEffect, useState } from 'react';
import "../../assets/css/user-list.css"
import { createUser, getAllUsers } from '../../services/AdminService';
import Papa from 'papaparse'; // For CSV parsing
import * as XLSX from 'xlsx'; // For Excel parsing

function UserList() {
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  useEffect(() => {
    const getUsers = async()=>{
        const usersList = await getAllUsers();
        setUsers(usersList.data)
    }
    getUsers()
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateData = (data) => {
    const errorMessages = [];
    let errorUsers = [];
    const uniqueEmails = new Set();
    let user = [];
    data.forEach((row, index) => {
      const { username, email, password,first_name,last_name } = row;
      if (!username || !email || !password) {
        errorMessages.push(`Row ${index + 1}: Missing required fields.`);
        errorUsers.push({ username, email, password,first_name,last_name })
      }
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        errorMessages.push(`Row ${index + 1}: Invalid email format.`);
        errorUsers.push({ username, email, password,first_name,last_name })
      }
      if (email && uniqueEmails.has(email)) {
        errorMessages.push(`Row ${index + 1}: Duplicate email found (${email}).`);
        errorUsers.push({ username, email, password,first_name,last_name })
      }
      uniqueEmails.add(email);
      user.push({ username, email, password,first_name,last_name })
    //   console.log(user);
    });

    return user;
  };

  const handleFileUpload = async() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      if (file.type.includes('excel') || file.type.includes('spreadsheet')) {
        console.log('before')
        const workbook = XLSX.read(fileContent, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const data = validateData(worksheet);
        if (data.length) {
        console.log(data);
        data.forEach(async ({username, email, password,first_name,last_name})=>{
            try {
                const request = await createUser(username, email, password,first_name,last_name)
                console.log(request);
            } catch (error) {
                console.log(error);
            }
        })
        } else {
            console.log("something went wrong");
        }
      }
    };

    if (file.type === 'text/csv') {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };


  return (
    <div className="dashboard-container min-h-75">
    <h1>Import Users</h1>
      <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>

      <h1>Admin Dashboard</h1>
      <h2>All Users</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserName</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
