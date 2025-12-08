'use client';

import { BarChart3, TrendingUp, Package, Users, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockPackages, mockDeliveryPersons } from '@/lib/mock-data';
import { BAIRROS_ARACAJU } from '@/lib/constants';

export default function ReportsView() {
  // Análise de entregas por status
  const statusCount = mockPackages.reduce((acc, pkg) => {
    acc[pkg.status] = (acc[pkg.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Análise por bairro
  const deliveriesByNeighborhood = mockPackages.reduce((acc, pkg) => {
    acc[pkg.destinoBairro] = (acc[pkg.destinoBairro] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topNeighborhoods = Object.entries(deliveriesByNeighborhood)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  // Performance dos entregadores
  const topDeliveryPersons = [...mockDeliveryPersons]
    .sort((a, b) => b.entregasHoje - a.entregasHoje)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-700">Período</label>
              <Select defaultValue="hoje">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoje">Hoje</SelectItem>
                  <SelectItem value="semana">Esta Semana</SelectItem>
                  <SelectItem value="mes">Este Mês</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-gray-700">Tipo de Relatório</label>
              <Select defaultValue="geral">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Visão Geral</SelectItem>
                  <SelectItem value="entregas">Entregas</SelectItem>
                  <SelectItem value="entregadores">Entregadores</SelectItem>
                  <SelectItem value="regioes">Regiões</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Entregas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{mockPackages.length}</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12% vs ontem</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Taxa de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {Math.round((statusCount.entregue / mockPackages.length) * 100)}%
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+5% vs ontem</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Entregadores Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {mockDeliveryPersons.filter((dp) => dp.status !== 'offline').length}
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>de {mockDeliveryPersons.length} total</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Tempo Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">35 min</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>-8% vs ontem</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entregas por Bairro */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Top 10 Bairros - Entregas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topNeighborhoods.map(([bairro, count], index) => (
                <div key={bairro} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">
                      {index + 1}. {bairro}
                    </span>
                    <span className="text-gray-600">{count} entregas</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${(count / mockPackages.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance dos Entregadores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Top 5 Entregadores - Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDeliveryPersons.map((person, index) => (
                <div key={person.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{person.nome}</p>
                      <p className="text-xs text-gray-500">{person.totalEntregas} entregas totais</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{person.entregasHoje}</p>
                    <p className="text-xs text-gray-500">hoje</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status das Entregas */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Recebidos</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{statusCount.recebido || 0}</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Na Central</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{statusCount.na_central || 0}</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Em Rota</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{statusCount.em_rota || 0}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Entregues</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{statusCount.entregue || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights e Recomendações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Crescimento de Demanda</p>
                <p className="text-sm text-gray-600 mt-1">
                  Os bairros {topNeighborhoods[0]?.[0]} e {topNeighborhoods[1]?.[0]} apresentam maior volume. Considere
                  alocar mais entregadores nessas regiões.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Package className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Performance Excelente</p>
                <p className="text-sm text-gray-600 mt-1">
                  Taxa de entregas bem-sucedidas está acima da meta. Continue monitorando a qualidade do serviço.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <Calendar className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Horário de Pico</p>
                <p className="text-sm text-gray-600 mt-1">
                  Maior volume de entregas entre 14h-17h. Planeje rotas com antecedência nesse período.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
