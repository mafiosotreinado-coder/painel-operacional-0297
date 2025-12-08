'use client';

import { useState } from 'react';
import { Package, Truck, Users, MapPin, MessageSquare, BarChart3, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDashboardStats } from '@/lib/mock-data';

// Componentes das páginas
import DashboardView from '@/components/solidexpress/dashboard-view';
import PackagesView from '@/components/solidexpress/packages-view';
import LogisticsCenterView from '@/components/solidexpress/logistics-center-view';
import DeliveryPersonsView from '@/components/solidexpress/delivery-persons-view';
import RoutesView from '@/components/solidexpress/routes-view';
import MapView from '@/components/solidexpress/map-view';
import ChatView from '@/components/solidexpress/chat-view';
import ReportsView from '@/components/solidexpress/reports-view';

type ViewType = 'dashboard' | 'packages' | 'logistics' | 'delivery-persons' | 'routes' | 'map' | 'chat' | 'reports';

export default function SolidExpressPanel() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'packages', label: 'Bipagem de Pacotes', icon: Package },
    { id: 'logistics', label: 'Central Logística', icon: MapPin },
    { id: 'delivery-persons', label: 'Entregadores', icon: Users },
    { id: 'routes', label: 'Rotas', icon: Truck },
    { id: 'map', label: 'Mapa', icon: MapPin },
    { id: 'chat', label: 'Chat Interno', icon: MessageSquare },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'packages':
        return <PackagesView />;
      case 'logistics':
        return <LogisticsCenterView />;
      case 'delivery-persons':
        return <DeliveryPersonsView />;
      case 'routes':
        return <RoutesView />;
      case 'map':
        return <MapView />;
      case 'chat':
        return <ChatView />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-500">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8" />
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold">SolidExpress</h1>
                <p className="text-xs text-blue-200">Painel Operacional</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as ViewType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  currentView === item.id
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'hover:bg-blue-700 text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Toggle Sidebar */}
        <div className="p-4 border-t border-blue-500">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full text-white hover:bg-blue-700"
          >
            <Menu className="w-5 h-5" />
            {sidebarOpen && <span className="ml-2">Recolher</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {menuItems.find((item) => item.id === currentView)?.label}
              </h2>
              <p className="text-sm text-gray-500">Aracaju - SE e Região Metropolitana</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">Central SolidExpress</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                SE
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">{renderView()}</div>
      </main>
    </div>
  );
}
