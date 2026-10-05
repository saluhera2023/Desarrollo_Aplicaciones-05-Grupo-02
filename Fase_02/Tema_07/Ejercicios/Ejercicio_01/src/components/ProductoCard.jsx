import { categoria, imagenAlternativa, precio } from '../utils';

export default function ProductoCard({ producto, unidades, onAgregar }) {
  return (
    <article className="producto">
      <div className="foto-producto">
        <img src={producto.image} alt={producto.title} loading="lazy" onError={imagenAlternativa} />
        {unidades > 0 && <span className="en-carrito">{unidades} en tu carrito</span>}
      </div>
      <div className="producto-info">
        <p className="etiqueta">{categoria(producto.category)}</p>
        <h3>{producto.title}</h3>
        <div className="producto-acciones"><strong>{precio(producto.price)}</strong>
          <button className="boton-agregar" onClick={() => onAgregar(producto)} aria-label={`Agregar ${producto.title} al carrito`}>Añadir <span aria-hidden="true">+</span></button>
        </div>
      </div>
    </article>
  );
}
