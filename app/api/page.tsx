import Link from 'next/link'
import { Code, Shield, Zap, Database, History, CheckSquare } from 'lucide-react'

export default function ApiPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>API Reference</h1>
      
      <p className="lead">
        The Anchor API is organized around REST. Our API has predictable resource-oriented URLs,
        accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard
        HTTP response codes, authentication, and verbs.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
        <p className="mb-0">
          <strong>Base URL:</strong> <code>https://api.getanchor.dev</code>
        </p>
      </div>

      <h2>Authentication</h2>
      <p>
        All API requests require authentication via the <code>X-API-Key</code> header:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`X-API-Key: your-api-key-here`}</code></pre>

      <h2>Core Resources</h2>
      <p>
        The Anchor API is organized around 5 core namespaces:
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <Shield className="w-6 h-6 text-indigo-600 mr-2" />
            <Link href="/api/agents" className="text-xl font-semibold no-underline">
              Agents
            </Link>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Agent registry and lifecycle management. Create, get, list, update, delete, suspend, and activate agents.
          </p>
          <Link href="/api/agents" className="text-sm text-indigo-600 hover:text-indigo-700">
            View endpoints →
          </Link>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <Zap className="w-6 h-6 text-indigo-600 mr-2" />
            <Link href="/api/config" className="text-xl font-semibold no-underline">
              Config
            </Link>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Versioned agent configuration. Get, update, list versions, get version, and rollback configurations.
          </p>
          <Link href="/api/config" className="text-sm text-indigo-600 hover:text-indigo-700">
            View endpoints →
          </Link>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <Database className="w-6 h-6 text-indigo-600 mr-2" />
            <Link href="/api/data" className="text-xl font-semibold no-underline">
              Data
            </Link>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Governed key-value data storage with policy enforcement. Write, read, delete, list, and search data.
          </p>
          <Link href="/api/data" className="text-sm text-indigo-600 hover:text-indigo-700">
            View endpoints →
          </Link>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <CheckSquare className="w-6 h-6 text-indigo-600 mr-2" />
            <Link href="/api/checkpoints" className="text-xl font-semibold no-underline">
              Checkpoints
            </Link>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            State snapshots and rollback. Create, list, get, restore, and delete checkpoints.
          </p>
          <Link href="/api/checkpoints" className="text-sm text-indigo-600 hover:text-indigo-700">
            View endpoints →
          </Link>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <History className="w-6 h-6 text-indigo-600 mr-2" />
            <Link href="/api/audit" className="text-xl font-semibold no-underline">
              Audit
            </Link>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Hash-chained audit trail. Query, get, verify, and export audit logs.
          </p>
          <Link href="/api/audit" className="text-sm text-indigo-600 hover:text-indigo-700">
            View endpoints →
          </Link>
        </div>
      </div>

      <h2>SDK Coverage</h2>
      <p>
        <strong>✅ Available in SDK (v1.0):</strong>
      </p>
      <ul>
        <li>Data operations (write, retrieve, list, get, update, delete)</li>
        <li>Identity management (create, get, list, update, delete, versions, rollback)</li>
        <li>Snapshots & rollback (with identity-scoped support)</li>
        <li>Usage/Token tracking (statistics and listing)</li>
        <li>Decision logging</li>
        <li>Export operations</li>
        <li>Audit ledger</li>
        <li>QA metrics</li>
      </ul>

      <p>
        <strong>⚠️ Available via Direct API Only (Coming in v1.1+):</strong>
      </p>
      <ul>
        <li>Compliance API (<code>/compliance/*</code>) - GDPR/CCPA/AI Act report generation</li>
        <li>Knowledge Graph API (<code>/knowledge/*</code>) - Schema management, entity extraction, graph queries</li>
      </ul>

      <h2>Rate Limits</h2>
      <p>
        API requests are rate-limited per workspace:
      </p>
      <ul>
        <li><strong>Default:</strong> 1000 requests per minute</li>
        <li><strong>Burst:</strong> Up to 100 requests per second</li>
      </ul>
      <p>
        Rate limit headers are included in responses:
      </p>
      <ul>
        <li><code>X-RateLimit-Limit</code>: Maximum requests per window</li>
        <li><code>X-RateLimit-Remaining</code>: Remaining requests in current window</li>
        <li><code>X-RateLimit-Reset</code>: Unix timestamp when the limit resets</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li><Link href="/api/authentication">Learn about authentication</Link></li>
        <li><Link href="/api/errors">Understand error handling</Link></li>
        <li><Link href="/sdk">Use our SDKs for easier integration</Link></li>
      </ul>
    </div>
  )
}

