import { useState, useEffect, type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormMovimentacao from "../../../components/Formularios/FormMovimentacao/FormMovimentacao";

// Interface para tipar as movimentações
interface IMovimentacao {
  id_movimentacao?: number;
  id_produto: number;
  id_movimentacao_origem?: number;
  motivo_movimentacao: string;
  tipo_movimentacao: string;
  quantidade: number;
  preco_unitario: number;
  valor_total: number;
  observacao?: string;
  data_movimentacao?: Date | string;
  ativo?: boolean;
}

function PCadastroMovimentacao(): JSX.Element {
  const [movimentacoes, setMovimentacoes] = useState<IMovimentacao[]>([]);

  // Função para buscar a lista atualizada do backend
  const carregarMovimentacoes = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/api/movimentacoes");
      if (resposta.ok) {
        const dados = await resposta.json();
        setMovimentacoes(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de movimentações:", error);
    }
  };

  // Carrega as movimentações assim que a página abre
  useEffect(() => {
    carregarMovimentacoes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navegacao />

      {/* Passamos a lista e a função de atualizar para o formulário/listagem */}
      <FormMovimentacao
        movimentacoes={movimentacoes}
        onSuccess={carregarMovimentacoes}
      />

      <Rodape />
    </div>
  );
}

export default PCadastroMovimentacao;