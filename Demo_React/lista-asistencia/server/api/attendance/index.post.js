import db from '../../database/db'

export default defineEventHandler(
  async (event) => {

    const body = await readBody(event)

    const today =
      new Date().toISOString().split('T')[0]

    return new Promise((resolve, reject) => {

      db.run(
        `
          INSERT INTO attendance
          (student_id, date, present)
          VALUES (?, ?, ?)
        `,
        [
          body.student_id,
          today,
          body.present ? 1 : 0
        ],

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