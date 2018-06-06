class Bind {

  constructor(model, view, ...props){ //...props indica que a função aceita uma lista varival de parametros e esses são armazenados em um array chamado "props"
    let proxy = ProxyFactory.create(model, props, (model) => view.update(model));
    view.update(model);
    return proxy; // em javascript, um construtor pode ter return e devolver um objeto diferente ao da classe de que faz parte
  }

}
