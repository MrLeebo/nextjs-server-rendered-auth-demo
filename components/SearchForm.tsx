import { memo } from "react";
import { useRouter } from "next/router";
import Button from "./Button";

function SearchForm() {
  const { query } = useRouter();

  return (
    <form className="flex gap-2 mb-10">
      <input
        type="search"
        name="search"
        className="rounded"
        defaultValue={query.search}
      />
      <Button>Search</Button>
    </form>
  );
}

export default memo(SearchForm);
