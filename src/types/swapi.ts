export type Filme = {
  title: string;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
};

export type Personagem = {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
};

export type Planeta = {
  name: string;
  climate: string;
  terrain: string;
  population: string;
};

export type SwapiResultado = Filme | Personagem | Planeta;
