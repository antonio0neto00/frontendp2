import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Produto extends Component {
    state = {
        produto: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
    render() {
        const { produto } = this.state;
 
        if (produto.ativo) {
            produto.ativo = "Produto Ativo";
        } else {
            produto.ativo = "Produto Inativo";
        }

        return (
            <div className="produto-info">
                <h1> {produto.Nome} </h1>
                <h1> {produto.Descrição} </h1>
                <h1> {produto.Preço} </h1>
                <h1> {produto.QuantidadeEstoque} </h1>
                <br />
                <Link to={`/produto`}> Voltar </Link> <br />
                <Link to={`/editarProduto/${produto.id}`}> Editar </Link> <br />
                <Link to={`/deletarProduto/${produto.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
