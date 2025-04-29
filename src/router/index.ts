import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	routes: [
		{ path: '/', component: () => import('../views/Home.vue') },
		{ path: '/cart', component: () => import('../views/Cart.vue') },
		{ path: '/pizza/:id', component: () => import('../views/Pizza.vue') },
		{ path: '/:pathMatch(.*)*', component: () => import('../views/NotFound.vue') },
	],
	history: createWebHistory(),
});

export default router;
