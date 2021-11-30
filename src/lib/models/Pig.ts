import mongoose from 'mongoose';

export const pigSnapshotSchema = new mongoose.Schema({
  img:              String,
  isSwelling:       Boolean,
  presumedPregnant: Boolean,
  notes:            String,
  pig:              { type: mongoose.Schema.Types.ObjectId, ref: 'Pig' },
  timestamp:        Date,
});

// Create the schema
export const pigSchema = new mongoose.Schema({
  name:        String,
  img:         String,
  birthDate:   Date,
  breed:       String,
  description: String,
  farmId:      String,
});

// Create the actual model to use
export const Pig         = mongoose.model('Pig',         pigSchema);
export const PigSnapshot = mongoose.model('PigSnapshot', pigSnapshotSchema);

// Export all the methods as a singleton to use with the user
export default {

  // Method to retreive a Pig by their id
  getById: async (id: Number) => {
    return await Pig.findById(id).exec();
  },

  // Lookup the user with a sesionId
  getByFarmId: async (farmId: String) => {
    return await Pig.find({ farmId }).exec();
  },

  // Create a new user
  create: async ({ name, img, dob, breed, description, farmId }) => {
    const pig = new Pig({
      name,
      breed,
      description,
      farmId,
      birthDate: dob,
      img: img || 'https://via.placeholder.com/300?text=Pig',
    });

    await pig.save();

    return pig;
  },

  edit: async ({ _id, name, img, dob, breed, description}) => {
    const pig = await Pig.findByIdAndUpdate({_id},{
      name,
      breed,
      description,
      birthDate: dob,
      img: img || 'https://via.placeholder.com/300?text=Pig'
    });
    
    return pig;
  },

  createSnapshot: async (pig, { img, isSwelling, presumedPregnant, notes, timestamp }) => {
    if (!mongoose.Types.ObjectId.isValid(pig._id)) {
      return null;
    }

    const pigSnapshot = new PigSnapshot({
      pig:              pig._id,
      img:              img              || 'https://via.placeholder.com/300?text=Pig',
      isSwelling:       isSwelling       || false,
      presumedPregnant: presumedPregnant || false,
      notes:            notes            || '',
      timestamp:        timestamp        || Date.now(),
    });

    await pigSnapshot.save();

    return pigSnapshot;
  },

  getSnapshots: async (pig) => {
    if (!mongoose.Types.ObjectId.isValid(pig._id)) {
      return null;
    }

    return await PigSnapshot.find({ pig: pig._id }).exec();
  }

};

