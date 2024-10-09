import React from 'react'
import { Link } from 'react-router-dom'
import { Satellite } from 'lucide-react'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-dark-200 bg-opacity-90 backdrop-filter backdrop-blur-lg text-gray-100 p-4 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Satellite size={24} className="text-blue-400" />
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">SatMesh</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
          <Link to="/satellite-data" className="hover:text-blue-400 transition duration-300">Satellite Data</Link>
          <Link to="/telecast" className="hover:text-blue-400 transition duration-300">Telecast</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar