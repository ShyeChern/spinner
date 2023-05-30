import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookieName } from '@/constants';

export function middleware(request) {
	const password = process.env.LOGIN_PASSWORD;
	if (!request.cookies.has(cookieName)) {
		return new Response('Unauthorized.', {
			status: 401,
		});
	}
	const cookie = request.cookies.get(cookieName).value;
	const valid = bcrypt.compareSync(password, cookie);
	if (!valid) {
		const response = new Response('Unauthorized.', {
			status: 401,
		});
		response.headers.set(
			'Set-Cookie',
			`${cookieName}=; Path=/; Expires=Wed, 1 Jan 1970 00:00:00 GMT; Secure; HttpOnly`
		);
		return response;
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/(api/(?!login$|login/$).*$)'],
};
