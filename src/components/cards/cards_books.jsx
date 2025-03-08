import React from 'react'
import { Link } from 'react-router-dom'

function Cards_books({ book }) {
    return (
        <div className='cards-books'>
            <img src={book} alt="book" />
            <p>Titulo del libro</p>
            <Link to={`/navadmin/catalogo/book/${book.id}`}>Ver detalles</Link>
        </div>
    )
}

export default Cards_books
