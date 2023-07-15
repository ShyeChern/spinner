import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/constants';
import bcrypt from 'bcryptjs';

const COOKIE_SETTING = {
	name: COOKIE_NAME,
	httpOnly: true,
	secure: true,
	path: '/',
	expires: new Date().getTime() + 8.64e7 * 3, // expire after 3 days
};

export async function POST(req) {
	const password = process.env.LOGIN_PASSWORD;
	const cookie = cookies().get(COOKIE_NAME)?.value;
	if (cookie) {
		const valid = bcrypt.compareSync(password, cookie);
		if (!valid) {
			cookies().set({
				...COOKIE_SETTING,
				value: '',
				expires: -1,
			});
			return new Response('Unauthorized.', {
				status: 401,
			});
		}
		cookies().set({
			...COOKIE_SETTING,
			value: '',
			expires: -1,
		});
		cookies().set({
			...COOKIE_SETTING,
			value: cookie,
		});
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
		...COOKIE_SETTING,
		value: hash,
	});
	return new Response();
}
