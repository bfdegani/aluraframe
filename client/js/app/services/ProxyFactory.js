class ProxyFactory{

  static create(objeto, props, acao){
    return new Proxy(objeto, {
        get(target, prop, receiver){
          if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) { // verifica se é uma das funções mapeadas (Function é uma função existente na liguagem javascript)
            return function(){
              Reflect.apply(target[prop], target, arguments); //invoca a função, passando o array implcito de argumentos da função existente no javascript
              return acao(target);
            }
          }
          return Reflect.get(target, prop, receiver); // retorna propriedade
        },

        set(target, prop, value, receiver){
          if(props.includes(prop)){
            target[prop] = value;
            acao(target);
          }
          return Reflect.set(target, prop, value, receiver);
        }
    });
  }
  
  static _isFunction(f){
    return( typeof(f) == typeof(Function));
  }
}
