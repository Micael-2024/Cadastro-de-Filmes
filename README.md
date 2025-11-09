# 🎬 Cadastro de Filmes (Full-Stack)

Este é um projeto full-stack de CRUD (Create, Read, Update, Delete) para gerenciar um catálogo de filmes, desenvolvido para fins acadêmicos.

A aplicação permite cadastrar, listar, alterar e deletar filmes, incluindo a funcionalidade de upload de pôsteres e gerenciamento de múltiplos atores por filme (relação Muitos-para-Muitos).

![ pré-visualização do projeto](httpsAn-image-of-the-movie-listing-application)

*(**Nota:** Substitua o `[Image of... ]` acima pela URL da sua própria captura de tela. [Veja como fazer upload de imagens no GitHub](https://docs.github.com/pt/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)).*

---

## ✨ Funcionalidades Principais

* **CRUD completo** de Filmes.
* **Upload de Pôsteres:** Envio de imagens (`multipart/form-data`) para cada filme.
* **Relação M-N:** Um filme pode ter vários atores, e um ator pode estar em vários filmes.
* **Interface Moderna:** Construído com React e [Material-UI (MUI)](https://mui.com/).
* **Tabela Avançada:** O [MUI DataGrid](https://mui.com/x/react-data-grid/) é usado para listagem, incluindo paginação e ordenação.

---

## 🛠️ Tecnologias Utilizadas

#### 🎨 Front-end

* **[React](https://reactjs.org/)** (com [Vite](https://vitejs.dev/))
* **[React Router](https://reactrouter.com/)** (para navegação)
* **[Material-UI (MUI)](https://mui.com/)** (para a interface e componentes)
* **[Axios](https://axios-http.com/)** (para chamadas à API)
* **[React Hook Form](https://react-hook-form.com/)** (para gerenciamento de formulários)

#### ⚙️ Back-end

* **[Node.js](https://nodejs.org/)**
* **[Express](https://expressjs.com/)** (para a API REST)
* **[Sequelize](https://sequelize.org/)** (ORM para o banco de dados)
* **[SQLite](https://www.sqlite.org/index.html)** (Banco de dados em arquivo)
* **[Multer](https://github.com/expressjs/multer)** (para upload de arquivos)
* **[CORS](https://expressjs.com/en/resources/middleware/cors.html)** (para permitir a comunicação entre front e back)

---

## 📋 Pré-requisitos

Para rodar este projeto, você precisará ter as seguintes ferramentas instaladas na sua máquina:

* **[Node.js](https://nodejs.org/en/)** (v22.x ou superior)
* **[npm](https://www.npmjs.com/)** (normalmente instalado junto com o Node.js)
* **[Git](https://git-scm.com/)** (para clonar o repositório)

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação localmente. O projeto exige que **dois terminais** estejam rodando simultaneamente: um para o Back-end e um para o Front-end.

### 1. Clonar o Repositório

Primeiro, clone este repositório para sua máquina local:

```bash
git clone [https://URL-DO-SEU-REPOSITORIO.git](https://URL-DO-SEU-REPOSITORIO.git)
cd nome-da-pasta-do-projeto
--------------------------------------------------------------------------------------
2. Configurar e Rodar o Back-end (API)
Abra seu primeiro terminal e siga os passos:

# 1. Navegue até a pasta do back-end
cd backend-filmes

# 2. Instale todas as dependências (MUITO IMPORTANTE)
npm install

# 3. Inicie o servidor
node src/app.js
-------------------------------------------------------------------------------------
3. Configurar e Rodar o Front-end (React)
Abra um segundo terminal (novo) e siga os passos:

# 1. Navegue até a pasta do front-end (a partir da raiz do projeto)
cd frontend-filmes

# 2. Instale todas as dependências (MUITO IMPORTANTE)
npm install

# 3. Inicie o servidor de desenvolvimento do Vite
npm run dev
-------------------------------------------------------------------------------------
✅ O terminal deve exibir um link local.

Acesse a URL (normalmente http://localhost:5173/) no seu navegador para ver a aplicação!

⚠️ Solução de Problemas (Windows PowerShell)
Se você estiver usando o PowerShell no Windows, talvez encontre um erro de segurança que impede a execução de scripts (npm, npx, node, etc.).

Erro: a execução de scripts foi desabilitada neste sistema.

Solução: Execute o seguinte comando no seu PowerShell antes de rodar os comandos npm ou node. Isso dará permissão apenas para a sessão atual do seu terminal.

Powershell = Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
