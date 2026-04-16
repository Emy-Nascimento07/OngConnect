export type RootStackParamList = {
    Login: undefined;
    Dashboard: { userName: string; voluntarioId: string };
};


// É necessário definir os tipos antes de criar as telas pois é nesse arquivo e parâmetros que vamos nos basear.