import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export function getPhotos(page, query) {
    return axios.get(`${BASE_URL}`, {
        params: {
            page: page,
            q: query,
            key: '41177495-f02c91062e2a129b50947a85e',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 40,
        },
    });
};

// getPhotos(1, 'cat').then(data => console.log(data))