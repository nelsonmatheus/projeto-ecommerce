// index.js

// Inicializa o modal com a lib Micromodal
document.addEventListener("DOMContentLoaded", () => {
  if (typeof MicroModal !== "undefined") {
    MicroModal.init();
  }

  const botoesAdicionar = document.querySelectorAll("main section ul li button");
  const botaoCarrinho = document.querySelector("header button");
  const corpoTabela = document.querySelector("#modal-1-content tbody");
  const totalCarrinho = document.querySelector("#total-carrinho");

  let carrinho = [];

  // Função para renderizar o carrinho
  function renderizarCarrinho() {
    corpoTabela.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td><img src="${item.imagem}" alt="${item.nome}" width="50"></td>
        <td>${item.nome}</td>
        <td>R$ ${item.preco.toFixed(2)}</td>
        <td><input type="number" value="${item.quantidade}" min="1" data-index="${index}"></td>
        <td>R$ ${subtotal.toFixed(2)}</td>
        <td><button data-remove="${index}">Remover</button></td>
      `;

      corpoTabela.appendChild(tr);
    });

    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;

    // Eventos para atualizar quantidade
    document.querySelectorAll('input[type="number"]').forEach(input => {
      input.addEventListener("change", (e) => {
        const index = e.target.getAttribute("data-index");
        carrinho[index].quantidade = parseInt(e.target.value) || 1;
        renderizarCarrinho();
      });
    });

    // Eventos para remover itens
    document.querySelectorAll('button[data-remove]').forEach(botao => {
      botao.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-remove");
        carrinho.splice(index, 1);
        renderizarCarrinho();
      });
    });
  }

  // Adiciona itens ao carrinho
  botoesAdicionar.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      const produto = e.target.closest("li");
      const nome = produto.querySelector("figcaption").textContent;
      const imagem = produto.querySelector("img").src;
      const precoTexto = produto.querySelector("div span:last-of-type").textContent;
      const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));

      // Verifica se já existe no carrinho
      const itemExistente = carrinho.find(item => item.nome === nome);

      if (itemExistente) {
        itemExistente.quantidade++;
      } else {
        carrinho.push({ nome, imagem, preco, quantidade: 1 });
      }

      renderizarCarrinho();
    });
  });

  // Abre o carrinho
  botaoCarrinho.addEventListener("click", () => {
    MicroModal.show("modal-1");
  });
});
