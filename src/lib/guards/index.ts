// const rootPath = '/todos';
const loginPath = '/login';

const whiteListedPaths = [
  '/',
  '/login',
  '/register',
];

export const redirectToLoginResponse = { status: 302, redirect: loginPath };

// Actual guard function
export async function userNeedsToLogin({ page, session }) {
  // Check the auth for logged-in-ness
  const loggedIn = session !== null && session.user !== null && session.user !== undefined;

  // If we're logged in we don't need to login
  if (loggedIn === true) {
    return false;
  }

  // If we're not logged in and on a whitelisted path allow entry
  if (whiteListedPaths.includes(page.path)) {
    return false;
  }

  // If we're not logged in then send the user to the login page
  return true;
}

// Export the function fo use later
export default {
  redirectToLoginResponse,
  userNeedsToLogin,
};

