export default function ConfigPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Config</h1>
      <p>
        Versioned agent configuration. Store and version agent configurations with rollback
        support. Anchor enforces the <code>policies</code> section, but you can store any
        other configuration fields you need.
      </p>

      <h2>Get Config</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/agents/:agentId/config</code></p>
      <p>Get the current configuration for an agent.</p>

      <h3>Example</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`GET /v1/agents/agent_abc123/config
X-API-Key: your-api-key`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "config": {
    "instructions": "You are a helpful assistant",
    "model": "gpt-4",
    "policies": {
      "block_pii": true,
      "block_secrets": true,
      "retention_days": 90
    }
  },
  "version": "v2",
  "created_at": "2025-01-02T00:00:00Z"
}`}</code></pre>

      <h2>Update Config</h2>
      <p><strong>Endpoint:</strong> <code>PUT /v1/agents/:agentId/config</code></p>
      <p>Update agent configuration. Creates a new version.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`PUT /v1/agents/agent_abc123/config
Content-Type: application/json
X-API-Key: your-api-key

{
  "instructions": "You are a helpful assistant",
  "model": "gpt-4",
  "policies": {
    "block_pii": true,
    "block_secrets": true,
    "retention_days": 90
  }
}`}</code></pre>

      <p className="text-sm text-gray-600">
        <strong>Note:</strong> The API accepts both <code>config</code> and <code>metadata</code> fields. The <code>policies</code> section is enforced by Anchor.
      </p>

      <h2>List Versions</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/agents/:agentId/config/versions</code></p>
      <p>List all configuration versions for an agent.</p>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "data": [
    {
      "version": "v2",
      "created_at": "2025-01-02T00:00:00Z"
    },
    {
      "version": "v1",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ],
  "has_more": false,
  "total": 2
}`}</code></pre>

      <h2>Get Version</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/agents/:agentId/config/versions/:version</code></p>
      <p>Get a specific configuration version.</p>

      <h3>Example</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`GET /v1/agents/agent_abc123/config/versions/v1
X-API-Key: your-api-key`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "config": {
    "instructions": "You are a helpful assistant",
    "model": "gpt-3.5-turbo",
    "policies": {
      "block_pii": true
    }
  },
  "version": "v1",
  "created_at": "2025-01-01T00:00:00Z"
}`}</code></pre>

      <h2>Rollback Config</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/agents/:agentId/config/rollback</code></p>
      <p>Rollback to a previous configuration version.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/agents/agent_abc123/config/rollback
Content-Type: application/json
X-API-Key: your-api-key

{
  "version": "v1"
}`}</code></pre>
    </div>
  )
}







