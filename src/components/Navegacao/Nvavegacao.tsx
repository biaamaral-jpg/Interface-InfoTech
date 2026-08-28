import { useState, type JSX } from "react";
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequest";

type MenuItem = {
    label: string;
    icon: string;
    url?: string;
    className?: string;
};

function Navegacao(): JSX.Element {
    const [isAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });
    const navigate = useNavigate();

    const nome = localStorage.getItem('nome') || 'Usuário';
    const email = localStorage.getItem('email') || '';
    const inicial = (nome || 'U').charAt(0).toUpperCase();

    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'm-5 text-white text-lg',
            url: '/'
        },
        ...(isAuthenticated ? [
            {
                label: 'Produto',
                icon: 'pi pi-star',
                className: 'm-5 text-white text-lg',
                url: '/lista/produto'
            }
        ] : [])
    ];

    const start = (
        <img
            alt="logo"
            src='./src/assets/app-icon.png'
            height="100"
            className="w-[40%] max-w-[40%] ml-10"
        />
    );

    const userActions = isAuthenticated ? (
        <div className="flex items-center justify-end mr-10 gap-4">
            <div className="flex flex-col pr-3">
                <p className="text-white font-semibold m-0">{nome}</p>
                <p className="text-white text-sm m-0">{email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white text-slate-700 flex items-center justify-center font-bold">
                {inicial}
            </div>
            <button
                className="bg-white ml-6 text-slate-700 px-10 py-5 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors"
                onClick={AuthRequests.removeToken}
                style={{ height: '32px', fontSize: '14px' }}
            >
                <i className="pi pi-sign-out"></i>
                <span>Sair</span>
            </button>
        </div>
    ) : (
        <button
            className="bg-white font-bold text-slate-700 px-10 py-5 mr-10 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/login')}
            style={{ height: '32px', fontSize: '14px' }}
        >
            <i className="pi pi-sign-in"></i>
            <span>Login</span>
        </button>
    );

    return (
        <header className="card h-[12vh] bg-slate-700 flex items-center px-4">
            <div className="flex items-center flex-1">
                {start}
                <nav className="flex items-center gap-6 ml-6">
                    {items.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            className={`bg-transparent border-none text-white text-lg cursor-pointer flex items-center gap-2 ${item.className ?? ''}`}
                            onClick={() => navigate(item.url ?? '/')}
                        >
                            <i className={item.icon}></i>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
            {userActions}
        </header>
    );
}

export default Navegacao;