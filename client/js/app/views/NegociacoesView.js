class NegociacoesView extends View {

  template(model){  //utiliza um sring template dentro de outro. a chamada de map faz com que toda a lista seja percorrida. o join('') faz com que o array produzido pelo map seja convertido em string, permitindo que seja usado no template
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th onclick="negociacaoController.ordena('data')">DATA</th>
            <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
            <th onclick="negociacaoController.ordena('valor')">VALOR</th>
            <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
          </tr>
        </thead>
        <tbody>
          ${model.negociacoes.map(n =>
            `<tr>
                <td>${DateHelper.date2Text(n.data)}</td>
                <td>${n.quantidade}</td>
                <td>${n.valor}</td>
                <td>${n.volume}</td>
            </tr>`).join('')}
        </tbody>
        <tfoot>
          <td colspan="3"></td>
          <td>${model.volumeTotal}</td>
        </tfoot>
      </table>
    `;
  }

}
