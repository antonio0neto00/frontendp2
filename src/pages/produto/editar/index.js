import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class EditarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                Nome: "",
                Descrição: "",
                Preço: "",
                QuantidadeEstoque: ""
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3005/produto/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ produto: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/produto" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Produto</legend>
                        <div className="produto-update">
                            <label htmlFor="Nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="Nome"
                                name="Nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.Nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                            <label htmlFor="Descrição">Descrição </label>
                            <br />
                            <input
                                type="text"
                                id="Descrição"
                                name="Descriçao"
                                placeholder="Descrição"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.Salario}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                            <label htmlFor="Preço">Preço </label>
                            <br />
                            <input
                                type="text"
                                id="Preço"
                                name="Preço"
                                placeholder="Preço"
                                min="1"
                                max="99999"
                                required
                                value={this.state.produto.Preço}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                            <label htmlFor="QuantidadeEstoque">QuantidadeEstoque </label>
                            <br />
                            <input
                                type="text"
                                id="QuantidadeEstoque"
                                name="QuantidadeEstoque"
                                placeholder="QuantidadeEstoque"
                                required
                                min="1"
                                max="99999"
                                value={this.state.produto.QuantidadeEstoque}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <button type="submit" className="btn btn-primary">
                            Atualizar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
 
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { id } = this.state.produto;
 
        fetch(`http://localhost:3005/produto/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default EditarProduto;
