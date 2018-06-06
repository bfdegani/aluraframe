class MensagemView extends View {

  template(model) {
    return model._texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
  }

}
