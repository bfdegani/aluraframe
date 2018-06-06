class Negociacao {
  constructor(data, quantidade, valor){
    this._data = new Date(data.getTime()); //cria _data a partir de uma cópia do input, evitando que seu conteúdo seja manipulado posteriormente pela referencia ao objeto passado no construtor
    this._quantidade = quantidade; //o "_" é uma mera convenção para indicar elementos protegidos da classe para que não sejam acessados diretamente. o javascript não controla isso
    this._valor = valor;
    Object.freeze(this); //Congela o objeto para não poder ser alterado posteriormente. No entanto não impede que os atributos sejam alterados por seus métodos específicos.
                         //Por exemplo: this._data = new Date() não altera data. Mas this._data.setDate(10) altera.
  }

  get data(){ //definição de getter
    return new Date(this._data.getTime()); //retorna uma cópia, impedindo que seja alterado o valor original (descrito no comentário sobre Object.freeze())
  }

  get quantidade(){
    return this._quantidade;
  }

  get valor(){
    return this._valor;
  }

  get volume(){
    return this._quantidade * this._valor;
  }
}
