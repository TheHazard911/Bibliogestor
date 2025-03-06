import React from 'react'

function Cards_books({book}) {
    return (
        <div className='cards-books'>
            <img src={book} alt="book" />
            <p>Titulo del libro</p>
        </div>
    )
}

export default Cards_books
