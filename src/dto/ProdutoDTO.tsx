export interface ProdutoDTO {
  idProduto?: number;          // Tornado opcional (?)
  idCategoria: number;
  codigo: string;
  nome: string;
  descricao: string;
  preco_unitario: number;
  quantidade_disponivel: number;
  quantidade_minima: number;
  ativo: boolean;
  data_cadastro?: Date | string; // Tornado opcional (?)
}