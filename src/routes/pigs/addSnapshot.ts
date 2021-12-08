import { connectToDatabase, Pig } from '$lib/models';
import { userNeedsToLogin } from '$lib/guards';
import { errorMessage, successMessage } from '$lib/apiResponseHelpers';

export const post = async (req) => {
  // Verify the user is logged in otherwise move on
  if (await userNeedsToLogin({
    // We have to kind of jankily pass the path we're on here. Not sure if there's
    // a more dynamic way to do this right now
    page: { path: '/pigs/addSnapshot' },
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

  const data = req.body;
  
  if (data.img === undefined || data.img.length <= 0) {
    return errorMessage('Image required.');
  }

  if (data.timestamp === undefined || data.timestamp.length <= 0) {
    return errorMessage('Date of image required.');
  }

  await connectToDatabase();

  const pig = await Pig.getById(data.pig);
  const snapshot = await Pig.createSnapshot(pig, data);
  
  return {
    status: 200,
    body: {
      snapshot,
    }
  };

}





