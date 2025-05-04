<script setup lang="ts">
	// your logic here
</script>

<template>
	<RouterLink to="/" class="btn-back">Вернуться назад</RouterLink>
</template>

<style scoped>
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #282828;
		color: white;
		width: 210px;
		height: 50px;
		border-radius: 30px;
		transition: 0.3s ease-in-out;
		margin-top: 10px;
	}

	a:hover {
		background-color: #fe5f1e;
		color: white;
	}
</style>
