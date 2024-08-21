import { serverEvents } from '../utils/eventEmitter'
import { createError, defineEventHandler, setResponseHeaders } from 'h3'

export default defineEventHandler((event) => {
  // Set response headers
  setResponseHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })

  const send = (data: any) => {
    event.node.res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  const listener = (data: any) => {
    send(data)
  }

  serverEvents.on('newEvent', listener)

  // Send an initial message immediately
  send({ message: 'SSE connection established' })

  // Keep the connection open by periodically sending a comment to prevent Vercel from closing the connection
  const keepAliveInterval = setInterval(() => {
    send({ comment: 'ping' })
  }, 20000) // Send every 20 seconds

  // Clean up on close
  event.node.req.on('close', () => {
    serverEvents.off('newEvent', listener)
    clearInterval(keepAliveInterval)
  })

  // Return a promise that never resolves to keep the connection open
  return new Promise<void>(() => {
    // Intentionally never resolve
  })
})
