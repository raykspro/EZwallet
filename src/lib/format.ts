/**
 * Tradutor de Moeda: Converte números simples no padrão monetário do Senhor.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);
}

/**
 * Tradutor de Datas: Organiza o tempo de forma legível.
 */
export function formatDate(date: string | Date): string {
  try {
    const d = new Date(date);
    // Se a data vier corrompida, retornamos um aviso em vez de quebrar o Nexus
    if (isNaN(d.getTime())) return "Data inválida";
    
    return new Intl.DateTimeFormat('pt-BR').format(d);
  } catch {
    return "Data inválida";
  }
}
