import axios from "axios";
import { CONFIG } from "./config";
import { useQuery } from "@tanstack/react-query";
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
}
