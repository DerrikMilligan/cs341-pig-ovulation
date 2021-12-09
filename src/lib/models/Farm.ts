import mongoose from 'mongoose';

import { userSchema } from './User';
import { User } from '$lib/models/index';
// Create the schema
export const farmSchema = new mongoose.Schema({
	name: String,
	region: String,
	users: [userSchema]
});

// Create the actual model to use
export const Farm = mongoose.model('Farm', farmSchema);

// Export all the methods as a singleton to use with the user
export default {

	// Method to retreive a Farm by their id
	getByID: async (id: Number) => {
		return await Farm.findById(id)
			.populate('users')
			.exec();
	},

	getByUser: async (user) => {
		if (!mongoose.Types.ObjectId.isValid(user._id)) {
			return null;
		}

		return await Farm.find({ 'users._id': user._id }).populate('users').exec();
	},

	delete: async (farm): Promise<boolean> => {
		if (!mongoose.Types.ObjectId.isValid(farm._id)) {
			return false;
		}

		await Farm.deleteOne({ _id: farm._id }).exec();

		return true;
	},

	// Create a new farm
	create: async ({ name, region, user }) => {
		const farm = new Farm({
			name: name,
			region: region,
			users: [user]
		});

		await farm.save();

		return farm;
	},

	addUser: async (farmId, user) => {
		// if (!mongoose.Types.ObjectId.isValid(farmId) || !mongoose.Types.ObjectId.isValid(user._id)) {
		// 	return null;
		// }

		const farm = await Farm.findByIdAndUpdate({_id: farmId}, {
			$push: { users: user }
		})

		// farm.users.push(user);

		await farm.save();

		return farm;
	},

	removeUser: async (farmId, userId) => {
		const farm = await Farm.findById(farmId)
			.populate('users')
			.exec();

		farm.users = farm.users.filter((user) => user._id.toString() !== userId);

		await farm.save();

		return farm;
	},

};

