import Navbar from "../Navbar";

type AppShellProps = {
  children: React.ReactNode;
};

function AppShell(props: AppShellProps) {
  const { children } = props;
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}

export default AppShell;
