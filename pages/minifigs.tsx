import { withAuthenticatedSession } from "auth/sessionUtils";
import SearchForm from "components/SearchForm";
import LegoSetCard from "components/LegoSetCard";
import * as lego from "integrations/lego";

export const getServerSideProps = withAuthenticatedSession(
  async ({ query }) => {
    const { search } = query;
    const { results } = await lego.getMinifigs(String(search ?? ""));
    return { props: { minifigs: results } };
  }
);

export default function MinifigsPage({ minifigs }: { minifigs: lego.Set[] }) {
  return (
    <>
      <h2>Minifigs</h2>

      <SearchForm />

      <div className="flex flex-col gap-4">
        {minifigs.map((minifig, i) => (
          <LegoSetCard key={minifig.set_num} set={minifig} priority={i < 5} />
        ))}
      </div>
    </>
  );
}
