const GET_INPUTS = 'GET_INPUTS';
export const RECEIVE_INPUTS = 'RECEIVE_INPUTS';

const browser = findBrowser();

export function getInputs() {
    return dispatch => {
        return queryCurrentTab().then(tab => sendContentMessage(tab.id, GET_INPUTS)).then(inputs => dispatch(receiveInputs(inputs)));
    };
}

function receiveInputs(inputs) {
    return {
        type: RECEIVE_INPUTS,
        inputs
    };
}

function findBrowser() {
    if (typeof browser !== 'undefined') {
        return browser;
    } else if (typeof window.chrome !== 'undefined') {
        return window.chrome;
    } else {
        return null;
    }
}

function queryCurrentTab() {
    const query = {
        active: true,
        currentWindow: true
    };

    return new Promise((resolve, reject) => {
        browser.tabs.query(query, tabs => {
            if (tabs) {
                resolve(tabs[0]);
            } else {
                reject('query did not return with tab info');
            }
        });
    });

}

function sendContentMessage(tabId, message) {
    return new Promise((resolve, reject) => {
        browser.tabs.sendMessage(tabId, message, response => {
            if (response) {
                resolve(response);
            } else {
                reject('page did not send back response');
            }
        });
    });
}