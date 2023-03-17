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
        books: bookResults.data
      },
      console.log(this.state.books)
      );

    } catch (error) {
      this.setState ({
        error: true,
        errorMessage: 'An error occurred: Type ' + error.response + ', ' + error.response.data
      })

      console.log(error.response.data)
    }
  }
  
    deleteBook = async (id) => {
      try {
        let updateBooks= await axios.delete(`${process.env.REACT_APP_SERVER}/books/${id}`);
        this.state.books.filter(book => book._id !== id);
        this.setState({
          books: updateBooks,
        })

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: 'An error occurred: Type ' + error.response + ', ' + error.response.data
      })
      
      console.log(error.response.data)
    }
  }

    handleBookSubmit = (event) => {
      event.preventDefault();

    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value
    }
    console.log('New Book from form:', newBook);
    this.postBook(newBook);
    this.handleClose();

  }

    postBook = async (bookObj) => {
      try {
        let createdBook = await axios.post(`${process.env.REACT_APP_SERVER}/books/${bookObj}`);
        this.setState({
          books: [...this.state.books, createdBook.data]
        })
      
    } catch (error) {
      this.setState ({
        error: true,
        errorMessage: 'An error occurred: Type ' + error.response + ', ' + error.response.data
      })

      console.log(error.response.data);
    }
   }

  
    componentDidMount() {
    this.getBooks();
  }

  render() {

    /* TODO: render all the books in a Carousel */
    let booksArray = this.state.books.map((book, _id) => {
      return (  <Carousel.Item key={_id}>
                  {/* <Button variant="success" onClick={() => this.handleStartUpdating(book)}>Update Book</Button> */}
                  <img src={bookImg} alt="books about getting tryin' to get rich" />
              
                  {/* <Button variant="danger" onClick={() => this.deleteBook(book._id)}>Delete Book</Button> */}
                  <Carousel.Caption>
                    <h4>{book.title}</h4>
                    <h5>{book.status}</h5>
                    <p>{book.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
      )
  });

    return (
      <>
        <h2>My Get Rich Learning Library</h2>

        {this.state.books.length ? (
          <Carousel variant='dark'>
            {booksArray}
          </Carousel>
        ) : (
          <h3>No Books Found </h3>
        )}

        {/* {this.state.books.length ? (
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
        
         */}

        <Button variant='secondary' onClick={this.handleShow}>Add a Book</Button>
        <BookFormModal show={this.state.showModal} handleClose={this.handleClose}
        handleBookSubmit={this.handleBookSubmit}/>
       
      </>
    )
  }
}

export default BestBooks;
