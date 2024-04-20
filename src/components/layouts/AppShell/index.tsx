import { useRouter } from "next/router";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";

// melakukan dynamic import
const Navbar = dynamic(() => import("../Navbar"));

type AppShellProps = {
  children: React.ReactNode;
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// this for disable navbar when auth login or register
const disableNavbar = ["/auth/login", "/auth/register", "/404"];

function AppShell(props: AppShellProps) {
  const { children } = props;
  const router = useRouter();
  return (
    <main className={roboto.className}>
      {/* while on auth page, disable navbar */}
      {!disableNavbar.includes(router.pathname) && <Navbar />}
      {children}
    </main>
  );
}

export default AppShell;
