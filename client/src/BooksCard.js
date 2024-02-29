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

    console.log(BookNeeds)
    return (
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
    );
}

export default BooksCard;