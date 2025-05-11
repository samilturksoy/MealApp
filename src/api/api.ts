import axios from 'axios';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/';

export const fetchCategories = async ()=>{
    try {
        const response = await axios.get(`${API_URL}categories.php`);
        return response.data.categories;

    } catch (error) {
        console.error('Kategoriler çekilemedi',error);
        return [];
    }
};

export const fetchMealsByCategories = async (category:string)=>{
    try {
        const response = await axios.get(`${API_URL}filter.php?c=${category}`);
        return response.data.meals;
    } catch (error) {
        console.error(`${category} kategorisi için yemekler alınamadı`,error);
        return [];
    }
};

export const fetchMealDetail = async (id:string)=>{
    try {
        const response = await axios.get(`${API_URL}lookup.php?i=${id}`);
        return response.data.meals?.[0];
    } catch (error) {
        console.error('Yemek detayı alınamadı',error);
        return null;
    }
};
export const fetchMealBySearch = async (query:string)=>{
    try {
        const response = await axios.get(`${API_URL}search.php?s=${query}`);
        return response.data.meals || [];
    } catch (error) {
        console.error('Yemek arama hatası',error);
        return [];
    }
};
export const fetchAllMealsByLetter = async (letter:string)=>{
    try {
        const response = await axios.get(`${API_URL}search.php?f=${letter}`);
        return response.data.meals || [];
    } catch (error) {
        console.error('letter arama hatası',error);
        return [];
    }
};
export const fetchAreas = async ()=>{
    try {
        const response = await axios.get(`${API_URL}list.php?a=list`);
        return response.data.meals || [];
    } catch (error) {
        console.error('area arama hatası',error);
        return [];
    }
};
export const fetchMealsByArea = async (area:string)=>{
    try {
        const response = await axios.get(`${API_URL}filter.php?a=${area}`);
        return response.data.meals || [];
    } catch (error) {
        console.error('areaya ait yemekler getirilemedi',error);
        return [];
    }
};
export default API_URL;
