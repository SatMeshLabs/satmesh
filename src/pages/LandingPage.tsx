import React from 'react'
import { Link } from 'react-router-dom'
import { Satellite, Globe, Zap, ArrowRight } from 'lucide-react'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-300">
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl mt-5 md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Welcome to SatMesh
          </h1>
          <p className="text-xl mb-10 text-gray-300">
            Revolutionizing IoT with Satellite-Enabled P2P Networks
          </p>
          <Link
            to="/api-data"
            className="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
          >
            Explore Data
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Why SatMesh?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Satellite, title: "Global Connectivity", description: "Connect IoT devices anywhere on Earth, even in the most remote areas." },
              { icon: Globe, title: "Decentralized Network", description: "Enjoy enhanced security and reliability with our peer-to-peer architecture." },
              { icon: Zap, title: "Low Latency", description: "Experience faster data transmission with our optimized satellite network." }
            ].map((feature, index) => (
              <div key={index} className="bg-dark-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <feature.icon size={48} className="mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Empowering Innovation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-dark-300 to-dark-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Environmental Monitoring</h3>
              <p className="text-gray-300">Improve climate change predictions by 40% through enhanced data collection from remote sensors.</p>
            </div>
            <div className="bg-gradient-to-br from-dark-300 to-dark-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Data Democratization</h3>
              <p className="text-gray-300">Increase accessible IoT data by 300%, enabling 100,000 new data-driven startups globally.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage