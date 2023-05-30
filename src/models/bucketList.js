import '@/utils/database';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const modelName = 'BucketList';
const schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			index: true,
		},
	},
	{ timestamps: true, collection: 'bucket_lists' }
);

// if model already exist then reuse else create model
module.exports = mongoose.models[modelName] || mongoose.model(modelName, schema);
