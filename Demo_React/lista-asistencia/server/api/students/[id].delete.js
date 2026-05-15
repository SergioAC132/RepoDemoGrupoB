import db from '../../database/db'

export default defineEventHandler(
  async (event) => {

    const id =
      event.context.params.id

    return new Promise((resolve, reject) => {

      db.run(
        `
          DELETE FROM students
          WHERE id = ?
        `,
        [id],

        function(err) {

          if (err) {
            reject(err)
          }

          resolve({
            success: true
          })

        }
      )

    })

  }
)