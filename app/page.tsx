import Link from 'next/link'
import { ArrowRight, Shield, FileText, Code, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="prose max-w-none">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-semibold mb-2 text-gray-900">
          Anchor API Documentation
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Identity Infrastructure for AI Agents
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Control what your AI agents store. Audit everything. Block bad data before storage.
          Prove what happened. Rollback when things break.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <div className="border border-gray-200 rounded p-4 hover:border-gray-300 transition-colors">
          <div className="flex items-center mb-2">
            <Shield className="w-4 h-4 text-gray-700 mr-2" />
            <h2 className="text-base font-semibold m-0">Quick Start</h2>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Get started with Anchor in minutes. Create your first agent, configure policies,
            and start storing data with automatic enforcement.
          </p>
          <Link
            href="/guides/getting-started"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Get Started <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>

        <div className="border border-gray-200 rounded p-4 hover:border-gray-300 transition-colors">
          <div className="flex items-center mb-2">
            <Code className="w-4 h-4 text-gray-700 mr-2" />
            <h2 className="text-base font-semibold m-0">API Reference</h2>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Complete REST API reference with request/response examples, error codes,
            and authentication details.
          </p>
          <Link
            href="/api"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View API Reference <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>

        <div className="border border-gray-200 rounded p-4 hover:border-gray-300 transition-colors">
          <div className="flex items-center mb-2">
            <FileText className="w-4 h-4 text-gray-700 mr-2" />
            <h2 className="text-base font-semibold m-0">SDK Documentation</h2>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Python and TypeScript SDK documentation with examples, integrations,
            and best practices.
          </p>
          <Link
            href="/sdk"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View SDK Docs <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>

        <div className="border border-gray-200 rounded p-4 hover:border-gray-300 transition-colors">
          <div className="flex items-center mb-2">
            <Zap className="w-4 h-4 text-gray-700 mr-2" />
            <h2 className="text-base font-semibold m-0">Guides</h2>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Step-by-step guides for agents, data storage, policies, state management,
            audit, and compliance.
          </p>
          <Link
            href="/guides"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Browse Guides <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 rounded p-4 mb-8">
        <h2 className="text-base font-semibold mb-3">Core Features</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Policy Enforcement</h3>
            <p className="text-xs text-gray-600">
              Block PII, secrets, and custom patterns before storage. Automatic detection
              and prevention of sensitive data.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">Hash-Chained Audit</h3>
            <p className="text-xs text-gray-600">
              Every operation logged with cryptographic verification. Tamper-evident logs
              for security reviews and compliance.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">State Snapshots</h3>
            <p className="text-xs text-gray-600">
              Checkpoint and rollback agent state. Recover from corruption, test safely,
              and maintain data integrity.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-base font-semibold mb-3">Installation</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-1.5">Python</h3>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs"><code>pip install anchorai</code></pre>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1.5">TypeScript/JavaScript</h3>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs"><code>npm install anchorai</code></pre>
          </div>
        </div>
      </div>
    </div>
  )
}

