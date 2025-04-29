// stores/pizzaStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { TPizza } from '../types/TPizza';

export const usePizzaStore = defineStore('pizza', () => {
	const pizzas = ref<TPizza[]>([]);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	async function fetchPizzas() {
		if (pizzas.value.length > 0) {
			return pizzas.value;
		}

		isLoading.value = true;
		try {
			// Выполняем запрос к API
			const { data } = await axios.get('https://67afa6a3dffcd88a67873fcf.mockapi.io/items');
			pizzas.value = data;
			return data;
		} catch (err) {
			error.value = 'Ошибка при загрузке пицц';
			console.error(err);
			throw err;
		} finally {
			isLoading.value = false;
		}
	}

	return { pizzas, fetchPizzas, isLoading, error };
});
