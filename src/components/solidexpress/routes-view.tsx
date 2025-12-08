'use client';

import { useState } from 'react';
import { Truck, Plus, MapPin, Clock, Navigation, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockRoutes, mockDeliveryPersons } from '@/lib/mock-data';
import { BAIRROS_ARACAJU } from '@/lib/constants';
import { toast } from 'sonner';

export default function RoutesView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newRoute, setNewRoute] = useState({
    nome: '',
    bairros: [] as string[],
    entregadorId: '',
  });

  const handleCreateRoute = () => {
    if (!newRoute.nome || newRoute.bairros.length === 0) {
      toast.error('Preencha o nome e selecione pelo menos um bairro');
      return;
    }

    toast.success(`Rota "${newRoute.nome}" criada com sucesso!`);
    setNewRoute({ nome: '', bairros: [], entregadorId: '' });
    setDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planejada':
        return 'bg-blue-100 text-blue-700';
      case 'em_andamento':
        return 'bg-purple-100 text-purple-700';
      case 'concluida':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planejada':
        return 'Planejada';
      case 'em_andamento':
        return 'Em Andamento';
      case 'concluida':
        return 'Concluída';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Rotas Planejadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {mockRoutes.filter((r) => r.status === 'planejada').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Aguardando início</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {mockRoutes.filter((r) => r.status === 'em_andamento').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Entregas em curso</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Concluídas Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {mockRoutes.filter((r) => r.status === 'concluida').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Finalizadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Ações */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Gerencie as rotas de entrega e atribua entregadores</p>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Rota
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Nova Rota</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomeRota">Nome da Rota *</Label>
                    <Input
                      id="nomeRota"
                      placeholder="Ex: Rota Zona Sul"
                      value={newRoute.nome}
                      onChange={(e) => setNewRoute({ ...newRoute, nome: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Bairros da Rota *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
                      {BAIRROS_ARACAJU.map((bairro) => (
                        <label key={bairro} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newRoute.bairros.includes(bairro)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewRoute({ ...newRoute, bairros: [...newRoute.bairros, bairro] });
                              } else {
                                setNewRoute({
                                  ...newRoute,
                                  bairros: newRoute.bairros.filter((b) => b !== bairro),
                                });
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{bairro}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entregador">Entregador (Opcional)</Label>
                    <Select value={newRoute.entregadorId} onValueChange={(value) => setNewRoute({ ...newRoute, entregadorId: value })}>
                      <SelectTrigger id="entregador">
                        <SelectValue placeholder="Selecione um entregador" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockDeliveryPersons
                          .filter((dp) => dp.status === 'disponivel')
                          .map((person) => (
                            <SelectItem key={person.id} value={person.id}>
                              {person.nome}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleCreateRoute} className="w-full">
                    Criar Rota
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Rotas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockRoutes.map((route) => {
          const entregador = mockDeliveryPersons.find((dp) => dp.id === route.entregadorId);

          return (
            <Card key={route.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    {route.nome}
                  </CardTitle>
                  <Badge className={getStatusColor(route.status)}>
                    {getStatusLabel(route.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Informações da Rota */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Navigation className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      <strong>{route.distanciaEstimada} km</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      <strong>{route.tempoEstimado} min</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      <strong>{route.pacotes.length}</strong> pacotes
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      <strong>{route.bairros.length}</strong> bairros
                    </span>
                  </div>
                </div>

                {/* Bairros */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Bairros:</p>
                  <div className="flex flex-wrap gap-2">
                    {route.bairros.map((bairro) => (
                      <Badge key={bairro} variant="outline" className="text-xs">
                        {bairro}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Entregador */}
                {entregador && (
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Entregador:</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {entregador.nome.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{entregador.nome}</p>
                        <p className="text-xs text-gray-500">{entregador.telefone}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ações */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Detalhes
                  </Button>
                  {route.status === 'planejada' && (
                    <Button size="sm" className="flex-1">
                      Iniciar Rota
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
