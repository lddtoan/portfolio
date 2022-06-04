import classNames from "classnames";
import { PageProps } from "../../shared/const";
import styles from "./index.module.scss";
import { getContent } from "../../shared/helper";
import { memo, useState } from "react";
import { useForm } from "@formspree/react";

export const getStaticProps = async () => {
  return await getContent("contact");
};

const Contact = ({ display, content }: PageProps) => {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || ""
  );

  return (
    <div
      className={classNames(
        styles["container"],
        !display && styles["container"]
      )}
    >
      <div className={styles["header"]}>Get in Touch</div>
      {content?.map(({ content }, index) => (
        <div key={index} className={styles["content"]}>
          {content.map(({ value }, index) => (
            <span key={index}>{value}</span>
          ))}
        </div>
      ))}
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <fieldset className={styles["input-container"]}>
          <legend>Name</legend>
          <input
            id="name"
            type="text"
            name="name"
            required
            className={styles["input"]}
            placeholder="Name"
          />
        </fieldset>
        <fieldset className={styles["input-container"]}>
          <legend>Email</legend>
          <input
            id="email"
            type="email"
            name="email"
            required
            className={styles["input"]}
            placeholder="Email"
          />
        </fieldset>
        <fieldset className={styles["input-container"]}>
          <legend>Message</legend>
          <textarea
            id="message"
            name="message"
            required
            className={styles["input"]}
            rows={5}
            placeholder="Type your message..."
          />
        </fieldset>
        <button
          type="submit"
          className={styles["submit-button"]}
          disabled={state.submitting}
        >
          Send
          <div
            className={classNames(
              styles["submit-button__icon"],
              !state.submitting && styles["submit-button__icon--hidden"]
            )}
          />
        </button>
      </form>
      <div
        className={classNames(
          styles["message"],
          !state.succeeded &&
            state.errors.length === 0 &&
            styles["message--hidden"]
        )}
      >
        {state.succeeded
          ? "Thank you for your words 😀"
          : state.errors.length > 0
          ? state.errors[0].message + " 😑"
          : ""}
      </div>
    </div>
  );
};

export default memo(Contact);
