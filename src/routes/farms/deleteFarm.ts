import { Farm, User } from '$lib/models';
import { userNeedsToLogin } from '$lib/guards';

export const post = async (req) => {
	if (await userNeedsToLogin({
		// We have to kind of jankily pass the path we're on here. Not sure if there's
		// a more dynamic way to do this right now
		page: { path: '/farms/deleteFarm' },
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

  const data = JSON.parse(req.body);

	const farm = await Farm.getByID(data._id);

	return {
		status: 200,
		body: {
      success: await Farm.delete(farm),
		}
	}

}
