<template>
	<!-- Если пицца загружена, отображаем её -->
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

	<SinglePizzaSkeleton v-else />

	<PreviousButton />
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router';
	import { onMounted, ref, computed } from 'vue';
	import PreviousButton from '../components/PreviousButton.vue';
	import axios from 'axios';
	import type { TPizza } from '../types/TPizza.ts';
	import { pizzaSizes, pizzaPrices } from '../constants';
	import SinglePizzaSkeleton from '../components/SinglePizzaSkeleton.vue';

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
</script>

<style scoped>
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

	.pizza-item-variant {
		background-color: #f3f3f3;
		padding: 6px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		gap: 7px;
	}
</style>
