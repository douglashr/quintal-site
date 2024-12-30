async function carregarConteudo() {
    try {
        const response = await fetch('edicao/turno-e-valores.json');
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
            } else if (item.tipo === 'tabela') {
                const table = document.createElement('table');
                table.classList.add('tabela-valores');

                // Cabeçalho da tabela
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                item.cabecalho.forEach(header => {
                    const th = document.createElement('th');
                    th.textContent = header;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // Corpo da tabela
                const tbody = document.createElement('tbody');
                item.linhas.forEach(linha => {
                    const tr = document.createElement('tr');
                    linha.forEach(coluna => {
                        const td = document.createElement('td');
                        td.textContent = coluna;
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);

                conteudoSection.appendChild(table);
            } else if (item.tipo === 'destaque') {
                const destaque = document.createElement('p');
                destaque.textContent = item.texto;
                destaque.style.fontWeight = 'bold';
                conteudoSection.appendChild(destaque);
            }
        });
    } catch (erro) {
        console.error('Erro ao carregar o conteúdo:', erro);
    }
}

// Inicializar o carregamento
document.addEventListener('DOMContentLoaded', carregarConteudo);
