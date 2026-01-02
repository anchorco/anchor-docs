import Link from 'next/link'
import { Code, Package } from 'lucide-react'

export default function SdkPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>SDK Documentation</h1>
      
      <p className="lead">
        Anchor provides official SDKs for Python and TypeScript/JavaScript to make integration
        easier. All SDKs provide full API coverage with type safety, error handling, and
        framework integrations.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <Code className="w-6 h-6 text-indigo-600 mr-2" />
            <Link href="/sdk/python" className="text-xl font-semibold no-underline">
              Python SDK
            </Link>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Full-featured Python SDK with support for LangChain, CrewAI, and Mem0 integrations.
          </p>
          <div className="mb-4">
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm"><code>pip install anchorai</code></pre>
          </div>
          <Link href="/sdk/python" className="text-sm text-indigo-600 hover:text-indigo-700">
            View Python SDK Docs →
          </Link>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-3">
            <Package className="w-6 h-6 text-indigo-600 mr-2" />
            <Link href="/sdk/typescript" className="text-xl font-semibold no-underline">
              TypeScript SDK
            </Link>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            TypeScript/JavaScript SDK with full type definitions and modern async/await support.
          </p>
          <div className="mb-4">
            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm"><code>npm install anchorai</code></pre>
          </div>
          <Link href="/sdk/typescript" className="text-sm text-indigo-600 hover:text-indigo-700">
            View TypeScript SDK Docs →
          </Link>
        </div>
      </div>

      <h2>SDK Structure</h2>
      <p>
        Both SDKs are organized around 5 core namespaces:
      </p>
      <ul>
        <li><strong>agents</strong> - Agent registry and lifecycle management</li>
        <li><strong>config</strong> - Versioned agent configuration</li>
        <li><strong>data</strong> - Governed key-value data storage</li>
        <li><strong>checkpoints</strong> - State snapshots and rollback</li>
        <li><strong>audit</strong> - Hash-chained audit trail</li>
      </ul>

      <h2>Quick Start</h2>
      <p>
        Get started with Anchor in just a few lines of code:
      </p>

      <h3>Python</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor import Anchor

anchor = Anchor(api_key="your-api-key")
agent = anchor.agents.create("support-bot")
anchor.config.update(agent.id, {"policies": {"block_pii": True}})
result = anchor.data.write(agent.id, "key", "value")
print(result.allowed)  # True`}</code></pre>

      <h3>TypeScript</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`import { Anchor } from 'anchorai';

const anchor = new Anchor({ apiKey: 'your-api-key' });
const agent = await anchor.agents.create('support-bot');
await anchor.config.update(agent.id, { policies: { block_pii: true } });
const result = await anchor.data.write(agent.id, 'key', 'value');
console.log(result.allowed);  // true`}</code></pre>

      <h2>Framework Integrations</h2>
      <p>
        Anchor integrates with popular AI frameworks to add governance to their memory systems:
      </p>
      <ul>
        <li><strong>LangChain</strong> - Policy-checked memory for LangChain chains and agents</li>
        <li><strong>CrewAI</strong> - Policy-checked shared memory for CrewAI crews</li>
        <li><strong>Mem0</strong> - Policy-checked memory operations with Mem0</li>
      </ul>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
        <p className="mb-0">
          <strong>How it works:</strong> Anchor works <strong>above</strong> memory frameworks. 
          Memory frameworks handle &quot;what does the agent remember?&quot; Anchor handles 
          &quot;what is the agent allowed to remember, and can you prove it?&quot; This adds 
          policy enforcement, audit trails, and checkpoints without replacing the memory framework.
        </p>
      </div>
      
      <p>
        See the individual SDK documentation for integration examples.
      </p>
    </div>
  )
}

