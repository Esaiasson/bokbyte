import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BooksCard(props) {
    
    const book = props.book
    const BookNeeds = props.BookNeeds
    const BookHas = props.BookHas
    const addBookNeeds = props.addBookNeeds
    const addBookHas = props.addBookHas
    const removeBookNeeds = props.removeBookNeeds
    const removeBookHas = props.removeBookHas
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };


    return (
        <>
            <Card key={book.isbn} id={book.isbn} style={{ width: '10rem', margin: '20px' }}>
            <Card.Img variant="top" src={book.imagelink} fluid></Card.Img>
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                        {showFullText ? book.description : `${book.description.substr(0, 25)}...`}
                        <Button id="readMore" onClick={toggleText}>
                            {showFullText ? 'Visa mindre' : 'Läs mer'}
                        </Button>
                    </Card.Text>
                </Card.Body>
                {!BookNeeds.some(bookNeed => bookNeed.isbn === book.volumeInfo.industryIdentifiers[0].identifier) &&(
                    <Button variant="success" style={{margin: "10px"}} onClick={() => addBookNeeds(book.isbn, book.title)}>Vill ha boken</Button>
                )} 
                {BookNeeds.some(bookNeed => bookNeed.isbn === book.volumeInfo.industryIdentifiers[0].identifier)  &&(
                    <Button variant="danger" style={{margin: "10px"}} onClick={() => removeBookNeeds(book.isbn)}>Vill inte ha boken</Button>
                )}
                {!BookHas.some(bookHas => bookHas.isbn === book.volumeInfo.industryIdentifiers[0].identifier) &&(
                    <Button variant="primary" style={{margin: "10px"}} onClick={() => addBookHas(book.isbn, book.title)}>Har boken</Button>
                )} 
                {BookHas.some(bookHas => bookHas.isbn === book.volumeInfo.industryIdentifiers[0].identifier)  &&(
                    <Button variant="danger" style={{margin: "10px"}} onClick={() => removeBookHas(book.isbn)}>Har inte boken</Button>
                )}
            </Card>
        </>
    );
}

export default BooksCard;