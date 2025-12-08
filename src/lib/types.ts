// Tipos do sistema SolidExpress

export type PackageStatus = 'recebido' | 'na_central' | 'em_rota' | 'entregue' | 'problema';
export type DeliveryPersonStatus = 'disponivel' | 'em_rota' | 'offline';

export interface Package {
  id: string;
  origem: string;
  destinoBairro: string;
  destinoCidade: string;
  status: PackageStatus;
  criadoEm: Date;
  atualizadoEm: Date;
  entregadorId?: string;
  rotaId?: string;
}

export interface DeliveryPerson {
  id: string;
  nome: string;
  telefone: string;
  status: DeliveryPersonStatus;
  totalEntregas: number;
  entregasHoje: number;
  criadoEm: Date;
}

export interface Route {
  id: string;
  nome: string;
  bairros: string[];
  entregadorId?: string;
  pacotes: string[];
  distanciaEstimada: number; // em km
  tempoEstimado: number; // em minutos
  status: 'planejada' | 'em_andamento' | 'concluida';
  criadaEm: Date;
}

export interface ChatMessage {
  id: string;
  remetenteId: string;
  remetente: string;
  destinatarioId: string;
  mensagem: string;
  lida: boolean;
  criadaEm: Date;
}

export interface DashboardStats {
  pacotesRecebidos: number;
  pacotesNaCentral: number;
  pacotesEmRota: number;
  pacotesEntregues: number;
  entregadoresDisponiveis: number;
  entregadoresEmRota: number;
  entregadoresOffline: number;
}
