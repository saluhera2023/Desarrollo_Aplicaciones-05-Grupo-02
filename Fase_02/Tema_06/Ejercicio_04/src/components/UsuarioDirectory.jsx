import { useEffect, useState } from 'react'
import UsuarioCard from './UsuarioCard'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

function validarUsuario(usuario) {
  if (!usuario || typeof usuario !== 'object') {
    throw new Error('La API devolvió un usuario con formato inválido.')
  }

  const camposValidos =
    Number.isInteger(usuario.id) &&
    typeof usuario.name === 'string' &&
    typeof usuario.email === 'string' &&
    typeof usuario.address?.city === 'string' &&
    typeof usuario.company?.name === 'string'

  if (!camposValidos) {
    throw new Error('La API devolvió datos incompletos o inválidos.')
  }
}

function UsuarioDirectory() {
  const [usuarios, setUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)

  useEffect(() => {
    const obtenerUsuarios = async () => {
      setCargando(true)
      setError('')

      try {
        const respuesta = await fetch(API_URL)

        if (!respuesta.ok) {
          throw new Error(`La solicitud terminó con estado ${respuesta.status}.`)
        }

        const datos = await respuesta.json()

        if (!Array.isArray(datos)) {
          throw new Error('La respuesta de la API no contiene una lista válida.')
        }

        const usuariosNormalizados = []

        datos.forEach((usuario) => {
          validarUsuario(usuario)

          usuariosNormalizados.push({
            id: usuario.id,
            nombre: usuario.name.trim(),
            correo: usuario.email.trim(),
            ciudad: usuario.address.city.trim(),
            empresa: usuario.company.name.trim()
          })
        })

        if (usuariosNormalizados.length === 0) {
          throw new Error('La API no devolvió usuarios.')
        }

        setUsuarios(usuariosNormalizados)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.')
      } finally {
        setCargando(false)
      }
    }

    obtenerUsuarios()
  }, [])

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
  )

  const resumen = usuarios.reduce(
    (acumulado, usuario) => {
      acumulado.empresas.add(usuario.empresa)
      acumulado.ciudades.add(usuario.ciudad)
      return acumulado
    },
    { empresas: new Set(), ciudades: new Set() }
  )

  function seleccionarUsuario(id) {
    const usuario = usuarios.find((item) => item.id === id)
    setUsuarioSeleccionado(usuario ?? null)
  }

  function limpiarBusqueda() {
    setBusqueda('')
  }

  return (
    <section className="directory">
      <div className="intro-card">
        <div>
          <span className="section-tag">API PÚBLICA</span>
          <h2>Usuarios registrados</h2>
          <p>
            Consulta, búsqueda y selección de usuarios desde
            <strong> JSONPlaceholder</strong>.
          </p>
        </div>

        <div className="stats">
          <div className="stat">
            <strong>{usuarios.length}</strong>
            <span>Usuarios</span>
          </div>
          <div className="stat">
            <strong>{resumen.empresas.size}</strong>
            <span>Empresas</span>
          </div>
          <div className="stat">
            <strong>{resumen.ciudades.size}</strong>
            <span>Ciudades</span>
          </div>
        </div>
      </div>

      {cargando && (
        <div className="status-card loading">
          <div className="spinner"></div>
          <div>
            <strong>Cargando usuarios...</strong>
            <p>Procesando la respuesta de la API.</p>
          </div>
        </div>
      )}

      {!cargando && error && (
        <div className="status-card error">
          <div>
            <strong>No se pudo obtener la información</strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      {!cargando && !error && (
        <>
          <div className="search-card">
            <label htmlFor="busqueda">Buscar usuario por nombre</label>
            <div className="search-row">
              <input
                id="busqueda"
                type="text"
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Ejemplo: Leanne"
              />
              {busqueda && (
                <button type="button" onClick={limpiarBusqueda} className="clear-button">
                  Limpiar
                </button>
              )}
            </div>
            <p className="results-text">
              Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios
            </p>
          </div>

          {usuarioSeleccionado && (
            <div className="selected-card">
              <div>
                <span className="section-tag">SELECCIÓN</span>
                <h2>{usuarioSeleccionado.nombre}</h2>
                <p>
                  {usuarioSeleccionado.correo} · {usuarioSeleccionado.ciudad}
                </p>
              </div>
              <button
                type="button"
                className="outline-button"
                onClick={() => setUsuarioSeleccionado(null)}
              >
                Quitar selección
              </button>
            </div>
          )}

          {usuariosFiltrados.length === 0 ? (
            <div className="status-card empty">
              <strong>No existen coincidencias.</strong>
              <p>No se encontró ningún usuario con el nombre ingresado.</p>
            </div>
          ) : (
            <div className="users-grid">
              {usuariosFiltrados.map((usuario) => (
                <UsuarioCard
                  key={usuario.id}
                  usuario={usuario}
                  seleccionado={usuarioSeleccionado?.id === usuario.id}
                  onSeleccionar={seleccionarUsuario}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default UsuarioDirectory