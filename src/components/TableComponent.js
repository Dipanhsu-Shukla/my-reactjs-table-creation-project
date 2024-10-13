import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { addEntry, setEntries } from '../redux/dataSlice'; // Ensure this path is correct
import * as XLSX from "xlsx";

const TableComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.entries); // Change to 'entries' if needed
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Dummy names list
  const names = [
    "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack",
    // ... other names
  ];

  // Dummy data
  const dummyData = Array.from({ length: 100 }, (_, i) => ({
    ID: i + 1,
    Name: names[i % names.length],
    Email: `user${i + 1}@example.com`,
    Phone: `123-456-789${i % 10}`,
    Website: `www.example${i + 1}.com`,
    Industry: `Industry ${i % 5}`,
    Status: i % 2 === 0 ? "Active" : "Inactive",
    Remark: `Remark ${i + 1}`
  }));

  useEffect(() => {
    dispatch(setEntries(dummyData)); // Ensure this action exists in your dataSlice
    setFilteredData(dummyData);
  }, [dispatch]);

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const onSubmit = (formData) => {
    const newData = {
      ID: data.length + 1,
      ...formData,
    };
    dispatch(addEntry(newData)); // Ensure this action exists in your dataSlice
    reset();
  };

  // Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <div>
      <h1>Data Table</h1>
      <input type="text" placeholder="Search..." onChange={handleFilter} />
      <table>
        <thead>
          <tr>
            {Object.keys(dummyData[0]).map((column) => (
              <th key={column} onClick={() => handleSort(column)}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentEntries.length > 0 ? (
            currentEntries.map((entry) => (
              <tr key={entry.ID}>
                {Object.values(entry).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={Object.keys(dummyData[0]).length}>No entries found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handleDownload}>Download Excel</button>
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("Name", { required: "Name is required" })} placeholder="Name" />
          {errors.Name && <span>{errors.Name.message}</span>}
        </div>
        <div>
          <input
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
          />
          {errors.Email && <span>{errors.Email.message}</span>}
        </div>
        <div>
          <input {...register("Phone", { required: "Phone is required" })} placeholder="Phone" />
          {errors.Phone && <span>{errors.Phone.message}</span>}
        </div>
        <div>
          <input {...register("Website", { required: "Website is required" })} placeholder="Website" />
          {errors.Website && <span>{errors.Website.message}</span>}
        </div>
        <div>
          <input {...register("Industry", { required: "Industry is required" })} placeholder="Industry" />
          {errors.Industry && <span>{errors.Industry.message}</span>}
        </div>
        <div>
          <input {...register("Status", { required: "Status is required" })} placeholder="Status" />
          {errors.Status && <span>{errors.Status.message}</span>}
        </div>
        <div>
          <input {...register("Remark", { required: "Remark is required" })} placeholder="Remark" />
          {errors.Remark && <span>{errors.Remark.message}</span>}
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default TableComponent;
