<script lang="ts">
	import InputMedicine from '$lib/InputMedicine.svelte';
	import MedicineHistory from '$lib/MedicineHistory.svelte';
	import type { PageData } from './$types';
	import { medicines, type MedicineType, addMedicine } from '$lib/medicineStore';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	export let data: PageData;
	export let form;

	// create new medicine
	let newMedicine: MedicineType;
	$: {
		if (form) {
			newMedicine = form?.responseObject;
			let medicineID = addMedicine(newMedicine);
			goto(`/ask/${medicineID}`);
		}
	}

	// get medicine
	let medicine: MedicineType | undefined;
	$: {
		medicine = $medicines.find((medicine) => medicine.id === data.slug);
		if (!medicine) {
			goto('/ask');
		}
	}
</script>

<InputMedicine />

<MedicineHistory />

<secion class="response" transition:fade>
	<h1>{@html medicine?.name}</h1>
	{@html medicine?.description}
</secion>

<style lang="scss">
	.response {
		h1 {
			color: $secondary;
			text-transform: uppercase;
		}
	}
</style>
