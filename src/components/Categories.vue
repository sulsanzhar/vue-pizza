<template>
	<div class="categories">
		<button
			v-for="(category, index) in categories"
			:key="index"
			:class="{ active: index === activeCategory }"
			@click="onChangeCategory(index)"
		>
			{{ category }}
		</button>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { categories } from '../constants'

	const activeCategory = ref(0);

	function onChangeCategory(index: number) {
		activeCategory.value = index;
	}


</script>

<style scoped>
	.categories {
		display: flex;
		align-items: center;
		gap: 9px;
	}

	button {
		color: #2C2C2C;
		background-color: #F9F9F9;
		border-radius: 30px;
		padding: 15px 30px;
	}

	.active {
		background-color: #282828;
		color: #FFFFFF;
	}
</style>