import { QueryClient } from "@tanstack/react-query";

/**
 * Este é o cérebro que coordena as informações da Nexus.
 * Configurado para máxima performance no ambiente do Senhor.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Evita recargas desnecessárias quando o Senhor volta para a aba do navegador
      refetchOnWindowFocus: false, 
      // Em caso de falha, o sistema reporta ao Senhor imediatamente em vez de tentar infinitamente
      retry: false, 
    },
  },
});
