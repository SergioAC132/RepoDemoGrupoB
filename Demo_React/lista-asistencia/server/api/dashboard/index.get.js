import db from '../../database/db'

export default defineEventHandler(() => {

  return new Promise((resolve, reject) => {

    db.all(
      `
        SELECT
          students.id,
          students.name,

          COUNT(attendance.id)
          AS total_classes,

          SUM(attendance.present)
          AS total_present

        FROM students

        LEFT JOIN attendance
        ON students.id = attendance.student_id

        GROUP BY students.id
      `,
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