import logo from './logo.svg';
import './App.css';
import ApiFetch from './ApiFetch'
import InformationModal from './InformationModal';

function App() {

  return (
    <div className="App">
      <h2>Bokbyte</h2>
      <h4>Såhär funkar det:</h4>
      <p>
        1. Klicka "Vill ha boken" på alla böcker du vill ha 
      </p>
      <p>
        2. Klicka "Äger boken" på alla böcker du redan har 
      </p>
      <p>
        3. Klicka sedan på "Skicka svar" nere i högra hörnet
      </p>
      <InformationModal></InformationModal>
      <ApiFetch></ApiFetch>
    </div>
  );
}

export default App;
