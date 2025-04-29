<template>
	<div class="pizza" v-if="pizza">
		<img :src="pizza.imageUrl" alt="pizza-logo" />
		<div class="pizza-content">
			<h1>{{ pizza.title }}</h1>
			<p>Виды: тонкое и традиционное</p>
			<p>Цена: {{ computedPrice }} ₸</p>
			<div class="pizza-item-variant">
				<div class="pizza-item-sizes">
					<button
						v-for="(size, index) in pizzaSizes"
						:key="size"
						:class="{ active: activeSize === index }"
						@click="changeSizeHandler(index)"
					>
						{{ size }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router';
	import { onMounted, ref, computed } from 'vue';
	import axios from 'axios';
	import type { TPizza } from '../types/TPizza.ts';
	import { pizzaSizes, pizzaPrices } from '../constants';

	const route = useRoute();
	const id = route.params.id;

	const pizza = ref<TPizza>();
	const activeSize = ref(0);
	const basePrice = ref(0);

	const changeSizeHandler = (index: number) => {
		activeSize.value = index;
	};

	const computedPrice = computed(() => {
		return basePrice.value + pizzaPrices[activeSize.value];
	});

	onMounted(async () => {
		try {
			const { data } = await axios.get(
				`https://67afa6a3dffcd88a67873fcf.mockapi.io/items?id=${id}`
			);
			pizza.value = data[0];
			basePrice.value = data[0].price;
		} catch (err) {
			console.log(err);
		}
	});

	console.log('pizza: ', pizza);
</script>

<style scoped>
	h1 {
		text-align: center;
	}
	.pizza {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}

	.pizza-content {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	img {
		width: 30%;
	}

	.pizza-item-sizes button {
		padding: 10px;
		width: 33.3%;
	}

	.pizza-item-types button:hover:not(.active) {
		background-color: rgba(255, 255, 255, 0.3);
	}

	.active {
		background-color: #ffffff;
		border-radius: 5px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
	}

	.pizza-item-variant {
		background-color: #f3f3f3;
		padding: 6px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		gap: 7px;
	}
</style>
