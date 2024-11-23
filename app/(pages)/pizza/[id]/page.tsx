import PizzaDetail from '@/components/pages/pizza-detail/pizza-detail';
import { getPizzaById } from '@/lib/actions/pizza.action';

interface Props {
	params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
	const id = (await params).id;
	const pizza = await getPizzaById(id);

	return pizza ? <PizzaDetail pizza={pizza} /> : <div>Not found</div>;
}
