// Permet de typer ce que va recevoir la méthode create (créer un utilisateur) dans le service
export class CreateUserDto {
    readonly email: string;
    readonly password: string;
}