import './App.css'
import TodoList from './TodoList';
import Grid from '@mui/material/Grid'

function App() {
  return (
    <div className="App">
      <Grid className='container' container columns={8} justifyContent='center'>
        <Grid item xs={6} md={4} lg={3} >
          <TodoList />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
