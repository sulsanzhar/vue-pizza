<script setup lang="ts">
	import Categories from '../components/Categories.vue';
	import SortBy from '../components/SortBy.vue';
	import PizzaItems from '../components/PizzaItems.vue';
</script>

<template>
	<div class="home">
		<div class="home-top">
			<Categories />
			<SortBy />
		</div>
		<PizzaItems />
	</div>
</template>

<style scoped>
	.home-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}
</style>
