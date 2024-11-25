'use client';

import { EPizzaStockStatus } from '@/types/pizza';
import { Badge } from './ui/badge';
import { useMemo } from 'react';

interface Props {
	stock: EPizzaStockStatus;
}

export default function StockRender({ stock }: Props) {
	const colorStock = useMemo(() => {
		switch (stock) {
			case EPizzaStockStatus.IN_STOCK:
				return 'green';
			case EPizzaStockStatus.LOW_STOCK:
				return 'yellow-300 text-black';
			case EPizzaStockStatus.OUT_OF_STOCK:
				return 'red';
			case EPizzaStockStatus.DISCONTINUED:
				return 'gray-500';
		}
	}, [stock]);

  const titleStock = useMemo(() => {
  
    switch (stock) {
      case EPizzaStockStatus.IN_STOCK:
        return 'IN STOCK';
      case EPizzaStockStatus.LOW_STOCK:
        return 'LOW STOCK';
      case EPizzaStockStatus.OUT_OF_STOCK:
        return 'OUT OF STOCK';
      case EPizzaStockStatus.DISCONTINUED:
        return 'DISCONTINUED';
    }
  }, [stock])

	return <>
	<Badge className={`bg-${colorStock}`}>{titleStock}</Badge>
	<span hidden className='bg-gray-500'></span>
	<span hidden className='bg-yellow-300 text-black'></span>
	</>;
}
