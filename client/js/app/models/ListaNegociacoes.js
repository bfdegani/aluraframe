class ListaNegociacoes {
  constructor(){
    this._negociacoes = [];
  }

  adiciona(negociacao){
    this._negociacoes.push(negociacao);
  }

  apaga(){
    this._negociacoes = [];
  }

  get negociacoes(){
    return [].concat(this._negociacoes); //devolve uma cópia da lista para evitar manipulação indevida da lista
  }
}