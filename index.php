<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="main.css">
    <title>Carrinho de compras</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#">Início</a></li>
                <li><a href="#">Sobre</a></li>
                <li><a href="#">Produtos</a></li>
                <li><a href="#">Contato</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h1>Carrinho de Compras</h1>
        <div id="produtos">
            <h2>Produtos</h2>
            <div class="produtos-container">
                <?php
                // Inclui o arquivo de produtos e atribui a uma variável
                $produtos = include 'produtos.php';

                // Verifica se $produtos é um array antes de iterar
                if (is_array($produtos)) {
                    foreach ($produtos as $produto) {
                        echo '<div class="produto-card">';
                        echo '<img src="' . $produto['imagem'] . '" alt="' . $produto['nome'] . '">';
                        echo '<span>' . $produto['nome'] . '</span>';
                        echo '<span>R$ ' . number_format($produto['preco'], 2, ',', '.') . '</span>';
                        echo '<div class="btn-container">';
                        echo '<button onclick="adicionarProduto(\'' . $produto['nome'] . '\', ' . $produto['preco'] . ', \'' . $produto['imagem'] . '\')">Adicionar ao Carrinho</button>';
                        echo '</div>';
                        echo '</div>';
                    }
                } else {
                    echo "<p>Erro: Não foi possível carregar os produtos.</p>";
                }
                ?>
            </div>
        </div>
        <div id="carrinho-tab" onclick="toggleCarrinho()"></div>
        <div id="carrinho">
            <h2>Carrinho de Compras</h2>
            <ul id="lista-carrinho"></ul>
            <p>Total: R$ <span id="total-carrinho">0</span></p>
            <div id="paypal-button-container"></div>
        </div>
    </main>
    <script src="https://www.paypal.com/sdk/js?client-id=AXTUsh_VKLZ6hXjQ500lcaKAOKIQ7CKFM-yohSFecpPlVNIj4Z-S8O3nSG2U3O7dDoB33rxN5YpMJtVb&currency=BRL"></script>
    <script src="main.js"></script>
</body>
</html>
