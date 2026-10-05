export const precio = (valor) => new Intl.NumberFormat('es-PE', {
  style: 'currency', currency: 'USD',
}).format(valor);

export const categoria = (valor) => ({
  "men's clothing": 'Ropa para él',
  "women's clothing": 'Ropa para ella',
  jewelery: 'Accesorios',
  electronics: 'Tecnología',
  beauty: 'Belleza',
  fragrances: 'Fragancias',
  furniture: 'Hogar',
  groceries: 'Alimentos',
}[valor] || valor);

export function validarProductos(datos, origen = '') {
  const catalogo = Array.isArray(datos) ? datos : datos?.products;
  if (!Array.isArray(catalogo)) throw new Error('La respuesta del catálogo no es válida.');
  const identificadores = new Set();

  return catalogo.map((producto) => {
    if (!producto || typeof producto !== 'object'
      || !Number.isSafeInteger(producto.id) || producto.id <= 0
      || identificadores.has(producto.id)
      || typeof producto.title !== 'string' || !producto.title.trim()
      || !Number.isFinite(producto.price) || producto.price < 0
      || !Number.isSafeInteger(Math.round(producto.price * 100))) {
      throw new Error('El catálogo contiene productos incompletos o inválidos.');
    }
    identificadores.add(producto.id);

    let imagen = '/producto.svg';
    const fuenteImagen = producto.image ?? producto.thumbnail;
    if (typeof fuenteImagen === 'string') {
      try {
        const direccion = new URL(fuenteImagen);
        if (['https:', 'http:'].includes(direccion.protocol)) imagen = direccion.href;
      } catch {}
    }

    return {
      id: origen ? `${origen}-${producto.id}` : producto.id,
      title: producto.title.trim(),
      price: Math.round(producto.price * 100) / 100,
      category: typeof producto.category === 'string' && producto.category.trim()
        ? producto.category.trim() : 'Otros',
      image: imagen,
    };
  });
}

export function imagenAlternativa(evento) {
  if (evento.currentTarget.getAttribute('src') !== '/producto.svg') {
    evento.currentTarget.src = '/producto.svg';
  }
}
