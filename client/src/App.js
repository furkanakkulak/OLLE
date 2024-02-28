import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { SystemInfoProvider } from './context/SystemInfoContext';

function App() {
  return (
    <SystemInfoProvider>
      <div className="App px-2 md:px-10 py-1.5 ">
        <Navbar />
        <Dashboard />
      </div>
    </SystemInfoProvider>
  );
}

export default App;
