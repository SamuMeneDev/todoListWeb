import {
  AppBar,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useListarTarefas } from "../services/TarefaService";
import { MdDelete } from "react-icons/md";
import { TarefasPendentes } from "../components/TarefasPendentes";

export default function App() {
  const { data, isLoading, error } = useListarTarefas();

  if (isLoading) return <CircularProgress />;

  console.log(error);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography>TODO List</Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Paper elevation={2}>
          <TarefasPendentes />
          <Typography className="p-5" variant="h6">
            Tarefas
          </Typography>
          <List>
            {data?.data && data.data.length > 0 ? (
              data?.data.map((tarefa) => (
                <ListItem key={tarefa.id_tarefa}>
                  <ListItemText>{tarefa.titulo_tarefa}</ListItemText>
                  <ListItemButton>
                    <IconButton>
                      <MdDelete />
                    </IconButton>
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography align="center">Nenhuma tarefa adicionada</Typography>
            )}
          </List>
        </Paper>
      </div>
    </>
  );
}
