async function carregarSecaoAgendar(caminhoJson) {
    try {
      const resposta = await fetch(caminhoJson);
      if (!resposta.ok) {
        throw new Error(`Erro ao carregar o JSON: ${resposta.status}`);
      }
  
      const dados = await resposta.json();
      renderizarSecaoAgendar(dados);
    } catch (erro) {
      console.error("Erro ao carregar a seção Agendar:", erro);
    }
  }
  
  function renderizarSecaoAgendar(dados) {
    const container = document.getElementById("agendar-container");
  
    if (!container) {
      console.error("Container #agendar-container não encontrado!");
      return;
    }
  
    // Criar a seção
    const secao = document.createElement("section");
    secao.id = "agendar";
    secao.className = "main style2 left dark fullscreen";
  
    // Imagem principal
    const imageDiv = document.createElement("div");
    imageDiv.className = "image";
    secao.appendChild(imageDiv);
  
    // Criar o container de conteúdo
    const conteudoDiv = document.createElement("div");
    conteudoDiv.className = "container";
  
    // Adicionar título
    const titulo = document.createElement("h1");
    titulo.textContent = dados.titulo;
    conteudoDiv.appendChild(titulo);
  
    // Adicionar turnos
    dados.turnos.forEach(turno => {
      const infoBox = document.createElement("div");
      infoBox.className = "info-box";
  
      const icone = document.createElement("span");
      icone.className = "material-icons";
      icone.innerHTML = `<img src="${turno.icone}" alt="">`;
  
      const texto = document.createElement("p");
      texto.innerHTML = turno.texto;
  
      infoBox.appendChild(icone);
      infoBox.appendChild(texto);
      conteudoDiv.appendChild(infoBox);
    });
  
    // Adicionar ações
    const acoesDiv = document.createElement("div");
    acoesDiv.className = "info-box";
  
    dados.acoes.forEach(acao => {
      const link = document.createElement("a");
      link.href = acao.url;
      link.className = "valores";
  
      const icone = document.createElement("span");
      icone.className = "icon-button";
      icone.innerHTML = `<img src="${acao.icone}" alt="">`;
  
      const texto = document.createElement("span");
      texto.className = "text";
      texto.textContent = acao.texto;
  
      link.appendChild(icone);
      link.appendChild(texto);
      acoesDiv.appendChild(link);
    });
  
    conteudoDiv.appendChild(acoesDiv);
    secao.appendChild(conteudoDiv);
  
    // Adicionar botão próximo
    const botaoProximo = document.createElement("a");
    botaoProximo.href = dados.proximo.url;
    botaoProximo.className = "button style2 down anchored";
    botaoProximo.textContent = dados.proximo.texto;
    secao.appendChild(botaoProximo);
  
    // Adicionar imagens extras
    dados.imagens.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.className = src.includes("onca2") ? "onca2" : "onca";
      secao.appendChild(img);
    });
  
    // Adicionar a seção ao container
    container.appendChild(secao);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carregarSecaoAgendar("edicao/agendar.json");
  });
  