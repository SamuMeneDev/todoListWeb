import {
  AppBar,
  Button,
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
import {
  useListarTarefas,
  useMutateBaixar,
  useToggleTarefa,
} from "../services/TarefaService";
import { MdDelete } from "react-icons/md";
import { LuCheck, LuCheckCheck } from "react-icons/lu";
import { TarefasPendentes } from "../components/TarefasPendentes";

export default function App() {
  const { data, isLoading, error } = useListarTarefas();

  const { mutate: toggleTarefa, isPending: mudandoStatusTarefa } =
    useToggleTarefa();

  const { mutate: baixar } = useMutateBaixar();

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
          <Button onClick={() => baixar()}>Baixar relatorio das tarefas</Button>
          <Typography className="p-5" variant="h6">
            Tarefas
          </Typography>
          <List>
            {data?.data && data.data.length > 0 ? (
              data?.data.map((tarefa) => (
                <ListItem key={tarefa.id_tarefa}>
                  {tarefa.id_status_tarefa != 1 ? (
                    <LuCheck />
                  ) : (
                    <LuCheckCheck />
                  )}
                  <ListItemButton
                    disabled={mudandoStatusTarefa}
                    onClick={() => toggleTarefa(tarefa.id_tarefa)}
                  >
                    <ListItemText
                      sx={{
                        textDecorationLine:
                          tarefa.id_status_tarefa == 1
                            ? "line-through"
                            : "none",
                      }}
                    >
                      {tarefa.titulo_tarefa}
                    </ListItemText>
                  </ListItemButton>
                  <IconButton>
                    <MdDelete />
                  </IconButton>
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
