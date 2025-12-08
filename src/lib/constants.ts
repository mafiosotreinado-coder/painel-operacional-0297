// Constantes do sistema SolidExpress

export const BAIRROS_ARACAJU = [
  'Atalaia',
  'Jardins',
  'Grageru',
  'Farolândia',
  'Luzia',
  'Centro',
  'Coroa do Meio',
  'Bugio',
  'Santa Maria',
  'Japãozinho',
  'Santos Dumont',
  'Porto Dantas',
  'Lamarão',
  '18 do Forte',
  'América',
  'Industrial',
  'Siqueira Campos',
  'Jabotiana',
];

export const CIDADES_REGIAO = [
  'Aracaju',
  'Nossa Senhora do Socorro',
  'Barra dos Coqueiros',
];

export const STATUS_PACOTE_LABELS: Record<string, string> = {
  recebido: 'Recebido',
  na_central: 'Na Central',
  em_rota: 'Em Rota',
  entregue: 'Entregue',
  problema: 'Problema',
};

export const STATUS_ENTREGADOR_LABELS: Record<string, string> = {
  disponivel: 'Disponível',
  em_rota: 'Em Rota',
  offline: 'Offline',
};

export const STATUS_COLORS = {
  recebido: 'bg-blue-500',
  na_central: 'bg-yellow-500',
  em_rota: 'bg-purple-500',
  entregue: 'bg-green-500',
  problema: 'bg-red-500',
  disponivel: 'bg-green-500',
  offline: 'bg-gray-500',
};
