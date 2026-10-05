import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import CatalogoLayout from './pages/CatalogoLayout';
import ListaProductos from './components/ListaProductos';
import Carrito from './pages/Carrito';
import { productosDemo } from './data/productosDemo';
import { validarProductos } from './utils';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [intento, setIntento] = useState(0);
  const [modoDemo, setModoDemo] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    let activo = true;
    let controlador;
    let tiempo;
    setCargando(true);
    setError('');
    setModoDemo(false);

    async function cargarCatalogo() {
      const servicios = [
        { url: 'https://fakestoreapi.com/products', origen: 'fakestore' },
        { url: 'https://dummyjson.com/products?limit=20', origen: 'dummyjson' },
      ];
      let ultimoError;

      for (const servicio of servicios) {
        if (!activo) return;
        controlador = new AbortController();
        tiempo = setTimeout(() => controlador.abort(), 8000);
        try {
          const respuesta = await fetch(servicio.url, { signal: controlador.signal });
          if (!respuesta.ok) throw new Error('El catálogo no está disponible.');
          const datos = await respuesta.json();
          const catalogo = validarProductos(datos, servicio.origen);
          if (activo) setProductos(catalogo);
          return;
        } catch (err) {
          if (!activo) return;
          ultimoError = err;
        } finally {
          clearTimeout(tiempo);
        }
      }

      if (activo) setError(ultimoError?.name === 'AbortError'
          ? 'La tienda tardó demasiado en responder.'
          : ultimoError instanceof TypeError || ultimoError instanceof SyntaxError
            ? 'No pudimos cargar los productos. Revisa tu conexión o intenta de nuevo.'
            : ultimoError?.message || 'No pudimos cargar los productos. Intenta de nuevo.');
    }

    cargarCatalogo().finally(() => {
      if (activo) setCargando(false);
    });

    return () => {
      activo = false;
      clearTimeout(tiempo);
      controlador?.abort();
    };
  }, [intento]);

  function agregarProducto(producto) {
    if (!producto || !productos.some((item) => item.id === producto.id)) return;
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);
      return existe
        ? actual.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
        : [...actual, { ...producto, cantidad: 1 }];
    });
    setMensaje(`${producto.title} se añadió a tu carrito.`);
  }

  function cambiarCantidad(id, cambio) {
    if (cambio !== -1 && cambio !== 1) return;
    setCarrito((actual) => actual
      .map((item) => item.id === id ? { ...item, cantidad: item.cantidad + cambio } : item)
      .filter((item) => item.cantidad > 0));
    setMensaje('Cantidad actualizada.');
  }

  function eliminarProducto(id) {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
    setMensaje('Producto eliminado del carrito.');
  }

  function cargarDemo() {
    setProductos(productosDemo);
    setError('');
    setModoDemo(true);
  }

  const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/catalogo" replace />} />
        <Route path="/catalogo" element={<CatalogoLayout cantidad={cantidad} mensaje={mensaje} />}>
          <Route index element={
            <ListaProductos productos={productos} carrito={carrito} onAgregar={agregarProducto}
              cargando={cargando} error={error} modoDemo={modoDemo}
              onReintentar={() => setIntento((actual) => actual + 1)} onDemo={cargarDemo} />
          } />
          <Route path="carrito" element={
            <Carrito carrito={carrito} onCantidad={cambiarCantidad} onEliminar={eliminarProducto}
              onVaciar={() => { setCarrito([]); setMensaje('Tu carrito está vacío.'); }} />
          } />
        </Route>
        <Route path="/carrito" element={<Navigate to="/catalogo/carrito" replace />} />
        <Route path="*" element={<main className="estado"><h1>Esta página se fue de paseo</h1><Link to="/catalogo">Volver a la tienda</Link></main>} />
      </Routes>
    </BrowserRouter>
  );
}
