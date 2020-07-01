export const namespaced = true;

export const state = {
    toggled: false,
    info: false,
    currentIndex: 0,
    lastFocusEl: null
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
    },
    SET_LAST_FOCUS(state, el) {
        state.lastFocusEl = el;
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
    }, {
        index,
        lastFocusEl
    }) {
        if (!state.toggled) {
            state.toggled = true;

        }
        commit('SET_IMAGE', index);
        if (lastFocusEl) commit('SET_LAST_FOCUS', lastFocusEl);
    },
    toggleInfo({
        commit
    }) {
        commit('TOGGLE_INFO');
    }
};