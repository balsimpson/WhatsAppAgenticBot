// server/middleware/sse.js
import { serverEvents } from '../utils/eventEmitter'

export default defineEventHandler((event) => {
  if (event.node.req.url === '/_nuxt_logs') {
    setHeader(event, 'Content-Type', 'text/event-stream')
    setHeader(event, 'Cache-Control', 'no-cache')
    setHeader(event, 'Connection', 'keep-alive')
    
    const send = (data) => {
      event.node.res.write(`data: ${JSON.stringify(data)}\n\n`)
    }

    const listener = (data) => {
      send(data)
    }

    serverEvents.on('newEvent', listener)

    event.node.req.on('close', () => {
      serverEvents.off('newEvent', listener)
    })
  }
})