import React from 'react';
// É essencial que vá por volta de todas as nossas Rotas
import { NavigationContainer } from '@react-navigation/native';
// Importar Navegação Stack
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes() {
    return(
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>

        </NavigationContainer>

        //screenOptions={{headerShown: false} : serve para Não Mostrar o nome do Cabeçario da Página(EX: <AppStack.Screen name="Incidents" component={Incidents} />)
    );
}