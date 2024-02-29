import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuid } from 'uuid'
import './ApiFetch.css'
import BooksCard from './BooksCard';



function ApiFetch() {

    const [data, setData] = React.useState(null);

    const API_KEY = process.env.REACT_APP_API_KEY;

    const [bookData, setBookData] = useState([]);
    const [BookNeeds, setBookNeeds] = useState([])
    const [BookHas, setBookHas] = useState([])
    const [email, setEmail] = useState([])
    const [location, setLocation] = useState([])
    const [booksInDb, setBooksInDb] = useState([])
    const [booksCat1, setBooksCat1] = useState([])
    const [booksCat2, setBooksCat2] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const showForm = () => {
        handleShow();
    }

    useEffect(() => {
        if (localStorage.getItem("session_id") === null){
            localStorage.setItem("session_id", uuid());
        }
    }, []);

    useEffect(() => {
        getBooks();
    }, []);

    useEffect(() => {
        if(booksInDb.length >= 1){
            callApi(1)
            callApi(2)
        }
    }, [booksInDb]);

    const postUserResponse = (e) => {
        e.preventDefault();
        const body = {
            'needs': BookNeeds,
            'has': BookHas,
            'email': email,
            'location': location,
            'sessionId': localStorage.getItem("session_id")
        }
        fetch("/userResponse", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        
    }

    const callApi = (category) => {
        
        const books = []

        booksInDb.forEach(book => {
            if(book.category == category)
            books.push(parseInt(book.isbn))
        })

        const apiRequests = books.map(book => {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${book}&key=${API_KEY}`;
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
            if (category === 1){
                setBooksCat1(results);
            }
            if (category === 2){
                setBooksCat2(results);
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const getBooks = async () => {
        const booksArray = []
        const response = await fetch("/books")
        const books = await response.json()
        books.forEach(element => {
            booksArray.push(
                {
                    'isbn': element.isbn,
                    'category': element.category
                }
            )
        });
        await setBooksInDb(booksArray)
    }

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

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangeLocation = (event) => {
        setLocation(event.target.value);
    }


  return (
    <div>
        <button>kalla</button>
        <Button variant="success" size="lg" id="submit" onClick={showForm}>Skicka svar</Button>
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
            <h2>Kategori 1</h2>
            <div class="categoryDiv">
                {booksCat1.map((book, index) => (
                    <BooksCard
                        book = {book}
                        BookNeeds = {BookNeeds}
                        BookHas = {BookHas}
                        addBookNeeds = {addBookNeeds}
                        addBookHas = {addBookHas}
                        removeBookNeeds = {removeBookNeeds}
                        removeBookHas = {removeBookHas}
                    ></BooksCard>
                ))}
            </div>
            <h2>Kategori 2</h2>
            <div class="categoryDiv">
                {booksCat2.map((book, index) => (
                    <BooksCard
                        book = {book}
                        BookNeeds = {BookNeeds}
                        BookHas = {BookHas}
                        addBookNeeds = {addBookNeeds}
                        addBookHas = {addBookHas}
                        removeBookNeeds = {removeBookNeeds}
                        removeBookHas = {removeBookHas}
                    ></BooksCard>
                ))}
            </div>
        </div>
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
            >
                <Modal show={show}>
                <Modal.Dialog>
                    <Modal.Header>
                    <Modal.Title>För att kunna nå ut till dig med vilka bytesmöjligheter skulle vi uppskatta om du ville uppge din mailadress och postnummer. OBS! Det går bra att skicka in önskemålen även utan att fylla i mailadress och postnummer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="inputFields">
                        <label for="email">Email adress</label>
                        <input id="email" placeholder='Skriv din mailadress (frivilligt)' onChange={handleChangeEmail}></input>
                        <label for="postnr">Postnummer</label>
                        <input id="postnr" placeholder='Postnummer (frivilligt)' onChange={handleChangeLocation}></input>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="primary" onClick={postUserResponse}>Skicka svar</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                </Modal>
            </div>
    </div>
  );
}

export default ApiFetch;