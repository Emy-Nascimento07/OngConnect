export type RootStackParamList = {
  Login: undefined;
  MainTabs: { userName: string; voluntarioId: string };
  OngDetalhes: { ongId: string; nomeOng: string }; 
};

export type TabParamList = {
  Dashboard: { userName: string; voluntarioId: string };
  Usuário: { userName: string; voluntarioId: string };
  Explorar: { userName: string; voluntarioId: string };
};
