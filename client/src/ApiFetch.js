import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './ApiFetch.css'



function ApiFetch() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/books")
          .then((res) => res.json())
          .then((data) => console.log(data));
      }, []);

    const API_KEY = process.env.REACT_APP_API_KEY;

    const [bookData, setBookData] = useState([]);
    const [BookNeeds, setBookNeeds] = useState([])
    const [BookHas, setBookHas] = useState([])
    const [email, setEmail] = useState([])
    const [location, setLocation] = useState([])


    const postUserResponse = (e) => {
        e.preventDefault();
        //const booksNeeds = { booksNeeds };
        //const booksHas = { booksHas };
        const email = 'test';
        const location = 'GBG';
        const body = {
            //'needs': booksNeeds,
            //'has': booksHas,
            'email': email,
            'location': location
        }
        console.log(body)
        fetch("/userResponse", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        
    }

    const callApi = () => {
        const isbnNumbers = [9789100185589, 9789100802028];

        const apiRequests = isbnNumbers.map(isbn => {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${API_KEY}`;
        return fetch(apiUrl)
            .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then(data => data.items[0]); // Extract the first item from the response
        });

        Promise.all(apiRequests)
        .then(results => {
            setBookData(results);
        })
        .catch(error => console.error('Error:', error));
    };

    const addBookNeeds = (isbn, title) => {
        const newBook = {'isbn': isbn, 'title': title}
        setBookNeeds(  [...BookNeeds, newBook])
    }

    const addBookHas = (isbn, title) => {
        const newBook = {'isbn': isbn, 'title': title}
        setBookHas(  [...BookHas, newBook])
    }

    const removeBookNeeds = (isbn) => {
        setBookNeeds(oldValues => {
            return oldValues.filter(book => book.isbn !== isbn)
        })
    }

    const removeBookHas = (isbn) => {
        setBookHas(oldValues => {
            return oldValues.filter(book => book.isbn !== isbn)
        })
    }

  return (
    <div>
        <button onClick={callApi}>kalla</button>
        <button onClick={postUserResponse}>submit</button>
        <div>
            <h2>Böcker du vill ha</h2>
            {BookNeeds.map((book, index) => (
                <p key={index}>{book.title}</p>
            ))}
            <h2>Böcker du har</h2>
            {BookHas.map((book, index) => (
                <p key={index}>{book.title}</p>
            ))}
        </div>
        <div id="booksDiv">
            {bookData.map((book, index) => (
                <>
                    <Card key={book.volumeInfo.industryIdentifiers[0].identifier} id={book.volumeInfo.industryIdentifiers[0].identifier} style={{ width: '10rem', margin: '20px' }}>
                    <Card.Img variant="top" src={book.volumeInfo.imageLinks.smallThumbnail} fluid></Card.Img>
                        <Card.Body>
                            <Card.Title>{book.volumeInfo.title}</Card.Title>
                            <Card.Text>{book.volumeInfo.description.substr(0,25)}...<Button id="readMore">Läs mer</Button></Card.Text>
                        </Card.Body>
                        {!BookNeeds.some(bookNeed => bookNeed.isbn === book.volumeInfo.industryIdentifiers[0].identifier) &&(
                            <Button variant="success" style={{margin: "10px"}} onClick={() => addBookNeeds(book.volumeInfo.industryIdentifiers[0].identifier, book.volumeInfo.title)}>Vill ha boken</Button>
                        )} 
                        {BookNeeds.some(bookNeed => bookNeed.isbn === book.volumeInfo.industryIdentifiers[0].identifier)  &&(
                            <Button variant="danger" style={{margin: "10px"}} onClick={() => removeBookNeeds(book.volumeInfo.industryIdentifiers[0].identifier)}>Vill inte ha boken</Button>
                        )}
                        {!BookHas.some(bookHas => bookHas.isbn === book.volumeInfo.industryIdentifiers[0].identifier) &&(
                            <Button variant="primary" style={{margin: "10px"}} onClick={() => addBookHas(book.volumeInfo.industryIdentifiers[0].identifier, book.volumeInfo.title)}>Har boken</Button>
                        )} 
                        {BookHas.some(bookHas => bookHas.isbn === book.volumeInfo.industryIdentifiers[0].identifier)  &&(
                            <Button variant="danger" style={{margin: "10px"}} onClick={() => removeBookHas(book.volumeInfo.industryIdentifiers[0].identifier)}>Har inte boken</Button>
                        )}
                    </Card>

                </>
            ))}
        </div>
    </div>
  );
}

export default ApiFetch;