# App de Notas - CP05 Mobile

Este projeto é uma evolução de uma aplicação de notas desenvolvida em React Native com Expo, focada na implementação de recursos nativos, internacionalização e persistência de dados em nuvem.

## Integrantes do Grupo
* João Victor Alves da Silva - RM: 559726
* Vinicius Kenzo Tocuyosi - RM: 559982
* Juan Pablo Rebelo - RM: 560445

## Funcionalidades Implementadas

### 1. Internacionalização (i18n)
O aplicativo possui suporte completo para os idiomas Português (Brasil) e Inglês (EUA). A tradução abrange toda a interface, incluindo mensagens de erro, labels e notificações. A troca de idioma pode ser feita manualmente dentro do aplicativo ou segue o padrão do sistema operacional.

### 2. Mapas e Geolocalização
Ao salvar ou editar uma nota, o aplicativo captura automaticamente a latitude e longitude do usuário utilizando o `expo-location`. As notas salvas exibem um mapa interativo (utilizando Leaflet via WebView) com um marcador (Pin) indicando o local exato da criação.

### 3. Sistema de Notificações Locais
Utiliza a biblioteca `expo-notifications` para disparar alertas ao usuário:
* Notificação de boas-vindas logo após o login.
* Confirmação visual quando uma nota é criada com sucesso.
* Alerta de atualização quando uma nota existente é modificada.

### 4. Persistência com Firebase
* Autenticação: Gerenciamento de usuários via Firebase Auth com persistência local de sessão.
* Banco de Dados: Armazenamento em tempo real das notas no Firestore, organizado por ID de usuário para garantir a privacidade dos dados.

## Tecnologias Utilizadas
* React Native / Expo
* Firebase (Auth e Firestore)
* i18next (Internacionalização)
* Expo Location (GPS)
* Expo Notifications (Notificações locais)
* React Native WebView (Renderização de mapas)

## Como Executar o Projeto

1. Certifique-se de ter o Node.js e o Expo CLI instalados.
2. Clone o repositório.
3. Execute `npm install` para instalar as dependências.
4. Configure suas credenciais do Firebase no arquivo `src/services/firebaseConfig.js`.
5. Execute `npx expo start` para iniciar o projeto.

## Link para o Vídeo de Demonstração
[Link do Vídeo de demonstração](https://www.youtube.com/shorts/8TU_RzZDWD4)