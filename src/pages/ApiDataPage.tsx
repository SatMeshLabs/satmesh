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
  const [data, setData] = useState<SatelliteData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPacket, setSelectedPacket] = useState<SatelliteData | null>(null)

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

  const openModal = (packet: SatelliteData) => {
    setSelectedPacket(packet)
  }

  const closeModal = () => {
    setSelectedPacket(null)
  }

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
            <div
              key={item.id}
              className="bg-dark-300 p-6 rounded-lg shadow-md cursor-pointer hover:bg-dark-200 transition duration-300"
              onClick={() => openModal(item)}
            >
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
      {selectedPacket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-dark-300 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-100">{selectedPacket.satDisplayName} Packet Details</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-200">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Basic Information</h3>
                <p className="text-gray-300">Mode: {selectedPacket.mode}</p>
                <p className="text-gray-300">Frequency: {selectedPacket.freq} MHz</p>
                <p className="text-gray-300">NORAD: {selectedPacket.norad}</p>
                <p className="text-gray-300">Server Time: {new Date(selectedPacket.serverTime).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Signal Details</h3>
                <p className="text-gray-300">Spreading Factor: {selectedPacket.sf}</p>
                <p className="text-gray-300">Bandwidth: {selectedPacket.bw} kHz</p>
                <p className="text-gray-300">Coding Rate: {selectedPacket.cr}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Satellite Position</h3>
                <p className="text-gray-300">Latitude: {selectedPacket.satPos.lat.toFixed(4)}°</p>
                <p className="text-gray-300">Longitude: {selectedPacket.satPos.lng.toFixed(4)}°</p>
                <p className="text-gray-300">Altitude: {selectedPacket.satPos.alt.toFixed(2)} km</p>
              </div>
              {selectedPacket.parsed && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">Parsed Data</h3>
                  {selectedPacket.parsed.header && (
                    <div>
                      <p className="text-gray-300">Network ID: {selectedPacket.parsed.header.netId}</p>
                      <p className="text-gray-300">Message Type ID: {selectedPacket.parsed.header.msgTypeId}</p>
                    </div>
                  )}
                  {selectedPacket.parsed.payload && (
                    <div>
                      <p className="text-gray-300">Timestamp: {selectedPacket.parsed.payload.timestamp}</p>
                      <p className="text-gray-300">Satellite ID: {selectedPacket.parsed.payload.satId}</p>
                      <p className="text-gray-300">Telemetry: {selectedPacket.parsed.payload.telemetry ? 'Yes' : 'No'}</p>
                      <p className="text-gray-300">Type: {selectedPacket.parsed.payload.type}</p>
                    </div>
                  )}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Raw Data</h3>
                <p className="text-gray-300 break-all">{selectedPacket.raw}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApiDataPage