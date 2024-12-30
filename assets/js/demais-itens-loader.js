async function carregarDemaisItens(caminhoJson) {
    try {
      const resposta = await fetch(caminhoJson);
      if (!resposta.ok) {
        throw new Error(`Erro ao carregar o JSON: ${resposta.status}`);
      }
  
      const dados = await resposta.json();
      renderizarDemaisItens(dados);
    } catch (erro) {
      console.error("Erro ao carregar a seção Demais Itens:", erro);
    }
  }
  
  function renderizarDemaisItens(dados) {
    const container = document.getElementById("demais-itens-container");
  
    if (!container) {
      console.error("Container #demais-itens-container não encontrado!");
      return;
    }
  
    // Criar a seção
    const secao = document.createElement("section");
    secao.id = "tree";
    secao.className = "main style2 left dark fullscreen";
  
    // Criar os boxes
    dados.boxes.forEach(box => {
      const boxDiv = document.createElement("div");
      boxDiv.className = "content box style2 col-4";
  
      const header = document.createElement("header");
  
      const icone = document.createElement("span");
      icone.className = "image-icon-2";
      icone.innerHTML = `<img src="${box.icone}" alt="${box.titulo}">`;
  
      const titulo = document.createElement("h2");
      titulo.textContent = box.titulo;
  
      header.appendChild(icone);
      header.appendChild(titulo);
      boxDiv.appendChild(header);
  
      const texto = document.createElement("p");
      texto.textContent = box.texto;
      boxDiv.appendChild(texto);
  
      const link = document.createElement("a");
      link.href = box.linkUrl;
      link.innerHTML = `<span>>></span>${box.linkTexto}`;
      boxDiv.appendChild(link);
  
      secao.appendChild(boxDiv);
    });
  
    // Botão de próximo
    const botaoProximo = document.createElement("a");
    botaoProximo.href = dados.proximo.link;
    botaoProximo.className = "button style2 down anchored";
    botaoProximo.textContent = dados.proximo.texto;
    secao.appendChild(botaoProximo);
  
    // Adicionar a seção ao container
    container.appendChild(secao);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carregarDemaisItens("edicao/demais-itens.json");
  });
  