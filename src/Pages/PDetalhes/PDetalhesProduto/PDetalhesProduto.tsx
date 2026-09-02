import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesProduto from "../../../components/Listagens/DetalhesProduto/DetalhesProdutos";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesProduto(): JSX.Element {
    const { id_produto } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />

            <DetalhesProduto idProduto={Number(id_produto)} />

            <Rodape />
        </div>
    );
}

export default PDetalhesProduto;