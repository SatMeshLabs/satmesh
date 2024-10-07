import React, { useState } from 'react'
import { Send } from 'lucide-react'

const TelecastPage: React.FC = () => {
  const [inputData, setInputData] = useState('')
  const [encryptedData, setEncryptedData] = useState('')
  const [telecastStatus, setTelecastStatus] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
  }

  const encryptData = (data: string): string => {
    // Simple XOR encryption for demonstration purposes
    return data
      .split('')
      .map(char => String.fromCharCode(char.charCodeAt(0) ^ 0x7A))
      .join('')
  }

  const handleTelecast = () => {
    const encrypted = encryptData(inputData)
    setEncryptedData(encrypted)
    setTelecastStatus('Data encrypted and ready for telecast')
    // In a real application, you would send the encrypted data to your satellite network here
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-100">Telecast Data</h1>
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="userData" className="block text-sm font-medium text-gray-300 mb-2">
            Enter data to telecast:
          </label>
          <input
            type="text"
            id="userData"
            className="w-full px-3 py-2 bg-dark-300 border border-dark-200 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-100"
            value={inputData}
            onChange={handleInputChange}
            placeholder="Enter your data here"
          />
        </div>
        <button
          onClick={handleTelecast}
          className="w-full bg-accent-100 text-white py-2 px-4 rounded-md hover:bg-accent-200 transition duration-300 flex items-center justify-center"
        >
          <Send size={18} className="mr-2" />
          Encrypt and Telecast
        </button>
        {encryptedData && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-200">Encrypted Data:</h2>
            <p className="bg-dark-300 p-3 rounded-md break-all text-gray-300">{encryptedData}</p>
          </div>
        )}
        {telecastStatus && (
          <p className="mt-4 text-accent-100 font-semibold">{telecastStatus}</p>
        )}
      </div>
    </div>
  )
}

export default TelecastPage