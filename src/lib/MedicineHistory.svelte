<script lang="ts">
	import { page } from '$app/stores';
	import { medicines, removeMedicine, clearMedicines } from '$lib/medicineStore';
	import { fade, slide } from 'svelte/transition';
	import { X } from 'lucide-svelte';
</script>

<section class="history">
	<ul>
		{#each $medicines as medicine}
			<li class:active={medicine.id === $page.data.slug} in:slide out:fade>
				<a href={`/ask/${medicine.id}`}>{medicine.name}</a>
				<span
					on:click={(e) => {
						removeMedicine(medicine.id);
					}}
				>
					<X size={14} />
				</span>
			</li>
		{/each}
	</ul>
	{#if $medicines.length > 0}
		<p on:click={clearMedicines}>alle löschen</p>
	{/if}
</section>

<style lang="scss">
	.history {
		display: flex;
		justify-content: space-between;
		ul {
			padding: 0;
			margin: 0;
			list-style-type: none;
			display: flex;
			flex-wrap: wrap;
			flex-grow: 1;

			li {
				background-color: $secondary;
				margin-right: 0.5rem;
				margin-bottom: 0.5rem;
				padding: 0.5rem 0.75rem;
				border-radius: 1rem;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&:hover {
					background-color: darken($secondary, 10%);
					a {
						font-weight: 400;
					}
				}

				a {
					text-decoration: none;
					color: $lighten;
					text-transform: lowercase;
					font-weight: 200;
					transition: font-weight 0.2s ease-in-out;
					margin-right: 0.5rem;
				}

				:global(svg) {
					color: $lighten;
				}

				&.active {
					background-color: darken($secondary, 10%);

					a {
						font-weight: 400;
					}
				}
			}
		}
		p {
			margin: 0;
			color: $secondary;
			cursor: pointer;
		}
	}
</style>
