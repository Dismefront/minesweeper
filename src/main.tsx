import ReactDOM from 'react-dom/client';
import { App } from '@/app/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/providers/store';

const RootElement = document.getElementById('root');

ReactDOM.createRoot(RootElement as HTMLElement).render(
    <BrowserRouter>
        <Provider store={ store }>
            <App />
        </Provider>
    </BrowserRouter>
);
