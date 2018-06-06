class NegociacaoController {

  constructor()
  {
    let self = this; //apontamento a ser usado nos handlers dos proxies para ListaNegociacoes e Mensagem
    let $ = document.querySelector.bind(document); //cria uma referencia ao querySelector, permitindo um acesso "jquery like". Importante o bind, do contrario a função não teria o contexto correto.

    //declarando os campos do formulário como propriedades da classe, otimiza o acesso ao DOM (quando comparado a ler o input dentro do evento roda vez que esse ocorre)
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    //declara lista de negoviações (model e view)
    this._negociacoesView = new NegociacoesView($('#negociacoesView'));

    this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
              get(target, prop, receiver){
                if(['adiciona', 'apaga'].includes(prop) && typeof(target[prop]) === typeof(Function)) { // verifica se é uma das funções mapeadas (Function é uma função existente na liguagem)
                  return function(){
                    console.log(`interceptando ${prop}`);
                    Reflect.apply(target[prop], target, arguments); //invoca a função, passando o array implcito de argumentos da função existente no javascript
                    self._negociacoesView.update(target);
                  }
                }
                else return Reflect.get(target, prop, receiver); // retorna propriedade
              }
          });

    this._negociacoesView.update(this._listaNegociacoes);




    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($('#mensagemView'));
    this._mensagemView.update(this._mensagem);

  }

  get inputData(){
    return this._inputData;
  }

  get inputQuantidade(){
    return this._inputQuantidade;
  }

  get inputValor(){
    return this._inputValor;
  }

  adiciona(event){
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação incluída com sucesso.';
    this._mensagemView.update(this._mensagem);
    this._limpaFormulario();
  }

  apaga(){
    this._listaNegociacoes.apaga();
    this._mensagem.texto = 'Lista de negociações apagada com sucesso.';
    this._mensagemView.update(this._mensagem);
  }

  _criaNegociacao(){
    return new Negociacao(
      DateHelper.text2Date(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value);
  }

  _limpaFormulario(){
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }
}
