import axios from 'axios';

//HOMEPAGE APIS
export const getHomeData = () => {
    return axios.get("https://swapi.co/api/films/1/");
};

export const getAboutData = () => {
    return axios.get("https://swapi.co/api/people/1/");
};

export const getBlogListData = () => {
    return axios.get("https://swapi.co/api/films/1/");
};
