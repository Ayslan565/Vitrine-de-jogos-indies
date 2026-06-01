//Login
document.getElementById('form-login').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const senha = document.getElementById('password').value;
            const mensagem = document.getElementById('mensagemErro');

            mensagem.innerText = "A validar...";
            mensagem.style.color = "yellow";

            try {
                const resposta = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, password: senha })
                });

                const dados = await resposta.json();

                if (resposta.ok) {
                    mensagem.style.color = "#4ade80"; 
                    mensagem.innerText = "Login efetuado! Redirecionando...";
                    setTimeout(() => window.location.href = '/dashboard.html', 1000);
                } else {
                    mensagem.style.color = "#ff6b6b"; 
                    mensagem.innerText = dados.erro;
                }
            } catch (erro) {
                mensagem.style.color = "#ff6b6b";
                mensagem.innerText = "Erro ao conectar ao servidor.";
            }
        });

//Cadastro

       document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('senha').value;
            const bio = document.getElementById('bio').value;
            const mensagem = document.getElementById('mensagemInfo');

            mensagem.style.color = "yellow";
            mensagem.innerText = "A processar registo...";

            try {
                const resposta = await fetch('/api/cadastro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password, bio })
                });

                const dados = await resposta.json();

                if (resposta.ok) {
                    mensagem.style.color = "#4ade80"; // Verde
                    mensagem.innerText = "Conta criada! Redirecionando...";
                    setTimeout(() => window.location.href = '/login.html', 1500);
                } else {
                    mensagem.style.color = "red";
                    mensagem.innerText = dados.erro;
                }
            } catch (erro) {
                mensagem.style.color = "red";
                mensagem.innerText = "Erro ao conectar ao servidor.";
            }
        });