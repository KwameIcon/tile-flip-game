import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Game from './components/game';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/flip-game',
    element: <Game/>
  }
])

function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center;">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
