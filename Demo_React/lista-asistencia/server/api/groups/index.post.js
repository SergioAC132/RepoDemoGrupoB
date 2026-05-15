import db from '../../database/db'

export default defineEventHandler(
  async (event) => {

    const body = await readBody(event)

    return new Promise((resolve, reject) => {

      db.run(
        `
          INSERT INTO groups(name)
          VALUES(?)
        `,
        [body.name],

        function(err) {

          if (err) {
            reject(err)
          }

          resolve({
            id: this.lastID,
            name: body.name
          })

        }
      )

    })

  }
)