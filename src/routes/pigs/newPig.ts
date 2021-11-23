import { connectToDatabase, Pig } from '$lib/models/index';
import { errorMessage, successMessage } from '$lib/apiResponseHelpers';

export const post = async (req, res) => {
	await connectToDatabase();

	const data = JSON.parse(req.body);

	//Validation
	if (!data.name) {
		return errorMessage('Pig name required.')
	}

	let pig  = await Pig.create({
		name: data.name,
		img: '',
		birthDate: data.dob,
		breed: data.breed,
		description: data.description,
		farmId: 1});

	if (!pig) {
		return errorMessage('Failed to register a new pig!');
	}

	return successMessage('Pig Successfully registered!')

}
