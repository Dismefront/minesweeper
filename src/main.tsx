import ReactDOM from 'react-dom/client';
import { App } from '@/app/App';
import { BrowserRouter } from 'react-router-dom';

const RootElement = document.getElementById('root');

ReactDOM.createRoot(RootElement as HTMLElement).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
