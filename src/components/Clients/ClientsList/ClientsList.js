import classes from './ClientsList.module.css';
import ClientsListItem from '../ClientsListItem/ClientsListItem';
import ClientListHeader from '../ClientListHeader/ClientListHeader';

const ClientsList = () => {
  return (
    <section className={classes.section}>
      <ClientListHeader/>
      <ClientsListItem/>
    </section>
  )
};

export default ClientsList;
