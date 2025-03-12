import React from 'react'
import Bar_2 from '../components/charts/bar_2'
import Bar from '../components/charts/bar'

function Estadisticas() {
  return (
    <div className='views view-estadisticas'>
      <h2>Estadisticas</h2>
      <div className="charts-js">
        <section className="row-one">
          <div className="grapic-card">
            <h3>Libros</h3>
          <Bar></Bar>
          </div>
          <div className="grapic-card">
            <h3>Usuarios</h3>
          <Bar_2></Bar_2>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Estadisticas
