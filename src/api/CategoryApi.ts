import axios from 'axios';

export interface CategoryApi {
    getCategories(): Promise<Category>;
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

export class CategoryClient implements CategoryApi {
    async getCategories(): Promise<Category> {
        return axios.get('api/categories');
    }
}

export function getCategories(): Promise<Category[]> {
    return axios.get('api/categories', { headers: { 'Accept': 'application/vnd.exbook.v1+json'} })
        .then(r => r.data as Category[])
}
