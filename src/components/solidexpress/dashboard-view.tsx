'use client';

import { Package, Truck, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDashboardStats, mockPackages, mockDeliveryPersons } from '@/lib/mock-data';
import { BAIRROS_ARACAJU } from '@/lib/constants';

export default function DashboardView() {
  const stats = mockDashboardStats;

  // Análise por bairro
  const packagesByNeighborhood = mockPackages.reduce((acc, pkg) => {
    if (pkg.status !== 'entregue') {
      acc[pkg.destinoBairro] = (acc[pkg.destinoBairro] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topNeighborhoods = Object.entries(packagesByNeighborhood)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Pacotes Recebidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.pacotesRecebidos}</div>
            <p className="text-xs text-gray-500 mt-1">Total do dia</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Na Central
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.pacotesNaCentral}</div>
            <p className="text-xs text-gray-500 mt-1">Aguardando retirada</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Em Rota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.pacotesEmRota}</div>
            <p className="text-xs text-gray-500 mt-1">Em processo de entrega</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Entregues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{stats.pacotesEntregues}</div>
            <p className="text-xs text-gray-500 mt-1">Concluídas hoje</p>
          </CardContent>
        </Card>
      </div>

      {/* Status dos Entregadores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Status dos Entregadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {stats.entregadoresDisponiveis}
              </div>
              <div>
                <p className="font-semibold text-gray-900">Disponíveis</p>
                <p className="text-sm text-gray-600">Prontos para rota</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {stats.entregadoresEmRota}
              </div>
              <div>
                <p className="font-semibold text-gray-900">Em Rota</p>
                <p className="text-sm text-gray-600">Realizando entregas</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {stats.entregadoresOffline}
              </div>
              <div>
                <p className="font-semibold text-gray-900">Offline</p>
                <p className="text-sm text-gray-600">Fora de serviço</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bairros com Maior Demanda */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bairros com Maior Demanda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topNeighborhoods.length > 0 ? (
                topNeighborhoods.map(([bairro, count]) => (
                  <div key={bairro} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-gray-900">{bairro}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{count} pacotes</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(count / stats.pacotesRecebidos) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Nenhum pacote pendente</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entregadores Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDeliveryPersons
                .filter((dp) => dp.status !== 'offline')
                .map((person) => (
                  <div key={person.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {person.nome.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{person.nome}</p>
                        <p className="text-xs text-gray-500">{person.entregasHoje} entregas hoje</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        person.status === 'disponivel'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {person.status === 'disponivel' ? 'Disponível' : 'Em Rota'}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
