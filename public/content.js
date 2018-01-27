chrome.runtime.onMessage.addListener(contentListener);

const GET_INPUTS = 'GET_INPUTS';

console.log('fillmore script loaded into browser');

function contentListener(request, sender, sendResponse) {
    const abstractMapper = element => abstractElement(element);

    switch(request.type) {
        case GET_INPUTS:
            const inputs = Array.from(document.getElementsByTagName('input')).map(abstractMapper);
            const labels = Array.from(document.getElementsByTagName('label'))
                .filter(element => !!element.getAttribute('for') && !!element.innerText)
                .map(abstractMapper);

            const selects = Array.from(document.getElementsByTagName('select')).map(abstractMapper);

            sendResponse({
                inputs,
                labels,
                selects
            });

            return true;
        default:
            sendResponse({
                message: 'no known type specified'
            });
            return true;
        }
}

function abstractElement(element) {
    const abstract = {};
    const tagName = element.tagName.toLowerCase();

    console.log('abstractElement');

    if (tagName === 'select') {
        abstract.options = [];

        // we can't map because they're not a true array!
        for (const option of element.options) {
            abstract.options.push(abstractElement(option));
        }
    }

    const attributes = reduceAttributes(element);
    return Object.assign({}, abstract, attributes, {
        tagName,
        value: element.value,
        innerText: element.innerText
    });
}

function reduceAttributes(element) {
    return element.getAttributeNames().reduce((object, item) =>
        Object.assign({}, object, {
            [item]: element.getAttribute(item)
        }), {}