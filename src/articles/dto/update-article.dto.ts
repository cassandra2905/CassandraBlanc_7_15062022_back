// Permet de typer ce que va recevoir la méthode update dans le service

export class updateArticleDto {
    readonly title: string;
    readonly image: string;
    readonly content: string;
    readonly author: string;
    readonly creationDate: string;
}