//Carregar jogos ao abrir a página
const carregarJogos = async () =>{
    try {
        const resposta = await fetch('/api/jogos');
        const jogos = await resposta.json();

        const container = document.getElementById('lista-jogos');
        container.innerHTML = ''; 

        jogos.forEach(jogo => {
            const preco = parseFloat(jogo.preco);
            const precoFormatado = preco > 0 
                ? `R$ ${preco.toFixed(2).replace('.', ',')}` 
                : 'Gratuito';
            
            const classePreco = preco > 0 ? 'paid' : '';

            const cartaoHTML = `
                <div class="game-card">
                    <div class="game-cover" style="background: #2d2d2d; font-size: 1rem;">
                        ${jogo.imagem ? jogo.imagem : '[Sem Capa]'}
                    </div>
                    <div class="game-info">
                        <div class="game-title">${jogo.title}</div>
                        <div class="game-dev">ID do Desenvolvedor: ${jogo.developer_id}</div>
                        <div class="tags">
                            <span class="tag">Indie</span>
                        </div>
                        <div class="game-footer">
                            <span class="price ${classePreco}">${precoFormatado}</span>
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML += cartaoHTML;
        });

    } catch (erro) {
        console.error('Erro ao carregar a vitrine:', erro);
        document.getElementById('lista-jogos').innerHTML = '<p>Erro ao carregar os jogos. Verifique se o servidor está rodando.</p>';
    }
}
carregarJogos();