export default function AuditGuidePage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Audit Guide</h1>
      
      <p className="lead">
        Anchor maintains a hash-chained audit trail of every operation. This provides
        tamper-evident logs for security reviews, compliance, and debugging.
      </p>

      <h2>What is Hash-Chaining?</h2>
      <p>
        Every audit log entry includes:
      </p>
      <ul>
        <li>A cryptographic hash (SHA-256) of the entry</li>
        <li>The hash of the previous entry (creating a chain)</li>
      </ul>
      <p>
        This means if anyone modifies a log entry, all subsequent hashes become invalid.
        You get tamper-evident logs for security reviews.
      </p>

      <h2>Querying Audit Logs</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Query audit events
events = anchor.audit.query(
    agent.id,
    operations=["data.write", "data.delete"],
    limit=100
)

for event in events:
    print(f"{event.timestamp}: {event.operation} on {event.resource}")
    print(f"  Result: {event.result}")  # "allowed" or "blocked"
    print(f"  Hash: {event.hash}")`}</code></pre>

      <h2>Verifying Chain Integrity</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Verify logs haven't been tampered with
verification = anchor.audit.verify(agent.id)

print(verification.valid)          # True = chain intact
print(verification.events_checked) # Number of events verified`}</code></pre>

      <h2>Exporting for Compliance</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Export audit logs for compliance
export = anchor.audit.export(agent.id, format="json")
print(export.download_url)`}</code></pre>

      <h2>Use Cases</h2>
      <ul>
        <li><strong>Security Reviews</strong>: Show what your agent did and prove logs haven&apos;t been tampered with</li>
        <li><strong>Compliance</strong>: Export logs for GDPR, CCPA, or internal audits</li>
        <li><strong>Debugging</strong>: Find when something went wrong and what changed</li>
        <li><strong>Accountability</strong>: Track which agent performed which operations</li>
      </ul>

      <p>
        For more details, see the <a href="/api/audit">Audit API reference</a>.
      </p>
    </div>
  )
}

