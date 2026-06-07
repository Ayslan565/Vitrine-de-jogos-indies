async function carregarPerfil() {
            try {
                const resposta = await fetch('/api/perfil');
                if (!resposta.ok) throw new Error('Nao autorizado');
                const perfil = await resposta.json();
                
                document.getElementById('nome-dev').innerText = perfil.username;
                document.getElementById('email-dev').innerText = perfil.email;
                document.getElementById('bio-dev').innerText = perfil.bio ? `"${perfil.bio}"` : "Sem biografia registrada.";
            } catch (erro) {
                window.location.href = '/login.html';
            }
        }

        async function carregarMeusJogos() {
            try {
                const resposta = await fetch('/api/meus-jogos');
                if (!resposta.ok) return;

                const jogos = await resposta.json();
                const container = document.getElementById('meus-jogos-grid');
                container.innerHTML = ''; 

                if (jogos.length === 0) {
                    container.innerHTML = '<p>Voce ainda nao publicou nenhum jogo.</p>';
                    return;
                }

                jogos.forEach(jogo => {
                    const descSegura = jogo.description.replace(/"/g, '&quot;').replace(/'/g, "\\'");
                    const tituloSeguro = jogo.title.replace(/"/g, '&quot;').replace(/'/g, "\\'");

                    const card = document.createElement('div');
                    card.className = 'game-card';
                    card.innerHTML = `
                        <img src="${jogo.imagem}" alt="Capa de ${jogo.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px 4px 0 0;">
                        <div style="padding: 15px;">
                            <h3 style="margin: 0 0 10px 0;">${jogo.title}</h3>
                            <p style="color: #4ade80; font-weight: bold; margin: 0;">R$ ${jogo.preco}</p>
                            
                            <button class="btn-edit" onclick="abrirModal(${jogo.id}, '${tituloSeguro}', ${jogo.preco}, '${descSegura}')">Editar Jogo</button>
                            <button class="btn-danger" onclick="apagarJogo(${jogo.id})">Apagar Jogo</button>
                        </div>
                    `;
                    container.appendChild(card);
                });
            } catch (erro) {
                console.error("Erro ao carregar os jogos:", erro);
            }
        }

        function abrirModal(id, titulo, preco, descricao) {
            document.getElementById('edit-id').value = id;
            document.getElementById('edit-titulo').value = titulo;
            document.getElementById('edit-preco').value = preco;
            document.getElementById('edit-descricao').value = descricao;
            
            document.getElementById('modal-editar').style.display = 'flex';
        }

        function fecharModal() {
            document.getElementById('modal-editar').style.display = 'none';
        }

        document.getElementById('form-editar').addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('edit-id').value;
            const dados = {
                titulo: document.getElementById('edit-titulo').value,
                preco: document.getElementById('edit-preco').value,
                descricao: document.getElementById('edit-descricao').value
            };

            try {
                const resposta = await fetch(`/api/editar-jogo/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                if (resposta.ok) {
                    fecharModal();
                    carregarMeusJogos(); 
                } else {
                    alert("Erro ao editar o jogo.");
                }
            } catch (erro) {
                console.error("Erro no update:", erro);
            }
        });

        function abrirModalApagar(id) {
            document.getElementById('modal-apagar').style.display = 'flex';
            document.getElementById('btn-confirmar-apagar').onclick = () => confirmarApagar(id);
        }

        function fecharModalApagar() {
            document.getElementById('modal-apagar').style.display = 'none';
        }

        async function confirmarApagar(id) {
            try {
                const resposta = await fetch(`/api/apagar-jogo/${id}`, { method: 'DELETE' });
                if (resposta.ok) {
                    fecharModalApagar();
                    carregarMeusJogos(); 
                } else {
                    alert("Erro ao tentar apagar o jogo.");
                }
            } catch (erro) {
                console.error("Erro no delete:", erro);
            }
        }

        async function apagarJogo(id) {
            abrirModalApagar(id);
        }

        carregarPerfil();
        carregarMeusJogos();