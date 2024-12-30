async function carregarIntro(caminhoJson, idSecao) {
    try {
      const resposta = await fetch(caminhoJson);
      if (!resposta.ok) {
        throw new Error(`Erro ao carregar o arquivo JSON: ${resposta.status}`);
      }
  
      const dados = await resposta.json();
  
      const secao = document.getElementById(idSecao);
      if (!secao) {
        throw new Error(`Seção com ID "${idSecao}" não encontrada.`);
      }
  
      // Renderizar a imagem do cabeçalho
      const header = secao.querySelector("header");
      header.innerHTML = `<h2><img src="${dados.imagem}" style="width:100%" /></h2>`;
  
      // Renderizar a frase e os links
      const conteudo = secao.querySelector(".content > p");
      conteudo.innerHTML = `
        ${dados.frase}
        <div style="clear:both"></div>
        ${dados.links
          .map(
            link =>
              `<a class="XqQF9c" href="${link.url}" target="${link.alvo}" style="color: inherit; text-decoration: none;">
                <span class="C9DxTc aw5Odc" style="text-decoration: underline;">${link.texto}</span>
              </a>`
          )
          .join(" ")}
      `;
  
      // Renderizar o botão do rodapé
      const rodape = secao.querySelector("footer");
      rodape.innerHTML = `<a href="${dados.botaoRodape.link}" class="button style2 down">${dados.botaoRodape.texto}</a>`;
    } catch (erro) {
      console.error("Erro ao carregar o conteúdo da introdução:", erro);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carregarIntro("edicao/intro-conteudo.json", "intro");
  });
  