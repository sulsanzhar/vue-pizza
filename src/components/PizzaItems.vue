<template>
	<div class="pizza-items">
		<h1>Все пиццы</h1>
		<div class="pizza-wrapper">
			<template v-if="!pizzaStore.pizzas.length">
				<PizzaSkeleton v-for="n in 8" :key="n" />
			</template>
			<template v-else>
				<PizzaItem
					v-for="pizza in pizzaStore.pizzas"
					:key="pizza.id"
					@add-pizza="onAddPizza"
					v-bind="pizza"
					:type="pizza.type"
				/>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted } from 'vue';
	import { usePizzaStore } from '../store/pizza.store';
	import PizzaItem from './PizzaItem.vue';
	import PizzaSkeleton from './PizzaSkeleton.vue';
	import { useCartStore } from '../store/cart.store';
	import type { TPizza } from '../types/TPizza.ts';

	const store = useCartStore();
	const pizzaStore = usePizzaStore();

	const pizzaTotalCount = (pizza: { variants: { count: number }[] }) => {
		return pizza.variants.reduce((sum, variant) => sum + variant.count, 0);
	};

	onMounted(async () => {
		try {
			await pizzaStore.fetchPizzas();
		} catch (error) {
			console.error('Ошибка при загрузке пицц', error);
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
