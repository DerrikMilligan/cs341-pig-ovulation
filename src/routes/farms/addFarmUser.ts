import { Farm, User } from '$lib/models';
import { userNeedsToLogin } from '$lib/guards';

export const post = async (req) => {
	if (await userNeedsToLogin({
		// We have to kind of jankily pass the path we're on here. Not sure if there's
		// a more dynamic way to do this right now
		page: { path: '/farms/getfarms' },
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

	const user = await User.getByEmail(req.body.email);

	if (!user) {
		return {
			status: 400,
			body: {
				message: 'User not found',
			},
		};
	}
	const newUser = Farm.addUser(req.body.farmId, user);
	return {
		status: 200,
		body: {
			newUser: newUser,
		}
	}



}
