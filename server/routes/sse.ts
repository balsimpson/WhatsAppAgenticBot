// // server/routes/sse.ts
// import { serverEvents } from '../utils/eventEmitter'

// export default defineEventHandler((event) => {
//   setResponseHeaders(event, {
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//     'Connection': 'keep-alive'
//   })

//   const send = (data: any) => {
//     event.node.res.write(`data: ${JSON.stringify(data)}\n\n`)
//   }

//   const listener = (data: any) => {
//     send(data)
//   }

//   serverEvents.on('newEvent', listener)

//   event.node.req.on('close', () => {
//     serverEvents.off('newEvent', listener)
//   })

//   // Send an initial message to establish the connection
//   send({ message: 'SSE connection established' })

//   return new Promise(() => {}) // Keep the connection open
// })

// export default defineEventHandler(async (event) => {
//   const eventStream = createEventStream(event)

//   const interval = setInterval(async () => {
//     await eventStream.push(`Message @ ${new Date().toLocaleTimeString()}`)
//   }, 10000)

//   eventStream.onClosed(async () => {
//     clearInterval(interval)
//     await eventStream.close()
//   })

//   return eventStream.send()
// })

import { eventEmitter } from "../utils/eventEmitter";

export default defineEventHandler(async (event) => {
	setResponseHeaders(event, {
		"Content-Type": "text/event-stream",
		"Cache-Control": "no-cache",
		Connection: "keep-alive",
	});
	const eventStream = createEventStream(event);

	// const interval = setInterval(async () => {
	//   await eventStream.push(`Message @ ${new Date().toLocaleTimeString()}`);
	// }, 10000);

	// Listen for events from eventEmitter and push them to the client
	eventEmitter.on("newEvent", async (data) => {
		await eventStream.push(`New Event: ${data}`);
	});

	eventStream.onClosed(async () => {
		// clearInterval(interval);
		await eventStream.close();
	});

	return eventStream.send();
});
