export async function up(sql) {
  await sql`
    CREATE TABLE comments (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      content text NOT NULL,
      post_id integer NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
      -- user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      -- student_id integer NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      created_at timestamp with time zone DEFAULT NOW(),
      updated_at timestamp with time zone DEFAULT NOW()
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE comments
  `;
}
