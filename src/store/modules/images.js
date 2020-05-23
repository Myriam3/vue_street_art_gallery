import imageAPI from "@/services/imageApi.js";

export const namespaced = true;

export const state = {
    imageList: [],
    currentBatch: 0,
    imageServer: //'http://localhost/street_art_react/'
        'https://myriambucourt.com/photos/street_art/'
};

export const getters = {
    left: state => {
        return state.imageList.length - state.currentBatch
    }
};

export const mutations = {
    SET_IMAGES(state, images) {
        state.imageList = images;
    },
    RESET_BATCH(state) {
        state.currentBatch = 0;
    },
    ADD_BATCH(state, number) {
        state.currentBatch = state.currentBatch + number
    }
};

export const actions = {
    fetchAll({
        dispatch
    }) {
        return imageAPI
            .getImages()
            .then((response) => {
                dispatch('setImages', response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    fetchByCountry({
            dispatch
        },
        country) {
        return imageAPI.getImagesByCountry(country)
            .then(response => {
                dispatch('setImages', response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    setImages({
        commit,
        dispatch
    }, images) {
        commit('RESET_BATCH');
        commit('SET_IMAGES', images);
        dispatch('displayImages');
    },
    displayImages({
        state,
        commit,
        getters
    }) {
        let batchNb = 20;

        if (!getters.left > 0) return;

        if (state.imageList.length <= batchNb) { // Only one batch
            batchNb = state.imageList.length;
        } else {
            if (getters.left < batchNb) { // Last batch
                batchNb = getters.left;
            }
        }
        commit('ADD_BATCH', batchNb);
    }
};