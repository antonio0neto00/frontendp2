import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`https://github.com/antonio0neto00/Backend-ProdutoProva1`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto } = this.state;
 
        return (
            <div className="produto-list">
                <Link to={`/criarProduto`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Preço</th>
                            <th scope="col">QuantidadeEstoque</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produto.map((produto) => (
                            <tr>
                                <th scope="row">{produto.id}</th>
                                <td>{produto.Nome}</td>
                                <td>{produto.Descrição}</td>
                                <td>{produto.Preço.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{produto.QuantidadeEstoque}</td>
                                <td> <Link to={`/produto/${produto.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarProduto/${produto.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarProduto/${produto.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
