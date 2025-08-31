import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { proxy } from 'hono/proxy'

const app = new Hono<{ Bindings: CloudflareBindings }>()
app.use(logger())
export default app

app.all(
    '/:domain{(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))+}/:path{.+}',
    (c) => {
        const { domain, path } = c.req.param()
        if (c.env.AP_ALLOWLIST) {
            const whitelist = c.env.AP_ALLOWLIST.split(',')
            if (!whitelist.includes(domain)) {
                return c.json(
                    {
                        type: 'about:blank',
                        status: 403,
                        title: 'invalid domain',
                        detail: 'cannot find domain in whitelist',
                        instance: domain,
                    },
                    403,
                    {
                        'Content-Type': 'application/problem+json',
                    },
                )
            }
        }
        return proxy(`https://${domain}/${path}`, {
            method: c.req.method.toUpperCase(),
            headers: c.req.header(),
            body: c.req.raw.body,
        })
    },
)
