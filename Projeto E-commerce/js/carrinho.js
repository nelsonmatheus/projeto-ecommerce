
const botoesAdicionarAoCarrinho = document.querySelectorAll('.adicionar-ao-carrinho');

botoesAdicionarAoCarrinho.forEach(botao => {

    botao.addEventListener('click', (evento) => {
        //capturar as informações do produto clicado para salvar no localStorage
        const elementoProduto =
            evento.target.closest(".produto");
        const produtoId = elementoProduto.dataset.id;
        const produtoNome = elementoProduto.querySelector(".nome").textContent;
        const produtoImagem = elementoProduto.querySelector("img").getAttribute("src");
        const produtoPreco = parseFloat(elementoProduto.querySelector(".preco").textContent.replace("R$ ", "").replace(".", "").replace(",", "."));

        //2. Adicionar ou atualizar a quantidade:
        const carrinho = obterProdutosDoCarrinho();

        //verificar se o produto já existe no carrinho
        const existeProduto = carrinho.find(produto => produto.id === produtoId);
        // se exite produto, incrementar a quantidade
        if (existeProduto) {
            existeProduto.quantidade = (existeProduto.quantidade || 1) + 1;
        } else {
            // Se o produto não existe, adicionar o produto com a quantidade 1
            const produto = {
                id: produtoId,
                nome: produtoNome,
                imagem: produtoImagem,
                preco: produtoPreco,
                quantidade: 1
            };
            carrinho.push(produto);
        }

        salvarProdutosNoCarrinho(carrinho);
        atualizarContadorCarrinho();
        renderizarTabelaCarrinho();
    });
});

function salvarProdutosNoCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function obterProdutosDoCarrinho() {
    const produtos = localStorage.getItem('carrinho');
    return produtos ? JSON.parse(produtos) : [];
}

function obterProdutosDoCarrinho() {
    const produtos = localStorage.getItem('carrinho');
    return produtos ? JSON.parse(produtos) : [];

}

function atualizarContadorCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    let total = 0;

    produtos.forEach(produto => {
        total += produto.quantidade;
    });

    document.getElementById('contador-carrinho').textContent = total;
}


// Essa função deve ser chamada sempre que o carrinho for atualizado
atualizarContadorCarrinho();


// Renderizar a tabela do carrinho de compras
function renderizarTabelaCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    const corpoTabela = document.querySelector('#modal-1-content table tbody');

    if (!corpoTabela) return;

    corpoTabela.innerHTML = '';


    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = ` <td class="td-produto">
                <img 
                src="${produto.imagem}"
                alt="${produto.nome}" 
                />
                </td>
                <td>${produto.nome}</td>
                <td class="preco-unitario">R$ ${produto.preco.toFixed(2).replace('.', ',')}</td>
                <td class="td-quantidade">
                <input type="number" min="1" value="${produto.quantidade}" />
                </td>
                <td class="td-preco-total">R$ ${produto.preco.toFixed(2).replace('.', ',')}</td>
                <td><button class="btn-remover" data-id="${produto.id}"></button>
                </td>
                `;
        corpoTabela.appendChild(tr);
    });
}

//Lembre de chamar essa função logo após adicionar um item ao carrinho, senão a modal não atualiza os novos dados:

renderizarTabelaCarrinho();


const corpoTabela = document.querySelector('#modal-1-content table tbody');
corpoTabela.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('btn-remover')) {
        const id = evento.target.dataset.id;
        removerProdutoDoCarrinho(id);
    }
});

function removerProdutoDoCarrinho(id) {
    const produtos = obterProdutosDoCarrinho();


    const carrinhoAtualizado = produtos.filter(produto => produto.id !== id);
    salvarProdutosNoCarrinho(carrinhoAtualizado);
    atualizarContadorCarrinho();
    renderizarTabelaCarrinho();
}