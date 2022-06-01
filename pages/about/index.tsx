import { memo, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { PageProps } from "../../shared/const";
import { getContent } from "../../shared/helper";
import Selfie from "../../public/images/me.svg";
import Link from "next/link";

export const getStaticProps = async () => {
  return await getContent("about");
};

const About = ({ display, content }: PageProps) => {
  const [animate, setAnimate] = useState(false);
  const selfieContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!display) {
      setAnimate(true);
    } else if (animate) {
      setTimeout(() => {
        let count = 0;
        const svg = selfieContainerRef.current?.firstChild as SVGElement;
        const interval = setInterval(() => {
          if (count < svg.childNodes.length) {
            const path = svg.childNodes[count] as SVGPathElement;
            path.classList.add(styles["black"]);
            count++;
          } else {
            clearInterval(interval);
          }
        }, 50);
        return () => clearInterval(interval);
      }, 500);
    }
  });

  return (
    <div className={styles["container"]}>
      <div
        className={classNames(
          styles["content-container"],
          !display && styles["content-container--hidden"]
        )}
      >
        <div className={styles["header"]}>About Me</div>
        {content?.map(({ content }, index) => (
          <div key={index} className={styles["content"]}>
            {content.map(({ data, content, value, nodeType }, index) => {
              switch (nodeType) {
                case "hyperlink":
                  return (
                    <Link key={index} href={data?.uri || "/"} passHref>
                      <span className={styles["content__link"]}>
                        {content?.at(0).value}
                      </span>
                    </Link>
                  );
                default:
                  return <span key={index}>{value}</span>;
              }
            })}
          </div>
        ))}
      </div>
      <div className={styles["selfie-container"]} ref={selfieContainerRef}>
        <Selfie
          className={classNames(
            styles["selfie-image"],
            display && !animate && styles["selfie-image--black"]
          )}
        />
      </div>
    </div>
  );
};

export default memo(About);
