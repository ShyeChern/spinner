import { conn } from '@/utils/database';
const bucketListModel = require('@/models/bucketList');
const historyModel = require('@/models/history');

export async function DELETE(req, { params }) {
	const found = await bucketListModel.findOne({ _id: params.id }).lean();
	if (!found) {
		return new Response('Not Found.', {
			status: 404,
		});
	}

	await conn.transaction(async (session) => {
		await historyModel.create([{ name: found.name, type: found.type }], { session });
		await bucketListModel.deleteOne({ _id: params.id }, { session });
	});
	return new Response();
}
