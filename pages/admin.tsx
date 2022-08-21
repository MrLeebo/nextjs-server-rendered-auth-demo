import { withAdminSession } from "auth/sessionUtils";
import { useAdminUser } from "hooks/auth";
import * as swapi from "integrations/swapi";

export const getServerSideProps = withAdminSession(async () => {
  const { results } = await swapi.getPlanets();
  return { props: { planets: results } };
});

export default function AdminPage({ planets }: { planets: swapi.Planet[] }) {
  const admin = useAdminUser();

  return (
    <>
      <p>Welcome to the admin dashboard, {admin.username}.</p>
      <p>
        This page is only accessible by admins. Non-admins who try to come here
        will be blocked.
      </p>

      <h3 className="text-bold text-lg my-4">Planets</h3>
      <table>
        <thead>
          <tr>
            <th>Planet</th>
            <th>Terrain</th>
            <th>Climate</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={planet.name} className="odd:bg-gray-200">
              <th>{planet.name}</th>
              <td>{planet.terrain}</td>
              <td>{planet.climate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
