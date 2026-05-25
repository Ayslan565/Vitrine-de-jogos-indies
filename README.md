IndieHub

IndieHub é um hub comunitário e uma vitrine digital focada na publicação e descoberta de videojogos independentes. Criado para ser um "berçário" criativo, o projeto visa ajudar programadores iniciantes, estudantes e hobbistas a partilharem os seus jogos com o mundo sem as altas barreiras financeiras das grandes lojas digitais.

Objetivo do Projeto

A dor principal de quem começa no desenvolvimento de jogos é a descoberta (discoverability). O IndieHub resolve isso oferecendo um ambiente seguro e de baixo custo onde a comunidade pode:

Publicar projetos académicos, de game jams ou protótipos.

Construir um portefólio vivo.

Receber feedback real de jogadores e outros criadores.

Adotar modelos de monetização amigáveis (Gratuito ou "Pague o que Quiser").

Funcionalidades Planeadas

Baixa Barreira de Entrada: Interface simples para o upload de ficheiros de jogos (executáveis, ZIPs, WebGL) sem taxas abusivas.

Sistema de Feedback: Avaliações e comentários construtivos para ajudar na evolução dos jogos.

Pesquisa por Tags: Filtragem avançada por categorias (ex: Terror Analógico, RPG, Ação 2D, Narrativo).

Perfis de Criadores: Páginas dedicadas que funcionam como currículos/portefólios para os estúdios ou programadores a solo.

Stack Tecnológica

O IndieHub foi arquitetado para ser rápido, escalável e seguro.

Protótipo Atual (Front-end)

A versão atual da interface de utilizador foi construída do zero utilizando renderização direta via código, sem elementos DOM tradicionais:

HTML5 <canvas>

Vanilla JavaScript (Renderização, sistema de hitboxes, scroll matemático e eventos de colisão de rato).

Arquitetura Planeada (Back-end)

Para gerir a lógica de negócio, autenticação e armazenamento de jogos:

Ambiente: Node.js

Framework Web: Express.js (ou NestJS para maior escalabilidade).

Gestão de Uploads: Multer (para intercetar e processar ficheiros pesados de jogos).

Base de Dados: MySQL (Relacional).

ORM: Prisma (para gestão e tipagem segura da base de dados).

Autenticação: JSON Web Tokens (JWT).

Estrutura da Base de Dados (MySQL)

O esquema relacional planeado para sustentar a plataforma inclui as seguintes tabelas principais:

users: Gestão de contas (jogadores e criadores), senhas em hash e biografias.

games: Tabela central contendo título, descrição, preço, e o caminho (URL) para o ficheiro do jogo alojado no servidor ou na cloud (ex: AWS S3).

tags & game_tags: Estrutura N:N (Muitos para Muitos) para categorizar os jogos.

reviews: Armazena as notas (1-5 estrelas) e os comentários deixados pelos utilizadores.

Como Executar o Protótipo Front-end

Atualmente, o projeto possui uma prova de conceito interativa construída num único ficheiro de Canvas. Para testar:

Clone ou descarregue este repositório.

Navegue até à pasta onde o ficheiro se encontra.

Clique duas vezes no ficheiro indiehub_canvas.html para abri-lo em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

Utilize a roda do rato (scroll) para navegar e clique nos cartões ou no botão "Subir Jogo" para ver o sistema de janelas modais customizadas em ação.

(Nenhuma instalação do Node.js é necessária nesta fase puramente visual).

Como Contribuir

O IndieHub é um projeto feito pela comunidade, para a comunidade. Se quiser contribuir com a implementação do back-end em Node.js ou aprimorar o front-end:

Faça um Fork do projeto.

Crie a sua Feature Branch (git checkout -b feature/NovaFuncionalidade).

Faça Commit das suas alterações (git commit -m 'Adiciona uma nova funcionalidade').

Faça o Push para a Branch (git push origin feature/NovaFuncionalidade).

Abra um Pull Request.

Desenvolvido para a comunidade Indie.
