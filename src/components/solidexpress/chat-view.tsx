'use client';

import { useState } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockMessages, mockDeliveryPersons } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function ChatView() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Digite uma mensagem');
      return;
    }

    toast.success('Mensagem enviada!');
    setMessage('');
  };

  const contacts = [
    { id: 'CENTRAL', nome: 'Central SolidExpress', tipo: 'central' },
    ...mockDeliveryPersons.map((dp) => ({ id: dp.id, nome: dp.nome, tipo: 'entregador' })),
  ];

  const selectedContactData = contacts.find((c) => c.id === selectedContact);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {/* Lista de Contatos */}
            <div className="border-r border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Conversas</h3>
              </div>
              <ScrollArea className="h-[calc(600px-60px)]">
                <div className="p-2 space-y-1">
                  {contacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => setSelectedContact(contact.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        selectedContact === contact.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          contact.tipo === 'central' ? 'bg-red-500' : 'bg-blue-600'
                        }`}
                      >
                        {contact.nome.charAt(0)}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-gray-900 text-sm">{contact.nome}</p>
                        <p className="text-xs text-gray-500">
                          {contact.tipo === 'central' ? 'Operações' : 'Entregador'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Área de Chat */}
            <div className="col-span-2 flex flex-col">
              {selectedContact ? (
                <>
                  {/* Header do Chat */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          selectedContactData?.tipo === 'central' ? 'bg-red-500' : 'bg-blue-600'
                        }`}
                      >
                        {selectedContactData?.nome.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{selectedContactData?.nome}</p>
                        <p className="text-xs text-green-600">● Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Mensagens */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {mockMessages
                        .filter(
                          (msg) =>
                            (msg.remetenteId === selectedContact && msg.destinatarioId === 'CENTRAL') ||
                            (msg.remetenteId === 'CENTRAL' && msg.destinatarioId === selectedContact)
                        )
                        .map((msg) => {
                          const isFromCentral = msg.remetenteId === 'CENTRAL';
                          return (
                            <div key={msg.id} className={`flex ${isFromCentral ? 'justify-end' : 'justify-start'}`}>
                              <div
                                className={`max-w-[70%] rounded-lg p-3 ${
                                  isFromCentral
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                }`}
                              >
                                <p className="text-sm">{msg.mensagem}</p>
                                <p
                                  className={`text-xs mt-1 ${
                                    isFromCentral ? 'text-blue-100' : 'text-gray-500'
                                  }`}
                                >
                                  {new Date(msg.criadaEm).toLocaleTimeString('pt-BR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                            </div>
                          );
                        })}

                      {mockMessages.filter(
                        (msg) =>
                          (msg.remetenteId === selectedContact && msg.destinatarioId === 'CENTRAL') ||
                          (msg.remetenteId === 'CENTRAL' && msg.destinatarioId === selectedContact)
                      ).length === 0 && (
                        <div className="text-center py-12">
                          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">Nenhuma mensagem ainda</p>
                          <p className="text-sm text-gray-400 mt-1">Inicie uma conversa</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Input de Mensagem */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite sua mensagem..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Selecione uma conversa</p>
                    <p className="text-sm text-gray-500 mt-1">Escolha um contato para iniciar</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dicas */}
      <Card>
        <CardHeader>
          <CardTitle>Dicas de Comunicação</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Mantenha comunicação clara e objetiva com os entregadores</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Confirme recebimento de instruções importantes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Use o chat para atualizações em tempo real sobre rotas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Notifique problemas ou atrasos imediatamente</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
