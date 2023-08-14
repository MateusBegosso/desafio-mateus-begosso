class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    const formasDePagamento = ["debito", "credito", "dinheiro"];

    if (!formasDePagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let valorTotal = 0;

    const itensDoPedido = [];

    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");
      if (quantidade <= 0) {
        return "Quantidade inválida!";
      }
      if (!this.cardapio.hasOwnProperty(codigo)) {
        return "Item inválido!";
      }
      itensDoPedido.push({ codigo: codigo, quantidade: quantidade });
    }

    for (let i = 0; i < itensDoPedido.length; i++) {
      const codigo = itensDoPedido[i].codigo;
      const quantidade = itensDoPedido[i].quantidade;

      if (codigo !== "chantily" && codigo !== "queijo") {
        valorTotal += this.cardapio[codigo].valor * quantidade;
      } else if (
        codigo === "chantily" &&
        itensDoPedido.find((item) => item.codigo === "cafe")
      ) {
        valorTotal += this.cardapio[codigo].valor * quantidade;
      } else if (
        codigo === "queijo" &&
        itensDoPedido.find((item) => item.codigo === "sanduiche")
      ) {
        valorTotal += this.cardapio[codigo].valor * quantidade;
      } else {
        return "Item extra não pode ser pedido sem o principal";
      }
    }

    if (metodoDePagamento === "dinheiro") {
      valorTotal *= 0.95;
    } else if (metodoDePagamento === "credito") {
      valorTotal *= 1.03;
    }

    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
