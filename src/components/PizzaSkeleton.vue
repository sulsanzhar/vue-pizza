<script setup lang="ts">
	import Skeleton from 'primevue/skeleton';
</script>

<template>
	<div style="height: 460px; width: 280px; text-align: center">
		<Skeleton shape="circle" size="240px" style="margin: 0 auto; margin-bottom: 20px" />
		<Skeleton width="90%" height="25px" style="margin: 0 auto; margin-bottom: 20px" />
		<Skeleton width="100%" border-radius="10px" height="95px" style="margin-bottom: 15px" />
		<div style="display: flex; align-items: center; justify-content: space-evenly">
			<Skeleton width="43px" height="22px" />
			<Skeleton width="135px" height="40px" border-radius="20px" />
		</div>
	</div>
</template>
