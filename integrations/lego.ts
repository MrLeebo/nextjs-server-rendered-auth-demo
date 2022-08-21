export interface Collection<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface Set {
  set_num: string;
  name: string;
  num_parts: number;
  set_img_url: string;
  set_url: string;
  last_modified_dt: string;
}

const fetchApi = async <T>(resource): Promise<T> => {
  const res = await fetch(`https://rebrickable.com/api/v3/lego/${resource}`, {
    headers: { authorization: `key ${process.env.REBRICKABLE_API_KEY}` }
  });

  if (!res.ok) throw new Error("Couldn't fetch lego data.");

  return res.json();
};

export const getMinifigs = (search: string = "") =>
  fetchApi<Collection<Set>>(
    `minifigs?${new URLSearchParams({ search, page_size: "20" })}`
  );

export const getSets = (search: string = "") =>
  fetchApi<Collection<Set>>(
    `sets?${new URLSearchParams({ search, page_size: "20" })}`
  );
