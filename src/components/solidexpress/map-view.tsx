'use client';

import { MapPin, Navigation, Package, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function MapView() {
  return (
    <div className="space-y-6">
      {/* Alerta de Integração */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Integração com Google Maps:</strong> Configure a chave da API no arquivo .env.local para ativar o mapa interativo.
          <br />
          <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_aqui
          </code>
        </AlertDescription>
      </Alert>

      {/* Mapa Simulado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Mapa Logístico - Aracaju e Região
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
            {/* Simulação de Mapa */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 text-blue-600 mx-auto" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Mapa Interativo</h3>
                  <p className="text-gray-600 mt-2">
                    Configure a API do Google Maps para visualizar:
                  </p>
                  <ul className="text-sm text-gray-600 mt-3 space-y-1">
                    <li>• Localização em tempo real dos entregadores</li>
                    <li>• Rotas otimizadas de entrega</li>
                    <li>• Pontos de coleta e destino</li>
                    <li>• Áreas de cobertura por bairro</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Marcadores Simulados */}
            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                  Central SolidExpress
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 right-1/3 transform translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                  Entregador 1
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="relative">
                <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                  Destino
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legenda */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Central</p>
                <p className="text-sm text-gray-600">Ponto de distribuição</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Navigation className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Entregadores</p>
                <p className="text-sm text-gray-600">Em rota de entrega</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Destinos</p>
                <p className="text-sm text-gray-600">Pontos de entrega</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instruções de Configuração */}
      <Card>
        <CardHeader>
          <CardTitle>Como Configurar o Google Maps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              <strong>1.</strong> Acesse o{' '}
              <a
                href="https://console.cloud.google.com/google/maps-apis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Cloud Console
              </a>
            </p>
            <p className="text-sm text-gray-700">
              <strong>2.</strong> Crie um novo projeto ou selecione um existente
            </p>
            <p className="text-sm text-gray-700">
              <strong>3.</strong> Ative as APIs: Maps JavaScript API, Directions API, Geocoding API
            </p>
            <p className="text-sm text-gray-700">
              <strong>4.</strong> Crie uma chave de API em "Credenciais"
            </p>
            <p className="text-sm text-gray-700">
              <strong>5.</strong> Adicione a chave no arquivo <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
