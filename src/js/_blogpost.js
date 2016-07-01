/* blogpost
A module that creates a blogpost widget

To use, just add blogpost.js and blogpost.scss and call

blogpost.run(<div id>, <data>, <options>)

Notes:
  - JSON data can be and object or a string.
  - Data is an array of objects in the following format:
  {
    "id": <int Identifier>,
    "text": <string Abstract>,
    "views": <int Number of views>,
    "comments": <int Number of comments>,
    "likes": <int Number of likes>,
    "photo": <string Filename of the post photo>,
    "author": {
      "name": <string Author name>,
      "photo": <string Filename of the author photo>"
    }
  }
  - The following options may be used:
    {
      postsPhotoURL: <string URL for posts' blogpost photos>
      authorPhotoURL: <string URL for authors' blogpost photos>
    }
*/

const helper = window.widgetsHelper;

window.blogpost = (function blogpost() {
  const exports = {};
  const optDefaults = {
    postsPhotoURL: '/img',
    authorPhotoURL: '/img',
  };

  exports.run = (divId = '', _data, _opts) => {
    // Initialize options
    const opts = Object.assign(optDefaults, _opts);

    const data = helper.initializeData(_data);
    const rootNode = document.getElementById(divId);
    rootNode.classList.add('blogpost');
    rootNode.innerHTML = '';

    // Create head
    const postPhoto = helper.createDOMElement('img', ['blogpost__post-photo'],
      { src: `${opts.postsPhotoURL}/${data.photo}` }
    );

    const postInfo = helper.createDOMElement('div', ['blogpost__info']);
    const authorPhoto = helper.createDOMElement('img',
      ['blogpost__author-photo'],
      { src: `${opts.authorPhotoURL}/${data.author.photo}` }
    );
    const authorInfo = helper.createDOMElement('div',
      ['blogpost__author-info']
    );
    const authorName = helper.createDOMElement('span',
      ['blogpost__author-name'],
      {}, data.author.name
    );
    const postText = helper.createDOMElement('p', ['blogpost__text'],
      {}, data.text
    );

    // Create stats
    const stats = helper.createDOMElement('div', ['blogpost__stats']);
    // Create views
    const views = helper.createDOMElement('div', ['blogpost__counter']);
    const viewsIcon = helper.createDOMElement('span',
      ['glyphicon', 'glyphicon-eye-open']
    );
    const viewsNumber = helper.createDOMElement('span', [], {}, '0');
    helper.appendAll(views, viewsIcon, viewsNumber);
    // Create comments
    const comments = helper.createDOMElement('div', ['blogpost__counter']);
    const commentsIcon = helper.createDOMElement('span',
      ['glyphicon', 'glyphicon-comment']
    );
    const commentsNumber = helper.createDOMElement('span', [], {}, '0');
    helper.appendAll(comments, commentsIcon, commentsNumber);
    // Create likes
    const likes = helper.createDOMElement('div', ['blogpost__counter']);
    const likesIcon = helper.createDOMElement('span',
      ['glyphicon', 'glyphicon-heart']
    );
    const likesNumber = helper.createDOMElement('span', [], {}, '0');
    helper.appendAll(likes, likesIcon, likesNumber);

    helper.appendAll(authorInfo, authorName, postText);
    helper.appendAll(postInfo, authorPhoto, authorInfo);
    helper.appendAll(stats, views, comments, likes);
    helper.appendAll(rootNode, postPhoto, postInfo, stats);

    ['views', 'comments', 'likes'].forEach((val, idx) => {
      helper.countToValue(
        `.blogpost__counter:nth-child(${idx + 1}) span:last-child`,
        data[val], 3
      );
    });
  };

  return exports;
}());
