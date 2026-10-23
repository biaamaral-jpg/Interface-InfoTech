import { API_URL } from '../config/api';

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
        this.serverUrl = API_URL;
        // rota principal do servidor para login
        this.endpointLogin = '/api/login';
    }

    private getLoginEndpoints(): string[] {
        return [
            `${this.serverUrl}${this.endpointLogin}`,
            `${this.serverUrl}/login`
        ];
    }

    private getLoginPayloads(login: { email: string, senha: string }): Array<Record<string, string>> {
        const email = String(login?.email ?? '').trim();
        const senha = String(login?.senha ?? '').trim();

        if (!email || !senha) {
            return [];
        }

        return [
            { email, senha },
            { email, password: senha },
            { login: email, senha },
            { login: email, password: senha },
            { username: email, senha },
            { username: email, password: senha },
        ];
    }

    /**
     * Realiza a autenticação no servidor
     * @param {*} login - email e senha
     * @returns **true** caso sucesso, **false** caso erro
     */
    async login(login: { email: string, senha: string}): Promise<{ success: boolean, message?: string }> {
        const endpoints = this.getLoginEndpoints();
        const payloads = this.getLoginPayloads(login);

        if (payloads.length === 0) {
            return { success: false, message: 'Informe e-mail e senha.' };
        }

        let ultimoErro: unknown = null;

        for (const url of endpoints) {
            for (const payload of payloads) {
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    let data: any = null;
                    try {
                        data = await response.json();
                    } catch {
                        data = null;
                    }

                    const messageFromServer = typeof data?.message === 'string' ? data.message : undefined;
                    const tokenFromServer = data?.token || data?.access_token || data?.jwt || null;
                    const usuarioFromServer = data?.usuario || data?.user || data?.cliente || data?.usuarioLogado || null;
                    const authFlag = data?.auth ?? data?.authenticated ?? data?.isAuth ?? null;

                    const isAuth = (
                        response.ok ||
                        authFlag === true ||
                        authFlag === 'true' ||
                        Boolean(tokenFromServer) ||
                        (messageFromServer ? /sucesso|login realizado|autenticado|ok/i.test(messageFromServer) : false)
                    );

                    if (isAuth) {
                        const usuario = usuarioFromServer || {
                            id_usuario: data?.id_usuario ?? data?.idUsuario ?? 0,
                            nome: data?.nome || data?.name || 'Usuário',
                            email: data?.email || payload.email || payload.login || payload.username || login.email,
                            role: data?.role || 'user'
                        };

                        if (tokenFromServer) {
                            this.persistToken(tokenFromServer, usuario, true);
                        } else if (typeof authFlag === 'boolean' || authFlag === 'true' || response.ok) {
                            this.persistToken('token-temporario', usuario, true);
                        }

                        return { success: true, message: messageFromServer || 'Login realizado com sucesso' };
                    }

                    if (response.status === 404) {
                        ultimoErro = new Error(`Rota não encontrada em ${url}`);
                        continue;
                    }

                    if (response.status === 401 || response.status === 400) {
                        ultimoErro = new Error(messageFromServer || data?.error || `HTTP ${response.status}`);
                        continue;
                    }

                    ultimoErro = new Error(messageFromServer || data?.error || `HTTP ${response.status}`);
                    break;
                } catch (error) {
                    ultimoErro = error;
                }
            }

            if (ultimoErro instanceof Error && /Rota não encontrada/i.test(ultimoErro.message)) {
                continue;
            }

            if (ultimoErro instanceof Error && /HTTP 401|HTTP 400|E-mail|Email|senha|Credenciais/i.test(ultimoErro.message)) {
                continue;
            }

            if (ultimoErro) {
                break;
            }
        }

        const message = ultimoErro instanceof Error ? ultimoErro.message : 'Erro ao fazer login';
        return { success: false, message };
    }

    /**
     * Persiste o token no localStorage
     * @param {*} token - token recebido do servidor
     * @param {*} usuario - objeto com informações do usuário vindos do servidor
     * @param {*} isAuth - estado da autenticação do usuário
     */
    persistToken(token: string, usuario: {id_usuario?: number, nome?: string, email?: string, role?: string}, isAuth: boolean) {
        const idUsuario = usuario.id_usuario ?? 0;
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