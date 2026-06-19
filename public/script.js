const carregarJogos = async () => {
    try {
        const resposta = await fetch('/api/jogos');
        const jogos = await resposta.json();

        const container = document.getElementById('lista-jogos');
        container.innerHTML = ''; 

        if (jogos.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #a0aec0; padding: 2rem;">Nenhum jogo disponível no momento.</p>';
            return;
        }

        jogos.forEach((jogo, index) => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.style.animationDelay = `${index * 0.05}s`;
            
            const precoFormatado = jogo.preco === 0 || jogo.preco === '0' ? 'Gratuito' : `R$ ${parseFloat(jogo.preco).toFixed(2)}`;
            const classePreco = jogo.preco === 0 || jogo.preco === '0' ? 'price free' : 'price paid';
            
            card.innerHTML = `
                <a href="/jogo.html?id=${jogo.id}" style="text-decoration: none; color: inherit; display: block; height: 100%; display: flex; flex-direction: column;">
                    <div class="game-cover">
                        <img src="${jogo.imagem || 'https://via.placeholder.com/280x200?text=Sem+Imagem'}" alt="Capa do Jogo: ${jogo.title}" onerror="this.src='https://via.placeholder.com/280x200?text=Sem+Imagem'">
                    </div>
                    <div class="game-info">
                        <h3 class="game-title">${jogo.title}</h3>
                        <p class="game-dev">Desenvolvedor ID: ${jogo.developer_id}</p>
                        <div class="tags">
                            <span class="tag">Indie</span>
                            <span class="tag">Novo</span>
                        </div>
                        <div class="game-footer">
                            <span class="${classePreco}">${precoFormatado}</span>
                            <span style="font-size: 0.85rem; color: #a0aec0;">→</span>
                        </div>
                    </div>
                </a>
            `;
            
            container.appendChild(card);
        });
    } catch (erro) {
        console.error('Erro ao carregar a vitrine:', erro);
        document.getElementById('lista-jogos').innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ff6b6b; padding: 2rem;">Erro ao carregar os jogos. Verifique se o servidor está rodando.</p>';
    }
};

carregarJogos();
