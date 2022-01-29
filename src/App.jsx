
import React, { useState, useRef, useEffect } from "react";
import { TextField, Container, Switch, Divider, Typography, Button, Stack, Box, Card,Slide,Dialog,DialogContent,DialogContentText,DialogActions} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from "uuid";

//My imports
import { TodoList } from './components/TodoList';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const KEY = "todoApp.todos";

export function App() {
  const [isDark, SetIsDark,] = useState(false);
  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });

  const todoTaskRef = useRef();
  const [todos, setTodos] = useState([
    { id: 1, task: "Tarea ", completed: false },
  ]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleTodoAdd = (event) => {
    const task = todoTaskRef.current.value;
    if (task === "") return;
    setOpen(true);
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, completed: false }];
    });

    todoTaskRef.current.value = null;
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Tarea agregada con éxito.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Aceptar</Button>
        </DialogActions>
      </Dialog>
        <Card variant="outlined" sx={{ p: 4, border: '4px dashed grey' }}>
          <Box
            sx={{
              margin: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography>{isDark?"MODO OSCURO":"MODO CLARO"}</Typography>
            <Switch checked={isDark} onChange={e => SetIsDark(!isDark)}></Switch>
          </Box>
          <Box
            sx={{
              margin: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" fontWeight={1000}>TAREAS</Typography>
          </Box>
          <Divider></Divider>
          <Box
            sx={{
              margin: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Stack>
              <TodoList todos={todos} toggleTodo={toggleTodo} />
            </Stack>
          </Box>
          <Divider></Divider>
          <Box
            sx={{
              margin: 4,
              flexDirection: 'Row',
              alignItems: 'center',
            }}
          >
            <TextField fullWidth variant="outlined" size="small" label=" Registre una tarea..." inputRef={todoTaskRef} type="text" />
          </Box>
          <Box
            sx={{
              margin: 4,
              flexDirection: 'Row',
              alignItems: 'center',
            }}
          >
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={3}>
              <Button variant="contained" onClick={handleTodoAdd}>
                Agregar
              </Button>
              <Button variant="contained" onClick={handleClearAll}>
                Eliminar
              </Button>
            </Stack>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
