export default function TypeScriptSdkPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>TypeScript SDK</h1>
      
      <p className="lead">
        The Anchor TypeScript SDK provides a full-featured client for the Anchor API with
        complete type definitions, modern async/await support, and framework integrations.
      </p>

      <h2>Installation</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>npm install anchorai</code></pre>

      <p>
        Or with yarn:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>yarn add anchorai</code></pre>

      <h2>Quick Start</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`import { Anchor } from 'anchorai';

const anchor = new Anchor({ apiKey: 'your-api-key' });

// Create an agent
const agent = await anchor.agents.create('support-bot', { environment: 'production' });

// Configure policies
await anchor.config.update(agent.id, {
  policies: {
    block_pii: true,
    block_secrets: true,
    retention_days: 90
  }
});

// Store data (policy-checked, audit-logged)
const result = await anchor.data.write(agent.id, 'user:123:preference', 'dark_mode');
console.log(result.allowed);  // true

// PII is blocked automatically
const blocked = await anchor.data.write(agent.id, 'user:123:ssn', '123-45-6789');
console.log(blocked.allowed);     // false
console.log(blocked.blockedBy);   // "policy:block_pii"

// Verify audit chain integrity
const verification = await anchor.audit.verify(agent.id);
console.log(verification.valid);  // true`}</code></pre>

      <h2>SDK Structure</h2>
      <p>
        The SDK has 5 namespaces:
      </p>
      <table>
        <thead>
          <tr>
            <th>Namespace</th>
            <th>Purpose</th>
            <th>Key Methods</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>anchor.agents</code></td>
            <td>Agent registry and lifecycle</td>
            <td>create, get, list, update, delete, suspend, activate</td>
          </tr>
          <tr>
            <td><code>anchor.config</code></td>
            <td>Agent configuration with versioning</td>
            <td>get, update, versions, getVersion, rollback</td>
          </tr>
          <tr>
            <td><code>anchor.data</code></td>
            <td>Governed key-value data storage</td>
            <td>write, writeBatch, read, readFull, delete, deletePrefix, list, search</td>
          </tr>
          <tr>
            <td><code>anchor.checkpoints</code></td>
            <td>State snapshots and rollback</td>
            <td>create, list, get, restore, delete</td>
          </tr>
          <tr>
            <td><code>anchor.audit</code></td>
            <td>Hash-chained audit trail</td>
            <td>query, get, verify, export</td>
          </tr>
        </tbody>
      </table>

      <h2>Framework Integrations</h2>
      
      <h3>LangChain</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`import { AnchorMemory } from 'anchorai';

const memory = new AnchorMemory(anchor, agent.id);
// Use with LangChain chains/agents`}</code></pre>

      <h3>CrewAI</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`import { AnchorCrewMemory } from 'anchorai';

const memory = new AnchorCrewMemory(anchor);
// Use with CrewAI crews`}</code></pre>

      <h3>Mem0</h3>
      <p>
        Anchor wraps Mem0 to add policy enforcement, audit trails, and checkpoints. Mem0 handles 
        semantic memory and retrieval; Anchor adds governance.
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`import { AnchorMem0 } from 'anchorai';

// Wrap Mem0 with Anchor governance
const wrapped = new AnchorMem0(anchor, agent.id, mem0Client);

// Mem0 handles "what does the agent remember?"
// Anchor handles "what is the agent allowed to remember?"
const result = await wrapped.add('User prefers dark mode', { userId: 'user_123' });
console.log(result.allowed);  // true or false based on policies`}</code></pre>

      <h2>Error Handling</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`import {
  AnchorError,
  AuthenticationError,
  NotFoundError,
  ValidationError,
  PolicyViolationError,
  RateLimitError
} from 'anchorai';

try {
  const result = await anchor.data.write(agent.id, 'key', 'value');
} catch (error) {
  if (error instanceof PolicyViolationError) {
    console.log(\`Blocked: \${error.message}\`);
  } else if (error instanceof AuthenticationError) {
    console.log('Invalid API key');
  } else if (error instanceof NotFoundError) {
    console.log('Agent not found');
  } else if (error instanceof RateLimitError) {
    console.log(\`Rate limited. Retry after \${error.retryAfter}s\`);
  }
}`}</code></pre>

      <h2>TypeScript Support</h2>
      <p>
        The SDK includes full TypeScript type definitions. All methods, parameters, and
        return types are fully typed for better IDE support and type safety.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>Node.js 18+</li>
        <li>TypeScript 4.5+ (optional, but recommended)</li>
      </ul>

      <h2>Documentation</h2>
      <p>
        For complete API reference, see the <a href="/api">API documentation</a>.
        For guides and examples, see the <a href="/guides">Guides section</a>.
      </p>
    </div>
  )
}

