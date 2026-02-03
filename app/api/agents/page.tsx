export default function AgentsPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Agents</h1>
      <p>
        Agents represent AI entities with persistent identity, lifecycle management, and associated resources.
        Every agent has a unique ID that follows it across sessions, deployments, and infrastructure.
      </p>

      <h2>Create Agent</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/agents</code></p>
      <p>Create a new agent with metadata and configuration.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/agents
Content-Type: application/json
X-API-Key: your-api-key

{
  "name": "support-bot",
  "description": "Customer support agent",
  "metadata": {
    "version": "2.0",
    "model": "gpt-4"
  }
}`}</code></pre>

      <p className="text-sm text-gray-600">
        <strong>Note:</strong> The <code>metadata</code> field is accepted (SDK format). The API also accepts <code>config</code> as an alias.
      </p>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "agent": {
    "agent_id": "agent_abc123",
    "name": "support-bot",
    "description": "Customer support agent",
    "status": "active",
    "config": {
      "version": "2.0",
      "model": "gpt-4"
    },
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}`}</code></pre>

      <h2>Get Agent</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/agents/:id</code></p>
      <p>Retrieve a specific agent by ID.</p>

      <h3>Example</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`GET /v1/agents/agent_abc123
X-API-Key: your-api-key`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "agent": {
    "agent_id": "agent_abc123",
    "name": "support-bot",
    "description": "Customer support agent",
    "status": "active",
    "config": {
      "version": "2.0",
      "model": "gpt-4"
    },
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}`}</code></pre>

      <h2>List Agents</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/agents</code></p>
      <p>List all agents with optional filtering.</p>

      <h3>Query Parameters</h3>
      <ul>
        <li><code>status</code> (optional): Filter by status (<code>active</code>, <code>suspended</code>)</li>
        <li><code>limit</code> (optional): Maximum number of results (default: 100, max: 1000)</li>
        <li><code>offset</code> (optional): Pagination offset</li>
      </ul>

      <p className="text-sm text-gray-600">
        <strong>Pagination:</strong> Use <code>has_more</code> to determine if more results exist. If <code>true</code>, 
        use <code>offset = offset + limit</code> to fetch the next page.
      </p>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "data": [
    {
      "agent_id": "agent_abc123",
      "name": "support-bot",
      "status": "active",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ],
  "has_more": false,
  "total": 1
}`}</code></pre>

      <h2>Update Agent</h2>
      <p><strong>Endpoint:</strong> <code>PATCH /v1/agents/:id</code></p>
      <p>Update agent metadata and configuration.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`PATCH /v1/agents/agent_abc123
Content-Type: application/json
X-API-Key: your-api-key

{
  "name": "updated-name",
  "description": "Updated description",
  "metadata": {
    "version": "2.1"
  }
}`}</code></pre>

      <h2>Suspend Agent</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/agents/:id/suspend</code></p>
      <p>Temporarily disable an agent. A suspended agent cannot access data or use tools, but all data is preserved.</p>

      <h2>Activate Agent</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/agents/:id/activate</code></p>
      <p>Re-enable a suspended agent.</p>

      <h2>Delete Agent</h2>
      <p><strong>Endpoint:</strong> <code>DELETE /v1/agents/:id</code></p>
      <p>Permanently remove an agent and all associated data.</p>

      <h3>Query Parameters</h3>
      <ul>
        <li><code>preserve_audit</code> (optional): If <code>true</code>, preserve audit logs after deletion</li>
      </ul>
    </div>
  )
}

