import { Outlet } from "react-router-dom";
import "~/styles/colors.scss";
import "~/styles/app.scss";

export default function Root() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
