class ProxyFactory{

  static create(objeto, props, acao){
    return new Proxy(objeto, {
        get(target, prop, receiver){
          if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) { // verifica se é uma das funções mapeadas (Function é uma função existente na liguagem javascript)
            return function(){
              let ret = Reflect.apply(target[prop], target, arguments); //invoca a função, passando o array implcito de argumentos da função existente no javascript
              acao(target);
              return ret; //retorna o resultado de Reflect.apply garantindo que o mesmo seja devolvido pra quem chamou a função
            }
          }
          return Reflect.get(target, prop, receiver); // retorna propriedade
        },

        set(target, prop, value, receiver){
          let ret = Reflect.set(target, prop, value, receiver); //atualiza a propriedade antes de executar a ação e guarda o retorno para ser devolvido a quem faz a atribuição
          if(props.includes(prop))
            acao(target);
          return ret;
        }
    });
  }

  static _isFunction(f){
    return( typeof(f) == typeof(Function));
  }
}
