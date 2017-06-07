// http://pixel.nymag.com/imgs/daily/vulture/2017/05/16/16-spongebob-explainer.w710.h473.2x.jpg

function addButtons() {
  var actionLists = document.querySelectorAll('.ProfileTweet-actionList');
  actionLists.forEach(function (node) {
    var spongemock = node.querySelector('.spongemock');
    if (!spongemock) {
      var div = document.createElement('div');
    div.className += 'ProfileTweet-action spongemock';

    var button = document.createElement('button');
    // button.className += 'ProfileTweet-actionButton u-textUserColorHover js-actionButton js-actionShareViaDM';
    button.className += 'ProfileTweet-actionButton u-textUserColorHover';
    div.appendChild(button);

    var innerDiv = document.createElement('div');
    innerDiv.className += 'IconContainer js-tooltip';
    button.appendChild(innerDiv);

    var iconSpan = document.createElement('span');
    iconSpan.className += 'Icon Icon--retweet';
    innerDiv.appendChild(iconSpan);

    var tooltipSpan = document.createElement('span');
    tooltipSpan.className += 'u-hiddenVisually';
    innerDiv.appendChild(tooltipSpan);

    node.appendChild(div);
    }
  });
}

addButtons();

var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes.length > 0) {
      addButtons();
    }
  });
});

var observerConfig = {
  attributes: true,
  childList: true,
  characterData: true
};

var targetNode = document.querySelector('.js-navigable-stream');
observer.observe(targetNode, observerConfig);
