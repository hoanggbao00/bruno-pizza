// app/admin/page.tsx
import { Card } from '@/components/ui/card';
import {
  PizzaIcon,
  LayersIcon,
  ShoppingCartIcon,
  TicketIcon,
} from 'lucide-react';

export default async function AdminDashboard() {
  // You would fetch these counts from your database
  const stats = [
    { label: 'Total Pizzas', value: '24', icon: PizzaIcon },
    { label: 'Categories', value: '8', icon: LayersIcon },
    { label: 'Orders Today', value: '12', icon: ShoppingCartIcon },
    { label: 'Active Vouchers', value: '5', icon: TicketIcon },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-blue-500" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}