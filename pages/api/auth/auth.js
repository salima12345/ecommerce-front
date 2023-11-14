import { getSession } from 'next-auth/react';

export async function authenticateUser(req) {
  const session = await getSession({ req });

  if (!session) {
    // Handle unauthorized access here
    return null;
  }

  return session;
}
