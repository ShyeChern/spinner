const bucketListModel = require('@/models/bucketList');
import { NextResponse } from 'next/server';

export async function GET() {
	const result = await bucketListModel.find({}, {}, { lean: true });
	return NextResponse.json(result);
}

export async function POST(req) {
	const body = await req.json();
	await bucketListModel.create({ name: body.item, type: body.type });
	return new Response();
}
