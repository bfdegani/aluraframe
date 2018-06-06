class View {

  constructor(elemento){
    this._elemento = elemento;
  }

  template(){
    throw new Error('O método _template() precisa ser implementado'); // lança erro pra garantir que esse método dever ser sobrescrito por quem extende o método template()
  }

  update(model){
    this._elemento.innerHTML = this.template(model);
  }

}
