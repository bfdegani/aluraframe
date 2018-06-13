class NegociacaoService{

  constructor(){
    this._http = new HttpService();
  }

  obterNegociacoes(){
    //Promisse.all executa um array de promises na sequencia definida no array
    return Promise.all([this._http.get('negociacoes/semana'), this._http.get('negociacoes/anterior'), this._http.get('negociacoes/retrasada')])
      .then(periodos => {
        let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), []);
        return negociacoes;
      })  // executa reduce para concatenar o retorno de cada promise em um único array de negociações
      .catch(erro => { // trata reject da promise que deu erro
        throw new Error(erro);
      });
  }
}
