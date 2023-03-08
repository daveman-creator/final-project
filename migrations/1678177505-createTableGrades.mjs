export async function up(sql) {
  await sql`
    CREATE TABLE grades (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users(id) UNIQUE,
      grade_name varchar(80) NOT NULL,
      grade_code varchar(80) NOT NULL

    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE grades
  `;
}
