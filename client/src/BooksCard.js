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
                <Card key={book.isbn} id={book.isbn} className='booksCard'>
                <Card.Img className='cardImage' variant="top" src={book.imagelink} fluid></Card.Img>
                    <Card.Body>
                        <Card.Title className='cardTitle'>{book.title}</Card.Title>
                        <Card.Text>
                            <Button id="readMore" onClick={toggleText}>
                                {showFullText ? 'Visa mindre' : 'Läs mer'}
                            </Button>
                        </Card.Text>
                    </Card.Body>
                    {!BookNeeds.some(bookNeed => bookNeed.isbn === book.isbn) &&(
                        <Button className='button' variant="warning" onClick={() => addBookNeeds(book.isbn, book.title)}>Vill ha boken</Button>
                    )} 
                    {BookNeeds.some(bookNeed => bookNeed.isbn === book.isbn)  &&(
                        <Button className='button' variant="danger" onClick={() => removeBookNeeds(book.isbn)}>Vill ha boken</Button>
                    )}
                    {!BookHas.some(bookHas => bookHas.isbn === book.isbn) &&(
                        <Button className='button' variant="primary" onClick={() => addBookHas(book.isbn, book.title)}>Äger boken</Button>
                    )} 
                    {BookHas.some(bookHas => bookHas.isbn === book.isbn)  &&(
                        <Button className='button' variant="danger" onClick={() => removeBookHas(book.isbn)}>Äger boken</Button>
                    )}
                </Card>

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