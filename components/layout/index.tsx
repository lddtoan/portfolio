import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { routes } from "../../shared/const";
import AppBar from "../app-bar";
import styles from "./index.module.scss";
import classNames from "classnames";

export interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();
  const [splash, setSplash] = useState(true);
  const [count, setCount] = useState(0);
  const [visit, setVisit] = useState<string[]>([]);

  useEffect(() => {
    if (count < 12 || splash) {
      const timeout = setTimeout(() => setCount(count + 1), 200);
      return () => clearTimeout(timeout);
    } else if (!visit.includes(pathname)) {
      setVisit([...visit, pathname]);
    }
  });

  return (
    <>
      <Head>
        <title>{routes.find(({ url }) => url === pathname)?.title}</title>
        <meta
          name="description"
          content="My personal portfolio. It is inspired by Grand Theft Auto game series."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        className={classNames(
          styles["splash-container"],
          count >= 12 && !splash && styles["splash-container--hidden"]
        )}
      >
        {[2, 4, 6, 8, 10].map((element) => (
          <div
            key={element}
            className={classNames(
              styles["star-icon"],
              count >= element && count % 2 == 0 && styles["star-icon--white"],
              count > element && count % 2 == 1 && styles["star-icon--gray"],
              count >= 12 && !splash && styles["star-icon--hidden"]
            )}
          >
            <i className="lni lni-star-filled" />
          </div>
        ))}
      </div>
      <Image
        src="/images/parking-lot.webp"
        alt="Parking Lot"
        layout="fill"
        objectFit="cover"
        priority
        onLoadingComplete={() => {
          setSplash(false);
        }}
      />
      <AppBar />
      <div className={styles["container"]}>
        {Children.map(children, (element) =>
          cloneElement(element as ReactElement, {
            display: visit.includes(pathname),
          })
        )}
      </div>
    </>
  );
};

export default Layout;
