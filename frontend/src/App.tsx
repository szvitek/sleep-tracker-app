import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="h-[100vh]">
      <header className="h-[64px] p-4">
        <NavBar />
      </header>
      <main className="h-[calc(100vh-64px)] text-center p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
