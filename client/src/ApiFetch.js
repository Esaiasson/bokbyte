import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuid } from 'uuid'
import './ApiFetch.css'
import BooksCard from './BooksCard';
import Alert from 'react-bootstrap/Alert';


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
    const [booksCat3, setBooksCat3] = useState([])
    const [booksCat4, setBooksCat4] = useState([])
    const [booksCat5, setBooksCat5] = useState([])
    const [booksCat6, setBooksCat6] = useState([])
    const [booksCat7, setBooksCat7] = useState([])
    const [booksCat8, setBooksCat8] = useState([])
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

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
        handleClose();
        setShowAlert(true)
        setEmail('')
        setLocation('')
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
            .then(data => (data && data.items ? data.items[0] : null));
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
        const books1 = []
        const books2 = []
        const books3 = []
        const books4 = []
        const books5 = []
        const books6 = []
        const books7 = []
        const books8 = []
        const response = await fetch("/books")
        const books = await response.json()
        await books.forEach(element => {
            booksArray.push(
                {
                    'isbn': element.isbn,
                    'category': element.category,
                    'title': element.title,
                    'description': element.description,
                    'imagelink': element.imagelink
                }
            )
        });
        booksArray.forEach(element => {
            if(element.category === 1){
                books1.push(element)
            }
            if(element.category === 2){
                books2.push(element)
            }
            if(element.category === 3){
                books3.push(element)
            }
            if(element.category === 4){
                books4.push(element)
            }
            if(element.category === 5){
                books5.push(element)
            }
            if(element.category === 6){
                books6.push(element)
            }
            if(element.category === 7){
                books7.push(element)
            }
            if(element.category === 8){
                books8.push(element)
            }
        })
        setBooksCat1(books1)
        setBooksCat2(books2)
        setBooksCat3(books3)
        setBooksCat4(books4)
        setBooksCat5(books5)
        setBooksCat6(books6)
        setBooksCat7(books7)
        setBooksCat8(books8)
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

    const postBooks = (bookList) => {
        fetch("/createBooks", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bookList)
        })
        
    }

