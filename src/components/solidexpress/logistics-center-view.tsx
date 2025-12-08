'use client';

import { useState } from 'react';
import { Package, MapPin, Search, Filter, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockPackages, mockDeliveryPersons } from '@/lib/mock-data';
import { STATUS_PACOTE_LABELS, STATUS_COLORS } from '@/lib/constants';

export default function LogisticsCenterView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBairro, setFilterBairro] = useState('todos');

  // Filtra apenas pacotes na central
  const packagesInCenter = mockPackages.filter((pkg) => pkg.status === 'na_central');

  // Agrupa por bairro
  const packagesByNeighborhood = packagesInCenter.reduce((acc, pkg) => {
    if (!acc[pkg.destinoBairro]) {
      acc[pkg.destinoBairro] = [];
    }
    acc[pkg.destinoBairro].push(pkg);
    return acc;
  }, {} as Record<string, typeof mockPackages>);

  return (
    <div className="space-y-6">
      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total na Central</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{packagesInCenter.length}</div>
            <p className="text-xs text-gray-500 mt-1">Aguardando retirada</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Bairros Atendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{Object.keys(packagesByNeighborhood).length}</div>
            <p className="text-xs text-gray-500 mt-1">Regiões diferentes</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Entregadores Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {mockDeliveryPersons.filter((dp) => dp.status === 'disponivel').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Prontos para rota</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar por ID do pacote..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar por Bairro
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pacotes por Bairro */}
      <div className="space-y-6">
        {Object.entries(packagesByNeighborhood).map(([bairro, packages]) => (
          <Card key={bairro}>
            <CardHeader className="bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  {bairro}
                </CardTitle>
                <Badge variant="secondary">{packages.length} pacotes</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{pkg.id}</p>
                        <p className="text-sm text-gray-600">Origem: {pkg.origem}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Destino: {pkg.destinoBairro}, {pkg.destinoCidade}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                        {STATUS_PACOTE_LABELS[pkg.status]}
                      </Badge>
                      <Button size="sm">
                        <Truck className="w-4 h-4 mr-2" />
                        Atribuir Rota
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {Object.keys(packagesByNeighborhood).length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Nenhum pacote na central</p>
              <p className="text-sm text-gray-500 mt-1">Todos os pacotes foram distribuídos ou ainda não chegaram</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
