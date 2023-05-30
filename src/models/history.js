import '@/utils/database';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const modelName = 'History';
const schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, collection: 'histories' }
);

// if model already exist then reuse else create model
module.exports = mongoose.models[modelName] || mongoose.model(modelName, schema);
