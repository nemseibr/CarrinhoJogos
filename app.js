document.addEventListener("DOMContentLoaded", function() {
    var totalPedido = document.getElementById("total-pedido");
    totalPedido.querySelector("span").textContent = "0,00";
});   
    
    
    function mostrarImagem() {
        var selectBox = document.getElementById("listajogos");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        var imagemJogo = document.getElementById("imagemJogo");

        switch (selectedValue) {
            case "godofwar":
                imagemJogo.innerHTML = '<img src="./img/godofwar.png" alt="God of War Ragnarok">';
                break;
            case "horizon":
                imagemJogo.innerHTML = '<img src="./img/horizon.png" alt="Horizon Forbidden West">';
                break;
            case "re4":
                imagemJogo.innerHTML = '<img src="./img/re4.png" alt="Resident Evil 4">';
                break;
            case "spiderman2":
                imagemJogo.innerHTML = '<img src="./img/spiderman2.png" alt="Spider Man 2">';
                break;
            case "tlou2":
                imagemJogo.innerHTML = '<img src="./img/tlou2.png" alt="The Last of Us 2">';
                break;
            default:
                imagemJogo.innerHTML = ''; // Limpa o conteúdo da div se outra opção for selecionada
        }
    }

    function adicionar() {
        var jogoSelecionado = document.getElementById("listajogos");
        var quantidadeInput = document.getElementById("quantidade").value.trim(); // Remover espaços em branco antes e depois do valor
        var listaProdutos = document.getElementById("lista-produtos");
    
        // Verificar se a quantidade inserida é válida
        if (quantidadeInput === "") {
            alert("Quantidade inválida. Insira um número maior que zero.");
            return;
        }
        
        // Converter quantidadeInput para um número inteiro
        quantidadeInput = parseInt(quantidadeInput);
    
        // Verificar se a quantidade inserida é maior que zero
        if (quantidadeInput <= 0 || isNaN(quantidadeInput)) {
            alert("Insira uma quantidade válida maior que zero.");
            return;
        }
    
        // Verificar se um jogo foi selecionado
        if (jogoSelecionado.value === "selecione") {
            alert("Selecione um jogo.");
            return;
        }
        
        // Verificar se já existe uma miniatura para este jogo
        if (document.getElementById(jogoSelecionado.value + "-miniatura")) {
            alert("Este jogo já foi adicionado à sacola.");
            return;
        }
    
        // Criar elemento de imagem para a miniatura
        var miniaturaContainer = document.createElement("div");
        miniaturaContainer.classList.add("miniatura-container"); // Adiciona a classe CSS
    
        var miniatura = document.createElement("img");
        miniatura.src = "./img/" + jogoSelecionado.value + ".png";
        miniatura.alt = jogoSelecionado.options[jogoSelecionado.selectedIndex].text;
        miniatura.id = jogoSelecionado.value + "-miniatura";
    
        // Adicionar descrição do jogo selecionado com quantidade
        var descricaoJogo = document.createElement("span");
        descricaoJogo.textContent = quantidadeInput + "x " + jogoSelecionado.options[jogoSelecionado.selectedIndex].text;
    
        // Extrair preço do texto da descrição
        var preco = parseFloat(jogoSelecionado.options[jogoSelecionado.selectedIndex].getAttribute('data-preco')); // Obtém o preço do atributo data-preco
    
        // Calcular total do item
        var totalItem = quantidadeInput * preco;
    
        // Adicionar botão de exclusão
        var botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "X";
        botaoExcluir.className = "excluir";
        botaoExcluir.onclick = function() {
            listaProdutos.removeChild(miniaturaContainer);
            calcularTotal();
        };
    
        // Adicionar miniatura, descrição e botão à lista de produtos
        miniaturaContainer.appendChild(miniatura);
        miniaturaContainer.appendChild(descricaoJogo);
        miniaturaContainer.appendChild(botaoExcluir);
        listaProdutos.appendChild(miniaturaContainer);
    
        calcularTotal();
    }
    function calcularTotal() {
        var itens = document.querySelectorAll(".sacola-produtos .miniatura-container");
        var total = 0;

        itens.forEach(function(item) {
            var descricao = item.querySelector("span").textContent;
            var quantidade = parseInt(descricao.split("x")[0]); // Extrair quantidade do texto da descrição
            var precoTexto = descricao.split(" - ")[1]; // Extrair o texto após " - "
            var preco = parseFloat(precoTexto.replace("R$", "").replace(",", ".")); // Remover "R$" e substituir "," por "." e converter para float
            total += quantidade * preco;
        });

        // Atualizar o total exibido
        var totalPedido = document.getElementById("total-pedido");
        totalPedido.querySelector("span").textContent = total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}); // Formatar o total com duas casas decimais e separador de milhares
    }

    function limpar() {
        var listaProdutos = document.getElementById("lista-produtos");
        listaProdutos.innerHTML = ""; // Limpar todos os elementos dentro da lista
    
        // Limpar o total exibido
        var totalPedido = document.getElementById("total-pedido");
        totalPedido.querySelector("span").textContent = "0,00"; // Definir o total como 0,00
    
        // Resetar a seleção para "Selecione um jogo"
        document.getElementById("listajogos").selectedIndex = 0;
    }