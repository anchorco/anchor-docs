export default function DataPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Data</h1>
      <p>
        Governed key-value data storage with policy enforcement. Every write is checked against
        policies before storage, and all operations are logged to the audit trail.
      </p>

      <h2>Write Data</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/agents/:agentId/data</code></p>
      <p>Write data to an agent&apos;s storage. Data is checked against policies before storage.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/agents/agent_abc123/data
Content-Type: application/json
X-API-Key: your-api-key

{
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
      <p><strong>Endpoint:</strong> <code>GET /v1/agents/:agentId/data/:key</code></p>
      <p>Read data by key.</p>

      <h3>Example</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`GET /v1/agents/agent_abc123/data/user:123:preference
X-API-Key: your-api-key`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "key": "user:123:preference",
  "value": "dark_mode",
  "metadata": {
    "source": "conversation"
  },
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}`}</code></pre>

      <h2>List Data</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/agents/:agentId/data</code></p>
      <p>List all data keys for an agent with optional filtering.</p>

      <h3>Query Parameters</h3>
      <ul>
        <li><code>prefix</code> (optional): Filter keys by prefix</li>
        <li><code>limit</code> (optional): Maximum number of results (default: 100, max: 1000)</li>
        <li><code>offset</code> (optional): Pagination offset</li>
        <li><code>full</code> (optional): If <code>true</code>, returns full entries with values (default: <code>false</code>)</li>
      </ul>

      <p className="text-sm text-gray-600">
        <strong>Pagination:</strong> Use <code>has_more</code> to determine if more results exist. If <code>true</code>, 
        use <code>offset = offset + limit</code> to fetch the next page.
      </p>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "data": [
    {
      "key": "user:123:preference",
      "value": "dark_mode"
    }
  ],
  "has_more": false,
  "total": 1
}`}</code></pre>

      <h2>Batch Write Data</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/agents/:agentId/data/batch</code></p>
      <p>Write multiple data entries in a single request. Each entry is checked against policies individually.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/agents/agent_abc123/data/batch
Content-Type: application/json
X-API-Key: your-api-key

{
  "entries": [
    {
      "key": "user:123:name",
      "value": "John",
      "metadata": {"source": "form"}
    },
    {
      "key": "user:123:plan",
      "value": "enterprise"
    }
  ]
}`}</code></pre>

      <p className="text-sm text-gray-600">
        <strong>Note:</strong> Maximum 100 entries per batch. Each entry is policy-checked individually.
      </p>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "results": [
    {
      "key": "user:123:name",
      "allowed": true,
      "audit_id": "aud_xyz1"
    },
    {
      "key": "user:123:plan",
      "allowed": true,
      "audit_id": "aud_xyz2"
    }
  ],
  "summary": {
    "total": 2,
    "allowed": 2,
    "blocked": 0
  }
}`}</code></pre>

      <p>
        If some entries are blocked by policies, they will have <code>allowed: false</code> and <code>blocked_by</code>:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "results": [
    {
      "key": "user:123:name",
      "allowed": true,
      "audit_id": "aud_xyz1"
    },
    {
      "key": "user:123:email",
      "allowed": false,
      "blocked_by": "policy:block_pii",
      "audit_id": "aud_xyz2"
    }
  ],
  "summary": {
    "total": 2,
    "allowed": 1,
    "blocked": 1
  }
}`}</code></pre>

      <h2>Search Data</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/agents/:agentId/data/search</code></p>
      <p>Semantic search across stored data using text similarity.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/agents/agent_abc123/data/search
Content-Type: application/json
X-API-Key: your-api-key

{
  "query": "user preferences",
  "limit": 10
}`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "results": [
    {
      "key": "user:123:preference",
      "value": "dark_mode",
      "similarity": 0.95
    }
  ]
}`}</code></pre>

      <h2>Delete Data</h2>
      <p><strong>Endpoint:</strong> <code>DELETE /v1/agents/:agentId/data/:key</code></p>
      <p>Delete data by key.</p>

      <h3>Example</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`DELETE /v1/agents/agent_abc123/data/user:123:preference
X-API-Key: your-api-key`}</code></pre>

      <h2>Delete Prefix</h2>
      <p><strong>Endpoint:</strong> <code>DELETE /v1/agents/:agentId/data/prefix/:prefix</code></p>
      <p>Delete all data matching a key prefix.</p>

      <h3>Example</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`DELETE /v1/agents/agent_abc123/data/prefix/user:123
X-API-Key: your-api-key`}</code></pre>
    </div>
  )
}

