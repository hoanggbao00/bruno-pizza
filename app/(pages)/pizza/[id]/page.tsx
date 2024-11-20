import PizzaDetail from '@/components/pizza-detail/pizza-detail';
import { pizzas } from '@/lib/data/pizza';

interface Props {
	params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
	const id = (await params).id;
	const pizza = pizzas.find((p) => p.id === id);

	return pizza ? <PizzaDetail id={id} pizza={pizza} /> : <div>Not found</div>;
}
