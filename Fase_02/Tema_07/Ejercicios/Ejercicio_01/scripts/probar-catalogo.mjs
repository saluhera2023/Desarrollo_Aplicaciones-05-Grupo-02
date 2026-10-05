import assert from 'node:assert/strict';
import { validarProductos } from '../src/utils.js';

const original = Object.freeze({
  id: 1,
  title: '  Mochila  ',
  price: 39.9,
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/producto.jpg',
});
const productos = validarProductos(Object.freeze([original]));
assert.equal(productos[0].title, 'Mochila');
assert.equal(productos[0].price, 39.9);
assert.notStrictEqual(productos[0], original);
assert.equal(original.title, '  Mochila  ');
assert.deepEqual(validarProductos([]), []);

for (const datos of [null, {}, [null], [{ ...original, title: '' }],
  [{ ...original, price: -1 }], [{ ...original, price: NaN }],
  [{ ...original, id: '1' }], [original, original]]) {
  assert.throws(() => validarProductos(datos));
}

assert.equal(validarProductos([{ ...original, image: 'javascript:alert(1)' }])[0].image, '/producto.svg');
assert.equal(validarProductos([{ ...original, image: null }])[0].image, '/producto.svg');
assert.equal(validarProductos([{ ...original, category: null }])[0].category, 'Otros');
const respaldo = validarProductos({ products: [{ ...original, image: undefined, thumbnail: original.image }] }, 'dummyjson');
assert.equal(respaldo[0].image, original.image);
assert.equal(respaldo[0].id, 'dummyjson-1');
assert.notEqual(respaldo[0].id, validarProductos([original], 'fakestore')[0].id);
console.log('Correcto: catálogo validado, identificadores únicos, imágenes alternativas y datos originales intactos.');
