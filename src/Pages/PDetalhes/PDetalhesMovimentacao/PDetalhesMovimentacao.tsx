import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesMovimentacao from "../../../components/Listagens/DetalhesMovimentacao/DetalhesMovimentacao";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesMovimentacao(): JSX.Element {
    const { id_movimentacao } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />

            <DetalhesMovimentacao idMovimentacao={Number(id_movimentacao)} />

            <Rodape />
        </div>
    );
}

export default PDetalhesMovimentacao;