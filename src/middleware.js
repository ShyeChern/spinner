import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { COOKIE_NAME } from '@/constants';

export function middleware(request) {
	const password = process.env.LOGIN_PASSWORD;
	if (!request.cookies.has(COOKIE_NAME)) {
		return new Response('Unauthorized.', {
			status: 401,
		});
	}
	const cookie = request.cookies.get(COOKIE_NAME).value;
	const valid = bcrypt.compareSync(password, cookie);
	if (!valid) {
		const response = new Response('Unauthorized.', {
			status: 401,
		});
		response.headers.set(
			'Set-Cookie',
			`${COOKIE_NAME}=; Path=/; Expires=Wed, 1 Jan 1970 00:00:00 GMT; Secure; HttpOnly`
		);
		return response;
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/(api/(?!login$|login/$).*$)'],
};
