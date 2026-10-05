import { Link } from 'react-router-dom';
import ItemCarrito from '../components/ItemCarrito';
import { precio } from '../utils';

export default function Carrito({ carrito, onCantidad, onEliminar, onVaciar }) {
  const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const total = carrito.reduce((suma, item) => suma + Math.round(item.price * 100) * item.cantidad, 0) / 100;

  return (
    <section className="pagina-carrito">
      <Link to="/catalogo" className="volver">← Seguir explorando</Link>
      <p className="eyebrow">TUS PEQUEÑOS HALLAZGOS</p><h1>Mi carrito<span className="punto-titulo">.</span></h1>
      <p className="descripcion">Una selección que ya se siente tuya.</p>
      {carrito.length === 0 ? <div className="estado carrito-vacio"><span className="sello grande">v.</span><h2>Tu próximo favorito te espera</h2><p>Aún no tienes productos en el carrito.</p><Link className="boton" to="/catalogo">Ir al catálogo</Link></div>
        : <div className="carrito-layout"><ul className="lista-carrito">{carrito.map((item) => <ItemCarrito key={item.id} item={item} onCantidad={onCantidad} onEliminar={onEliminar} />)}</ul>
          <aside className="resumen-carrito"><p className="eyebrow">TU SELECCIÓN</p><h2>Todo en un vistazo</h2><div className="fila-resumen"><span>Unidades</span><strong>{cantidad}</strong></div><div className="fila-resumen total"><span>Total</span><strong>{precio(total)}</strong></div><p className="nota-resumen">El total corresponde a los productos seleccionados, sin cargos adicionales.</p><button className="boton secundario ancho" onClick={onVaciar}>Vaciar carrito</button><Link to="/catalogo" className="enlace-resumen">Añadir algo más →</Link></aside>
        </div>}
    </section>
  );
}
