import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PHome from './Pages/Phome/PHome'
import PLogin from './Pages/PLogin/PLogin'

//  Import dos componentes de listagem

import PListagensProdutos from './components/Listagens/ListagensProduto/ListagemProduto'


import DetalhesProdutos from './components/Listagens/DetalhesProduto/DetalhesProdutos'
import ProtectedRoute from './components/Rotas/ProtectedRoutes'

//  Import dos componentes de cadastro
import PCadastroProduto from './Pages/PCadastro/PCadastroProduto/PCdastroProduto'


function App() {
  return (

    <BrowserRouter>

      <Routes>
        {/* Rota Principal */}
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />

        {/* Listagens */}
     
        <Route path='/lista/produto' element={<ProtectedRoute element={<PListagensProdutos />} />} />

        {/*  Detalhes — rotas novas */}
    
        <Route path='/detalhes/produto/:id_produto' element={<ProtectedRoute element={<DetalhesProdutos />} />} />

        {/* Cadastros */}
      
        <Route path='/cadastro/produto' element={<PCadastroProduto />} />
 
      </Routes>

    </BrowserRouter>

  )

}

export default App
