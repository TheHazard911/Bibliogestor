import React from 'react'
import Pie from '../components/charts/pie'
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
          <Pie></Pie>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Estadisticas
