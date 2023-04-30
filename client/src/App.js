import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Send } from "./components/Send";
import { Transactions } from "./components/Transactions";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Send />
      <Transactions />
    </div>
  );
}

export default App;
