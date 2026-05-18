import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { EditorPage } from './pages/EditorPage'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <div className="app-router">
      <Routes>
        <Route path="/" element={<EditorPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
