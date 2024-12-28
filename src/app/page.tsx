'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchMakes, Make } from './services/fetching';

export default function Home() {
  const [makes, setMakes] = useState<Make[]>([])
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => (currentYear - i).toString())

  useEffect(() => {
    getMakes()
  }, [])

  const getMakes = async () => {
    setMakes(await fetchMakes())
  }

  const isNextDisabled = !selectedMake || !selectedYear

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Car Dealer App</h1>
      <div className="space-y-4 w-full max-w-md">
        <select
          className="w-full p-2 border rounded text-gray-800"
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
        >
          <option value="">Select a make</option>
          {makes.map((make) => (
            <option key={make.MakeId + make.MakeName} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
        <select
          className="w-full p-2 border rounded text-gray-800"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select a year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <Link
          href={isNextDisabled ? '#' : `/result/${selectedMake}/${selectedYear}`}
          className={`block w-full text-center p-2 rounded ${isNextDisabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
        >
          Next
        </Link>
      </div>
    </main>
  )
}

