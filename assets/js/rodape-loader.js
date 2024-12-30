async function carregarRodape(caminhoJson) {
    try {
      const resposta = await fetch(caminhoJson);
      if (!resposta.ok) {
        throw new Error(`Erro ao carregar o JSON: ${resposta.status}`);
      }
  
      const dados = await resposta.json();
      renderizarRodape(dados);
    } catch (erro) {
      console.error("Erro ao carregar a seção Rodapé:", erro);
    }
  }
  
  function renderizarRodape(dados) {
    const container = document.getElementById("rodape-container");
  
    if (!container) {
      console.error("Container #rodape-container não encontrado!");
      return;
    }
  
    // Criar a seção
    const secao = document.createElement("section");
    secao.id = "contact";
    secao.className = "main style3 secondary";
  
    const conteudoDiv = document.createElement("div");
    conteudoDiv.className = "content";
  
    // Criar a coluna esquerda (contatos)
    const leftContact = document.createElement("div");
    leftContact.className = "left-contact";
  
    dados.contatos.forEach(contato => {
      const infoBox = document.createElement("div");
      infoBox.className = "info-box";
  
      if (contato.link) {
        const link = document.createElement("a");
        link.href = contato.link;
        link.target = "_blank";
  
        const icone = document.createElement("span");
        icone.className = "material-icons";
        icone.innerHTML = `<img src="${contato.icone}" alt="${contato.titulo}">`;
  
        const descricao = document.createElement("p");
        descricao.innerHTML = `<strong>${contato.titulo}:</strong> ${contato.descricao}`;
  
        link.appendChild(icone);
        link.appendChild(descricao);
        infoBox.appendChild(link);
      } else {
        const icone = document.createElement("span");
        icone.className = "material-icons";
        icone.innerHTML = `<img src="${contato.icone}" alt="${contato.titulo}">`;
  
        const descricao = document.createElement("p");
        descricao.innerHTML = `<strong>${contato.titulo}:</strong> ${contato.descricao}`;
  
        infoBox.appendChild(icone);
        infoBox.appendChild(descricao);
      }
  
      leftContact.appendChild(infoBox);
    });
  
    conteudoDiv.appendChild(leftContact);
  
    // Criar a coluna direita (mapa)
    const rightContact = document.createElement("div");
    rightContact.className = "right-contact";
  
    const iframe = document.createElement("iframe");
    iframe.src = dados.mapa.src;
    iframe.width = dados.mapa.largura;
    iframe.height = dados.mapa.altura;
    iframe.style.border = "0";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
  
    rightContact.appendChild(iframe);
    conteudoDiv.appendChild(rightContact);
  
    // Adicionar conteúdo à seção
    secao.appendChild(conteudoDiv);
  
    // Adicionar a seção ao container
    container.appendChild(secao);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carregarRodape("edicao/rodape.json");
  });
  