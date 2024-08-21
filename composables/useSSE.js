// composables/useSSE.js
import { ref } from 'vue'

export const useSSE = () => {
  const message = ref('')

  const initSSE = () => {
    const source = new EventSource('/_nuxt_logs')
    source.onmessage = (event) => {
      message.value = JSON.parse(event.data).message
    }
    return source
  }

  return { message, initSSE }
}