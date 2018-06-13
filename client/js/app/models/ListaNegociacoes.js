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

  get volumeTotal(){
    return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
  }

  ordena(criterio){
    this._negociacoes.sort(criterio);
  }

  inverte(){
    this._negociacoes.reverse();
  }
}
