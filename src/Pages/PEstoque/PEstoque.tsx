import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import Estoque from "../../components/Listagens/Estoque/Estoque";

function PEstoque(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <Estoque />
            <Rodape />
        </div>
    );
}

export default PEstoque;
