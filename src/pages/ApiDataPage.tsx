import React, { useState, useEffect } from 'react'
import { Loader, Satellite, X } from 'lucide-react'

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
  parsed?: {
    header?: {
      netId?: number
      msgTypeId?: number
    }
    payload?: {
      timestamp?: number
      satId?: number
      telemetry?: boolean
      type?: string
    }
  }
}

const ApiDataPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<SatelliteData[]>([])
  const [selectedPacket, setSelectedPacket] = useState<SatelliteData | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.tinygs.com/v2/packets')
      const jsonData = await response.json()
      const validData = jsonData.packets.filter((packet: any) =>
        packet &&
        packet.id &&
        packet.satDisplayName &&
        packet.mode &&
        packet.freq &&
        packet.norad &&
        packet.satPos &&
        typeof packet.satPos.lat === 'number' &&
        typeof packet.satPos.lng === 'number' &&
        typeof packet.satPos.alt === 'number'
      )
      setData(validData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const openModal = (packet: SatelliteData) => {
    setSelectedPacket(packet)
  }

  const closeModal = () => {
    setSelectedPacket(null)
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Satellite Data</h1>
      {loading ? (
        <div className="flex justify-center items-center text-gray-300">
          <Loader className="animate-spin mr-2" />
          <span>Loading satellite data...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-dark-200 to-dark-300 p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              onClick={() => openModal(item)}
            >
              <div className="flex items-center mb-4">
                <Satellite className="mr-2 text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-100">{item.satDisplayName}</h2>
              </div>
              <p className="text-gray-300 mb-2">Mode: {item.mode}</p>
              <p className="text-gray-300 mb-2">Frequency: {item.freq} MHz</p>
              <p className="text-gray-300 mb-2">NORAD: {item.norad}</p>
              {item.satPos && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2 text-blue-400">Position:</h3>
                  <p className="text-gray-300">Lat: {item.satPos.lat.toFixed(4)}°</p>
                  <p className="text-gray-300">Lng: {item.satPos.lng.toFixed(4)}°</p>
                  <p className="text-gray-300">Alt: {item.satPos.alt.toFixed(2)} km</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {selectedPacket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-dark-200 to-dark-300 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{selectedPacket.satDisplayName} Packet Details</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-200">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-2">
              <p><span className="font-semibold text-blue-400">Mode:</span> {selectedPacket.mode}</p>
              <p><span className="font-semibold text-blue-400">Frequency:</span> {selectedPacket.freq} MHz</p>
              <p><span className="font-semibold text-blue-400">NORAD:</span> {selectedPacket.norad}</p>
              {selectedPacket.satPos && (
                <div>
                  <h3 className="font-semibold text-blue-400">Position:</h3>
                  <p>Latitude: {selectedPacket.satPos.lat.toFixed(4)}°</p>
                  <p>Longitude: {selectedPacket.satPos.lng.toFixed(4)}°</p>
                  <p>Altitude: {selectedPacket.satPos.alt.toFixed(2)} km</p>

                </div>
              )}
              <h3 className="text-lg font-semibold text-blue-400">Raw Data</h3>
              <p className="font-semibold text-gray-400 break-all">{selectedPacket.raw}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApiDataPage