import App from './App';
import { render } from 'react-dom';
import GlobalStyle from './GlobalStyle';

const AppcomEstilo = () => {
    return(
        <>
        <GlobalStyle />
        <App />
        </>
    )
}


render(<AppcomEstilo />, document.querySelector(".root"));