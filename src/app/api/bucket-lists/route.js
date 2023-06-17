const bucketListModel = require('@/models/bucketList');
import { NextResponse } from 'next/server';

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');
	const result = await bucketListModel.find({ type }, {}, { lean: true });
	return NextResponse.json(result);
}

export async function POST(req) {
	const body = await req.json();
	await bucketListModel.create({ name: body.item, type: body.type });
	return new Response();
}
