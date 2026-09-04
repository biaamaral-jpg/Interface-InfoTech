import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesCategoria from "../../../components/Listagens/DetalhesCategoria/DetalhesCategoria";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesCategoria(): JSX.Element {
    const { id_categoria } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />

            <DetalhesCategoria idCategoria={Number(id_categoria)} />

            <Rodape />
        </div>
    );
}

export default PDetalhesCategoria;