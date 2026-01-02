export default function DataPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Data</h1>
      <p>
        Governed key-value data storage with policy enforcement. Every write is checked against
        policies before storage, and all operations are logged to the audit trail.
      </p>

      <h2>Write Data</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/data/write</code></p>
      <p>Write data to an agent&apos;s storage. Data is checked against policies before storage.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/data/write
Content-Type: application/json
X-API-Key: your-api-key

{
  "agent_id": "agt_abc123",
  "key": "user:123:preference",
  "value": "dark_mode",
  "metadata": {
    "source": "conversation",
    "confidence": 0.9
  }
}`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "allowed": true,
  "audit_id": "aud_xyz789",
  "message": "Data stored successfully"
}`}</code></pre>

      <p>
        If the write is blocked by a policy:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "allowed": false,
  "blocked_by": "policy:block_pii",
  "message": "Email address detected"
}`}</code></pre>

      <h2>Read Data</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/data/read</code></p>
      <p>Read data by key.</p>

      <h3>Query Parameters</h3>
      <ul>
        <li><code>agent_id</code> (required): Agent ID</li>
        <li><code>key</code> (required): Data key</li>
      </ul>

      <h2>Read Full Entry</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/data/read-full</code></p>
      <p>Read data with full metadata.</p>

      <h2>List Data</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/data/list</code></p>
      <p>List all data keys for an agent with optional filtering.</p>

      <h3>Query Parameters</h3>
      <ul>
        <li><code>agent_id</code> (required): Agent ID</li>
        <li><code>prefix</code> (optional): Filter keys by prefix</li>
        <li><code>limit</code> (optional): Maximum number of results (default: 100)</li>
        <li><code>offset</code> (optional): Pagination offset</li>
      </ul>

      <h2>Search Data</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/data/search</code></p>
      <p>Semantic search across stored data using text similarity.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/data/search
Content-Type: application/json

{
  "agent_id": "agt_abc123",
  "query": "user preferences",
  "limit": 10
}`}</code></pre>

      <h2>Delete Data</h2>
      <p><strong>Endpoint:</strong> <code>DELETE /v1/data</code></p>
      <p>Delete data by key.</p>

      <h2>Delete Prefix</h2>
      <p><strong>Endpoint:</strong> <code>DELETE /v1/data/prefix</code></p>
      <p>Delete all data matching a key prefix.</p>
    </div>
  )
}

