export async function up(sql) {
  await sql`
    CREATE TABLE posts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title varchar(255) NOT NULL,
      content text NOT NULL,
      user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at timestamp with time zone DEFAULT NOW(),
      updated_at timestamp with time zone DEFAULT NOW()
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE posts
  `;
}

// This will create a posts table with the following columns:

// id: a unique identifier for each post, generated automatically by the database.
// title: the title of the post, limited to 255 characters.
// content: the main content of the post, stored as text.
// user_id: a foreign key that references the id column in the users table. This indicates which user created the post.
// created_at: a timestamp that indicates when the post was created. The default value is the current time.
// updated_at: a timestamp that indicates when the post was last updated. The default value is the current time.
// Note that the user_id column is used to establish a relationship between the posts and users tables. This allows you to retrieve all posts created by a particular user, or to retrieve the user who created a particular post. The ON DELETE CASCADE option ensures that if a user is deleted, all posts associated with that user will also be deleted.
