import { useState } from 'react'
import axios from 'axios'

export default function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleShorten() {
    setError('')
    setShortUrl('')
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3000/shorten', { url })
      setShortUrl(response.data.shortUrl)
    } catch (err) {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">URL Shortener</h1>
        <p className="text-gray-500 text-sm mb-6">Paste a long URL and get a short one back</p>

        <input
          type="text"
          placeholder="https://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm mb-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleShorten}
          disabled={loading || !url}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg text-sm transition disabled:opacity-50"
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>

        {shortUrl && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-green-600 font-medium mb-1">Your short URL</p>
            <p className="text-blue-600 text-sm break-all">{shortUrl}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

      </div>
    </div>
  )
}