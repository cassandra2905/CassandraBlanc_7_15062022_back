// Permet de typer ce que va recevoir la méthode create dans le service
export class CreateArticleDto {
    readonly title: string;
    readonly image: string;
    readonly content: string;
    readonly author: string;
    readonly creationDate: string;
}