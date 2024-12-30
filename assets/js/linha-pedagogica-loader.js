async function carregarLinhaPedagogica(caminhoJson) {
  try {
    const resposta = await fetch(caminhoJson);
    if (!resposta.ok) {
      throw new Error(`Erro ao carregar o JSON: ${resposta.status}`);
    }

    const dados = await resposta.json();
    renderizarLinhaPedagogica(dados);
  } catch (erro) {
    console.error("Erro ao carregar a linha pedagógica:", erro);
  }
}

function renderizarLinhaPedagogica(dados) {
  // Seleciona o container principal
  const container = document.getElementById("linha-pedagogica-container");

  if (!container) {
    console.error("Container #linha-pedagogica-container não encontrado!");
    return;
  }

  // Criar o elemento <section>
  const secao = document.createElement("section");
  secao.id = "two";
  secao.className = "main style2 right dark fullscreen";

  // Criar a div de conteúdo
  const conteudoDiv = document.createElement("div");
  conteudoDiv.className = "content box style2";

  // Adicionar o título
  const header = document.createElement("header");
  const titulo = document.createElement("h2");
  titulo.textContent = dados.titulo;
  header.appendChild(titulo);
  conteudoDiv.appendChild(header);

  // Adicionar os parágrafos
  dados.paragrafos.forEach(paragrafoTexto => {
    const paragrafo = document.createElement("p");
    paragrafo.textContent = paragrafoTexto;
    conteudoDiv.appendChild(paragrafo);
  });

  // Adicionar o link
  const link = document.createElement("a");
  link.href = dados.link.url;
  link.innerHTML = `<span>>></span>${dados.link.texto}`;
  conteudoDiv.appendChild(link);

  // Adicionar a div de conteúdo à seção
  secao.appendChild(conteudoDiv);

  // Adicionar o botão no rodapé
  const botaoRodape = document.createElement("a");
  botaoRodape.href = dados.botaoRodape.link;
  botaoRodape.className = "button style2 down anchored";
  botaoRodape.textContent = dados.botaoRodape.texto;
  secao.appendChild(botaoRodape);

  // Adicionar a seção ao container no HTML
  container.appendChild(secao);
}

document.addEventListener("DOMContentLoaded", () => {
  carregarLinhaPedagogica("edicao/linha-pedagogica.json");
});
