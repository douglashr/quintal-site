async function carregarGaleria(caminhoJson) {
    try {
        const resposta = await fetch(caminhoJson);
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar o JSON: ${resposta.status}`);
        }

        const dados = await resposta.json();
        renderizarGaleria(dados);

        // Dispara o evento após renderizar a galeria
        $(document).trigger('conteudoAtualizado');
    } catch (erro) {
        console.error("Erro ao carregar a seção Galeria:", erro);
    }
}

function renderizarGaleria(dados) {
    const container = document.getElementById("galeria-container");

    if (!container) {
        console.error("Container #galeria-container não encontrado!");
        return;
    }

    // Criar a seção
    const secao = document.createElement("section");
    secao.id = "work";
    secao.className = "main style3 primary";

    // Criar a div de conteúdo
    const conteudoDiv = document.createElement("div");
    conteudoDiv.className = "content";

    // Adicionar o título e descrição
    const header = document.createElement("header");
    const titulo = document.createElement("h2");
    titulo.textContent = dados.titulo;
    header.appendChild(titulo);

    const descricao = document.createElement("p");
    descricao.textContent = dados.descricao;
    header.appendChild(descricao);

    const link = document.createElement("a");
    link.href = dados.link.url;
    link.innerHTML = `<span>>></span>${dados.link.texto}`;
    header.appendChild(link);

    conteudoDiv.appendChild(header);

    // Criar a galeria
    const galeria = document.createElement("div");
    galeria.className = "gallery";

    dados.galeria.forEach((item, index) => {
        const artigo = document.createElement("article");
        artigo.className = index % 2 === 0 ? "from-left" : "from-right";

        const link = document.createElement("a");
        link.href = item.imagemFull;
        link.className = "image fit";

        const img = document.createElement("img");
        img.src = item.imagemThumb;
        img.title = item.titulo;
        img.alt = ""; // Mantém o atributo alt vazio como no HTML original

        link.appendChild(img);
        artigo.appendChild(link);
        galeria.appendChild(artigo);
    });

    conteudoDiv.appendChild(galeria);

    // Adicionar a div de conteúdo à seção
    secao.appendChild(conteudoDiv);

    // Limpar e adicionar a seção ao container
    container.innerHTML = ""; // Garante que o container está limpo
    container.appendChild(secao);

    // Inicializar o carrossel, se necessário
    if (typeof $.poptrox === "function") {
        $(".gallery a").poptrox(); // Exemplo de inicialização para Poptrox
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarGaleria("edicao/galeria.json");
});
