import db from '../../database/db'

export default defineEventHandler(() => {

  return new Promise((resolve, reject) => {

    db.all(
      'SELECT * FROM groups',
      [],
      (err, rows) => {

        if (err) {
          reject(err)
        }

        resolve(rows)

      }
    )

  })

})