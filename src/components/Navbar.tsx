import React from 'react'
import { Link } from 'react-router-dom'
import { Satellite } from 'lucide-react'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-dark-200 text-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Satellite size={24} className="text-accent-100" />
          <span className="text-xl font-bold">SatMesh</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-accent-100 transition duration-300">Home</Link>
          <Link to="/api-data" className="hover:text-accent-100 transition duration-300">API Data</Link>
          <Link to="/telecast" className="hover:text-accent-100 transition duration-300">Telecast</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar