export async function up(sql) {
  await sql`
    CREATE TABLE students (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(80) NOT NULL,
      last_name varchar(80) NOT NULL
      -- grade_id integer REFERENCES grades(id) UNIQUE

    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE students
  `;
}
