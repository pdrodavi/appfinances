import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom";

import UsuarioService from "../app/service/usuarioService";
// import LocalStorageService from '../app/service/localstorageService'
import { mensagemErro } from "../components/toastr";
import { AuthContext } from "../main/provedorAutenticacao";

class Login extends React.Component {
  
  state = {
    email: '',
    senha: ''
  }

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  entrar = () => {
    this.service.autenticar({
        email: this.state.email,
        senha: this.state.senha
      }).then((response) => {
        this.context.iniciarSessao(response.data)
        this.props.history.push('/home')
      }).catch((erro) => {
        mensagemErro(erro.response.data)
      })
  }

  prepareCadastrar = () => {
    this.props.history.push('/cadastro-usuarios')
  }

  render() {
    return (
      <div className="main row">
        <Card class="card" title="Login">
            <FormGroup label="Email: " htmlFor="exampleInputEmail1">
              <input type="email"
                value={this.state.email}
                required
                onChange={e => this.setState({ email: e.target.value })}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Seu email" />
            </FormGroup>
            <FormGroup label="Senha: " htmlFor="exampleInputPassword1">
              <input type="password"
                value={this.state.senha}
                required
                onChange={e => this.setState({ senha: e.target.value })}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Sua senha"/>
            </FormGroup>
            <button onClick={this.entrar} className="btn btn-success">
              <i className="pi pi-sign-in"></i>Entrar
            </button>
        </Card>
      </div>
    );
  }
}

Login.contextType = AuthContext;

export default withRouter(Login);
