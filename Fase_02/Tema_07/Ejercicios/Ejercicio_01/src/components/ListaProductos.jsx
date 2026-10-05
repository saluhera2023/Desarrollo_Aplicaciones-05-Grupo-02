import { useState } from 'react';
import BuscadorProducto from './BuscadorProducto';
import ProductoCard from './ProductoCard';
import { categoria } from '../utils';

export default function ListaProductos({ productos, carrito, onAgregar, cargando, error, modoDemo, onReintentar, onDemo }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const categorias = ['Todas', ...new Set(productos.map((producto) => producto.category))];
  const visibles = productos.filter((producto) =>
    producto.title.toLocaleLowerCase().includes(busqueda.trim().toLocaleLowerCase())
    && (categoriaActiva === 'Todas' || producto.category === categoriaActiva));

  return (
    <>
      <section className="portada">
        <div><p className="eyebrow">PARA LO QUE VIENE</p><h1>Objetos simples.<br /><em>Días mejores.</em></h1>
          <p>Tu próximo favorito puede ser algo pequeño. Descúbrelo aquí y llévalo a tu carrito.</p>
          <a href="#seleccion" className="enlace-portada">Explorar la selección <span aria-hidden="true">↘</span></a>
        </div>
        <div className="ilustracion-portada" aria-hidden="true"><span className="circulo" /><span className="bolsa"><span>v.</span></span><span className="nota">hecho para<br />tu día a día</span><span className="estrella">✳</span></div>
      </section>
      <section id="seleccion" className="seleccion">
        <div className="titulo-seccion"><div><p className="eyebrow">ELIGE A TU RITMO</p><h2>La selección</h2></div><BuscadorProducto busqueda={busqueda} onBuscar={setBusqueda} /></div>
        {cargando ? <div className="estado" role="status"><span className="cargando" /><h3>Estamos preparando la vitrina</h3><p>Cargando los productos…</p></div>
          : error ? <div className="estado error" role="alert"><h3>La vitrina necesita un momento</h3><p>{error}</p><div className="acciones-estado"><button className="boton" onClick={onReintentar}>Reintentar</button><button className="boton secundario" onClick={onDemo}>Ver catálogo de ejemplo</button></div></div>
          : <>
            {modoDemo && <p className="aviso-demo">Estás explorando un catálogo de ejemplo guardado en el proyecto.</p>}
            <div className="barra-filtros"><div className="categorias" aria-label="Filtrar por categoría">{categorias.map((item) => <button key={item} className={categoriaActiva === item ? 'activo' : ''} aria-pressed={categoriaActiva === item} onClick={() => setCategoriaActiva(item)}>{categoria(item)}</button>)}</div><span className="resultados">{visibles.length} productos</span></div>
            {visibles.length > 0 ? <div className="rejilla">{visibles.map((producto) => <ProductoCard key={producto.id} producto={producto} onAgregar={onAgregar} unidades={carrito.find((item) => item.id === producto.id)?.cantidad || 0} />)}</div>
              : <div className="estado"><h3>Ningún producto por aquí</h3><p>Prueba otro nombre o cambia la categoría.</p><button className="boton secundario" onClick={() => { setBusqueda(''); setCategoriaActiva('Todas'); }}>Limpiar filtros</button></div>}
          </>}
      </section>
    </>
  );
}
