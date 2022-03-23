import Indexrouter from "./router/indexRouter";
import {Provider} from 'react-redux'
import './App.css'
import {store,persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Indexrouter></Indexrouter>
      </PersistGate>  
    </Provider>
  );
}

export default App;
