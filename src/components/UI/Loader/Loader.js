import classes from './Loader.module.css';

const Loader = () => {
  return (
    <div className={classes.progress}>
      <span className={classes.progressBar}/>
    </div>
  )
};

export default Loader;
