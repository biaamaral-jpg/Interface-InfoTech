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
        // endereço do servidor
        this.serverUrl = 'http://localhost:3333';
        // rota do servidor
        this.endpointLogin = '/api/login';
    }

    /**
     * Realiza a autenticação no servidor
     * @param {*} login - email e senha
     * @returns **true** caso sucesso, **false** caso erro
     */
    async login(login: { email: string, senha: string}): Promise<{ success: boolean, message?: string }> {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpointLogin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            let data: any = null;
            try {
                data = await response.json();
            } catch {
                data = null;
            }

            if (!response.ok) {
                const msg = data?.message || data?.error || `HTTP ${response.status}`;
                console.log('Erro na autenticação', data);
                return { success: false, message: msg };
            }

            const messageFromServer = typeof data?.message === 'string' ? data.message : undefined;
            const tokenFromServer = data?.token || data?.access_token || data?.jwt || null;
            const usuarioFromServer = data?.usuario || data?.user || data?.cliente || data?.usuarioLogado || null;
            const authFlag = data?.auth ?? data?.authenticated ?? data?.isAuth ?? null;

            const isAuth = (
                authFlag === true ||
                authFlag === 'true' ||
                Boolean(tokenFromServer) ||
                (messageFromServer ? /sucesso|login realizado/i.test(messageFromServer) : false)
            );

            if (isAuth) {
                const usuario = usuarioFromServer || {
                    id_usuario: data?.id_usuario ?? data?.idUsuario ?? 0,
                    nome: data?.nome || data?.name || 'Usuário',
                    email: data?.email || login.email,
                    role: data?.role || 'user'
                };

                if (tokenFromServer) {
                    this.persistToken(tokenFromServer, usuario, true);
                } else if (typeof authFlag === 'boolean' || authFlag === 'true') {
                    this.persistToken('token-temporario', usuario, true);
                }

                return { success: true, message: messageFromServer || 'Login realizado com sucesso' };
            }

            return { success: false, message: messageFromServer || data?.error || 'Credenciais inválidas' };
        } catch (error) {
            console.error('Erro: ', error);
            const message = error instanceof Error ? error.message : String(error);
            return { success: false, message };
        }
    }

    /**
     * Persiste o token no localStorage
     * @param {*} token - token recebido do servidor
     * @param {*} usuario - objeto com informações do usuário vindos do servidor
     * @param {*} isAuth - estado da autenticação do usuário
     */
    persistToken(token: string, usuario: {id_usuario?: number, nome?: string, email?: string, role?: string}, isAuth: boolean) {
        const idUsuario = usuario.id_usuario ?? usuario.id_usuario ?? 0;
        const nome = usuario.nome || 'Usuário';
        const email = usuario.email || '';
        const role = usuario.role || 'user';

        localStorage.setItem('token', token);
        localStorage.setItem('nome', nome);
        localStorage.setItem('idUsuario', String(idUsuario));
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);
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
        const token = localStorage.getItem('token');

        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp;
            const now = Math.floor(Date.now() / 1000);

            if (expiry < now) {
                this.removeToken();
                return false;
            }

            return true;
        } catch {
            return Boolean(token);
        }
    }
}

export default new AuthRequests();