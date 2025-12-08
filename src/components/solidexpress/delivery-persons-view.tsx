'use client';

import { useState } from 'react';
import { Users, Plus, Phone, Package, TrendingUp, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockDeliveryPersons } from '@/lib/mock-data';
import { STATUS_ENTREGADOR_LABELS } from '@/lib/constants';
import { toast } from 'sonner';

export default function DeliveryPersonsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newPerson, setNewPerson] = useState({ nome: '', telefone: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddDeliveryPerson = () => {
    if (!newPerson.nome || !newPerson.telefone) {
      toast.error('Preencha todos os campos');
      return;
    }

    toast.success(`Entregador ${newPerson.nome} cadastrado com sucesso!`);
    setNewPerson({ nome: '', telefone: '' });
    setDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel':
        return 'bg-green-100 text-green-700';
      case 'em_rota':
        return 'bg-purple-100 text-purple-700';
      case 'offline':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {mockDeliveryPersons.filter((dp) => dp.status === 'disponivel').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Prontos para rota</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Em Rota</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {mockDeliveryPersons.filter((dp) => dp.status === 'em_rota').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Realizando entregas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Offline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {mockDeliveryPersons.filter((dp) => dp.status === 'offline').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Fora de serviço</p>
          </CardContent>
        </Card>
      </div>

      {/* Ações */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar entregador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Entregador
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Entregador</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input
                      id="nome"
                      placeholder="Ex: João Silva"
                      value={newPerson.nome}
                      onChange={(e) => setNewPerson({ ...newPerson, nome: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      placeholder="(79) 99999-0000"
                      value={newPerson.telefone}
                      onChange={(e) => setNewPerson({ ...newPerson, telefone: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddDeliveryPerson} className="w-full">
                    Cadastrar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Entregadores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockDeliveryPersons.map((person) => (
          <Card key={person.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {person.nome.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{person.nome}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Phone className="w-4 h-4" />
                      {person.telefone}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(person.status)}>
                  {STATUS_ENTREGADOR_LABELS[person.status]}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">Hoje</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{person.entregasHoje}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Total</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{person.totalEntregas}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Histórico
                </Button>
                <Button size="sm" className="flex-1">
                  Atribuir Rota
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
