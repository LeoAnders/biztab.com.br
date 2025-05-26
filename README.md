<h1 align="center">
  <a href="https://www.biztab.com.br/" target="_blank" rel="noopener noreferrer">
    biztab.com.br
  </a>
</h1>

<div align="center">
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-22+-brightgreen?style=flat-square&logo=node.js" alt="Node.js" />
  </a>
  <a href="https://github.com/LeoAnders/biztab.com.br/actions/workflows/tests.yaml" target="_blank">
    <img src="https://img.shields.io/github/actions/workflow/status/LeoAnders/biztab.com.br/tests.yaml?style=flat-square&logo=github&label=Tests" alt="Test Status" />
  </a>
  <a href="https://github.com/LeoAnders/biztab.com.br/actions/workflows/linting.yaml" target="_blank">
    <img src="https://img.shields.io/github/actions/workflow/status/LeoAnders/biztab.com.br/linting.yaml?style=flat-square&logo=github&label=Lint" alt="Lint Status" />
  </a>
  <a href="https://www.biztab.com.br/" target="_blank">
    <img src="https://img.shields.io/website?down_color=red&down_message=offline&up_color=blue&up_message=online&url=https%3A%2F%2Fwww.biztab.com.br&style=flat-square" alt="Website status" /></a>
  <a href="https://github.com/LeoAnders/biztab.com.br/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/LeoAnders/biztab.com.br?style=flat-square" alt="License" />
  </a>
</div>

> **Aviso:** Este projeto está em construção e em fase inicial de desenvolvimento. Algumas funcionalidades podem estar incompletas ou sujeitas a mudanças.

O [BizTab](https://www.biztab.com.br/) é um site focado na comunidade da área de negócios, destinado a debates e troca de conhecimentos por meio de publicações e comentários criados pelos próprios usuários.

Este repositório contém todo o código-fonte da aplicação — incluindo frontend e API.

O objetivo principal do BizTab é ser um ambiente colaborativo para profissionais, empreendedores, investidores e entusiastas do mundo dos negócios, possibilitando o compartilhamento de dúvidas, novidades, estudos de caso e lições aprendidas.

## Sumário

- [Instalar e executar o projeto](#instalar-e-executar-o-projeto)  
  - [Dependências globais](#dependências-globais)
  - [Dependências locais](#dependências-locais)
  - [Executando o projeto](#executando-o-projeto)  
  - [Executando os testes](#executando-os-testes)  
- [Histórico do desenvolvimento](#histórico-de-desenvolvimento)
  - [Milestones](#milestones)

## Instalar e executar o projeto

Executar o BizTab localmente é simples e rápido.

### Dependências globais

Você precisa ter duas principais dependências instaladas:

- Node.js LTS v22 (ou qualquer versão superior)
- Docker Engine v27.4.0 com Docker Compose v2.27.0 (ou qualquer versão superior)

### Dependências locais

Após clonar o repositório e instalar as dependências globais, instale as dependências do projeto:

```bash
npm install
```

### Executando o projeto

Para iniciar o projeto localmente, execute:

```bash
npm run dev
```

Este comando iniciará automaticamente os serviços necessários, incluindo o banco de dados (com as migrations aplicadas), e disponibilizará os serviços web nos endereços:

```bash
http://localhost:3000/
http://localhost:3000/api/v1/status
```

Observações:

- Para encerrar os serviços, utilize CTRL+C no terminal.
- Você pode conferir o endereço dos outros serviços dentro do arquivo `.env` encontrado na raiz do projeto, como por exemplo o endereço e credenciais do Banco de Dados local.

### Executando os testes

Antes de realizar alterações significativas, é recomendável executar todos os testes para assegurar que o sistema está funcionando corretamente.

Para executar todos os testes e, em seguida, encerrar os serviços:

```bash
npm test
```

Para manter os testes em execução contínua, reiniciando-os automaticamente a cada alteração:

```bash
npm run test:watch
```

Caso prefira rodar o servidor e os testes em terminais separados, use:

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run test:watch
```

Caso você não queira executar (ou usar `watch`) em **todos os testes** e prefira isolar arquivos ou pastas específicas, é possível filtrar pelo caminho dos testes.

Você pode passar um ou mais filtros de caminho para o comando de teste usando o parâmetro extra após `--`.

```bash
# Rodar todos os testes de "status" e "migrations" da api "v1"
npm run test:watch -- v1/status v1/migrations
```

## Histórico de Desenvolvimento

### Milestones

O progresso do projeto está organizado em milestones, que definem etapas específicas para orientar o desenvolvimento.
- [Milestones em andamento](https://github.com/LeoAnders/biztab.com.br/milestones?state=open) 
- [Milestones encerradas](https://github.com/LeoAnders/biztab.com.br/milestones?state=closed)
