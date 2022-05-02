import {useState, useEffect, useRef} from "react";
import { getElement, getPeople, searchElement } from "./api/people";
import './App.css';
//import data from "./data.json"

function App() {

  const inputSearch = useRef(null);
  const [textSearch, setTextSearch] = useState("");
  const [people, setPeople] = useState([]);
  const [errorState, setErrorState] = useState({ hasError: false});
  const [currentElement, setCurrentElement] = useState(1);
  const [details, setDetails] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPeople(page).then(setPeople).catch(handleError);
  },[page]);
    //si pongo un array vacio lo que va a hacer es ejecutarlo una sola vez al principio en la carga de la aplicacion.

  useEffect(() => {
    getElement(currentElement).then(setDetails).catch(handleError)
  },[currentElement]);

  const handleError = (err) => {
    setErrorState({ hasError: true, message: err.message});
  }

  const showDetails = (element) => {
    const id = Number(element.url.split("/").slice(-2)[0]);
    setCurrentElement(id)
  }

  const onChangeTextSearch = (event) => {
    event.preventDefault();
    const text = inputSearch.current.value;
    setTextSearch(text);
  }

  const onSearchSubmit = (event) => {
    if(event.key !== "Enter") return;
    inputSearch.current.value = "";
    setDetails({})
    searchElement(textSearch).then(setPeople).catch(handleError);
  }

  const onChangePage = (next) => {
    if(!people.previous && page + next <= 0) return;
    if(!people.next && page + next >= 9) return;

    setPage(page + next);
  }


  return (
    <div>
      <h2>Lista de Caracteres</h2>
      <input ref={inputSearch} onChange={onChangeTextSearch} onKeyDown={onSearchSubmit} type="text" placeholder="Buscar un personaje"/>
      {errorState.hasError && 
        <div>
          {errorState.message}
        </div>
      }
      {people?.results?.map((element) => (
        <div key={element.name} onClick={() => showDetails(element)}>
          {element.name}
        </div>
      ))}
      {details && (
        <aside>
          <h3>
            {details.name}
          </h3>
          <p>
            Peso: {details.mass}
          </p>
          <p>
            Año de Nacimiento: {details.birth_year}
          </p>
        </aside>
      )}
      <div>
        <button onClick={()=> onChangePage(-1)}>Prev</button>
         - {page} - 
        <button onClick={()=> onChangePage(1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
