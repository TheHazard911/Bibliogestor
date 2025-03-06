import React from 'react'
import icon_bibliogestor from '../../assets/imgs/Logo_Bibliogestor.png'

function Form_new_book() {
  return (
    <div className="form-book">
                <section className='image-form-register'>
                    <img src={icon_bibliogestor} alt="Bibliogestor" />
                </section>
                <section className='title-form-book'>
                    <h2>Agregar libro | Datos del libro</h2>
                </section>
                <form className='form-action-book'>
                    <div className="position-form-books">
                        <section className='form-books-inputs'>
                            <div className="mb-3">
                                <label for="" className="form-label labels-form-book">Nombre:</label>
                                <input placeholder='Nombre Libro' type="text" className="form-control inputs-form-book" id="" aria-describedby="" />
                                <br />
                                <label for="exampleInputPassword1" className="form-label labels-form-book">Autor:</label>
                                <input placeholder='Autor Libro' type="text" className="form-control inputs-form-book" id="exampleInputPassword1" />
                                <br />
                                <label for="exampleInputPassword1" className="form-label labels-form-book">Genero:</label>
                                <input placeholder='Genero-libro' type="text" className="form-control inputs-form-book" id="exampleInputPassword1" />
                            </div>
                        </section>
                        <section className='form-register-inputs'>
                            <div className="mb-3">
                                <label for="" className="form-label labels-form-book">Imagen de Portada:</label>
                                <input placeholder='Portada' type="file" className="form-control inputs-form-book" id="" aria-describedby="" />
                                <br />
                                <label for="" className="form-label labels-form-book">Categoria:</label>
                                <input placeholder='Nombrar Categoria' type="text" className="form-control inputs-form-book" id="" aria-describedby="" />
                                <br />
                                <label for="" className="form-label labels-form-book">Ingresar Descripcion:</label>
                                <input placeholder='Descripcion' type="text" className="form-control inputs-form-book" id="" aria-describedby="" />
                            </div>
                        </section>
                    </div>
                    <button type="submit" className="btn btn-color-small">Agregar</button>
                </form>
            </div>
  )
}

export default Form_new_book
