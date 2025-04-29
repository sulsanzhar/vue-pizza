import type { TPizza } from '../types/TPizza';

export function getExistPizza(pizza: TPizza, pizzaArr: TPizza[]) {
	const existPizza = pizzaArr.find(
		(item) => item.id === pizza.id && item.size === pizza.size && item.type === pizza.type
	);

	return existPizza;
}
