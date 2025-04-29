<template>
	<div class="bg">
		<div class="app container">
			<Header />
			<router-view />
		</div>
	</div>
</template>

<script setup lang="ts">
	import Header from './components/Header.vue';
</script>

<style scoped>
	.container {
		max-width: 1225px;
		margin: 0 auto;
	}

	.bg {
		background-color: #ffdf8c;
		height: 100%;
		padding: 40px;
	}

	.app {
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.03);
		padding: 50px;
	}
</style>
