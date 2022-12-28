import ReactDOM from 'react-dom/client';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import StateContextProvider from './context';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
	<ThirdwebProvider desiredChainId={ChainId.Goerli}>
		<BrowserRouter>
			<StateContextProvider>
				<App />
			</StateContextProvider>
		</BrowserRouter>
	</ThirdwebProvider>
);
