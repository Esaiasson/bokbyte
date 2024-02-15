import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './ApiFetch.css'

function ApiFetch() {
    const API_KEY = process.env.REACT_APP_API_KEY;

    const [bookData, setBookData] = useState([]);
    const [BookNeeds, setBookNeeds] = useState([])
    const [BookHas, setBookHas] = useState([])




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

    const addBookNeeds = (isbn) => {
        setBookNeeds(  [...BookNeeds, isbn])
    }

    const addBookHas = (isbn) => {
        setBookHas(  [...BookHas, isbn])
    }

    const removeBookNeeds = (isbn) => {
        setBookNeeds(oldValues => {
            return oldValues.filter(book => book !== isbn)
        })
    }

    const removeBookHas = (isbn) => {
        setBookHas(oldValues => {
            return oldValues.filter(book => book !== isbn)
        })
    }

    useEffect(() => {
        console.log(BookNeeds)
    }, [BookNeeds])

    useEffect(() => {
        console.log(BookHas)
    }, [BookHas])



  return (
    <div className="App">
        <button onClick={callApi}>kalla</button>
        <div id="booksDiv">
            {bookData.map((book, index) => (
                <>
                    <Card key={book.volumeInfo.industryIdentifiers[0].identifier} id={book.volumeInfo.industryIdentifiers[0].identifier} style={{ width: '10rem', margin: '20px' }}>
                    <Card.Img variant="top" src={book.volumeInfo.imageLinks.smallThumbnail} fluid></Card.Img>
                        <Card.Body>
                            <Card.Title>{book.volumeInfo.title}</Card.Title>
                            <Card.Text>{book.volumeInfo.description.substr(0,25)}...<Button id="readMore">Läs mer</Button></Card.Text>
                        </Card.Body>
                        {BookNeeds.includes(book.volumeInfo.industryIdentifiers[0].identifier) === false &&(
                            <Button variant="success" style={{margin: "10px"}} onClick={() => addBookNeeds(book.volumeInfo.industryIdentifiers[0].identifier)}>Vill ha boken</Button>
                        )} 
                        {BookNeeds.includes(book.volumeInfo.industryIdentifiers[0].identifier) &&(
                            <Button variant="danger" style={{margin: "10px"}} onClick={() => removeBookNeeds(book.volumeInfo.industryIdentifiers[0].identifier)}>Vill inte ha boken</Button>
                        )}
                        {BookHas.includes(book.volumeInfo.industryIdentifiers[0].identifier) === false &&(
                            <Button variant="primary" style={{margin: "10px"}} onClick={() => addBookHas(book.volumeInfo.industryIdentifiers[0].identifier)}>Har boken</Button>
                        )} 
                        {BookHas.includes(book.volumeInfo.industryIdentifiers[0].identifier) &&(
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