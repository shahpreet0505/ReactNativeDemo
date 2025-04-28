import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './src/components/redux/store'
import 'react-native-reanimated';


const AppRedux = ()=>(

<Provider store={store}>
        <App />
    </Provider>
)
    


AppRegistry.registerComponent(appName, () => AppRedux);
