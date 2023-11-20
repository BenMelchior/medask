<script lang="ts">
	import { medicines, addMedicine } from '$lib/medicineStore';
	import { applyAction, enhance } from '$app/forms';
	import { SendHorizontal } from 'lucide-svelte';
	import { Circle } from 'svelte-loading-spinners';
	import { updated } from '$app/stores';

	let asking = false;
</script>

<p>Über welches <span class="secondary">Medikament</span> brauchs du Informationen?</p>
<form
	action="/ask"
	class="floating-label"
	method="POST"
	use:enhance={() => {
		asking = true;

		return async ({ result, update }) => {
			await update();

			await applyAction(result);

			asking = false;
		};
	}}
>
	<input type="text" id="medicine" name="medicine" placeholder="" required autocomplete="off" />
	<label for="medicine">Medikament?</label>
	{#if asking}
		<div class="loading">
			<Circle size="30" color="#1f7d85" unit="px" duration="1s" />
		</div>
	{:else}
		<button type="submit" disabled={asking}><SendHorizontal /></button>
	{/if}
</form>

<style lang="scss">
	.floating-label {
		position: relative;
		border-radius: 4px;
		margin: 2rem 0;

		input {
			width: 100%;
			padding: 30px 30px 15px;
			border-color: $secondary;
			border-style: solid;
			border-width: 0 0 3px 0;
			font-size: 16px;
			transition: all 0.3s;
			color: $primary;
			background-color: lighten($lighten, 20%);
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;

			&:focus,
			&:active {
				outline: none;
			}
		}

		label {
			position: absolute;
			top: 23px;
			left: 30px;
			color: $secondary;
			font-size: 16px;
			pointer-events: none;
			transition: all 0.3s;
		}

		input:focus + label,
		input:not(:placeholder-shown) + label {
			top: 5px;
			left: 10px;
			font-size: 12px;
		}

		button {
			position: absolute;
			top: 20px;
			right: 1rem;
			background-color: transparent;
			border: 0;
			color: $secondary;
			transition: right 0.3s ease-in-out;

			&:hover {
				cursor: pointer;
				right: 0.5rem;
			}
		}

		.loading {
			position: absolute;
			top: 20px;
			right: 1rem;
			display: flex;
			justify-content: center;
		}
	}
</style>
