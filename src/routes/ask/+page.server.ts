import type { Actions } from './$types';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { MedicineType } from '$lib/medicineStore';
import { redirect } from '@sveltejs/kit';

const prompt =
	'I want you to act as a Pharmacist. You get provided with a name of medicine. Your task will be to return in titled sections the active substance, the use case and side effects. Your response should in german language.';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export const actions = {
	default: async ({ request }) => {
		// get form data
		const data = await request.formData();
		const medicine = data.get('medicine') as string;

		// call api
		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: prompt
				},
				{
					role: 'user',
					content: medicine
				}
			],
			temperature: 0.1
		});

		if (response) {
			const replaceText = {
				'\n': '<br />',
				'Wirkstoff:': '<span class="highlight">Wirkstoff:</span>',
				'Anwendung:': '<span class="highlight">Anwendung:</span>',
				'Anwendungsbereiche:': '<span class="highlight">Anwendungsbereiche:</span>',
				'Anwendungsbereich:': '<span class="highlight">Anwendungsbereich:</span>',
				'Anwendungsgebiete:': '<span class="highlight">Anwendungsgebiete:</span>',
				'Nebenwirkungen:': '<span class="highlight">Nebenwirkungen:</span>'
			};

			const regex = new RegExp(Object.keys(replaceText).join('|'), 'gi');

			let responseText = response.choices[0].message.content;
			let responseTextHtml = responseText?.replace(regex, (matched) => {
				return replaceText[matched];
			});

			const responseObject: MedicineType = {
				id: '',
				name: medicine,
				description: responseTextHtml
			};

			return { responseObject };
		}
	}
} satisfies Actions;
