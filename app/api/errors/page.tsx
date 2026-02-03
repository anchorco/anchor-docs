export default function ErrorsPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Errors</h1>
      
      <p>
        Anchor uses conventional HTTP response codes to indicate the success or failure of an
        API request. In general:
      </p>
      <ul>
        <li>Codes in the <code>2xx</code> range indicate success.</li>
        <li>Codes in the <code>4xx</code> range indicate an error that failed given the
        information provided (e.g., a required parameter was omitted, a charge failed, etc.).</li>
        <li>Codes in the <code>5xx</code> range indicate an error with Anchor&apos;s servers
        (these are rare).</li>
      </ul>

      <h2>HTTP Status Code Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Status Code</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>200</code></td>
            <td>OK</td>
            <td>Everything worked as expected.</td>
          </tr>
          <tr>
            <td><code>400</code></td>
            <td>Bad Request</td>
            <td>The request was unacceptable, often due to missing a required parameter.</td>
          </tr>
          <tr>
            <td><code>401</code></td>
            <td>Unauthorized</td>
            <td>No valid API key provided.</td>
          </tr>
          <tr>
            <td><code>402</code></td>
            <td>Request Failed</td>
            <td>The parameters were valid but the request failed.</td>
          </tr>
          <tr>
            <td><code>403</code></td>
            <td>Forbidden</td>
            <td>The API key doesn&apos;t have permissions to perform the request.</td>
          </tr>
          <tr>
            <td><code>404</code></td>
            <td>Not Found</td>
            <td>The requested resource doesn&apos;t exist.</td>
          </tr>
          <tr>
            <td><code>409</code></td>
            <td>Conflict</td>
            <td>The request conflicts with another request (perhaps due to using the same idempotent key).</td>
          </tr>
          <tr>
            <td><code>424</code></td>
            <td>External Dependency Failed</td>
            <td>The request couldn&apos;t be completed due to a failure in a dependency external to Anchor.</td>
          </tr>
          <tr>
            <td><code>429</code></td>
            <td>Too Many Requests</td>
            <td>Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.</td>
          </tr>
          <tr>
            <td><code>500, 502, 503, 504</code></td>
            <td>Server Errors</td>
            <td>Something went wrong on Anchor&apos;s end. (These are rare.)</td>
          </tr>
        </tbody>
      </table>

      <h2>Error Response Format</h2>
      <p>
        Error responses follow this format:
      </p>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "error": "Bad Request",
  "message": "Invalid request body",
  "code": "invalid_request",
  "param": "name"
}`}</code></pre>

      <h2>Common Error Examples</h2>
      
      <h3>401 Unauthorized - Invalid API Key</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "error": "Unauthorized",
  "message": "Invalid or expired API key."
}`}</code></pre>

      <h3>404 Not Found - Agent Not Found</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "error": "Agent not found"
}`}</code></pre>

      <h3>403 Forbidden - Policy Violation</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "key": "user:123:email",
  "allowed": false,
  "blocked_by": "policy:block_pii",
  "reason": "Value contains email pattern",
  "audit_id": "aud_xyz789"
}`}</code></pre>

      <h3>429 Too Many Requests - Rate Limit</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please retry after 60 seconds.",
  "retry_after": 60
}`}</code></pre>

      <h3>Error Attributes</h3>
      <ul>
        <li><code>error</code> - A short string indicating the error type</li>
        <li><code>message</code> - A human-readable message providing more details about the error</li>
        <li><code>code</code> - An error code that briefly explains the error reported</li>
        <li><code>param</code> - If the error is parameter-specific, the parameter related to the error</li>
      </ul>

      <h2>Error Types</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>api_error</code></td>
            <td>API errors cover any other type of problem (e.g., a temporary problem with Anchor&apos;s servers), and are extremely uncommon.</td>
          </tr>
          <tr>
            <td><code>authentication_error</code></td>
            <td>Failure to properly authenticate yourself in the request.</td>
          </tr>
          <tr>
            <td><code>invalid_request_error</code></td>
            <td>Invalid request errors arise when your request has invalid parameters.</td>
          </tr>
          <tr>
            <td><code>policy_violation_error</code></td>
            <td>The request would violate a policy (e.g., trying to store PII when no-pii policy is enabled).</td>
          </tr>
          <tr>
            <td><code>rate_limit_error</code></td>
            <td>Too many requests hit the API too quickly.</td>
          </tr>
        </tbody>
      </table>

      <h2>Handling Errors</h2>
      <p>
        Our client libraries raise exceptions for many reasons, such as a failed request,
        invalid parameters, authentication errors, and network unavailability. We recommend
        writing code that gracefully handles all possible API exceptions.
      </p>

      <h3>Python Example</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`from anchor import (
    AnchorError,
    AuthenticationError,
    NotFoundError,
    ValidationError,
    PolicyViolationError,
    RateLimitError
)

try:
    result = anchor.data.write(agent.id, "key", "value")
except PolicyViolationError as e:
    print(f"Blocked: {e.message}")
except AuthenticationError:
    print("Invalid API key")
except NotFoundError:
    print("Agent not found")
except RateLimitError as e:
    print(f"Rate limited. Retry after {e.retry_after}s")`}</code></pre>

      <h3>TypeScript Example</h3>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>{`import {
  AnchorError,
  AuthenticationError,
  NotFoundError,
  ValidationError,
  PolicyViolationError,
  RateLimitError
} from 'anchorai';

try {
  const result = await anchor.data.write(agent.id, 'key', 'value');
} catch (error) {
  if (error instanceof PolicyViolationError) {
    console.log(\`Blocked: \${error.message}\`);
  } else if (error instanceof AuthenticationError) {
    console.log('Invalid API key');
  } else if (error instanceof NotFoundError) {
    console.log('Agent not found');
  } else if (error instanceof RateLimitError) {
    console.log(\`Rate limited. Retry after \${error.retryAfter}s\`);
  }
}`}</code></pre>
    </div>
  )
}

