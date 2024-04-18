import { signIn, useSession, signOut } from "next-auth/react";
import styles from "./Navbar.module.css";

function Navbar() {
  // catch data from user session
  const { data }: any = useSession();
  return (
    <div className={styles.navbar}>
      <div className="big">Navbar</div>
      <div>
        {data && data.user.fullname}{" "}
        {/* conditional rendering if data is not null,
         */}
        {data ? (
          <button className={styles.button} onClick={() => signOut()}>
            Sign Out
          </button>
        ) : (
          <button className={styles.button} onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
