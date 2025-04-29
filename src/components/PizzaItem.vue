<template>
	<div class="pizza-item">
		<RouterLink :to="`/pizza/${id}`">
			<img :src="imageUrl" alt="pizza" />
		</RouterLink>
		<h3>{{ title }}</h3>
		<div class="pizza-item-variant">
			<div class="pizza-item-types">
				<button
					v-for="(type, index) in pizzaTypes"
					:key="type"
					:class="{ active: index === activeType }"
					@click="changeTypeHandler(index)"
					class="bubbly-button"
				>
					{{ type }}
				</button>
			</div>
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
		<div class="pizza-item-bottom">
			<p>{{ price }} ₸</p>
			<button @click="addPizzaHandler">+ Добавить <span>3</span></button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { RouterLink } from 'vue-router';
	import { pizzaTypes, pizzaSizes } from '../constants';
	import type { TPizza } from '../types/TPizza';

	const props = defineProps<TPizza>();

	const emit = defineEmits<{
		(e: 'addPizza', pizza: TPizza): void;
	}>();

	const activeType = ref(0);
	const activeSize = ref(0);

	const changeTypeHandler = (index: number) => (activeType.value = index);
	const changeSizeHandler = (index: number) => (activeSize.value = index);

	const addPizzaHandler = () => {
		emit('addPizza', {
			id: props.id,
			title: props.title,
			price: props.price,
			imageUrl: props.imageUrl,
			category: props.category,
			count: 1,
			type: pizzaTypes[activeType.value],
			size: pizzaSizes[activeSize.value],
		});
	};
</script>

<style scoped>
	.pizza-item {
		width: 280px;
		height: 460px;
		text-align: center;
		img {
			width: 250px;
		}
	}

	.pizza-item-sizes,
	.pizza-item-types {
		display: flex;
		gap: 5px;

		button {
			transition: 0.2s ease-in-out;
		}
	}

	.pizza-item-types button {
		padding: 10px;
		width: 50%;
	}

	.pizza-item-sizes button {
		padding: 10px;
		width: 33.3%;
	}

	.pizza-item-types button:hover:not(.active),
	.pizza-item-sizes button:hover:not(.active) {
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 5px;
	}

	.pizza-item-variant {
		margin: 17px 0;
		background-color: #f3f3f3;
		padding: 6px;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	.active {
		background-color: #ffffff;
		border-radius: 5px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
	}

	.pizza-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-evenly;

		button {
			color: #eb5a1e;
			border: 1px solid #eb5a1e;
			border-radius: 20px;
			padding: 10px 14px;

			span {
				background-color: #eb5a1e;
				color: white;
				padding: 4px 9px;
				border-radius: 50%;
			}
		}
	}
</style>
