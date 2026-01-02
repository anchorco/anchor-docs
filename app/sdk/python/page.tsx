export default function PythonSdkPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Python SDK</h1>
      
      <p className="lead">
        The Anchor Python SDK provides a full-featured client for the Anchor API with support
        for framework integrations, type hints, and comprehensive error handling.
      </p>

      <h2>Installation</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>pip install anchorai</code></pre>

      <p>
        For framework integrations:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`pip install anchorai[langchain]  # LangChain
pip install anchorai[crewai]     # CrewAI
pip install anchorai[mem0]       # Mem0
pip install anchorai[all]        # All integrations`}</code></pre>

      <h2>Quick Start</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor import Anchor

anchor = Anchor(api_key="your-api-key")

# Create an agent
agent = anchor.agents.create("support-bot", metadata={"environment": "production"})

# Configure policies
anchor.config.update(agent.id, {
    "policies": {
        "block_pii": True,
        "block_secrets": True,
        "retention_days": 90
    }
})

# Store data (policy-checked, audit-logged)
result = anchor.data.write(agent.id, "user:123:preference", "dark_mode")
print(result.allowed)  # True

# PII is blocked automatically
result = anchor.data.write(agent.id, "user:123:ssn", "123-45-6789")
print(result.allowed)     # False
print(result.blocked_by)  # "policy:block_pii"

# Verify audit chain integrity
verification = anchor.audit.verify(agent.id)
print(verification.valid)  # True`}</code></pre>

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
            <td>get, update, versions, get_version, rollback</td>
          </tr>
          <tr>
            <td><code>anchor.data</code></td>
            <td>Governed key-value data storage</td>
            <td>write, write_batch, read, read_full, delete, delete_prefix, list, search</td>
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
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor.integrations.langchain import AnchorMemory

memory = AnchorMemory(anchor=anchor, agent_id=agent.id)
# Use with LangChain chains/agents`}</code></pre>

      <h3>CrewAI</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor.integrations.crewai import AnchorCrewMemory

memory = AnchorCrewMemory(anchor=anchor)
# Use with CrewAI crews`}</code></pre>

      <h3>Mem0</h3>
      <p>
        Anchor wraps Mem0 to add policy enforcement, audit trails, and checkpoints. Mem0 handles 
        semantic memory and retrieval; Anchor adds governance.
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor.integrations.mem0 import AnchorMem0
from mem0 import Memory

# Wrap Mem0 with Anchor governance
wrapped = AnchorMem0(anchor=anchor, agent_id=agent.id, mem0_client=Memory())

# Mem0 handles "what does the agent remember?"
# Anchor handles "what is the agent allowed to remember?"
result = wrapped.add("User prefers dark mode", user_id="user_123")
print(result.allowed)  # True or False based on policies`}</code></pre>

      <h2>Error Handling</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor import (
    AnchorError,
    AuthenticationError,
    NotFoundError,
    ValidationError,
    PolicyViolationError,
    RateLimitError
)

try:
    result = anchor.data.write(agent.id, "key", "value")
except PolicyViolationError as e:
    print(f"Blocked: {e.message}")
except AuthenticationError:
    print("Invalid API key")
except NotFoundError:
    print("Agent not found")
except RateLimitError as e:
    print(f"Rate limited. Retry after {e.retry_after}s")`}</code></pre>

      <h2>Requirements</h2>
      <ul>
        <li>Python 3.8+</li>
        <li>requests &gt;= 2.28.0</li>
      </ul>

      <h2>Documentation</h2>
      <p>
        For complete API reference, see the <a href="/api">API documentation</a>.
        For guides and examples, see the <a href="/guides">Guides section</a>.
      </p>
    </div>
  )
}