const populate = async () => {

    const books = [];
    const booksToDb = [];
    const category = 8

    try {
        const apiRequests = books.map(async (bookIsbn) => {
            
            const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${bookIsbn}&key=${API_KEY}`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.items) {
                const book = data.items[0];

                if (
                    book.volumeInfo.hasOwnProperty('industryIdentifiers') &&
                    book.volumeInfo.hasOwnProperty('imageLinks') &&
                    book.volumeInfo.hasOwnProperty('title') &&
                    book.volumeInfo.hasOwnProperty('description')
                ) {

                    let isbn = ''

                    if(Array.isArray(book.volumeInfo.industryIdentifiers)){
                        isbn = book.volumeInfo.industryIdentifiers[0].identifier
                    } else{
                        isbn = book.volumeInfo.industryIdentifiers
                    }

                    const resObj = {
                        isbn: isbn,
                        imageLinks: book.volumeInfo.imageLinks.smallThumbnail,
                        title: book.volumeInfo.title,
                        description: book.volumeInfo.description,
                        category: category,
                    };
                    booksToDb.push(resObj);
                }
            }
        });

        await Promise.all(apiRequests);

        postBooks(booksToDb);

    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <div>
        <Alert show={showAlert} className='alert alert-success fixed-alert'>
            <Alert.Heading>Tack så mycket för ditt svar!</Alert.Heading>
            <p>
            Om du har skrivit din mail kan vi komma att kontakta dig angående potentiella byten 
            </p>
            <div className="d-flex justify-content-end">
            <Button onClick={() => setShowAlert(false)} variant="outline-success">
                Stäng
            </Button>
            </div>
        </Alert>
        <Button variant="success" size="lg" id="submit" onClick={showForm}>Skicka svar</Button>
        <div id="booksDiv">
            <div className='categoryBg'>
                <h2>Topplista Romaner</h2>
                <div className="categoryDiv">
                    {booksCat2.map((book, index) => {
                        return (
                            <div key={index}>
                                <BooksCard
                                    book={book}
                                    BookNeeds={BookNeeds}
                                    BookHas={BookHas}
                                    addBookNeeds={addBookNeeds}
                                    addBookHas={addBookHas}
                                    removeBookNeeds={removeBookNeeds}
                                    removeBookHas={removeBookHas}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='categoryBg'>
                <h2>Romaner (populära de senaste 20 åren)</h2>
                <div className="categoryDiv">
                    {booksCat3.map((book, index) => {
                        return (
                            <div key={index}>
                                <BooksCard
                                    book={book}
                                    BookNeeds={BookNeeds}
                                    BookHas={BookHas}
                                    addBookNeeds={addBookNeeds}
                                    addBookHas={addBookHas}
                                    removeBookNeeds={removeBookNeeds}
                                    removeBookHas={removeBookHas}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='categoryBg'>
                <h2>Topplista Deckare</h2>
                <div className="categoryDiv">
                    {booksCat5.map((book, index) => {
                        return (
                            <div key={index}>
                                <BooksCard
                                    book={book}
                                    BookNeeds={BookNeeds}
                                    BookHas={BookHas}
                                    addBookNeeds={addBookNeeds}
                                    addBookHas={addBookHas}
                                    removeBookNeeds={removeBookNeeds}
                                    removeBookHas={removeBookHas}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='categoryBg'>
                <h2>Deckare (populära de senaste 20 åren)</h2>
                <div className="categoryDiv">
                    {booksCat4.map((book, index) => {
                        return (
                            <div key={index}>
                                <BooksCard
                                    book={book}
                                    BookNeeds={BookNeeds}
                                    BookHas={BookHas}
                                    addBookNeeds={addBookNeeds}
                                    addBookHas={addBookHas}
                                    removeBookNeeds={removeBookNeeds}
                                    removeBookHas={removeBookHas}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='categoryBg'>
                <h2>Topplista Biografier</h2>
                <div className="categoryDiv">
                    {booksCat6.map((book, index) => {
                        return (
                            <div key={index}>
                                <BooksCard
                                    book={book}
                                    BookNeeds={BookNeeds}
                                    BookHas={BookHas}
                                    addBookNeeds={addBookNeeds}
                                    addBookHas={addBookHas}
                                    removeBookNeeds={removeBookNeeds}
                                    removeBookHas={removeBookHas}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='categoryBg'>
                <h2>Biografier (populära de senaste 20 åren)</h2>
                <div className="categoryDiv">
                    {booksCat8.map((book, index) => {
                        return (
                            <div key={index}>
                                <BooksCard
                                    book={book}
                                    BookNeeds={BookNeeds}
                                    BookHas={BookHas}
                                    addBookNeeds={addBookNeeds}
                                    addBookHas={addBookHas}
                                    removeBookNeeds={removeBookNeeds}
                                    removeBookHas={removeBookHas}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='categoryBg'>
                <h2>Allmänt (populära de senaste 20 åren)</h2>
                <div className="categoryDiv">
                    {booksCat7.map((book, index) => {
                        return (
                            <div key={index}>
                                <BooksCard
                                    book={book}
                                    BookNeeds={BookNeeds}
                                    BookHas={BookHas}
                                    addBookNeeds={addBookNeeds}
                                    addBookHas={addBookHas}
                                    removeBookNeeds={removeBookNeeds}
                                    removeBookHas={removeBookHas}
                                />
                            </div>
                        );
                    })}
                </div>
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
                        <Button variant="secondary" onClick={handleClose}>
                            Avbryt
                        </Button>
                        <Button variant="primary" onClick={postUserResponse}>Skicka svar</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                </Modal>
            </div>
    </div>
  );
}

export default ApiFetch;