import classes from './UserSection.module.css';

export default function UserSection() {
  return (
    <>
      <h1>A lifetime of discounts? It&apos;s Genius.</h1>
      <p className={classes.desc}>
        Get rewarded for your travels – unlock instant savings of 10% or more
        with a free account
      </p>
      <button className={classes.btn}>Sign in / Register</button>
    </>
  );
}
