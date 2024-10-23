import BaseEntity from "./BaseEntity";

export class Account extends BaseEntity {
  public idConta?: number;
  public idUsuario?: number;
  public numConta?: string;
  public idAccountFlag?: number;
  public nmAgencia?: string;
  public saldo?: number;
}
