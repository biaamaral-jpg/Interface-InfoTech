import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PHome from './Pages/Phome/PHome'
import PLogin from './Pages/PLogin/PLogin'
import PDetalhesProduto from './Pages/PDetalhes/PDetalhesProduto/PDetalhesProduto'
import PDetalhesCategoria from './Pages/PDetalhes/PDetalhesCategoria/PDetalhesCategoria'
import PDetalhesMovimentacao from './Pages/PDetalhes/PDetalhesMovimentacao/PDetalhesMovimentacao'
import PEstoque from './Pages/PEstoque/PEstoque'

//  Import dos componentes de listagem
import PListagensProdutos from './components/Listagens/ListagensProduto/ListagemProduto'
import ListagemCategorias from './components/Listagens/ListagemCategoria/ListagemCategoria'
import ListagemMovimentacoes from './components/Listagens/ListagemMovimentacao/ListagemMovimentacao'

import ProtectedRoute from './components/Rotas/ProtectedRoutes'

//  Import dos componentes de cadastro
import PCadastroProduto from './Pages/PCadastro/PCadastroProduto/PCdastroProduto'
import PCadastroCategoria from './Pages/PCadastro/PCadastroCategoria/PCadastroCategoria'
import PCadastroMovimentacao from './Pages/PCadastro/PCadastroMovimentacao/PCadastroMovimentacao'


function App() {
  return (

    <BrowserRouter>

      <Routes>
        {/* Rota Principal */}
        <Route path='/' element={<ProtectedRoute element={<PHome />} />} />
        <Route path='/login' element={<PLogin />} />

        {/* Listagens */}
        <Route path='/lista/produtos' element={<ProtectedRoute element={<PListagensProdutos />} />} />
        <Route path='/lista/categorias' element={<ProtectedRoute element={<ListagemCategorias />} />} />
        <Route path='/lista/movimentacoes' element={<ProtectedRoute element={<ListagemMovimentacoes />} />} />
        <Route path='/estoque' element={<ProtectedRoute element={<PEstoque />} />} />

        {/* Detalhes */}
        <Route path='/detalhes/produto/:id_produto' element={<ProtectedRoute element={<PDetalhesProduto />} />} />
        <Route path='/detalhes/categoria/:id_categoria' element={<ProtectedRoute element={<PDetalhesCategoria />} />} />
        <Route path='/detalhes/movimentacao/:id_movimentacao' element={<ProtectedRoute element={<PDetalhesMovimentacao />} />} />

        {/* Cadastros */}
        <Route path='/cadastro/produto' element={<ProtectedRoute element={<PCadastroProduto />} />} />
        <Route path='/cadastro/categoria' element={<ProtectedRoute element={<PCadastroCategoria />} />} />
        <Route path='/cadastro/movimentacao' element={<ProtectedRoute element={<PCadastroMovimentacao />} />} />
      </Routes>

    </BrowserRouter>

  )

}

export default App
