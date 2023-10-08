"use client";

import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';



export default function Home() {

  
  // useEffect(() => {
  //   // This code will run when the component mounts
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:8000/titles');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const jsonData = await response.json();
  //       setData(jsonData);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []); // The empty dependency array ensures this effect runs only once when the component mounts


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {


      const response = await fetch('http://127.0.0.1:8000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.status == 201) {
        console.log('Form submitted successfully.');
        // You can perform further actions here on a successful submission
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (

    <div className="container">
    <h1>Contact Form</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="department" className="form-label">
          Department
        </label>
        <select
          className="form-select"
          id="title_id"
          name="title_id"
          value={formData.title_id}
          onChange={handleChange}
        >
          <option value="1" selected>CEO</option>
          <option value="2">CTO</option>
          <option value="3">CIO</option>
          <option value="4">DEV</option>
          <option value="5">MNG</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
  )
}
function setData(jsonData: any) {
  throw new Error('Function not implemented.');
}

function setError(error: unknown) {
  throw new Error('Function not implemented.');
}

function setIsLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

