import { signIn, useSession, signOut } from "next-auth/react";
import styles from "./Navbar.module.css";

function Navbar() {
  // catch data from user session
  const { data }: any = useSession();
  return (
    <div className={styles.navbar}>
      <div className="big">Navbar</div>
      <div className="flex gap-3">
        {data && data.user && (
          <>
            {data.user.image ? (
              <img
                className="w-8 h-8 rounded-full"
                src={data.user.image}
                alt={data.user.fullname}
              />
            ) : (
              ""
            )}
            <div className="mt-1">{data.user.fullname} </div>
          </>
        )}
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
