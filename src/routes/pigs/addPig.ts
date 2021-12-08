import { connectToDatabase, Pig } from '$lib/models';
import { userNeedsToLogin } from '$lib/guards';
import { errorMessage, successMessage } from '$lib/apiResponseHelpers';

export const post = async (req) => {
  // Verify the user is logged in otherwise move on
  if (await userNeedsToLogin({
    // We have to kind of jankily pass the path we're on here. Not sure if there's
    // a more dynamic way to do this right now
    page: { path: '/pigs/getpigs' },
    session: req.locals
  })) {
    // Here we re-direct to the login page if the user isn't authorized
    return {
      status: 302,
      headers: {
        location: '/login'
      },
    };
  }

  const data = (JSON.parse(req.body));

  if (data.name === undefined || data.name.length <= 0) {
    return errorMessage('Name required.');
  }

  if (data.description === undefined || data.description.length <= 0) {
    return errorMessage('Description required.');
  }

  if (data.breed === undefined || data.breed.length <= 0) {
    return errorMessage('Breed required.');
  }

  if (data.dob === undefined || data.dob.length <= 0) {
    return errorMessage('Birthdate required.');
  }

  await connectToDatabase();

  const pig = await Pig.create(data);
  
  return {
    status: 200,
    body: {
      pig,
    }
  };

}



