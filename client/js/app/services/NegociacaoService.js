class NegociacaoService{

  constructor(){
    this._http = new HttpService();
  }

  obterNegociacoes(periodo){
    /* periodo:
    0: 'semana'
    1: 'anterior'
    2: 'retrasada'
    */
    let nomeServico = ['semana', 'anterior', 'retrasada'];

    /* trabalhando com promisses:
      resolve é uma função para a qual é passado o retorno de sucesso da Promise.
      reject é uma função para a qual é passado o retorno de erro da Promise
    */
    return new Promise((resolve, reject) => {
      this._http
        .get(`negociacoes/${nomeServico[periodo]}`)
        .then(negociacoes => resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
        .catch(erro => {
          console.log(erro);
          reject('Não foi possível importar negociações');
        })
      });
    }
}
