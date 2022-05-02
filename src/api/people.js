export async function getPeople(page){ 
    try{
        const responde = await fetch("https://swapi.dev/api/people/?page=" + page);
        if(!responde.ok){
            throw new NetworkError();
        }
        const data = await responde.json();
        return data;
    } catch(err){
        throw err;
    }
}

export async function getElement(id = 1) {
    const response = await fetch("https://swapi.dev/api/people/" + id);
    const data = await response.json();
    return data;
}

export async function searchElement(name) {
    const response = await fetch("https://swapi.dev/api/people/?search=" + name);
    const data = await response.json();
    return data;
}

class NetworkError extends Error {
    constructor() {
        super("Network error");
    }
}