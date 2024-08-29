import InfoBoard from '../components/InfoBoard';
import Transaction from './Transaction';

export default function Dashboard() {
  return (
    <div>
      <InfoBoard />
      <Transaction home="home" />
    </div>
  );
}
