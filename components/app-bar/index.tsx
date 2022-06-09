import { routes } from "../../shared/const";
import styles from "./index.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const AppBar = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles["container"]}>
      {routes.map(({ name, icon, url }) => (
        <Link key={name} href={url} passHref>
          <button
            className={classNames(
              styles["route-button"],
              url === pathname && styles["route-button--active"]
            )}
            aria-label={name}
          >
            <i className={classNames(icon, styles["route-button__icon"])} />
            <span className={styles["route-button__text"]}>{name}</span>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default AppBar;
