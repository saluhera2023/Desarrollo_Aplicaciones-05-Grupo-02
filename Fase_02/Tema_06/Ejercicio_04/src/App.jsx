import UsuarioDirectory from './components/UsuarioDirectory'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <p className="eyebrow">REACTJS · LABORATORIO N.º 06</p>
          <h1>Directorio de Usuarios</h1>
          <p className="subtitle">
            Información obtenida dinámicamente desde una API pública
          </p>
        </div>
      </header>

      <main className="container main-content">
        <UsuarioDirectory />
      </main>

      <footer className="app-footer">
        Directorio desarrollado con React, useEffect, useState y fetch()
      </footer>
    </div>
  )
}

export default App