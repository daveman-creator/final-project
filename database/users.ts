import { cache } from 'react';
import { sql } from './connect';

type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
};

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

export const getUserByUsernameWithEmail = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
});

export const getUserByUsernameWithPasswordHash = cache(
  async (username: string) => {
    const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<{ id: number; username: string; email: string }[]>`
    SELECT
      id,
      username,
      email
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
});

export const createUser = cache(
  async (username: string, email: string, passwordHash: string) => {
    const [user] = await sql<{ id: number; username: string; email: string }[]>`
      INSERT INTO users
        (username, email, password_hash)
      VALUES
        (${username}, ${email}, ${passwordHash})
      RETURNING
        id,
        username,
        email
    `;
    return user;
  },
);
