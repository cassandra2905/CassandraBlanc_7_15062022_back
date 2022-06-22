// Permet de typer ce que va recevoir la méthode login dans le auth service
export class ReadUserDto {
    readonly email: string;
    readonly password: string;
}