import { render, screen } from '@testing-library/react';
import App from './App';
import data from "./data.json"

//Haciendo en el directorio de nuestra app, un npm t se ejecutan los test. Esto lo hago en un CMD.
describe("Star Wars APP", () => {
  beforeAll(()=> jest.spyOn(window, "fetch"))
  //con esto le digo que "espie" 

  // it("Esto deberia mostrar el texto lista de caracteres", () => {
  //   render(<App/>)
  //   expect(screen.getByText("Lista de Caracteres")).toBeInTheDocument();
  // })

  // it("Esto debe mostrarme los caracteres importados del json", () => {
  //   render(<App/>)
  //   for(let element of data.results){
  //     expect(screen.getByText(element.name)).toBeInTheDocument();
  //   }
  // })

  it("Esto debe mostrarme los caracteres importados desde la API", async () => {
    // .mockResolvedValueOnce testea el try
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data
    })
    render(<App/>)
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenCalledWith("https://swapi.dev/api/people/?page=1")

    for(let element of data.results){
      expect(await screen.findByText(element.name)).toBeInTheDocument();
    }
  })

  it("Esto deberia mostrar cuando ocurra un error de red", async () => {
    window.fetch.mockRejectedValueOnce(new Error("Network error"));
    //mockRejectedValueOnce testea el catch
    render(<App/>);

    expect(await screen.findByText("Network error")).toBeInTheDocument();
  })

})
