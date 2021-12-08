import { connectToDatabase, Farm } from '$lib/models/index';
import { errorMessage, successMessage } from '$lib/apiResponseHelpers';

export const post = async (req, res) => {
	await connectToDatabase();

	const data = JSON.parse(req.body);

	//Validation
	if (!data.farmName) {
		return errorMessage('Farm name required.')
	}

	let farm  = await Farm.create({name: data.farmName, region: data.farmRegion, user: req.locals.user});

	if (!farm) {
		return errorMessage('Failed to create a new farm!');
	}

	return successMessage('Farm Successfully created!')

}
