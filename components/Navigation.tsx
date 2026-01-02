'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-1.5">
              <span className="text-lg font-semibold text-gray-900">
                Anchor
              </span>
              <span className="text-xs text-gray-500">Docs</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 border border-gray-200 rounded hover:border-gray-300 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
            <Link
              href="https://github.com/anchorco/anchor-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-gray-900"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

