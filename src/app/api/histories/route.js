const historyModel = require('@/models/history');
import { NextResponse } from 'next/server';

export async function GET() {
	const result = await historyModel.find(
		{},
		{ name: 1, type: 1, createdAt: 1 },
		{ lean: true, limit: 10, sort: [{ _id: -1 }] }
	);
	return NextResponse.json(result);
}
