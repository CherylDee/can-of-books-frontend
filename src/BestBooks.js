import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap/Carousel';
import bookImg from './images/book.png';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: results.data,
        noBook: false,
      })
    } catch (error) {
      console.log(error.response.data)
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
              <Carousel.Item>
              <img src={bookImg} alt={bookImg} />
              <p>{book.title}</p>
              <p>{book.description}</p>
              {book.status ? (
                <p>This book is available</p>
              ) : (
                <p>This book is unavailable</p>
              )}
              </Carousel.Item>
               )
          })}
       </Carousel>
       ) : (
        <h3>No books found : </h3>
        )}
       
      </>
    )
  }
}

export default BestBooks;
