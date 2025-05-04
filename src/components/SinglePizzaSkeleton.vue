<template>
	<div
		class="pizza-skeleton"
		style="
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 20px;
			margin-top: 109px;
		"
	>
		<div>
			<Skeleton
				shape="circle"
				size="290px"
				style="margin-bottom: 20px; margin-left: auto; margin-right: auto"
			/>
		</div>

		<div style="display: flex; flex-direction: column; gap: 7px; margin-left: 60px">
			<Skeleton width="300px" height="44px" />
			<Skeleton width="60%" height="22px" />
			<Skeleton width="80%" height="22px" />
			<Skeleton width="427px" height="50px" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import Skeleton from 'primevue/skeleton';
</script>
