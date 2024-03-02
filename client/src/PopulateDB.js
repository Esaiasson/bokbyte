import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuid } from 'uuid'
import './ApiFetch.css'
import BooksCard from './BooksCard';



function PopulateDB() {

    const [data, setData] = React.useState(null);

    const API_KEY = process.env.REACT_APP_API_KEY;

    const postBooks = (bookList) => {
        fetch("/userResponse", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bookList)
        })
        
    }

    const populate = (category) => {
        
        const books = []

        const booksToDb = []

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
            .then(book => {
                let ok = false

                if(book.volumeInfo.hasOwnProperty('industryIdentifiers') && book.volumeInfo.hasOwnProperty('imageLinks') && book.volumeInfo.hasOwnProperty('title') && book.volumeInfo.hasOwnProperty('description')){
                    ok = true
                    console.log(book.volumeInfo.imageLinks.smallThumbnail)
                }

                if(ok == true ){
                    const resObj = {
                        'isbn': book.volumeInfo.industryIdentifiers,
                        'imageLinks': book.volumeInfo.imageLinks.smallThumbnail,
                        'title': book.volumeInfo.title,
                        'description': book.volumeInfo.description,
                        'category': category
                    }
                    booksToDb.push(resObj)
                }
            })
        .catch(error => console.error('Error:', error));

        postBooks(booksToDb);
    };


}

export default PopulateDB;