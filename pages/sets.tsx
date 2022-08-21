import { withAuthenticatedSession } from "auth/sessionUtils";
import LegoSetCard from "components/LegoSetCard";
import SearchForm from "components/SearchForm";
import * as lego from "integrations/lego";

export const getServerSideProps = withAuthenticatedSession(
  async ({ query }) => {
    const { search } = query;
    const { results } = await lego.getSets(String(search ?? ""));
    return { props: { sets: results } };
  }
);

export default function SetsPage({ sets }: { sets: lego.Set[] }) {
  return (
    <>
      <h2>Sets</h2>

      <SearchForm />

      <div className="flex flex-col gap-4">
        {sets.map((set, i) => (
          <LegoSetCard key={set.set_num} set={set} priority={i < 5} />
        ))}
      </div>
    </>
  );
}
