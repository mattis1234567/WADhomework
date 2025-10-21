
function createElementWithClass(el, className, children=[]) {
    let element = document.createElement(el);
    element.className = className;
    for (let child of children) {
        if (child != null) {
            element.appendChild(child);
        }
    }
    return element;
}

function createTimeSpanEl(time) {
    let timeDate = new Date(Date.parse(time));
    let element = createElementWithClass('span', 'post-date');
    element.appendChild(document.createTextNode(timeDate.toLocaleDateString("en-US", 
        { year: 'numeric', month: 'short', day: 'numeric' })));
    return element;
}

function createParagraphEl(content) {
    let element = document.createElement('p');
    element.appendChild(document.createTextNode(content));
    return element;
}

function createImageEl(className, src, alt) {
    let result = document.createElement('img');
    result.className = className;
    result.src = src;
    result.alt = alt;
    return result;
}

window.onload = (_) => {
    const remoteUrl = 'https://json-server.tail14245.ts.net/posts';
    const localUrl = './src/posts.json';
    fetch(localUrl)
        .then((response) => response.json())
        .then(json => {
            let postsEl = document.getElementById('posts');
            for (let post of json) {
                let postEl = createElementWithClass('div', 'post', [
                    // Post header
                    createElementWithClass('div', 'post-header', [
                        createImageEl('post-logo', 'src/img/me.png', 'avatar'),
                        createTimeSpanEl(post.creationTime)
                    ]),
                    // Post contents
                    createElementWithClass('div', 'post-content', [
                        post.hasOwnProperty('imageUrl') ? createImageEl('post-image', post.imageUrl, 'Post image') : null,
                        createParagraphEl(post.body)
                    ])
                ]);

                postsEl.appendChild(postEl);
            }
        })
}