import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PHome from './Pages/Phome/PHome'
import PLogin from './Pages/PLogin/PLogin'
import PDetalhesProduto from './Pages/PDetalhes/PDetalhesProduto/PDetalhesProduto'

//  Import dos componentes de listagem
import PListagensProdutos from './components/Listagens/ListagensProduto/ListagemProduto'

import ProtectedRoute from './components/Rotas/ProtectedRoutes'

//  Import dos componentes de cadastro
import PCadastroProduto from './Pages/PCadastro/PCadastroProduto/PCdastroProduto'


function App() {
  return (

    <BrowserRouter>

      <Routes>
        {/* Rota Principal */}
        <Route path='/' element={<ProtectedRoute element={<PHome />} />} />
        <Route path='/login' element={<PLogin />} />

        {/* Listagens */}
        <Route path='/lista/produtos' element={<ProtectedRoute element={<PListagensProdutos />} />} />

        {/* Detalhes */}
        <Route path='/detalhes/produto/:id_produto' element={<ProtectedRoute element={<PDetalhesProduto />} />} />

        {/* Cadastros */}
        <Route path='/cadastro/produto' element={<ProtectedRoute element={<PCadastroProduto />} />} />
      </Routes>

    </BrowserRouter>

  )

}

export default App
