import axios, { AxiosResponse } from 'axios';

export interface BookInfoSuggestion {
    title: string;
    subtitle: string;
    author: string;
}

export async function getBookInfoSuggestion(isbn: string): Promise<AxiosResponse<BookInfoSuggestion>> {
    return axios.get('/api/books?isbn=' + isbn);
}
