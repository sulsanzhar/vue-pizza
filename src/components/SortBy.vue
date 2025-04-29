<template>
	<div class="sort-by" ref="sortRef">
		<img src="../assets/img/arrow-up.svg" alt="arrow-up" />
		<p>Сортировка по:</p>
		<span @click="togglePopup">
			{{ sortArr[activeSort] }}
		</span>
		<ul class="sort-popup" v-if="isPopupVisible">
			<li
				v-for="(sort, i) in sortArr"
				:key="i"
				:class="{ active: activeSort === i }"
				@click="selectSort(i)"
			>
				{{ sort }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount } from 'vue';

	const sortArr = ['популярности', 'по цене', 'по алфавиту'];
	const activeSort = ref(0);
	const isPopupVisible = ref(false);

	function togglePopup() {
		isPopupVisible.value = !isPopupVisible.value;
	}

	function selectSort(index: number) {
		activeSort.value = index;
		isPopupVisible.value = false;
	}

	const sortRef = ref<HTMLElement | null>(null);

	function handleClickOutside(event: MouseEvent) {
		if (sortRef.value && !sortRef.value.contains(event.target as Node)) {
			isPopupVisible.value = false;
		}
	}

	onMounted(() => {
		document.addEventListener('click', handleClickOutside);
	});

	onBeforeUnmount(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<style scoped>
	.sort-by {
		display: flex;
		align-items: center;
		gap: 7px;
		position: relative;
	}

	span {
		color: #fe5f1e;
		text-decoration-style: dotted;
		cursor: pointer;
		position: relative;
	}

	.sort-popup {
		position: absolute;
		top: 30px;
		right: 0;
		background-color: #fff;
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
		padding: 10px 0;
		z-index: 10;
	}

	.sort-popup li {
		list-style: none;
		padding: 8px 12px;
		cursor: pointer;
		transition: 0.2s;
	}

	.sort-popup li:hover {
		background-color: #f5f5f5;
	}

	.sort-popup li.active {
		background-color: rgba(254, 95, 30, 0.05);
		color: #fe5f1e;
		font-weight: bold;
	}
</style>
