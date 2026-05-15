import db from '../../database/db'

export default defineEventHandler(
  async (event) => {

    const body = await readBody(event)

    // Validaciones
    if (!body.group_id) {

      throw createError({
        statusCode: 400,
        statusMessage: 'Grupo requerido'
      })

    }

    if (!body.name?.trim()) {

      throw createError({
        statusCode: 400,
        statusMessage: 'Nombre requerido'
      })

    }

    return new Promise((resolve, reject) => {

      db.run(
        `
          INSERT INTO students
          (group_id, name)
          VALUES (?, ?)
        `,
        [
          body.group_id,
          body.name.trim()
        ],

        function(err) {

          if (err) {
            reject(err)
          }

          resolve({
            id: this.lastID
          })

        }
      )

    })

  }
)