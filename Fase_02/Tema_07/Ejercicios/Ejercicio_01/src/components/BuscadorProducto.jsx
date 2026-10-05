export default function BuscadorProducto({ busqueda, onBuscar }) {
  return (
    <form className="buscador" role="search" onSubmit={(evento) => evento.preventDefault()}>
      <label htmlFor="buscar" className="solo-lectores">Buscar productos por nombre</label>
      <span aria-hidden="true">⌕</span>
      <input id="buscar" type="search" placeholder="Busca algo para tus días…"
        value={busqueda} onChange={(evento) => onBuscar(evento.target.value)} />
    </form>
  );
}
