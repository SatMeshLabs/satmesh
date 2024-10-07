import React, { useState, useEffect } from 'react'
import { Loader, Satellite } from 'lucide-react'

interface SatelliteData {
  raw: string
  serverTime: number
  mode: string
  freq: number
  sf: number
  bw: number
  cr: number
  satellite: string
  norad: number
  id: string
  satDisplayName: string
  satPos: {
    lat: number
    lng: number
    alt: number
  }
}

const ApiDataPage: React.FC = () => {
  const [data, setData] = useState<SatelliteData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.tinygs.com/v2/packets')
        const jsonData = await response.json()
        setData(jsonData.packets.slice(0, 10))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-100">Satellite Data</h1>
      {loading ? (
        <div className="flex justify-center items-center text-gray-300">
          <Loader className="animate-spin mr-2" />
          <span>Loading satellite data...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div key={item.id} className="bg-dark-300 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Satellite className="mr-2 text-accent-100" />
                <h2 className="text-xl font-semibold text-gray-100">{item.satDisplayName}</h2>
              </div>
              <p className="text-gray-300 mb-2">Mode: {item.mode}</p>
              <p className="text-gray-300 mb-2">Frequency: {item.freq} MHz</p>
              <p className="text-gray-300 mb-2">NORAD: {item.norad}</p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2 text-gray-200">Position:</h3>
                <p className="text-gray-300">Lat: {item.satPos.lat.toFixed(4)}°</p>
                <p className="text-gray-300">Lng: {item.satPos.lng.toFixed(4)}°</p>
                <p className="text-gray-300">Alt: {item.satPos.alt.toFixed(2)} km</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ApiDataPage