export const namespaced = true;

export const state = {
    toggled: false,
    info: true,
    currentIndex: 0
};

export const mutations = {
    TOGGLE_LIGHTBOX(state) {
        state.toggled = !state.toggled;
    },
    SET_IMAGE(state, index) {
        state.currentIndex = index
    },
    TOGGLE_INFO(state) {
        state.info = !state.info;
    }
};

export const actions = {
    toggleLightbox({
        commit
    }) {
        commit('TOGGLE_LIGHTBOX');
    },
    displayImage({
        commit
    }, index) {
        if (!state.toggled) {
            state.toggled = true;

        }
        commit('SET_IMAGE', index);
    },
    toggleInfo({
        commit
    }) {
        commit('TOGGLE_INFO');
    }
};