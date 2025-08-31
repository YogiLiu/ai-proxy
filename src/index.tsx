import { Hono } from 'hono'
import proxy from './proxy'
import { renderer } from './renderer'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.use(renderer)
app.route('/proxy', proxy)

export default app
