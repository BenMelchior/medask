import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { nanoid } from 'nanoid';

export type MedicineType = {
	id: string;
	name: string;
	description: string;
};

// get medicines from localStorage if available
let storedMedicines = browser ? window.localStorage.getItem('medicines') : null;

// create store
export const medicines = writable<MedicineType[]>(
	storedMedicines ? JSON.parse(storedMedicines) : []
);

// add medicine
export const addMedicine = (newMedicine: MedicineType) => {
	medicines.update((allMedicines) => {
		// add id
		newMedicine.id = nanoid();

		// add to array
		const updatedMedicines = [...allMedicines, newMedicine];

		// save to localStorage
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('medicines', JSON.stringify(updatedMedicines));
		}

		// return updated array
		return updatedMedicines;
	});

	return newMedicine.id;
};

// remove medicine
export const removeMedicine = (medicineId: string) => {
	medicines.update((allMedicines) => {
		// filter out medicine
		const updatedMedicines = allMedicines.filter((medicine) => medicine.id !== medicineId);

		// save to localStorage
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('medicines', JSON.stringify(updatedMedicines));
		}

		// return updated array
		return updatedMedicines;
	});
};

// clear all medicines
export const clearMedicines = () => {
	medicines.update(() => {
		// clear localStorage
		if (typeof window !== 'undefined') {
			window.localStorage.removeItem('medicines');
		}

		return [];
	});
};
