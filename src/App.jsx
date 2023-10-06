import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./components/NavBar";
import MyRouter from "./components/Router";

const Main = () => {

  return (
    <MyRouter>
      <NavBar>
      </NavBar>
    </MyRouter>

  );
};

const App = () => {
  return <Main></Main>;
};

export default App;
