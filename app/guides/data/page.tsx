export default function DataGuidePage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Data Storage Guide</h1>
      
      <p className="lead">
        Anchor provides governed key-value data storage with policy enforcement. Every
        write is checked against policies and logged to the audit trail.
      </p>

      <h2>What Goes in Data Storage?</h2>
      <p>
        Agents typically store:
      </p>
      <ul>
        <li><strong>Facts learned from conversations</strong>: &quot;user speaks spanish&quot;, &quot;prefers morning meetings&quot;</li>
        <li><strong>User context</strong>: timezone, communication preferences, past topics</li>
        <li><strong>Task state</strong>: current step, accumulated results, pending actions</li>
        <li><strong>Conversation summaries</strong>: compressed history for context windows</li>
      </ul>

      <h2>Writing Data</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor import Anchor

anchor = Anchor(api_key="anc_...")
agent = anchor.agents.create(name="support-bot")

# Configure policies
anchor.config.update(agent.id, {
    "policies": {
        "block_pii": True,
        "block_secrets": True
    }
})

# Write data (policy-checked)
result = anchor.data.write(agent.id, "user:123:language", "spanish")

if result.allowed:
    print(f"Stored with audit_id: {result.audit_id}")
else:
    print(f"Blocked by {result.blocked_by}: {result.message}")`}</code></pre>

      <h2>What Gets Blocked</h2>
      <p>
        With <code>block_pii</code> and <code>block_secrets</code> policies:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Blocked - email is PII
result = anchor.data.write(agent.id, "user:123:contact", "john@example.com")
# result.allowed = False, result.blocked_by = "policy:block_pii"

# Blocked - API key pattern
result = anchor.data.write(agent.id, "config:api_key", "sk-1234567890abcdef")
# result.allowed = False, result.blocked_by = "policy:block_secrets"

# Allowed - just a fact
result = anchor.data.write(agent.id, "user:123:prefers_dark_mode", "true")
# result.allowed = True`}</code></pre>

      <h2>Reading Data</h2>
      
      <h3>Get by Key</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`value = anchor.data.read(agent.id, "user:123:language")
# Returns: "spanish"`}</code></pre>

      <h3>Read Full Entry</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`entry = anchor.data.read_full(agent.id, "user:123:language")

if entry:
    print(f"Value: {entry.value}")
    print(f"Created: {entry.created_at}")
    print(f"Metadata: {entry.metadata}")`}</code></pre>

      <h3>List Keys</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# All keys for a prefix
keys = anchor.data.list(agent.id, prefix="user:123:")

# Pagination
keys = anchor.data.list(agent.id, limit=50, offset=100)`}</code></pre>

      <h3>Search</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Semantic search across stored data
results = anchor.data.search(agent.id, "user preferences", limit=5)

for r in results:
    print(f"{r.key}: {r.value} (similarity: {r.similarity})")`}</code></pre>

      <h2>Key Naming Conventions</h2>
      <p>
        Use a consistent naming scheme:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Pattern: {entity_type}:{entity_id}:{attribute}

# User facts
"user:123:language"
"user:123:timezone"
"user:123:meeting_preference"

# Session/conversation context
"session:abc:summary"
"session:abc:last_topic"

# Task state
"task:456:status"
"task:456:current_step"`}</code></pre>

      <h2>Batch Operations</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Write multiple items at once
results = anchor.data.write_batch(agent.id, [
    {"key": "user:123:name", "value": "John"},
    {"key": "user:123:plan", "value": "enterprise"}
])

for result in results:
    if result.allowed:
        print(f"Stored: {result.key}")
    else:
        print(f"Blocked: {result.key} - {result.blocked_by}")`}</code></pre>

      <h2>Deleting Data</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Delete a single key
anchor.data.delete(agent.id, "user:123:language")

# Delete all keys with a prefix
anchor.data.delete_prefix(agent.id, "session:abc:")`}</code></pre>

      <h2>TypeScript Example</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`import { Anchor } from 'anchorai';

const anchor = new Anchor({ apiKey: 'anc_...' });
const agent = await anchor.agents.create('support-bot');

// Configure policies
await anchor.config.update(agent.id, {
  policies: {
    block_pii: true,
    block_secrets: true
  }
});

// Write data
const result = await anchor.data.write(agent.id, 'user:123:language', 'spanish');
if (result.allowed) {
  console.log(\`Stored: \${result.auditId}\`);
} else {
  console.log(\`Blocked: \${result.blockedBy}\`);
}

// Read data
const value = await anchor.data.read(agent.id, 'user:123:language');

// Search
const results = await anchor.data.search(agent.id, 'user preferences', { limit: 5 });`}</code></pre>

      <h2>Memory vs Data Storage</h2>
      <p>
        You might be wondering: <strong>What&apos;s the difference between &quot;memory&quot; and &quot;data storage&quot;?</strong>
      </p>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
        <p className="mb-0">
          <strong>Anchor&apos;s perspective:</strong> Anchor provides <strong>governed data storage</strong> with policy enforcement, 
          audit trails, and checkpoints. We use the term &quot;data&quot; to emphasize that Anchor is a <strong>governance layer</strong>, 
          not a memory framework.
        </p>
      </div>

      <h3>How Anchor Works with Memory Frameworks</h3>
      <p>
        Anchor works <strong>above</strong> memory frameworks like Mem0, LangChain Memory, and CrewAI:
      </p>
      <ul>
        <li><strong>Memory frameworks</strong> answer: &quot;What does the agent remember?&quot;</li>
        <li><strong>Anchor</strong> answers: &quot;What is the agent allowed to remember, and can you prove it?&quot;</li>
      </ul>

      <h3>Example: Mem0 Integration</h3>
      <p>
        When you use Mem0 with Anchor, Anchor wraps Mem0 to add governance:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor import Anchor
from anchor.integrations.mem0 import AnchorMem0
from mem0 import Memory

anchor = Anchor(api_key="anc_...")
agent = anchor.agents.create("mem0-agent")

# Configure policies
anchor.config.update(agent.id, {
    "policies": {"block_pii": True, "block_secrets": True}
})

# Wrap Mem0 with Anchor governance
mem0_client = Memory()
wrapped = AnchorMem0(anchor=anchor, agent_id=agent.id, mem0_client=mem0_client)

# Mem0 handles semantic memory, retrieval, etc.
# Anchor adds: policy enforcement, audit trails, checkpoints
result = wrapped.add("User email is john@example.com", user_id="user_123")
if not result.allowed:
    print(f"Blocked by Anchor: {result.blocked_by}")  # PII detected
else:
    print("Stored in Mem0 with Anchor governance")`}</code></pre>

      <h3>What Anchor Adds</h3>
      <ul>
        <li><strong>Policy Enforcement</strong> - Blocks PII, secrets before memory frameworks store them</li>
        <li><strong>Audit Trail</strong> - Hash-chained logs of all memory operations</li>
        <li><strong>Checkpoints</strong> - Snapshot and rollback memory state</li>
        <li><strong>Retention Policies</strong> - Auto-delete memories after N days</li>
        <li><strong>Compliance</strong> - Export and deletion certificates</li>
      </ul>

      <p>
        <strong>In summary:</strong> Anchor doesn&apos;t replace memory frameworks—it governs them. Use Mem0/LangChain/CrewAI 
        for semantic memory and retrieval, and Anchor for policy enforcement, audit trails, and compliance.
      </p>

      <p>
        For more details, see the <a href="/guides/policies">Policies guide</a> and
        the <a href="/api/data">Data API reference</a>.
      </p>
    </div>
  )
}

