export interface Collection<T> {
  results: T[];
}

export interface Planet {
  name: string;
  climate: string;
  terrain: string;
}

const fetchApi = async <T>(resource: string): Promise<T> => {
  const res = await fetch(`https://swapi.dev/api/${resource}`);
  if (!res.ok) throw new Error("Couldn't fetch swapi data.");
  return res.json();
};

export const getPlanets = async (): Promise<Collection<Planet>> =>
  fetchApi("planets");
