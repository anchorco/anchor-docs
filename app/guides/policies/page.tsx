export default function PoliciesGuidePage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Policies Guide</h1>
      
      <p className="lead">
        Policies are rules that automatically block certain data from being stored. When you
        write data using <code>anchor.data.write()</code>, Anchor checks the data against your policies before storing.
      </p>

      <h2>Why Policies?</h2>
      <p>
        Without policies, agents can accidentally store:
      </p>
      <ul>
        <li>Email addresses, phone numbers, SSNs (PII)</li>
        <li>API keys, passwords, tokens (secrets)</li>
        <li>Data that should have been deleted months ago</li>
      </ul>
      <p>
        Policies enforce these rules automatically when you write data using <code>anchor.data.write()</code>.
      </p>

      <h2>Using Policies</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor import Anchor

anchor = Anchor(api_key="anc_...")
agent = anchor.agents.create("support-bot")

# Configure policies
anchor.config.update(agent.id, {
    "policies": {
        "block_pii": True,
        "block_secrets": True
    }
})

# Allowed - just a fact
result = anchor.data.write(agent.id, "user:123:language", "spanish")
print(result.allowed)  # True

# Blocked - email is PII
result = anchor.data.write(agent.id, "user:123:email", "john@example.com")
print(result.allowed)     # False
print(result.blocked_by)  # "policy:block_pii"`}</code></pre>

      <h2>Built-in Policies</h2>
      
      <h3>no-pii - Block Personally Identifiable Information</h3>
      <p>
        Detects and blocks:
      </p>
      <ul>
        <li>Email addresses (<code>john@example.com</code>)</li>
        <li>Phone numbers (<code>555-123-4567</code>, <code>+1-555-123-4567</code>)</li>
        <li>Social Security Numbers (<code>123-45-6789</code>)</li>
        <li>Credit card numbers</li>
        <li>Physical addresses</li>
        <li>Names when clearly identifiable</li>
      </ul>

      <h3>no-secrets - Block Credentials and Secrets</h3>
      <p>
        Detects and blocks:
      </p>
      <ul>
        <li>API keys (<code>sk-abc123...</code>, <code>AKIA...</code>)</li>
        <li>Bearer tokens (<code>Bearer eyJ...</code>)</li>
        <li>Passwords and password-like strings</li>
        <li>Private keys (<code>-----BEGIN RSA PRIVATE KEY-----</code>)</li>
        <li>Connection strings with credentials</li>
        <li>OAuth tokens</li>
      </ul>

      <h3>retention_days - Auto-delete After N Days</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Configure retention policy
anchor.config.update(agent.id, {
    "policies": {
        "retention_days": 30
    }
})

# This entry will be automatically deleted after 30 days
anchor.data.write(agent.id, "session:abc:context", "discussed pricing options")`}</code></pre>

      <h3>retention-90d - Auto-delete After 90 Days</h3>
      <p>
        Same as above, but 90-day retention.
      </p>

      <h2>Combining Policies</h2>
      <p>
        You can combine multiple policies. All must pass for data to be stored:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`memory = anchor.memory.create(
    agent_id="agent-123",
    policies=["no-pii", "no-secrets", "retention-30d"]
)

# Must pass ALL three:
# 1. no-pii: Is there PII? No → pass
# 2. no-secrets: Is there a secret? No → pass
# 3. retention-30d: Set 30-day expiry → done

result = memory.write("user:123:prefers_morning", "true")
# Allowed, will auto-delete in 30 days`}</code></pre>

      <h2>Common Patterns</h2>
      
      <h3>Strict Mode (Default for Production)</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`anchor.config.update(agent.id, {
    "policies": {
        "block_pii": True,
        "block_secrets": True,
        "retention_days": 30
    }
})`}</code></pre>

      <h3>Long-term Storage</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`anchor.config.update(agent.id, {
    "policies": {
        "block_pii": True,
        "block_secrets": True,
        "retention_days": 90
    }
})`}</code></pre>

      <h3>Session-only</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`anchor.config.update(agent.id, {
    "policies": {
        "retention_days": 30
    }
})`}</code></pre>

      <p>
        For more details, see the <a href="/api/data">Data API reference</a>.
      </p>
    </div>
  )
}

