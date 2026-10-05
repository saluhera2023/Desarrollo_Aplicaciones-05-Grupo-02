import { imagenAlternativa, precio } from '../utils';

export default function ItemCarrito({ item, onCantidad, onEliminar }) {
  return (
    <li className="item-carrito">
      <img src={item.image} alt={item.title} onError={imagenAlternativa} />
      <div className="item-descripcion"><h3>{item.title}</h3><p>{precio(item.price)} por unidad</p><button className="enlace-boton" onClick={() => onEliminar(item.id)} aria-label={`Eliminar ${item.title}`}>Quitar</button></div>
      <div className="cantidad"><button onClick={() => onCantidad(item.id, -1)} aria-label={`Reducir cantidad de ${item.title}`}>−</button><span aria-label="Cantidad">{item.cantidad}</span><button onClick={() => onCantidad(item.id, 1)} aria-label={`Aumentar cantidad de ${item.title}`}>+</button></div>
      <strong className="subtotal">{precio(Math.round(item.price * 100) * item.cantidad / 100)}</strong>
    </li>
  );
}
