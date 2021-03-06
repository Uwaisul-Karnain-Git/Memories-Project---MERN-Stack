import { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';  // This allows us to 'dispatch' an action
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import memories from './images/memories.png';
import { getPosts } from './actions/posts';

function App() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxwidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        {/* <Typography> in 'Material UI' stands for any textual element like <h2>, <p>, etc. */}
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
          <img className={classes.image} src={memories} alt='memories' height='60' />        
      </AppBar>

      {/* 'Grow' provides some simple Animation */}
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify='space-between' alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;

