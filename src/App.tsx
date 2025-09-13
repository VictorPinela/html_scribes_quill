// import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import './index.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-parchment">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Adicionaremos outras rotas depois */}
        </Routes>
      </div>
    </Router>
  )
}

export default App