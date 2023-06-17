import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/constants';
import bcrypt from 'bcryptjs';

export async function POST(req) {
	const password = process.env.LOGIN_PASSWORD;
	const cookie = cookies().get(COOKIE_NAME)?.value;
	if (cookie) {
		const valid = bcrypt.compareSync(password, cookie);
		if (!valid) {
			cookies().set({
				name: COOKIE_NAME,
				value: '',
				httpOnly: true,
				secure: true,
				path: '/',
				expires: -1,
			});
			return new Response('Unauthorized.', {
				status: 401,
			});
		}
		return new Response();
	}
	const body = await req.json();
	if (body.password !== password) {
		return new Response('Invalid password.', {
			status: 401,
		});
	}
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	cookies().set({
		name: COOKIE_NAME,
		value: hash,
		httpOnly: true,
		secure: true,
		path: '/',
	});
	return new Response();
}
