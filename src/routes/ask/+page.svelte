<script lang="ts">
	import { type MedicineType, addMedicine } from '$lib/medicineStore';
	import InputMedicine from '$lib/InputMedicine.svelte';
	import MedicineHistory from '$lib/MedicineHistory.svelte';
	import { goto } from '$app/navigation';

	export let form;

	let newMedicine: MedicineType;
	$: {
		if (form) {
			newMedicine = form?.responseObject;
			let medicineID = addMedicine(newMedicine);
			goto(`/ask/${medicineID}`);
		}
	}
</script>

<InputMedicine />
<MedicineHistory />
