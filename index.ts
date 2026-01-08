import { registerRootComponent } from 'expo';

import { Home } from '@/app/Home'; 
//Ele indica o index por padrão
// Importa o componente Home do arquivo index.tsx dentro da pasta Home, esta nao default

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// Ponto de entrada do aplicativo
registerRootComponent(Home);
