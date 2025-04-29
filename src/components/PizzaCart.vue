<template>
	<div class="pizza-cart">
		<div class="pizza-cart-content">
			<img :src="pizza.imageUrl" alt="pizza-img" />
			<div>
				<h3>{{ pizza.title }}</h3>
				<p v-show="size && type">{{ size }} cм | {{ type }}</p>
			</div>
		</div>

		<div class="pizza-cart-slot">
			<slot />
		</div>
		<slot name="numbers" />
	</div>
</template>

<script setup lang="ts">
	import type { TPizza } from '../types/TPizza';

	defineProps<{
		pizza: TPizza;
		size?: string;
		type?: string;
	}>();
</script>

<style scoped>
	.pizza-cart {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.pizza-cart-content {
		display: flex;
		align-items: center;
		gap: 15px;
		flex: 3;

		img {
			width: 120px;
		}
	}

	.pizza-cart-slot {
		flex: 2;
		text-align: center;
	}

	pizza-cart-delete,
	.slot {
		flex: 5;
	}

	.pizza-cart-delete {
		fill: gray;
		transition: 0.3s ease-in-out;
	}

	.pizza-cart-delete:hover {
		fill: red;
	}

	hr {
		border: 1px solid #f4f4f4;
		margin: 30px 0;
	}

	.active {
		display: none;
	}
</style>
