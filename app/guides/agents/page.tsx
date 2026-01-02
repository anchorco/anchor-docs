export default function AgentsGuidePage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Agents Guide</h1>
      
      <p className="lead">
        Agents in Anchor represent AI entities with persistent identity, lifecycle management,
        and associated resources. Every agent has a unique ID that follows it across sessions,
        deployments, and infrastructure.
      </p>

      <h2>What is an Agent?</h2>
      <p>
        An agent is a registered AI entity with:
      </p>
      <ul>
        <li><strong>Unique identity</strong>: Persistent ID that never changes</li>
        <li><strong>Metadata</strong>: Name, description, owner, tags</li>
        <li><strong>Lifecycle state</strong>: Active, suspended, or deleted</li>
        <li><strong>Associated resources</strong>: Data, permissions, audit logs</li>
      </ul>

      <h2>Creating Agents</h2>
      
      <h3>Basic Agent</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor import Anchor

anchor = Anchor(api_key="anc_...")

# Create an agent
agent = anchor.agents.create(name="my-agent")
print(f"ID: {agent.id}")`}</code></pre>

      <h3>Agent with Metadata</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`agent = anchor.agents.create(
    name="support-bot",
    description="Handles customer support inquiries",
    owner="team:support",
    tags=["production", "customer-facing"],
    metadata={
        "version": "2.0",
        "model": "gpt-4",
        "department": "support"
    }
)`}</code></pre>

      <h2>Getting Agents</h2>
      
      <h3>Get by ID</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`agent = anchor.agents.get("agt_abc123")

if agent:
    print(f"Name: {agent.name}")
    print(f"Status: {agent.status}")`}</code></pre>

      <h3>List Agents</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# List all agents
agents = anchor.agents.list()

# Filter by status
active_agents = anchor.agents.list(status="active")

# Filter by owner
team_agents = anchor.agents.list(owner="team:support")`}</code></pre>

      <h2>Agent Lifecycle</h2>
      <p>
        Agents go through these states: <code>created → active ↔ suspended → deleted</code>
      </p>

      <h3>Suspend an Agent</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Suspend - agent can't act but data is preserved
anchor.agents.suspend(agent.id)

# Check status
agent = anchor.agents.get(agent.id)
print(agent.status)  # "suspended"`}</code></pre>

      <h3>Activate an Agent</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`anchor.agents.activate(agent.id)

agent = anchor.agents.get(agent.id)
print(agent.status)  # "active"`}</code></pre>

      <h3>Delete an Agent</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Delete agent and associated resources
anchor.agents.delete(agent.id)

# Optionally keep audit logs
anchor.agents.delete(agent.id, preserve_audit=True)`}</code></pre>

      <h2>Best Practices</h2>
      <ul>
        <li>Use descriptive names (e.g., "customer-support-v2" not "agent1")</li>
        <li>Set owners to track responsibility</li>
        <li>Use tags for organization (environment, purpose, version)</li>
        <li>Store relevant metadata (version, model, framework, department)</li>
        <li>Handle errors gracefully</li>
        <li>Clean up unused agents regularly</li>
      </ul>

      <h2>TypeScript Example</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`import { Anchor } from 'anchorai';

const anchor = new Anchor({ apiKey: 'anc_...' });

// Create agent
const agent = await anchor.agents.create({
  name: 'support-bot',
  description: 'Customer support agent',
  owner: 'team:support',
  tags: ['production']
});

console.log(\`Agent ID: \${agent.id}\`);

// Get agent
const fetched = await anchor.agents.get(agent.id);

// List agents
const agents = await anchor.agents.list({ status: 'active' });

// Suspend/activate
await anchor.agents.suspend(agent.id);
await anchor.agents.activate(agent.id);

// Delete agent
await anchor.agents.delete(agent.id);`}</code></pre>

      <p>
        For more details, see the <a href="/api/agents">API reference</a>.
      </p>
    </div>
  )
}

