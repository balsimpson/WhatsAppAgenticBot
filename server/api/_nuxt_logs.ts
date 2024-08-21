// server/api/_nuxt_logs.ts
import { serverEvents } from '../utils/eventEmitter'
import { createError } from 'h3'

export default defineEventHandler((event) => {
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

  // Send an initial message
  send({ message: 'SSE connection established' })

  // Clean up on close
  event.node.req.on('close', () => {
    serverEvents.off('newEvent', listener)
  })

  // This keeps the connection open
  return new Promise<void>(() => {
    // This promise intentionally never resolves
  })
})