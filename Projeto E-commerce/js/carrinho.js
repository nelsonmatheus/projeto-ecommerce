
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