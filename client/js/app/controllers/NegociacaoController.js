class NegociacaoController {

  constructor()
  {
    let $ = document.querySelector.bind(document); //cria uma referencia ao querySelector, permitindo um acesso "jquery like". Importante o bind, do contrario a função não teria o contexto correto.

    //declarando os campos do formulário como propriedades da classe, otimiza o acesso ao DOM (quando comparado a ler o input dentro do evento roda vez que esse ocorre)
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    //declara lista de negoviações (model e view) e faz o binding entre model e view
    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona', 'apaga', 'ordena', 'inverte');

    this._ordemAtual = '';

    //declara mensagem (model e view) e faz o binding entre model e view
    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto');
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
    this._limpaFormulario();
  }

  importa(){
    let service = new NegociacaoService();
    service.obterNegociacoes()
      .then(negociacoes => {
        negociacoes.forEach(n => this._listaNegociacoes.adiciona(new Negociacao(new Date(n.data), n.quantidade, n.valor))); // adiciona ao modelo cada negociação existente no array unificado
        this._mensagem.texto = 'Negociações importadas com sucesso.';
      })
      //.catch(erro => this._mensagem.texto = erro); //retorno de reject da promise que deu erro
  }

  apaga(){
    this._listaNegociacoes.apaga();
    this._mensagem.texto = 'Lista de negociações apagada com sucesso.';
  }

  ordena(coluna){
    console.log(this._ordemAtual);
    if(this._ordemAtual == coluna){
      this._listaNegociacoes.inverte();
    }
    else{
      this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna])
      this._ordemAtual = coluna;
    }
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
