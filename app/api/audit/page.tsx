export default function AuditPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Audit</h1>
      <p>
        Hash-chained audit trail for compliance and debugging. Every operation is logged with
        cryptographic verification for tamper-evident logs.
      </p>

      <h2>Query Audit Events</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/agents/:agentId/audit</code></p>
      <p>Query audit events with filtering and pagination.</p>

      <h3>Query Parameters</h3>
      <ul>
        <li><code>operations</code> (optional): Filter by operation types (comma-separated)</li>
        <li><code>limit</code> (optional): Maximum number of results (default: 100)</li>
        <li><code>offset</code> (optional): Pagination offset</li>
        <li><code>start_time</code> (optional): Start time for filtering (ISO 8601)</li>
        <li><code>end_time</code> (optional): End time for filtering (ISO 8601)</li>
      </ul>

      <h3>Example</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`GET /v1/agents/agent_abc123/audit?limit=10&operations=data.write
X-API-Key: your-api-key`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "data": [
    {
      "entry_id": "aud_xyz789",
      "operation": "data.write",
      "result": "allowed",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ],
  "has_more": false,
  "total": 1
}`}</code></pre>

      <h2>Get Audit Event</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/agents/:agentId/audit/:auditId</code></p>
      <p>Get a specific audit event by ID.</p>

      <h3>Example</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`GET /v1/agents/agent_abc123/audit/aud_xyz789
X-API-Key: your-api-key`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "event": {
    "entry_id": "aud_xyz789",
    "agent_id": "agent_abc123",
    "operation": "data.write",
    "result": "allowed",
    "resource": "user:123:preference",
    "created_at": "2025-01-01T00:00:00Z",
    "previous_hash": "abc123...",
    "hash": "def456..."
  }
}`}</code></pre>

      <h2>Verify Chain Integrity</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/agents/:agentId/audit/verify</code></p>
      <p>Verify that the audit chain hasn&apos;t been tampered with.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/agents/agent_abc123/audit/verify
Content-Type: application/json
X-API-Key: your-api-key`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "valid": true,
  "events_checked": 150,
  "chain_intact": true
}`}</code></pre>

      <h2>Export Audit Logs</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/agents/:agentId/audit/export</code></p>
      <p>Export audit logs for compliance reporting.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/agents/agent_abc123/audit/export
Content-Type: application/json
X-API-Key: your-api-key

{
  "format": "json",
  "start_time": "2025-01-01T00:00:00Z",
  "end_time": "2025-01-31T23:59:59Z"
}`}</code></pre>
    </div>
  )
}

