export async function up(sql) {
  await sql`
    CREATE TABLE students (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
       grade_id integer REFERENCES grades(id),
       first_name varchar(80) NOT NULL,
      last_name varchar(80) NOT NULL



    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE students
  `;
}
