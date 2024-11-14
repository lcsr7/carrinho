

let carrinho = []; // Array para armazenar produtos

// Função para alternar a visibilidade do carrinho
function toggleCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    if (carrinhoDiv.style.display === 'none' || carrinhoDiv.style.display === '') {
        carrinhoDiv.style.display = 'block'; // Mostra o carrinho
    } else {
        carrinhoDiv.style.display = 'none'; // Esconde o carrinho
    }
}

// Função para adicionar produtos ao carrinho
function adicionarProduto(nome, preco, imagem) {
    carrinho.push({ nome, preco, imagem });
    atualizarCarrinho();
}

// Função para remover produtos do carrinho
function removerProduto(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById("lista-carrinho");
    listaCarrinho.innerHTML = ""; // Limpa a lista atual

    carrinho.forEach((produto, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" style="width: 50px; height: auto;">
            <span>${produto.nome}</span>
            <span>R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
            <button onclick="removerProduto(${index})">Remover</button>
        `;
        listaCarrinho.appendChild(li);
    });

    const totalCarrinho = document.getElementById("total-carrinho");
    const total = carrinho.reduce((total, produto) => total + produto.preco, 0); // valor total do carrinho
    totalCarrinho.innerText = total.toFixed(2).replace('.', ','); 

    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.style.display = carrinho.length > 0 ? 'block' : 'none'; // exibe ou oculta o carrinho
}

(function (){

    paypal.Buttons({
        createOrder: function(data, actions){
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'BRL',
                        value: carrinho.reduce((total,produto) => total+ produto.preco, 0).toFixed(2)
                    }
                }]
            });

        },
        onApprove: function(data,actions){
            return actions.order.capture().then(function(details){
                console.log('Pagamento Realizado com sucesso!');
                console.log(details);
                carrinho = []; // limpar o carrinho após o pagamento
                atualizarCarrinho();
            });
        },
        onError: function(err){
            console.error ('Ocorreu um erro durante o pagamento', err);
        }


    }).render('#paypal-button-container'); // renderizar o botão do paypal

})();