export default function AuthenticationPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Authentication</h1>
      
      <p>
        The Anchor API uses API keys to authenticate requests. You can view and manage your
        API keys in the Anchor Dashboard.
      </p>

      <h2>API Keys</h2>
      <p>
        All API requests require authentication via the <code>X-API-Key</code> header:
      </p>

      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`curl https://api.getanchor.dev/v1/agents \\
  -H "X-API-Key: your-api-key-here"`}</code></pre>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
        <p className="mb-0">
          <strong>⚠️ Security Warning:</strong> Your API keys carry many privileges, so be sure
          to keep them secure! Do not share your secret API keys in publicly accessible areas
          such as GitHub, client-side code, and so forth.
        </p>
      </div>

      <h2>Getting Your API Key</h2>
      <p>
        Sign up at <a href="https://getanchor.dev" target="_blank" rel="noopener noreferrer">getanchor.dev</a> to get your API key.
      </p>
      <p>
        <strong>Important:</strong> Your API key is shown only once during signup. Copy it immediately and store it securely!
      </p>

      <h2>HTTPS Required</h2>
      <p>
        All API requests must be made over HTTPS. Calls made over plain HTTP will fail.
        API requests without authentication will also fail.
      </p>

      <h2>Example Request</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`# Using curl
curl https://api.getanchor.dev/v1/agents \\
  -H "X-API-Key: anc_example_key_12345" \\
  -H "Content-Type: application/json"

# Using Python
import requests

headers = {
    "X-API-Key": "anc_example_key_12345",
    "Content-Type": "application/json"
}

response = requests.get(
    "https://api.getanchor.dev/v1/agents",
    headers=headers
)

# Using TypeScript/JavaScript
const response = await fetch('https://api.getanchor.dev/v1/agents', {
  headers: {
    'X-API-Key': 'anc_example_key_12345',
    'Content-Type': 'application/json'
  }
});`}</code></pre>
    </div>
  )
}







