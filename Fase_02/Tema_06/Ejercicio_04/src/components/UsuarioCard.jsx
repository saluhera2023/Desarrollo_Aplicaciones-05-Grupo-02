function UsuarioCard({ usuario, seleccionado, onSeleccionar }) {
  return (
    <article className={`user-card ${seleccionado ? 'selected' : ''}`}>
      <div className="user-card-top">
        <div className="avatar">{usuario.nombre.charAt(0)}</div>
        <div>
          <h3>{usuario.nombre}</h3>
          <span className="user-id">Usuario #{usuario.id}</span>
        </div>
      </div>

      <div className="user-data">
        <div>
          <span className="label">Correo electrónico</span>
          <a href={`mailto:${usuario.correo}`}>{usuario.correo}</a>
        </div>

        <div>
          <span className="label">Ciudad</span>
          <span>{usuario.ciudad}</span>
        </div>

        <div>
          <span className="label">Empresa</span>
          <span>{usuario.empresa}</span>
        </div>
      </div>

      <button
        className="select-button"
        type="button"
        onClick={() => onSeleccionar(usuario.id)}
      >
        {seleccionado ? 'Usuario seleccionado' : 'Seleccionar usuario'}
      </button>
    </article>
  )
}

export default UsuarioCard