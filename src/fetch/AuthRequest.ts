/**
 * Classe para lidar com autenticação
 */
class AuthRequests {

    private serverUrl: string;
    private endpointLogin: string;
    
    /**
     * Construtor das rotas e do endereço do servidor
     */
    constructor() {
        // endereço do servidor configurado via variável de ambiente
        this.serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333';
        // rota de autenticação configurada via variável de ambiente
        this.endpointLogin = import.meta.env.VITE_LOGIN_ROUTE || '/api/login';
    }

    /**
     * Realiza a autenticação no servidor
     * @param {*} login - email e senha
     * @returns **true** caso sucesso, **false** caso erro
     */
    async login(login: { email: string, senha: string}) {       
        try {
            const url = `${this.serverUrl}${this.endpointLogin}`;
            console.log('Fazendo login em:', url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            const responseText = await response.text();
            let data: any;

            try {
                data = responseText ? JSON.parse(responseText) : {};
            } catch {
                data = { message: responseText };
            }

            if (!response.ok) {
                console.error('Erro na autenticação', response.status, data);
                throw new Error(data?.message || `Falha no login (${response.status})`);
            }

            const successMessage = String(data?.message || '').toLowerCase();
            const hasAuth = data?.auth === true;
            const hasToken = !!data?.token;
            const hasUsuario = !!data?.usuario;
            const loginSucceeded = hasAuth || hasToken || hasUsuario || successMessage.includes('login') || successMessage.includes('sucesso');

            if (!loginSucceeded) {
                const message = data?.message || 'Autenticação negada pelo servidor';
                throw new Error(message);
            }

            if (hasToken && hasUsuario) {
                this.persistToken(data.token, data.usuario, true);
            } else {
                localStorage.setItem('isAuth', 'true');
                localStorage.setItem('email', login.email);
                localStorage.setItem('nome', login.email.split('@')[0]);
                localStorage.setItem('role', 'usuario');
            }

            return true;
        } catch (error) {
            console.error('Erro: ', error);
            throw error;
        }
    }

    /**
     * Persiste o token no localStorage
     * @param {*} token - token recebido do servidor
     * @param {*} usuario - objeto com informações do usuário vindos do servidor
     * @param {*} isAuth - estado da autenticação do usuário
     */
    persistToken(token: string, usuario: {id_usuario: number, nome: string, email: string, role: string}, isAuth: boolean) {
        localStorage.setItem('token', token);
        localStorage.setItem('nome', usuario.nome);
        localStorage.setItem('idUsuario', usuario.id_usuario.toString());
        localStorage.setItem('email', usuario.email);
        localStorage.setItem('role', usuario.role);
        localStorage.setItem('isAuth', isAuth.toString());
    }

    /**
     * Remove as informações do localStorage
     */
    removeToken() {
        const keys = [
            'token',
            'nome',
            'idUsuario',
            'email',
            'role',
            'isAuth'
        ];

        keys.map(key => localStorage.removeItem(key));
        window.location.href = `/login`;
    }

    /**
     * Verifica a validade do token
     * @returns **true** caso token válido, **false** caso token inválido
     */
    checkTokenExpiry() {
        // recupera o valor do token no localstorage
        const token = localStorage.getItem('token');
        
        // verifica se o valor é diferente de vazio
        if (token) {
            // recupera a data de expiração do token
            const payload = JSON.parse(atob(token.split('.')[1]));
            // recuepra a hora de expiração do token
            const expiry = payload.exp;
            // pega a data e hora atual
            const now = Math.floor(Date.now() / 1000);

            // verifica se o token está expirado
            if (expiry < now) {
                // invoca a função para remover o token do localstorage
                this.removeToken();
                // retorna false
                return false;
            }
            // caso o token não esteja expirado, retorna true
            return true;
        }
        // caso o token esteja vazio, retorna false
        return false;
    }
}

export default new AuthRequests();