async function carregarOne(caminhoJson, idSecao) {
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
  
      // Renderizar o título
      const header = secao.querySelector("header");
      header.innerHTML = `<h2>${dados.titulo}</h2>`;
  
      // Renderizar os parágrafos
      const conteudo = secao.querySelector(".content.box.style2");
      const paragrafos = dados.paragrafos
        .map(paragrafo => `<p>${paragrafo}</p>`)
        .join("");
      conteudo.innerHTML = `
        ${header.outerHTML}
        ${paragrafos}
        <a href="${dados.link.url}"><span>>></span> ${dados.link.texto}</a>
      `;
  
      // Renderizar o botão do rodapé
      const botaoRodape = secao.querySelector(".button.style2.down.anchored");
      botaoRodape.href = dados.botaoRodape.link;
      botaoRodape.textContent = dados.botaoRodape.texto;
    } catch (erro) {
      console.error("Erro ao carregar o conteúdo da seção 'one':", erro);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carregarOne("edicao/one-conteudo.json", "one");
  });
  