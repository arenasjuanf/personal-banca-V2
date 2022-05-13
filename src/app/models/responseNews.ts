/* eslint-disable @typescript-eslint/naming-convention */
export interface Article {
    source: Source;
    Author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content?: string;
}

export interface RespuestaTopHeadlines{
    stattus: string;
    totalResults: number;
    articles: Article[];
}

export interface Source{
    id?: string;
    name: string;
}


