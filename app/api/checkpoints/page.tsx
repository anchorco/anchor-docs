export default function CheckpointsPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Checkpoints</h1>
      <p>
        State snapshots and rollback functionality. Create checkpoints before risky operations,
        and restore to previous states if something goes wrong.
      </p>

      <h2>Create Checkpoint</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/checkpoints</code></p>
      <p>Create a snapshot of the current agent state.</p>

      <h3>Request</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`POST /v1/checkpoints
Content-Type: application/json
X-API-Key: your-api-key

{
  "agent_id": "agt_abc123",
  "label": "before-migration",
  "metadata": {
    "reason": "Pre-migration backup"
  }
}`}</code></pre>

      <h2>List Checkpoints</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/checkpoints</code></p>
      <p>List all checkpoints for an agent.</p>

      <h2>Get Checkpoint</h2>
      <p><strong>Endpoint:</strong> <code>GET /v1/checkpoints/:id</code></p>
      <p>Get a specific checkpoint with all saved state.</p>

      <h2>Restore Checkpoint</h2>
      <p><strong>Endpoint:</strong> <code>POST /v1/checkpoints/:id/restore</code></p>
      <p>Restore agent state to a previous checkpoint.</p>
    </div>
  )
}



