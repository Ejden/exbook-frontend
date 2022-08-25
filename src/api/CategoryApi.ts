import axios from 'axios';

export interface Categories {
    categories: Category[]
}

export interface Category {
    id: string;
    name: string;
    icon: Image;
    parentId?: string;
}

export interface Image {
    url: string;
}

export function getCategories(): Promise<Categories> {
    return axios.get('/api/categories', { headers: { 'Accept': 'application/vnd.exbook.v1+json'} })
        .then(r => r.data as Categories)
}
