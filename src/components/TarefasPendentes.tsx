import { Card, CardContent, Typography } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";
import { useCountTarefas } from "../services/TarefaService";

export function TarefasPendentes() {
  const { data } = useCountTarefas();
  return (
    <Card variant="outlined" elevation={1}>
      <CardContent>
        <Typography>Tarefas Pendentes</Typography>
        <Gauge
          width={100}
          height={100}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
          valueMax={data?.data[1]}
          value={data?.data[0] - data?.data[1]}
        />
      </CardContent>
    </Card>
  );
}
