<template>
	<div class="pizza-items">
		<h1>Все пиццы</h1>
		<div class="pizza-wrapper">
			<template v-if="!items.length">
				<PizzaSkeleton v-for="n in 8" :key="n" />
			</template>
			<template v-else>
				<PizzaItem
					v-for="pizza in items"
					:key="pizza.id"
					@add-pizza="onAddPizza"
					v-bind="pizza"
					:type="pizza.type"
					:count="0"
				/>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import axios from 'axios';
	import PizzaItem from './PizzaItem.vue';
	import PizzaSkeleton from './PizzaSkeleton.vue';
	import { useCartStore } from '../store/cart.store';
	import type { TPizza } from '../types/TPizza.ts';

	const items = ref<TPizza[]>([]);
	const store = useCartStore();

	onMounted(async () => {
		try {
			const { data } = await axios.get('https://67afa6a3dffcd88a67873fcf.mockapi.io/items');
			console.log('Fetched pizzas:', data);

			if (data.length !== 0) {
				items.value = data;
			}
		} catch (error) {
			console.error('Error fetching pizzas:', error);
		}
	});

	function onAddPizza(pizza: TPizza) {
		console.log('Pizza added:', pizza);

		store.addPizza(pizza);
	}
</script>

<style scoped>
	h1 {
		margin-bottom: 35px;
	}

	.pizza-wrapper {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}
</style>
