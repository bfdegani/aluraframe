class Bind {

  constructor(model, view, props){
    let proxy = ProxyFactory.create(model, props, (model) => view.update(model));
    view.update(model);
    return proxy; // em javascript, um construtor pode ter return e devolver um objeto diferente ao da classe de que faz parte
  }
  
}
