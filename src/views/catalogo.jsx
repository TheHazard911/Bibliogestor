import React from 'react'
import Cards_books from '../components/cards/cards_books'
import book from "../assets/imgs/books/book_1.jpeg"
import book_2 from "../assets/imgs/books/book_2.jpeg"
import book_3 from "../assets/imgs/books/book_3.jpeg"
function Catalogo() {
  return (
    <div className='views view-catalogo'>
      <h2>Catalogo</h2>
      <div className="content-catalogo">
        <section className='title-genero'>
        <h3>terror</h3>
        </section>
        <section className="row-cards">
          <Cards_books book={book}></Cards_books>
          <Cards_books book={book}></Cards_books>
          <Cards_books book={book}></Cards_books>
          <Cards_books book={book}></Cards_books>
          <Cards_books book={book}></Cards_books>
        </section>
      </div>
      <div className="content-catalogo">
        <section className='title-genero'>
        <h3>Comedia</h3>
        </section>
        <section className="row-cards">
          <Cards_books book={book_2}></Cards_books>
          <Cards_books book={book_2}></Cards_books>
          <Cards_books book={book_2}></Cards_books>
          <Cards_books book={book_2}></Cards_books>
          <Cards_books book={book_2}></Cards_books>
        </section>
      </div>
      <div className="content-catalogo">
        <section className='title-genero'>
        <h3>ficcion</h3>
        </section>
        <section className="row-cards">
          <Cards_books book={book_3}></Cards_books>
          <Cards_books book={book_3}></Cards_books>
          <Cards_books book={book_3}></Cards_books>
          <Cards_books book={book_3}></Cards_books>
          <Cards_books book={book_3}></Cards_books>
        </section>
      </div>
    </div>
  )
}

export default Catalogo
