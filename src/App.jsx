import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes'; // Importa las rutas desde routes.jsx

function App() {
  return (
    <Router>
    <div>
      <AppRoutes />
    </div>
  </Router>
  )
}

export default App
