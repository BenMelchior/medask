import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { medicine } = await request.json();

	return json({ success: true, medicine });
};
