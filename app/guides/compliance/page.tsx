export default function ComplianceGuidePage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Compliance Guide</h1>
      
      <p className="lead">
        Anchor provides tools for GDPR, CCPA, AI Act, and other regulatory compliance.
        Export user data, delete on request, and generate compliance reports.
      </p>

      <h2>Data Export</h2>
      <p>
        Export all data for a user or subject:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Export all data for a user
export = anchor.compliance.get_user_data("user@example.com")

# Export in different formats
export_json = anchor.compliance.get_user_data("user@example.com", format="json")
export_csv = anchor.compliance.get_user_data("user@example.com", format="csv")`}</code></pre>

      <h2>Data Deletion</h2>
      <p>
        Delete all data for a user with cryptographic proof:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Delete all data for a user (with cryptographic proof)
certificate = anchor.compliance.delete_user_data("user@example.com")

print(f"Certificate ID: {certificate.id}")  # Proof of deletion
print(f"Deleted at: {certificate.deleted_at}")
print(f"Data points deleted: {certificate.data_points_deleted}")`}</code></pre>

      <h2>Compliance Reports</h2>
      <p>
        Generate compliance reports for various regulations:
      </p>
      <ul>
        <li><strong>GDPR</strong>: Right to access, right to erasure, data portability</li>
        <li><strong>CCPA</strong>: California Consumer Privacy Act compliance</li>
        <li><strong>AI Act</strong>: EU AI Act compliance reporting</li>
      </ul>

      <h2>Best Practices</h2>
      <ul>
        <li>Respond to data requests within required timeframes (e.g., 30 days for GDPR)</li>
        <li>Store deletion certificates as proof of compliance</li>
        <li>Regularly audit your data retention policies</li>
        <li>Use policy enforcement to prevent storing unnecessary PII</li>
        <li>Document your compliance processes</li>
      </ul>

      <p>
        For more details, see the <a href="/api">API reference</a> (Compliance API coming in v1.1+).
      </p>
    </div>
  )
}

