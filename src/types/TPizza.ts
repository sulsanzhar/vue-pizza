export type TPizza = {
	id: number;
	imageUrl: string;
	title: string;
	price?: number;
	category?: number;
	count?: number;
	size?: string;
	type?: string;
};

export type TPizzaVariant = {
	size: string;
	type: string;
	count: number;
	price: number;
};

export type TPizzaGrouped = {
	id: number;
	title: string;
	imageUrl: string;
	price: number;
	category: number;
	count: number;
	variants: TPizzaVariant[];
};
