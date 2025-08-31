import { Hono } from 'hono'
import { proxy } from 'hono/proxy'

const app = new Hono()
export default app

app.all(
    '/:domain{(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))+}/:path',
    (c) => {
        const { domain, path } = c.req.param()
        return proxy(`https://${domain}/${path}`, {
            method: c.req.method.toUpperCase(),
            headers: c.req.header(),
            body: c.req.raw.body,
        })
    },
)
