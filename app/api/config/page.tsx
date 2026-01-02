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
      <p><strong>Endpoint:</strong> <code>GET /v1/config/:agent_id</code></p>
      <p>Get the current configuration for an agent.</p>

      <h2>Update Config</h2>
      <p><strong>Endpoint:</strong> <code>PUT /v1/config/:agent_id</code></p>
      <p>Update agent configuration. Creates a new version.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`PUT /v1/config/:agent_id
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

      <h2>List Versions</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/config/:agent_id/versions</code></p>
      <p>List all configuration versions for an agent.</p>

      <h2>Get Version</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/config/:agent_id/versions/:version</code></p>
      <p>Get a specific configuration version.</p>

      <h2>Rollback Config</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/config/:agent_id/rollback</code></p>
      <p>Rollback to a previous configuration version.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/config/:agent_id/rollback
Content-Type: application/json
X-API-Key: your-api-key

{
  "version": "v1"
}`}</code></pre>
    </div>
  )
}



