import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
 
import MainProduto from './pages/produto/main';
import DetalhesProduto from './pages/produto/detalhes';
 
const Routes = () => (
 
    <BrowserRouter>
        <Switch>
            <Route exact path="/produtos" component={MainProduto} />
            <Route path="/produtos/:id" component={DetalhesProduto} />
        </Switch>
    </BrowserRouter>
)
 
export default Routes;