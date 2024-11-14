import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game";

const router = createBrowserRouter ([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/game',
    element: <Game/>
  }
])

function App() {
  return (
    <main style={{scrollbarWidth: "none"}} className="w-screen h-screen overflow-x-hidden overflow-y-auto flex items-center justify-center border-box">
      <RouterProvider router={router}/>
    </main>
  );
}

export default App;