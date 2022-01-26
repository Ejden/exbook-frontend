import axios from "axios";

interface CategoryApi {
    getCategories(): Promise<Category>;
}

interface Category {
    id: string;
    name: string;
    icon: Image;
    parentId?: string;
}

interface Image {
    url: string;
}

class CategoryClient implements CategoryApi {
    private serviceUrl = "http://localhost:8082";

    async getCategories(): Promise<Category> {
        return axios.get('api/categories');
    }
}

export { CategoryApi, CategoryClient, Category };
