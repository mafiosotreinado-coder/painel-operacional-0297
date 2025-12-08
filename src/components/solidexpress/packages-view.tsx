'use client';

import { useState } from 'react';
import { Package, Scan, QrCode, Barcode, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BAIRROS_ARACAJU, CIDADES_REGIAO } from '@/lib/constants';
import { toast } from 'sonner';

export default function PackagesView() {
  const [scanMode, setScanMode] = useState<'manual' | 'qrcode' | 'barcode'>('manual');
  const [packageId, setPackageId] = useState('');
  const [origem, setOrigem] = useState('');
  const [destinoBairro, setDestinoBairro] = useState('');
  const [destinoCidade, setDestinoCidade] = useState('Aracaju');

  const handleBipagem = () => {
    if (!packageId || !origem || !destinoBairro || !destinoCidade) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    // Simula bipagem do pacote
    toast.success(`Pacote ${packageId} registrado com sucesso!`, {
      description: `Destino: ${destinoBairro}, ${destinoCidade}`,
    });

    // Limpa o formulário
    setPackageId('');
    setOrigem('');
    setDestinoBairro('');
    setDestinoCidade('Aracaju');
  };

  return (
    <div className="space-y-6">
      {/* Modo de Bipagem */}
      <Card>
        <CardHeader>
          <CardTitle>Modo de Entrada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant={scanMode === 'manual' ? 'default' : 'outline'}
              onClick={() => setScanMode('manual')}
              className="h-24 flex flex-col gap-2"
            >
              <Package className="w-8 h-8" />
              <span>ID Manual</span>
            </Button>

            <Button
              variant={scanMode === 'qrcode' ? 'default' : 'outline'}
              onClick={() => setScanMode('qrcode')}
              className="h-24 flex flex-col gap-2"
            >
              <QrCode className="w-8 h-8" />
              <span>QR Code</span>
            </Button>

            <Button
              variant={scanMode === 'barcode' ? 'default' : 'outline'}
              onClick={() => setScanMode('barcode')}
              className="h-24 flex flex-col gap-2"
            >
              <Barcode className="w-8 h-8" />
              <span>Código de Barras</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Bipagem */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="w-5 h-5" />
            Registrar Pacote
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scanMode === 'manual' ? (
              <div className="space-y-2">
                <Label htmlFor="packageId">ID do Pacote *</Label>
                <Input
                  id="packageId"
                  placeholder="Ex: PKG001, ABC123"
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                />
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <div className="flex flex-col items-center gap-4">
                  {scanMode === 'qrcode' ? (
                    <QrCode className="w-16 h-16 text-gray-400" />
                  ) : (
                    <Barcode className="w-16 h-16 text-gray-400" />
                  )}
                  <p className="text-gray-600">
                    {scanMode === 'qrcode' ? 'Posicione o QR Code na câmera' : 'Aproxime o código de barras do leitor'}
                  </p>
                  <Button variant="outline" onClick={() => setScanMode('manual')}>
                    Usar ID Manual
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="origem">Origem *</Label>
              <Input
                id="origem"
                placeholder="Ex: Megaflex - São Paulo"
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade de Destino *</Label>
                <Select value={destinoCidade} onValueChange={setDestinoCidade}>
                  <SelectTrigger id="cidade">
                    <SelectValue placeholder="Selecione a cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {CIDADES_REGIAO.map((cidade) => (
                      <SelectItem key={cidade} value={cidade}>
                        {cidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro de Destino *</Label>
                <Select value={destinoBairro} onValueChange={setDestinoBairro}>
                  <SelectTrigger id="bairro">
                    <SelectValue placeholder="Selecione o bairro" />
                  </SelectTrigger>
                  <SelectContent>
                    {BAIRROS_ARACAJU.map((bairro) => (
                      <SelectItem key={bairro} value={bairro}>
                        {bairro}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleBipagem} className="w-full" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Registrar Pacote
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Últimos Pacotes Registrados */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Pacotes Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">PKG00{i}</p>
                    <p className="text-sm text-gray-600">Origem: Megaflex - São Paulo</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">Atalaia</p>
                  <p className="text-sm text-gray-600">Aracaju - SE</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
