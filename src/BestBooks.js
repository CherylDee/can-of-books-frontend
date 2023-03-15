import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import bookImg from './images/book.png';
import './styles.css';
import { Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
    }
  }

  handleClose = () => {
    this.setState({
      showModal: false,

    })
  }

  handleShow = () => {
    this.setState ({
      showModal: true,

    })
  }


  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      let bookResults = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: bookResults.data,
        noBook: false,
      })

    } catch (error) {
      console.log(error.response.data)
    }
  }
  
    deleteBook = async (id) => {
      try {
        let updateBooks= await axios.delete((`${process.env.REACT_APP_SERVER}/books/${id}`));
        this.state.books.filter(book => book._id !== id);
        this.setState({
          books: updateBooks,
        })

    } catch (error) {
      console.log(error.response.data)
    }
  }

    handleBookSubmit = (e) => {
      e.preventDefault();

    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value
    }
    console.log('New Book from form:', newBook);
    this.postBook(newBook);
    this.handleClose();

  }

    postBook = async (bookObj) => {
      try {
        let createdBook = await axios.post((`${process.env.REACT_APP_SERVER}/books/${bookObj}`));
        this.setState({
          books: [...this.state.books, createdBook.data]
        })
      
    } catch (error) {
      console.log(error.response.data);
    }
   }

  
    componentDidMount() {
    this.getBooks();
  }

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Get Rich Learning Library</h2>

        {this.state.books.length ? (
          <Carousel >
          {this.state.books.map((book, index) => {
            return (
              <Carousel.Item key={book.title + index}>
                
              <img src={bookImg} alt="books about getting tryin' to get rich" />
              <p>{book.title}</p>
              <p>{book.description}</p>
              {book.status ? (
                <p>This book is available</p>
              ) : (
                <p>This book is unavailable</p>
              )}

              <Carousel.Caption>
                <Button onClick={() => { this.deleteBook(book._id) }}>Delete a Book</Button>
              </Carousel.Caption>
              </Carousel.Item>
               )
          })}
       </Carousel>
       ) : (
        <h3>No books found : </h3>
        )}

        <Button variant='secondary' onClick={this.handleShow}>Add a Book</Button>
        <BookFormModal show={this.state.showModal} handleClose={this.handleClose}
        handleBookSubmit={this.handleBookSubmit}/>

        
       
      </>
    )
  }
}

export default BestBooks;
