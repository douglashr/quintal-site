async function carregarConteudo() {
    try {
        const response = await fetch('edicao/adaptacao.json');
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
            }
        });
    } catch (erro) {
        console.error('Erro ao carregar o conteúdo:', erro);
    }
}

// Inicializar o carregamento
document.addEventListener('DOMContentLoaded', carregarConteudo);
