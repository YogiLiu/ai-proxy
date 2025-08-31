import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, ViteClient } from 'vite-ssr-components/hono'

export const renderer = jsxRenderer(({ children }) => {
    return (
        <html lang={'zh'}>
            <head>
                <meta charset={'utf-8'}></meta>
                <ViteClient />
                <Link href="/src/style.css" rel="stylesheet" />
            </head>
            <body>{children}</body>
        </html>
    )
})
