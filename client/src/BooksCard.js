import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import './ApiFetch.css'
import Modal from 'react-bootstrap/Modal';

function BooksCard(props) {
    
    const book = props.book
    const BookNeeds = props.BookNeeds
    const BookHas = props.BookHas
    const addBookNeeds = props.addBookNeeds
    const addBookHas = props.addBookHas
    const removeBookNeeds = props.removeBookNeeds
    const removeBookHas = props.removeBookHas
    const [showFullText, setShowFullText] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);



    const toggleText = () => {
        setShow(!show)
    }; 


    return (
        <>
            <div>
                <Card key={book.isbn} id={book.isbn} style={{ width: '10rem', margin: '20px', minHeight: '550px'}}>
                <Card.Img variant="top" src={book.imagelink} fluid></Card.Img>
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                            <Button id="readMore" onClick={toggleText}>
                                {showFullText ? 'Visa mindre' : 'Läs mer'}
                            </Button>
                        </Card.Text>
                    </Card.Body>
                    {!BookNeeds.some(bookNeed => bookNeed.isbn === book.isbn) &&(
                        <Button variant="success" style={{margin: "10px"}} onClick={() => addBookNeeds(book.isbn, book.title)}>Vill ha boken</Button>
                    )} 
                    {BookNeeds.some(bookNeed => bookNeed.isbn === book.isbn)  &&(
                        <Button variant="danger" style={{margin: "10px"}} onClick={() => removeBookNeeds(book.isbn)}>Vill ha boken</Button>
                    )}
                    {!BookHas.some(bookHas => bookHas.isbn === book.isbn) &&(
                        <Button variant="primary" style={{margin: "10px"}} onClick={() => addBookHas(book.isbn, book.title)}>Har boken</Button>
                    )} 
                    {BookHas.some(bookHas => bookHas.isbn === book.isbn)  &&(
                        <Button variant="danger" style={{margin: "10px"}} onClick={() => removeBookHas(book.isbn)}>Har boken</Button>
                    )}
                </Card>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{book.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{book.description}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Stäng
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BooksCard;