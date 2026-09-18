export interface ProdutoDTO {
  idProduto?: number;
  id_produto?: number;
  idCategoria?: number;
  id_categoria?: number;
  codigo: string;
  nome: string;
  descricao?: string;
  preco_unitario?: number;
  precoUnitario?: number;
  quantidade_disponivel?: number;
  quantidadeDisponivel?: number;
  quantidade_minima?: number;
  quantidadeMinima?: number;
  ativo?: boolean;
  data_cadastro?: Date | string;
}