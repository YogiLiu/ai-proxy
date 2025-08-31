# AI Proxy

Reverse proxy for AI.

## Usage

```js
// Replace `my-clareflare.worker.dev` to your workers' domain.

// https://api.openai.com/v1/chat/completions
const apiDomain = 'api.openai.com'
const apiPath = '/v1/chat/completions'
fetch(
    `https://my-clareflare.worker.dev/proxy/${apiDomain}${apiPath}`,
    {
        method: "POST",  // any methods
        headers: {
            // regular headers ...
        },
        body: {
            // regular body ...
        }
    }
)
```