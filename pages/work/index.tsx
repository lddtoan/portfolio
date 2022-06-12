import { memo, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { PageProps } from "../../shared/const";
import { getContent } from "../../shared/helper";

export const getStaticProps = async () => {
  return await getContent("work");
};

const Work = ({ display, content }: PageProps) => {
  const [tab, setTab] = useState(0);

  const tabs = content?.flatMap(({ content }, index) =>
    index % 3 === 0 && content[0].value !== "" ? [content[0].value] : []
  );

  return (
    <div
      className={classNames(
        styles["container"],
        !display && styles["container--hidden"]
      )}
    >
      <div className={styles["header"]}>Where I&apos;ve Worked</div>
      <button
        className={styles["cv-button"]}
        onClick={() =>
          window.open(`${window.location.origin}/assets/resume.pdf`)
        }
      >
        <i
          className={classNames("lni lni-download", styles["cv-button__icon"])}
        />
        CV
      </button>
      <div className={styles["content-container"]}>
        <div className={styles["content"]}>
          {content?.map(({ content }, contentIndex) => (
            <div
              key={contentIndex}
              className={classNames(
                contentIndex % 3 === 0 && styles["content__header"],
                contentIndex % 3 === 1 && styles["content__sub-header"],
                tab !== Math.floor(contentIndex / 3) &&
                  styles["content--hidden"]
              )}
            >
              {content.map(({ content, value, nodeType }, itemIndex) => {
                switch (nodeType) {
                  case "list-item":
                    return (
                      <div
                        key={itemIndex}
                        className={classNames(styles["content__item"])}
                      >
                        {content?.at(0).content[0].value}
                      </div>
                    );
                  default:
                    return <div key={itemIndex}>{value}</div>;
                }
              })}
            </div>
          ))}
        </div>
        <div className={styles["tabs"]}>
          {tabs?.map((element, index) => (
            <button
              key={index}
              className={classNames(
                styles["tab-button"],
                tab === index && styles["tab-button--active"]
              )}
              onClick={() => setTab(index)}
            >
              {element}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Work);
