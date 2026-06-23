export interface TarefaResponse {
  id_tarefa: number;
  titulo_tarefa: string;
  descricao_tarefa: string;
  data_inicio_tarefa: string | null;
  data_termino_tarefa: string | null;
  id_usuario: number;
  id_categoria: number;
  id_status_tarefa: number;
  created_at: string;
  updated_at: string;
}
