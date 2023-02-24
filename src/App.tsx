import { Container } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { routes } from './routes';

export default function App() {
  return (
    <Container className="App">
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </Container>
  );
}
