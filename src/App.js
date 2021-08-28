
import './App.css';
import CRUD from './Components/CRUD';

import createSVG from './assets/create.svg';
import readSVG from './assets/read.svg';
import updateSVG from './assets/update.svg';
import deleteSVG from './assets/trash.svg';

function App() {
  return (
    <div className="App">
      <div className="App__content">
        <div className="App__title">
          <h1>CRUD Stack MERN</h1>
          <div><img src={createSVG} alt="create" />
            <img src={readSVG} alt="read" />
            <img src={updateSVG} alt="update" />
            <img src={deleteSVG} alt="delete" /></div>

        </div>
        <h2>By Matías Herrera</h2>
      </div>
      <CRUD />
    </div>
  );
}

export default App;
