import db from '../../database/db'

export default defineEventHandler(
  async (event) => {

    const groupId =
      event.context.params.groupId

    return new Promise((resolve, reject) => {

      db.all(
        `
          SELECT * FROM students
          WHERE group_id = ?
        `,
        [groupId],

        (err, rows) => {

          if (err) {
            reject(err)
          }

          resolve(rows)

        }
      )

    })

  }
)