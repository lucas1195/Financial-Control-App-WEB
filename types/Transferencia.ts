import BaseEntity from "./BaseEntity";

export class Transferencia extends BaseEntity {
  public idTransferencia?: number;
  public idUsuario?: number;
  public vlTransferencia?: number;
  public dsTransferencia?: string;
  public dtTransferencia?: Date;
  public idCategoria?: number;
  public idConta?: number;
}
