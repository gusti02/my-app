import { useRouter } from "next/router";
import Navbar from "../Navbar";

type AppShellProps = {
  children: React.ReactNode;
};

// this for disable navbar when auth login or register
const disableNavbar = ["/auth/login", "/auth/register"];

function AppShell(props: AppShellProps) {
  const { children } = props;
  const router = useRouter();
  return (
    <main>
      {/* while on auth page, disable navbar */}
      {!disableNavbar.includes(router.pathname) && <Navbar />}
      {children}
    </main>
  );
}

export default AppShell;
