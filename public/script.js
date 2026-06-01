//Carregar jogos ao abrir a página
const carregarJogos = async () =>{
    try {
        const resposta = await fetch('/api/jogos');
        const jogos = await resposta.json();

        const container = document.getElementById('lista-jogos');
        container.innerHTML = ''; 

jogos.forEach(jogo => {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    card.innerHTML = `
        <a href="/jogo.html?id=${jogo.id}" style="text-decoration: none; color: inherit; display: block;">
            <img src="${jogo.imagem}" alt="Capa do Jogo" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px 4px 0 0;">
            <div style="padding: 15px;">
                <h3 style="margin: 0 0 10px 0;">${jogo.title}</h3>
                <p style="color: #999; font-size: 0.9em; margin: 0;">ID do Desenvolvedor: ${jogo.developer_id}</p>
                <p style="color: #4ade80; font-weight: bold; margin-top: 10px; font-size: 1.2em;">R$ ${jogo.preco}</p>
            </div>
        </a>
    `;
    
    container.appendChild(card);
});
    } catch (erro) {
        console.error('Erro ao carregar a vitrine:', erro);
        document.getElementById('lista-jogos').innerHTML = '<p>Erro ao carregar os jogos. Verifique se o servidor está rodando.</p>';
    }
}
carregarJogos();