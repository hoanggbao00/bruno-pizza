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
				return 'yellow';
			case EPizzaStockStatus.OUT_OF_STOCK:
				return 'red';
			case EPizzaStockStatus.DISCONTINUED:
				return 'gray';
		}
	}, [stock]);

  const titleStock = useMemo(() => {
  
    switch (stock) {
      case EPizzaStockStatus.IN_STOCK:
        return 'CÒN HÀNG';
      case EPizzaStockStatus.LOW_STOCK:
        return 'SỐ LƯỢNG ÍT';
      case EPizzaStockStatus.OUT_OF_STOCK:
        return 'HẾT HÀNG';
      case EPizzaStockStatus.DISCONTINUED:
        return 'DỪNG KINH DOANH';
    }
  }, [stock])
	return <Badge className={`bg-${colorStock}`}>{titleStock}</Badge>;
}
