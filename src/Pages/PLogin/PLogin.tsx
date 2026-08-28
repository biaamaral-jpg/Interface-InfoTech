import { type JSX } from "react";

import Navegacao from "../../components/Navegacao/Nvavegacao";

import LoginForm from "../../components/Formularios/FormLogin/FormLogin";


function PLogin(): JSX.Element {
    return (
        <div className="pagina-grid">
      
            <Navegacao />


            <LoginForm />
        </div>
    );
}

export default PLogin;