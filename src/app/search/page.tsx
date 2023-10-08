"use client";

import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';




export default function Search(){

    const [keywords, setKeywords] = useState('');
    const [page, setPage] = useState(1);
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleInputChange = (e) => {
      setKeywords(e.target.value);
    };
  
    const handleSearch = () => {
      setPage(1); // Reset page to 1 when performing a new search
      fetchContacts();
    };

    const storeResponseInCookie = (data) => {
        // Store the API response in a cookie named 'contactData' for 30 seconds
        Cookies.set('contactData', data, { expires: 1 / 24 });
      };

    const fetchContacts = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/contacts/find?keywords=${keywords}&page=${page}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept' : 'application/json'
                },
            });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();



          setContacts(data.data.data);
          storeResponseInCookie(data.data.data);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        } finally {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        fetchContacts();
      }, [page]); // Fetch data whenever the page changes
    


    return (

        <div>
        <h1>Contact Search</h1>
        <div className="container mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter keywords"
            value={keywords}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className='container'>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Title</th>
                  {/* Add other table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td> {contact.title} </td>
                    {/* Render other contact details as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-primary"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    )
}