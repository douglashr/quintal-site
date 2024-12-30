async function carregarConteudo() {
    try {
      const response = await fetch('edicao/sobre-a-escola.json');
      if (!response.ok) throw new Error(`Erro ao carregar JSON: ${response.status}`);
      const dados = await response.json();
  
      // Atualizar o banner
      document.querySelector('.banner').style.backgroundImage = `url('${dados.imagemBanner}')`;
      document.querySelector('.banner-text h1').textContent = dados.titulo;
      document.querySelector('.banner-text p').textContent = dados.subtitulo;
  
      // Atualizar o conteúdo
      const conteudoSection = document.querySelector('.content');
      conteudoSection.innerHTML = ''; // Limpa o conteúdo atual
  
      dados.conteudo.forEach(item => {
        if (item.tipo === 'paragrafo') {
          const p = document.createElement('p');
          p.textContent = item.texto;
          conteudoSection.appendChild(p);
        } else if (item.tipo === 'titulo') {
          const h2 = document.createElement('h2');
          h2.textContent = item.texto;
          conteudoSection.appendChild(h2);
        } else if (item.tipo === 'lista') {
          const ul = document.createElement('ul');
          item.itens.forEach(texto => {
            const li = document.createElement('li');
            li.textContent = texto;
            ul.appendChild(li);
          });
          conteudoSection.appendChild(ul);
        }
      });
    } catch (erro) {
      console.error('Erro ao carregar o conteúdo:', erro);
    }
  }
  
  // Inicializar o carregamento
  document.addEventListener('DOMContentLoaded', carregarConteudo);
  