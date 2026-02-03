export default function ComplianceGuidePage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Compliance Guide</h1>
      
      <p className="lead">
        Anchor provides tools for GDPR, CCPA, AI Act, and other regulatory compliance.
        Export user data, delete on request, and generate compliance reports.
      </p>

      <h2>Audit Export (Available Now)</h2>
      <p>
        Export audit logs for compliance purposes. This is currently available via the audit API:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Export audit logs for an agent
export = anchor.audit.export(agent.id, {
  format: "json",  # or "csv"
  start: "2025-01-01T00:00:00Z",  # optional
  end: "2025-01-31T23:59:59Z",    # optional
  include_verification: true      # include chain verification
})

print(f"Export ID: {export.export_id}")
print(f"Download URL: {export.download_url}")`}</code></pre>

      <p>
        See the <a href="/api/audit">Audit API reference</a> for details on the <code>POST /v1/agents/:agentId/audit/export</code> endpoint.
      </p>

      <h2>Data Export (Coming Soon)</h2>
      <p>
        <strong>Note:</strong> Full data export functionality for specific users/subjects is planned for v1.1+. 
        Currently, you can export audit logs which contain all operation history.
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Coming in v1.1+
export = anchor.compliance.get_user_data("user@example.com", format="json")
export_csv = anchor.compliance.get_user_data("user@example.com", format="csv")`}</code></pre>

      <h2>Data Deletion (Coming Soon)</h2>
      <p>
        <strong>Note:</strong> Cryptographic deletion certificates are planned for v1.1+. 
        Currently, you can delete data using the data API and verify deletions via audit logs.
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Coming in v1.1+
certificate = anchor.compliance.delete_user_data("user@example.com")
print(f"Certificate ID: {certificate.id}")  # Proof of deletion`}</code></pre>

      <p>
        <strong>Current workaround:</strong> Use <code>anchor.data.delete_prefix(agent.id, "user:123:")</code> 
        to delete all data for a user, then verify via audit logs.
      </p>

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

