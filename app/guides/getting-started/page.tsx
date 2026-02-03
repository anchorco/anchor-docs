export default function GettingStartedPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Getting Started</h1>
      
      <p className="lead">
        Get started with Anchor in minutes. This guide will walk you through creating your
        first agent, configuring policies, and storing data with automatic enforcement.
      </p>

      <h2>1. Get an API Key</h2>
      <p>
        Sign up at <a href="https://getanchor.dev" target="_blank" rel="noopener noreferrer">getanchor.dev</a> to get your API key.
      </p>
      <p>
        <strong>Important:</strong> Your API key is shown only once during signup. Copy it immediately and store it securely!
      </p>

      <h2>2. Install the SDK</h2>
      
      <h3>Python</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>pip install anchorai</code></pre>

      <h3>TypeScript/JavaScript</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>npm install anchorai</code></pre>

      <h2>3. Create Your First Agent</h2>
      
      <h3>Python</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor import Anchor

anchor = Anchor(api_key="your-api-key")

# Create an agent
agent = anchor.agents.create("support-bot", metadata={"environment": "production"})

print(f"Agent ID: {agent.id}")`}</code></pre>

      <h3>TypeScript</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`import { Anchor } from 'anchorai';

const anchor = new Anchor({ apiKey: 'your-api-key' });

// Create an agent
const agent = await anchor.agents.create('support-bot', { environment: 'production' });

console.log(\`Agent ID: \${agent.id}\`);`}</code></pre>

      <h2>4. Configure Policies</h2>
      <p>
        Policies automatically block certain data from being stored. Configure policies to
        prevent PII, secrets, and other sensitive data.
      </p>

      <h3>Python</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`anchor.config.update(agent.id, {
    "policies": {
        "block_pii": True,
        "block_secrets": True,
        "retention_days": 90
    }
})`}</code></pre>

      <h3>TypeScript</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`await anchor.config.update(agent.id, {
  policies: {
    block_pii: true,
    block_secrets: true,
    retention_days: 90
  }
});`}</code></pre>

      <h2>5. Store Data</h2>
      <p>
        Store data with automatic policy enforcement. Anchor checks every write against your
        policies before storage.
      </p>

      <h3>Python</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Allowed - just a preference
result = anchor.data.write(agent.id, "user:123:preference", "dark_mode")
print(result.allowed)  # True

# Blocked - email is PII
result = anchor.data.write(agent.id, "user:123:email", "john@example.com")
print(result.allowed)     # False
print(result.blocked_by)  # "policy:block_pii"`}</code></pre>

      <h3>TypeScript</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`// Allowed - just a preference
const result = await anchor.data.write(agent.id, 'user:123:preference', 'dark_mode');
console.log(result.allowed);  // true

// Blocked - email is PII
const blocked = await anchor.data.write(agent.id, 'user:123:email', 'john@example.com');
console.log(blocked.allowed);     // false
console.log(blocked.blockedBy);   // "policy:block_pii"`}</code></pre>

      <h2>6. Verify Audit Trail</h2>
      <p>
        Every operation is logged to the audit trail. Verify the integrity of your audit logs.
      </p>

      <h3>Python</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`verification = anchor.audit.verify(agent.id)
print(verification.valid)  # True if chain intact`}</code></pre>

      <h3>TypeScript</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`const verification = await anchor.audit.verify(agent.id);
console.log(verification.valid);  // true if chain intact`}</code></pre>

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/guides/agents">Learn more about agents</a></li>
        <li><a href="/guides/policies">Explore policy options</a></li>
        <li><a href="/guides/data">Understand data storage</a></li>
        <li><a href="/api">Browse the API reference</a></li>
      </ul>
    </div>
  )
}

