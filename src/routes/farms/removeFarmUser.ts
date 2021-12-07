import { Farm, User } from '$lib/models';
import { userNeedsToLogin } from '$lib/guards';

export const post = async (req) => {
	if (await userNeedsToLogin({
		page: { path: '/farms/getfarms'},
		session: req.locals
	})) {
		return {
			status: 302,
			headers: {
				location: '/login'
			},
		};
	}

	if (req.body.userId) {
		return {
			status: 400,
			body: {
				message: 'User not found',
			},
		};
	}
	const updatedUsers = Farm.removeUser(req.body.farmId, req.body.userId);
	return {
		status: 200,
		body: {
			updatedUsers: updatedUsers,
		}
	}

}
