<template>
	<div @click="$emit('close')" class="pizza-modal-bg">
		<div @click.stop class="pizza-modal">
			<h2>Редактирование заказа</h2>
			<PizzaCart
				class="variant"
				v-for="variant in localVariants"
				:key="variant.size + variant.type"
				:size="variant.size"
				:type="variant.type"
				:pizza="{
					id: pizza.id,
					imageUrl: pizza.imageUrl,
					title: pizza.title,
					category: pizza.category,
					price: variant.price,
					count: variant.count,
				}"
			>
				<template #default>
					<div class="pizza-cart-function">
						<button @click="decrease(variant)" class="round-btn">-</button>
						<span>{{ variant.count }}</span>
						<button @click="increase(variant)" class="round-btn">+</button>
					</div>
				</template>
				<template #numbers>
					<p class="pizza-cart-price">{{ variant.count * variant.price }} ₸</p>
				</template>
			</PizzaCart>
			<div class="pizza-cart-btns">
				<button @click="emit('close')" class="btn-cancel">Отменить</button>
				<button @click="onEditHandler" class="btn-save">Изменить</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { TPizza, TPizzaGrouped } from '../types/TPizza';
	import PizzaCart from '../components/PizzaCart.vue';
	import { useCartStore } from '../store/cart.store';
	import { watch, ref } from 'vue';

	const { updateVariantCount } = useCartStore();

	const localVariants = ref<TPizzaGrouped['variants']>([]);
	const props = defineProps<{ pizza: TPizza | TPizzaGrouped }>();

	function onEditHandler() {
		if (!isGroupedPizza(props.pizza)) return;

		localVariants.value.forEach((variant) => {
			updateVariantCount(props.pizza.title, variant.size, variant.type, variant.count);
		});

		emit('edit');
	}

	watch(
		() => props.pizza,
		(pizza) => {
			if (isGroupedPizza(pizza)) {
				localVariants.value = pizza.variants.map((v) => ({ ...v }));
			}
		},
		{ immediate: true }
	);

	function isGroupedPizza(pizza: TPizza | TPizzaGrouped): pizza is TPizzaGrouped {
		return Array.isArray((pizza as any).variants);
	}

	const emit = defineEmits(['close', 'edit']);

	function increase(variant: (typeof localVariants.value)[0]) {
		variant.count++;
	}

	function decrease(variant: (typeof localVariants.value)[0]) {
		if (variant.count > 0) variant.count--;
	}
</script>

<style scoped>
	h2 {
		text-align: center;
		margin-bottom: 20px;
	}
	.pizza-modal-bg {
		position: fixed;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(3px);
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
	}

	.pizza-modal {
		position: absolute;
		padding: 40px;
		padding-bottom: 0;
		z-index: 100;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		width: 900px;
		height: 600px;
		overflow-y: auto;
		border-radius: 10px;
	}

	.round-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fe5f1e;
		scale: 1.3;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 1px solid #fe5f1e;
		transition: 0.3s ease-in-out;
	}

	.round-btn:hover {
		background-color: #fe5f1e;
		color: white;
	}

	.pizza-cart-function {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		flex: 2;
	}

	.pizza-cart-btns {
		position: sticky;
		bottom: 0;
		display: flex;
		justify-content: end;
		gap: 10px;
		z-index: 101;
		padding: 15px;
		background-color: white;
		border-radius: 5px;
	}

	.pizza-cart-btns button {
		border: 1px solid black;
		padding: 10px;
		transition: 0.3s ease-in-out;
		border-radius: 5px;
	}

	.btn-cancel:hover {
		background-color: red;
		border: 1px solid red;
		color: white;
	}

	.btn-save:hover {
		background-color: #0062cc;
		border: 1px solid #0062cc;
		color: white;
	}
</style>
