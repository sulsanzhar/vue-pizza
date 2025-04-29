import { defineStore } from 'pinia';
import { reactive } from 'vue';
import type { TPizza } from '../types/TPizza';

type TPizzaVariant = {
	size: string;
	type: string;
	count: number;
	price: number;
};

type TPizzaGrouped = {
	id: number;
	title: string;
	imageUrl: string;
	variants: TPizzaVariant[];
};

type TCart = {
	items: TPizzaGrouped[];
	totalItems: number;
	totalPrice: number;
};

export const useCartStore = defineStore('cart', () => {
	const cart = reactive<TCart>({
		items: [],
		totalItems: 0,
		totalPrice: 0,
	});

	function addPizza(pizza: TPizza) {
		const group = cart.items.find((item) => item.title === pizza.title);
		const variant = {
			size: String(pizza.size),
			type: String(pizza.type),
			price: pizza.price,
			count: 1,
		};

		if (group) {
			const found = group.variants.find((v) => v.size === variant.size && v.type === variant.type);

			if (found) {
				found.count++;
			} else {
				group.variants.push(variant);
			}
		} else {
			cart.items.push({
				id: pizza.id,
				title: pizza.title,
				imageUrl: pizza.imageUrl,
				variants: [variant],
			});
		}

		updateCartSummary();
	}

	function updateCartSummary() {
		cart.totalItems = cart.items.reduce(
			(sum, item) => sum + item.variants.reduce((s, v) => s + v.count, 0),
			0
		);
		cart.totalPrice = cart.items.reduce(
			(sum, item) => sum + item.variants.reduce((s, v) => s + v.count * v.price, 0),
			0
		);
	}

	function updateVariantCount(pizzaTitle: string, size: string, type: string, count: number) {
		const group = cart.items.find((item) => item.title === pizzaTitle);
		if (!group) return;

		const variant = group.variants.find((v) => v.size === size && v.type === type);
		if (variant) {
			variant.count = count;
			if (variant.count <= 0) {
				group.variants = group.variants.filter((v) => v !== variant);
			}
			if (group.variants.length === 0) {
				cart.items = cart.items.filter((i) => i !== group);
			}
		}

		updateCartSummary();
	}

	return { cart, addPizza, updateVariantCount };
});
