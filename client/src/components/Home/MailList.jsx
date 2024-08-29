import classes from './MailList.module.css';

export default function MailList() {
  return (
    <div className={classes.mail}>
      <h1>Save time, save money!</h1>
      <span>Sign up and we&apos;ll send the best deals to you</span>
      <div className={classes.actions}>
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}
