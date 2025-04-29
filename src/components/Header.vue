<template>
	<header class="header">
		<RouterLink to="/" class="header__logo">
			<div>
				<img src="../../public/pizza-logo.png" alt="pizza-logo" />
			</div>
			<div>
				<h2>VUE PIZZA</h2>
				<span>самая вкусная пицца во вселенной</span>
			</div>
		</RouterLink>

		<RouterLink to="/cart" class="cart">
			<b>{{ store.cart.totalPrice }} ₸</b>
			<b>|</b>
			<div>
				<img src="../assets/img/cart-icon.svg" alt="cart-icon" />
				<b>{{ store.cart.totalItems }}</b>
			</div>
		</RouterLink>
	</header>
</template>

<script setup lang="ts">
	import { useCartStore } from '../store/cart.store';

	const store = useCartStore();
</script>

<style scoped>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 80px;
		position: relative;
	}

	.header:after {
		position: absolute;
		content: '';
		border: 0.5px solid #f7f7f7;
		width: 100%;
		bottom: -40px;
	}

	.cart {
		display: flex;
		background-color: #fe5f1e;
		padding: 0 20px;
		gap: 13px;
		height: 50px;
		align-items: center;
		justify-content: center;
		border-radius: 100px;
		color: white;
		transition: ease-in-out 0.3s;
	}

	.cart:hover {
		transform: translateY(-3px);
	}

	.cart > div {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	span {
		color: #7b7b7b;
	}

	.header__logo {
		display: flex;
		align-items: center;
		gap: 17px;
	}
</style>
