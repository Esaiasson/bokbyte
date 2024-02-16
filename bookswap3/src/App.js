import logo from './logo.svg';
import './App.css';
import ApiFetch from './ApiFetch'
import InformationModal from './InformationModal';

function App() {

  return (
    <div className="App">
      <h2>Bokbyte</h2>
      <InformationModal></InformationModal>
      <ApiFetch></ApiFetch>
    </div>
  );
}

export default App;
