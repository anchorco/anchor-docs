export default function CheckpointsPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Checkpoints</h1>
      <p>
        State snapshots and rollback functionality. Create checkpoints before risky operations,
        and restore to previous states if something goes wrong.
      </p>

      <h2>Create Checkpoint</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/agents/:agentId/checkpoints</code></p>
      <p>Create a snapshot of the current agent state.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/agents/agent_abc123/checkpoints
Content-Type: application/json
X-API-Key: your-api-key

{
  "label": "before-migration",
  "description": "Pre-migration backup"
}`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "checkpoint": {
    "checkpoint_id": "cp_xyz789",
    "agent_id": "agent_abc123",
    "label": "before-migration",
    "key_count": 42,
    "created_at": "2025-01-01T00:00:00Z"
  }
}`}</code></pre>

      <h2>List Checkpoints</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/agents/:agentId/checkpoints</code></p>
      <p>List all checkpoints for an agent.</p>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "data": [
    {
      "checkpoint_id": "cp_xyz789",
      "label": "before-migration",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ],
  "has_more": false,
  "total": 1
}`}</code></pre>

      <h2>Get Checkpoint</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/agents/:agentId/checkpoints/:checkpointId</code></p>
      <p>Get a specific checkpoint with all saved state.</p>

      <h3>Example</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`GET /v1/agents/agent_abc123/checkpoints/cp_xyz789
X-API-Key: your-api-key`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "checkpoint": {
    "checkpoint_id": "cp_xyz789",
    "agent_id": "agent_abc123",
    "label": "before-migration",
    "description": "Pre-migration backup",
    "key_count": 42,
    "total_size_bytes": 10240,
    "created_at": "2025-01-01T00:00:00Z",
    "config_version": "v2",
    "data_snapshot": [
      {
        "key": "user:123:preference",
        "value": "dark_mode"
      }
    ]
  }
}`}</code></pre>

      <h2>Restore Checkpoint</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/agents/:agentId/checkpoints/:checkpointId/restore</code></p>
      <p>Restore agent state to a previous checkpoint. This will replace current data with the checkpoint snapshot.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/agents/agent_abc123/checkpoints/cp_xyz789/restore
Content-Type: application/json
X-API-Key: your-api-key`}</code></pre>

      <h3>Response</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "restore": {
    "checkpoint_id": "cp_xyz789",
    "entries_restored": 42,
    "entries_removed": 5,
    "restored_at": "2025-01-01T00:00:00Z"
  }
}`}</code></pre>
    </div>
  )
}







