const cardContentRef = document.getElementById("content-container");
const SPACE_NEWS_API_URL = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=50';
const REQUEST_INIT = {
    Headers: {
        'Accept': 'application/json'
    }
};

//Helper to create DOM node
const createDOMNode = (tagName, content, attribute = []) => {
    const elem = document.createElement(tagName);
    if (content) {
        elem.innerText = content;
    }
    if (Array.isArray(attribute)) {
        attribute.forEach(({ name, value }) => {
            elem.setAttribute(name, value);
        });
    }
    return elem;
};

//card template 
const getCardTemplate = ({ imageUrl, title, summary, url }) => {
    const containerNode = createDOMNode('div', null, [{ name: 'class', value: 'card-container' }]);
    const imageNode = createDOMNode('img', null, [{ name: 'src', value: imageUrl }]);
    const titleNode = createDOMNode('h6', title, [{ name: 'class', value: 'card-title' }]);
    const summaryNode = createDOMNode('p', summary, [{ name: 'class', value: 'card-summary' }]);
    const linkNode = createDOMNode('a', 'Read more about this article...',
        [{ name: 'class', value: 'card-link' }, { name: 'href', value: url }, { name: 'target', value: '_blank' }]);
    containerNode.append(imageNode, titleNode, summaryNode, linkNode);
    return containerNode;
};

(async () => {
    try {
        const response = await fetch(SPACE_NEWS_API_URL, REQUEST_INIT);
        const newsList = await response.json();
        cardContentRef.innerText = ''; //clear loading text
        newsList.forEach((newsItem) => {
            if (newsItem.imageUrl) {
                cardContentRef.append(getCardTemplate(newsItem));
            }
        });
    }
    catch (e) {
        console.log(e);
    }
})();