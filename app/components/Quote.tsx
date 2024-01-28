import React from "react";
import styles from "../styles/Quote.module.css";

const Quote: React.FC = () => {
  return (
    <ul className={styles.Words}>
      <li className={styles.WordsLine}>
        <p>&nbsp;</p>
        <p>Under observation</p>
      </li>
      <li className={styles.WordsLine}>
        <p>Under observation</p>
        <p>we act less free</p>
      </li>
      <li className={styles.WordsLine}>
        <p>we act less free</p>
        <p>which means</p>
      </li>
      <li className={styles.WordsLine}>
        <p>which means</p>
        <p>we effectively</p>
      </li>
      <li className={styles.WordsLine}>
        <p>we effectively</p>
        <p>are</p>
      </li>
      <li className={styles.WordsLine}>
        <p>are</p>
        <p>less free</p>
      </li>
      <li className={styles.WordsLine}>
        <p>less free</p>
        <p>&nbsp;</p>
      </li>
    </ul>
  );
};

export default Quote;
