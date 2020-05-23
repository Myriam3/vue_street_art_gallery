export const namespaced = true;

export const state = {
    toggled: false,
    info: false,
    image: {
        "path": "images_temp_3/japan/kyoto",
        "fileName": "kyoto_station.jpg",
        "title": "",
        "year": "2013",
        "country": "Japan",
        "city": "Kyoto",
        "location": "Kawaramachi Station",
        "classes": ["portrait"],
        "ratio": "z"
    }
};

export const mutations = {
    TOGGLE_LIGHTBOX(state) {
        state.toggled = !state.toggled;
    },
    SET_LIGHTBOX_IMAGE(state, image) {
        state.image = image
    },
    TOGGLE_INFO(state) {
        state.info = !state.info;
    }
};

export const actions = {
    toogleLightbox({
        commit
    }) {
        commit('TOGGLE_LIGHTBOX');
    },
    displayImage({
        commit
    }, image) {
        commit('SET_LIGHTBOX_IMAGE', image);
    },
    toggleInfo({
        commit
    }) {
        commit('TOGGLE_INFO');
    }
};