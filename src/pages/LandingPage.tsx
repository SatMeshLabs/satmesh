import React from 'react'
import { Link } from 'react-router-dom'
import { Satellite, Globe, Zap } from 'lucide-react'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-dark-200 text-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to SatMesh</h1>
          <p className="text-xl mb-8">Revolutionizing IoT with Satellite-Enabled P2P Networks</p>
          <Link to="/api-data" className="bg-accent-100 text-white px-6 py-3 rounded-full font-bold hover:bg-accent-200 transition duration-300">
            Go to App
          </Link>
        </div>
      </section>

      <section className="py-16 bg-dark-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">Why SatMesh?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Satellite size={48} className="mx-auto mb-4 text-accent-100" />
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Global Connectivity</h3>
              <p className="text-gray-300">Connect IoT devices anywhere on Earth, even in the most remote areas.</p>
            </div>
            <div className="text-center">
              <Globe size={48} className="mx-auto mb-4 text-accent-100" />
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Decentralized Network</h3>
              <p className="text-gray-300">Enjoy enhanced security and reliability with our peer-to-peer architecture.</p>
            </div>
            <div className="text-center">
              <Zap size={48} className="mx-auto mb-4 text-accent-100" />
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Low Latency</h3>
              <p className="text-gray-300">Experience faster data transmission with our optimized satellite network.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-200">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">Empowering Innovation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-dark-300 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-100">Environmental Monitoring</h3>
              <p className="text-gray-300">Improve climate change predictions by 40% through enhanced data collection from remote sensors.</p>
            </div>
            <div className="bg-dark-300 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-100">Data Democratization</h3>
              <p className="text-gray-300">Increase accessible IoT data by 300%, enabling 100,000 new data-driven startups globally.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage