<template>
	<div class="cart">
		<div v-show="cart.items.length" class="cart-header">
			<div>
				<img src="../assets/img/black-cart-icon.png" alt="black-cart-icon" />
				<h1>Корзина</h1>
			</div>
			<div class="clear-btn">
				<button>
					<v-icon scale="1.2" fill="inherit" name="md-delete-outlined" />
					<p>Очистить корзину</p>
				</button>
			</div>
		</div>
		<div class="cart-content">
			<PizzaCart
				v-for="pizza in cart.items"
				:key="pizza.id"
				:pizza="{
					id: pizza.id,
					imageUrl: pizza.imageUrl,
					title: pizza.title,
				}"
				@changeClick="openModal(pizza)"
			>
				<template #default>
					<button @click="openModal(pizza)" class="btn-change">Изменить количество</button>
				</template>
				<template #numbers>
					<p class="pizza-cart-price">{{ pizzaTotalPrice(pizza) }} ₸</p>
					<p class="pizza-cart-count">{{ pizzaTotalCount(pizza) }} шт.</p>
				</template>
			</PizzaCart>
			<div v-show="!cart.items.length" class="empty-pizza">
				<h1>Корзина пустая 😕</h1>
				<p>
					Вероятней всего, вы не заказывали ещё пиццу. <br />
					Для того, чтобы заказать пиццу, перейди на главную страницу.
				</p>
				<img src="../assets/img/cart-empty.png" alt="empty-cart" />
				<PreviousButton />
			</div>

			<PizzaModal
				v-if="isModalOpen && selectedPizza"
				:pizza="selectedPizza"
				@close="isModalOpen = false"
				@edit="isModalOpen = false"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import PizzaCart from '../components/PizzaCart.vue';
	import PizzaModal from '../components/PizzaModal.vue';
	import PreviousButton from '../components/PreviousButton.vue';
	import { ref } from 'vue';
	import { useCartStore } from '../store/cart.store';
	import type { TPizza, TPizzaGrouped } from '../types/TPizza';

	const { cart } = useCartStore();
	const selectedPizza = ref<TPizzaGrouped | TPizza | null>(null);
	const isModalOpen = ref(false);

	const pizzaTotalCount = (pizza: { variants: { count: number }[] }) => {
		return pizza.variants.reduce((sum, variant) => sum + variant.count, 0);
	};

	const pizzaTotalPrice = (pizza: { variants: { price: number; count: number }[] }) => {
		return pizza.variants.reduce((sum, variant) => sum + variant.count * variant.price, 0);
	};

	function openModal(pizza: TPizzaGrouped | TPizza | null) {
		selectedPizza.value = pizza;
		isModalOpen.value = true;
	}
</script>

<style scoped>
	.cart {
		width: 80%;
		margin: 0 auto;
		margin-top: 60px;
		min-height: 60vh;
	}

	.cart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cart-content {
		margin-top: 40px;
	}

	.pizza-cart-price {
		flex: 1;
	}

	.btn-change {
		border: 1px solid #fe5f1e;
		color: #fe5f1e;
		padding: 10px;
		transition: 0.3s ease-in-out;
	}

	.btn-change:hover {
		background-color: #fe5f1e;
		border: 1px solid #fe5f1e;
		color: white;
	}

	.cart-header div:first-child,
	.cart-header div:last-child button {
		display: flex;
		align-items: center;
		gap: 17px;
	}

	.cart-header div:last-child button {
		gap: 7px;
		color: gray;
		font-size: 18px;
		transition: 0.3s ease-in-out;
	}

	.cart-header div:last-child button:hover {
		color: red;
		fill: red;
	}

	.empty-pizza {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		text-align: center;

		img {
			width: 300px;
			height: 255px;
			margin: 0 auto;
			display: flex;
		}

		p {
			color: #777777;
		}
	}
</style>
