import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Nvavegacao";
import FormProduto from "../../../components/Formularios/FormProduto/FormProduto";
import Rodape from "../../../components/Rodape/Rodape";

function PCadastroProduto(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormProduto />
            <Rodape />
        </div>
    );
}

export default PCadastroProduto;