import react, { useEffect } from 'react'
import RouterNav from './router/Router';
import {useUsuario, UsuarioProvider} from "./contex/user-context";
import axiosInterceptor from './tools/axios-interceptor.js';

import CargandoUser from './components/CargandoUser.jsx'


axiosInterceptor();

function App() {



  return (
    <UsuarioProvider>
    <div className='contenedorApp'>
          <CargandoUser>
            <RouterNav />  
          </CargandoUser>
    </div>
    </UsuarioProvider>       
  )
}

export default App

