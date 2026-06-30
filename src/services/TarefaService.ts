import axios from "axios";
import { CONFIG } from "./config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TarefaResponse } from "../app/models/response/TarefaResponse";

export function useListarTarefas() {
  const query = useQuery({
    queryKey: ["listaTarefas"],
    queryFn: TarefaService.listarTarefas,
  });
  return query;
}

export function useCountTarefas() {
  const query = useQuery({
    queryKey: ["counTarefas"],
    queryFn: TarefaService.countTarefas,
  });
  return query;
}

export function useToggleTarefa() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (idTarefa: number) => TarefaService.toggleTarefa(idTarefa),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["listaTarefas"] });
      queryClient.invalidateQueries({ queryKey: ["counTarefas"] });
    },
  });
  return mutate;
}

export function useMutateBaixar() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: TarefaService.baixar,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["listaTarefas"] });
      queryClient.invalidateQueries({ queryKey: ["counTarefas"] });
    },
  });
  return mutate;
}

class TarefaService {
  static async listarTarefas() {
    const response = await axios.get<TarefaResponse[]>(
      `${CONFIG.apiUrl}/tarefa/findAll`,
    );

    return response;
  }

  static async countTarefas() {
    const response = await axios.get(`${CONFIG.apiUrl}/tarefa/count`);

    return response;
  }

  static async toggleTarefa(idTarefa: number) {
    const response = await axios.patch(
      `${CONFIG.apiUrl}/tarefa/toggle/${idTarefa}`,
    );
    return response;
  }

  static async baixar() {
    axios
      .get(`${CONFIG.apiUrl}/download-csv`, {
        responseType: "blob", // Importante: diz ao axios para tratar como arquivo binário
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "tarefas.csv"); // Nome do arquivo
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error("Erro ao baixar o arquivo:", error);
      });
  }
}
