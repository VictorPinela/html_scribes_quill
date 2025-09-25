// import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { VerifyEmail } from './pages/VerifyEmail'
import './index.css'
import { EmailConfirmation } from './pages/EmailConfirmation'
import { Classes } from './pages/Classes'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-parchment">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/email-confirmation" element={<EmailConfirmation />} />

            {/* Rota raiz redireciona para login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rotas protegidas */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            {/* <Route path="/characters/new" element={
            <ProtectedRoute>
              <CharacterForm />
            </ProtectedRoute>
          } />
          <Route path="/characters/:id" element={
            <ProtectedRoute>
              <CharacterSheet />
            </ProtectedRoute>
          } /> */}

            <Route path="/classes" element={
              <ProtectedRoute>
                <Classes />
              </ProtectedRoute>
            } />
            {/*
            <Route path="/races" element={<Races />} />
            <Route path="/spells" element={<Spells />} />
            <Route path="/backgrounds" element={<Backgrounds />} />
            <Route path="/items" element={<Items />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/tools/dice" element={<DiceRoller />} /> 
            */}

            {/* Rota 404 */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-cinzel text-white mb-4">404</h1>
                  <p className="text-blue-200 mb-6">Página não encontrada</p>
                  <a
                    href="/dashboard"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    Voltar ao Dashboard
                  </a>
                </div>
              </div>
            } />
            {/* Adicionaremos outras rotas depois */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App