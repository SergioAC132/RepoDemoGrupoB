import { tasks } from '../../data/tasks'

export default defineEventHandler((event) => {
  const id = Number(event.context.params.id)

  const index = tasks.findIndex(t => t.id === id)

  if (index === -1) {
    return {
      error: 'Tarea no encontrada'
    }
  }

  tasks.splice(index, 1)

  return {
    success: true
  }
})