# 🏫 DevSchool - Sistema de Gestão Escolar

Este projeto é uma solução mobile para o controle de escolas públicas e turmas, desenvolvido como parte de um desafio técnico para modernização de processos municipais. O app substitui planilhas manuais por uma interface fluida, moderna e tipada.

## 📱 Demonstração
- **Splash Screen:** Tela de abertura personalizada com a marca "Logo Dev".
- **Módulo de Escolas:** Cadastro, listagem, edição e exclusão de unidades escolares.
- **Módulo de Turmas:** Gestão de turmas vinculadas, com seleção de turno (Matutino, Vespertino, Noturno e Integral).

---

## 🛠️ Tecnologias e Versões
Para atender aos requisitos técnicos mínimos do edital:

- **Framework:** Expo SDK 54+
- **Linguagem:** TypeScript (Tipagem avançada de entidades e estados)
- **Navegação:** Expo Router (File-based routing)
- **UI Framework:** Gluestack UI
- **Gerenciamento de Estado:** Zustand (Store modular para Escolas e Turmas)
- **Back-end Mock:** MirageJS / Mock Service Worker (Simulação de endpoints `/schools` e `/classes`)
- **Estilização:** Dark Mode nativo com cores consistentes (#0a0a0a)

---

## 🏗️ Arquitetura do Projeto
O projeto utiliza uma **Organização Modular (Feature-Based Architecture)**:

- `app/`: Rotas e navegação (Escolas, Turmas e Layout)
- `src/features/`: Lógica de negócio separada por domínios (Schools e Classes)
- `src/features/schools/store/`: Estado centralizado com Zustand
- `assets/`: Recursos estáticos (Logo e Splash)

---

## ⚙️ Como Executar o Projeto

### 1. Pré-requisitos
- Node.js instalado
- Git
- Expo Go instalado no smartphone (para testes físicos)

### 2. Instalação
Clone o repositório e instale as dependências:
```bash
git clone [https://github.com/joaovictorfarias96/devSchool.git](https://github.com/joaovictorfarias96/devSchool.git)
cd devSchool
npm install

3. Executando o Mock de Back-end
O mock inicia automaticamente junto com o app. Caso queira verificar as configurações:

Os handlers estão localizados em src/api/handlers.ts.

Os endpoints simulados respondem a operações de CRUD completo.

4. Iniciando o App
Bash
npx expo start
Aponte a câmera do celular para o QR Code no terminal utilizando o app Expo Go.

📝 Decisões de Projeto
Seleção de Turno: Implementada via Select (Gluestack UI) para evitar erros de entrada de dados e garantir a padronização solicitada.

Splash Screen: Configurada com expo-splash-screen para garantir uma transição suave de 3 segundos, fixando a identidade visual do app.

Performance: Uso de Partial<School> para atualizações parciais de dados, otimizando as chamadas da Store.

Desenvolvido por João Victor Farias - 2026.