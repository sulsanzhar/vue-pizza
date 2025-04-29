<template>
	<div class="not-found">
		<img src="../assets/img/not-found.png" alt="Pizza Slice" class="pizza-icon" />
		<h1>404</h1>
		<h2>Oops! Pizza not here</h2>
		<RouterLink to="/" class="home-button">Back to Menu</RouterLink>
	</div>
</template>

<script setup>
	import { RouterLink } from 'vue-router';
</script>

<style scoped>
	.not-found {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-family: 'Comic Sans MS', cursive, sans-serif;
	}

	h1 {
		font-size: 100px;
		margin: 0;
		color: #ff6347;
	}

	h2 {
		font-size: 32px;
		margin: 10px 0;
		color: #333;
	}

	img {
		width: 40%;
	}

	.home-button {
		padding: 12px 24px;
		background-color: #ff6347;
		color: white;
		border-radius: 30px;
		text-decoration: none;
		font-weight: bold;
	}

	.home-button:hover {
		background-color: #e5533d;
	}
</style>
