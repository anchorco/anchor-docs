import Link from 'next/link'
import { BookOpen, Shield, Database, History, CheckSquare, FileText } from 'lucide-react'

const guides = [
  {
    name: 'Agents',
    href: '/guides/agents',
    icon: Shield,
    description: 'Registering agents, lifecycle management, and best practices',
  },
  {
    name: 'Data Storage',
    href: '/guides/data',
    icon: Database,
    description: 'Storing and retrieving data with policy enforcement',
  },
  {
    name: 'Policies',
    href: '/guides/policies',
    icon: Shield,
    description: 'Blocking PII, secrets, setting retention, and custom patterns',
  },
  {
    name: 'State & Rollback',
    href: '/guides/state',
    icon: CheckSquare,
    description: 'Checkpoints, recovering from corruption, and state management',
  },
  {
    name: 'Audit',
    href: '/guides/audit',
    icon: History,
    description: 'Querying logs, verifying integrity, and compliance reporting',
  },
  {
    name: 'Compliance',
    href: '/guides/compliance',
    icon: FileText,
    description: 'Data export, deletion certificates, and regulatory compliance',
  },
]

export default function GuidesPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Guides</h1>
      
      <p className="lead">
        Step-by-step guides to help you get the most out of Anchor. Learn how to manage
        agents, enforce policies, maintain state, and ensure compliance.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        {guides.map((guide) => {
          const Icon = guide.icon
          return (
            <Link
              key={guide.name}
              href={guide.href}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow no-underline"
            >
              <div className="flex items-center mb-3">
                <Icon className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold m-0 text-gray-900">{guide.name}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-0">{guide.description}</p>
            </Link>
          )
        })}
      </div>

      <h2>Getting Started</h2>
      <p>
        New to Anchor? Start with the <Link href="/guides/getting-started">Getting Started guide</Link> to
        learn the basics, then explore the guides above to dive deeper into specific features.
      </p>
    </div>
  )
}

