import { NavLink, Outlet } from 'react-router-dom';

export default function CatalogoLayout({ cantidad, mensaje }) {
  return (
    <div className="app">
      <div className="franja">Una selección pequeña para disfrutar lo cotidiano.</div>
      <header className="cabecera contenedor">
        <NavLink to="/catalogo" className="marca" aria-label="Vitrina, inicio"><span className="sello">v.</span>vitrina<span className="punto">®</span></NavLink>
        <nav aria-label="Navegación principal">
          <NavLink to="/catalogo" end>Catálogo</NavLink>
          <NavLink to="/catalogo/carrito">Mi carrito <span className="contador">{cantidad}</span></NavLink>
        </nav>
      </header>
      <main className="contenedor"><Outlet /></main>
      <p className="anuncio contenedor" role="status" aria-live="polite">{mensaje || 'Explora, elige y arma tu selección.'}</p>
      <footer className="contenedor pie"><span>vitrina · cosas que acompañan</span><span>Precios en dólares (USD)</span></footer>
    </div>
  );
}
