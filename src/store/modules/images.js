import imageAPI from "@/services/imageApi.js";

export const namespaced = true;

export const state = {
    imageList: []
};

export const mutations = {
    SET_IMAGES(state, images) {
        state.imageList = images;
    },
};

export const actions = {
    fetchAll({
        commit
    }) {
        return imageAPI
            .getImages()
            .then((response) => {
                commit('SET_IMAGES', response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    fetchByCountry({
        commit
    }, country) {
        return imageAPI.getImagesByCountry(country)
            .then(response => {
                commit('SET_IMAGES', response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
};