export default function StateGuidePage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>State & Checkpoints Guide</h1>
      
      <p className="lead">
        State checkpoints let you save and restore agent data at any point. This is essential
        for recovering from corrupted outputs, debugging issues, and auditing what changed.
      </p>

      <h2>The Problem</h2>
      <p>
        Without checkpoints:
      </p>
      <ul>
        <li>Agent writes bad data → data corrupted</li>
        <li>No way to see what changed</li>
        <li>No way to roll back</li>
        <li>Weeks of work lost</li>
      </ul>

      <p>
        With checkpoints:
      </p>
      <ul>
        <li>Agent writes bad data</li>
        <li>You identify the issue in audit logs</li>
        <li>Roll back to the checkpoint before corruption</li>
        <li>Continue from known-good state</li>
      </ul>

      <h2>Creating Checkpoints</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor import Anchor

anchor = Anchor(api_key="anc_...")

# Create a checkpoint before risky operations
checkpoint = anchor.checkpoints.create(
    agent_id="agent-123",
    label="before-migration"  # Optional human-readable label
)

print(f"Checkpoint ID: {checkpoint.id}")
print(f"Created: {checkpoint.created_at}")
print(f"Data entries: {checkpoint.entry_count}")`}</code></pre>

      <h2>When to Checkpoint</h2>
      <p>
        Create checkpoints at natural boundaries:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Before batch operations
checkpoint = anchor.checkpoints.create(agent.id, label="pre-batch-import")
try:
    for item in large_dataset:
        anchor.data.write(agent.id, item.key, item.value)
except Exception:
    anchor.checkpoints.restore(agent.id, checkpoint.id)
    raise

# Before deployments
checkpoint = anchor.checkpoints.create(agent.id, label="pre-deploy-v2.1")
deploy_new_agent_version()

# Daily automatic checkpoints
checkpoint = anchor.checkpoints.create(agent.id, label=f"daily-{date.today()}")`}</code></pre>

      <h2>Rolling Back</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Roll back to a specific checkpoint
result = anchor.checkpoints.restore(
    agent_id="agent-123",
    checkpoint_id="chk_abc123"
)

print(f"Rolled back to: {result.checkpoint_id}")
print(f"Entries restored: {result.entries_restored}")
print(f"Entries removed: {result.entries_removed}")`}</code></pre>

      <h2>Safe Operations Pattern</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`def safe_batch_operation(agent_id: str, items: list):
    # 1. Create checkpoint
    checkpoint = anchor.checkpoints.create(agent_id, label="pre-batch")

    try:
        # 2. Perform operation
        for item in items:
            anchor.data.write(agent_id, item.key, item.value)

        # 3. Verify results
        if not verify_data_integrity(agent_id):
            raise ValueError("Data integrity check failed")

    except Exception as e:
        # 4. Rollback on failure
        anchor.checkpoints.restore(agent_id, checkpoint.id)
        raise RuntimeError(f"Batch failed, rolled back: {e}")`}</code></pre>

      <h2>Comparing Checkpoints</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# List checkpoints
checkpoints = anchor.checkpoints.list(agent.id)

for cp in checkpoints:
    print(f"{cp.id}: {cp.label} ({cp.created_at})")
    # Get checkpoint details to compare
    details = anchor.checkpoints.get(agent.id, cp.id)`}</code></pre>

      <h2>Best Practices</h2>
      <ul>
        <li>Checkpoint before risky operations (batch imports, deployments, experiments)</li>
        <li>Use descriptive labels (e.g., &quot;pre-deploy-v2.1&quot; not &quot;backup&quot;)</li>
        <li>Set up retention policies to avoid keeping checkpoints forever</li>
        <li>Verify after rollback to ensure it worked correctly</li>
        <li>Document rollbacks in audit logs</li>
      </ul>

      <p>
        For more details, see the <a href="/api/checkpoints">Checkpoints API reference</a>.
      </p>
    </div>
  )
}

