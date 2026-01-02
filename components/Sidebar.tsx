'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BookOpen, 
  Code, 
  FileText, 
  Settings
} from 'lucide-react'

const navigation = [
  {
    name: 'Getting Started',
    href: '/guides/getting-started',
    icon: BookOpen,
  },
  {
    name: 'API Reference',
    href: '/api',
    icon: Code,
    children: [
      { name: 'Overview', href: '/api' },
      { name: 'Authentication', href: '/api/authentication' },
      { name: 'Agents', href: '/api/agents' },
      { name: 'Config', href: '/api/config' },
      { name: 'Data', href: '/api/data' },
      { name: 'Checkpoints', href: '/api/checkpoints' },
      { name: 'Audit', href: '/api/audit' },
      { name: 'Errors', href: '/api/errors' },
    ],
  },
  {
    name: 'SDK Documentation',
    href: '/sdk',
    icon: FileText,
    children: [
      { name: 'Overview', href: '/sdk' },
      { name: 'Python SDK', href: '/sdk/python' },
      { name: 'TypeScript SDK', href: '/sdk/typescript' },
    ],
  },
  {
    name: 'Guides',
    href: '/guides',
    icon: Settings,
    children: [
      { name: 'Overview', href: '/guides' },
      { name: 'Agents', href: '/guides/agents' },
      { name: 'Data Storage', href: '/guides/data' },
      { name: 'Policies', href: '/guides/policies' },
      { name: 'State & Rollback', href: '/guides/state' },
      { name: 'Audit', href: '/guides/audit' },
      { name: 'Compliance', href: '/guides/compliance' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  // Keep all sections (API, SDK, Guides) always expanded
  return (
    <aside className="hidden lg:block fixed left-0 top-12 bottom-0 w-56 bg-white border-r border-gray-100 overflow-y-auto">
      <nav className="p-3 space-y-0.5">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          const Icon = item.icon

          // Always show children for API, SDK, and Guides sections
          const showChildren = item.children ? true : false

          return (
            <div key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center space-x-2 px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
              {item.children && showChildren && (
                <div className="ml-5 mt-0.5 space-y-0.5">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`block px-2.5 py-1 rounded text-sm transition-colors ${
                          isChildActive
                            ? 'text-gray-900 font-medium'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {child.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

