import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`https://produto-prova1.herokuapp.com/produto`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto } = this.state;
        return produto.map((produto, index) => (
 
            <div className="produto-list">
                <div key={index} className="card mb-4">
                    <h5 className="card-header">{produto.Nome}</h5>
 
                    <article key={produto._id}>
                        <strong> {produto.Preço} </strong>
                        <p> <Link to={`/produtos/${produto.id}`}> Acessar </Link> </p>
                        <br />
                    </article>
                </div>
            </div>
        ))
    };
}
