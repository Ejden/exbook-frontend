import axios, { AxiosResponse } from 'axios';

export interface ImageResponse {
    url: string;
}

export function uploadImages(image: File): Promise<AxiosResponse<ImageResponse>> {
    const formData = new FormData();
    formData.append('file', image, image.name);
    return axios.post('/api/images', formData);
}
