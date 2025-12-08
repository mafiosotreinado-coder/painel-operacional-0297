// Mock data para desenvolvimento - SolidExpress
import { Package, DeliveryPerson, Route, ChatMessage, DashboardStats } from './types';

// Dados simulados de pacotes
export const mockPackages: Package[] = [
  {
    id: 'PKG001',
    origem: 'Megaflex - São Paulo',
    destinoBairro: 'Atalaia',
    destinoCidade: 'Aracaju',
    status: 'na_central',
    criadoEm: new Date('2024-01-15T08:30:00'),
    atualizadoEm: new Date('2024-01-15T08:30:00'),
  },
  {
    id: 'PKG002',
    origem: 'Correios - Salvador',
    destinoBairro: 'Jardins',
    destinoCidade: 'Aracaju',
    status: 'em_rota',
    criadoEm: new Date('2024-01-15T09:00:00'),
    atualizadoEm: new Date('2024-01-15T10:15:00'),
    entregadorId: 'ENT001',
    rotaId: 'RT001',
  },
  {
    id: 'PKG003',
    origem: 'Amazon - Recife',
    destinoBairro: 'Grageru',
    destinoCidade: 'Aracaju',
    status: 'entregue',
    criadoEm: new Date('2024-01-15T07:00:00'),
    atualizadoEm: new Date('2024-01-15T11:30:00'),
    entregadorId: 'ENT002',
  },
];

// Dados simulados de entregadores
export const mockDeliveryPersons: DeliveryPerson[] = [
  {
    id: 'ENT001',
    nome: 'João Silva',
    telefone: '(79) 99999-0001',
    status: 'em_rota',
    totalEntregas: 245,
    entregasHoje: 8,
    criadoEm: new Date('2023-06-01'),
  },
  {
    id: 'ENT002',
    nome: 'Maria Santos',
    telefone: '(79) 99999-0002',
    status: 'disponivel',
    totalEntregas: 312,
    entregasHoje: 12,
    criadoEm: new Date('2023-05-15'),
  },
  {
    id: 'ENT003',
    nome: 'Pedro Costa',
    telefone: '(79) 99999-0003',
    status: 'offline',
    totalEntregas: 189,
    entregasHoje: 0,
    criadoEm: new Date('2023-08-20'),
  },
];

// Dados simulados de rotas
export const mockRoutes: Route[] = [
  {
    id: 'RT001',
    nome: 'Rota Zona Sul',
    bairros: ['Atalaia', 'Coroa do Meio', 'Jardins'],
    entregadorId: 'ENT001',
    pacotes: ['PKG002'],
    distanciaEstimada: 12.5,
    tempoEstimado: 45,
    status: 'em_andamento',
    criadaEm: new Date('2024-01-15T10:00:00'),
  },
  {
    id: 'RT002',
    nome: 'Rota Centro',
    bairros: ['Centro', 'Grageru', 'Farolândia'],
    pacotes: [],
    distanciaEstimada: 8.3,
    tempoEstimado: 30,
    status: 'planejada',
    criadaEm: new Date('2024-01-15T11:00:00'),
  },
];

// Dados simulados de mensagens
export const mockMessages: ChatMessage[] = [
  {
    id: 'MSG001',
    remetenteId: 'CENTRAL',
    remetente: 'Central',
    destinatarioId: 'ENT001',
    mensagem: 'João, você tem 3 pacotes na rota de hoje.',
    lida: true,
    criadaEm: new Date('2024-01-15T09:00:00'),
  },
  {
    id: 'MSG002',
    remetenteId: 'ENT001',
    remetente: 'João Silva',
    destinatarioId: 'CENTRAL',
    mensagem: 'Ok, já estou a caminho!',
    lida: true,
    criadaEm: new Date('2024-01-15T09:05:00'),
  },
];

// Estatísticas do dashboard
export const mockDashboardStats: DashboardStats = {
  pacotesRecebidos: 45,
  pacotesNaCentral: 12,
  pacotesEmRota: 18,
  pacotesEntregues: 15,
  entregadoresDisponiveis: 3,
  entregadoresEmRota: 5,
  entregadoresOffline: 2,
};
