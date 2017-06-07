function addButtons() {
  var actionLists = document.querySelectorAll('.ProfileTweet-actionList');
  actionLists.forEach(function (node) {
    var spongemock = node.querySelector('.spongemock');
    if (!spongemock) {
      var div = document.createElement('div');
      div.className += 'ProfileTweet-action spongemock';

      var button = document.createElement('button');
      // button.className += 'ProfileTweet-actionButton u-textUserColorHover js-actionButton js-actionShareViaDM';
      button.className += 'ProfileTweet-actionButton u-textUserColorHover js-actionButton js-actionReply';
      div.appendChild(button);

      var innerDiv = document.createElement('div');
      innerDiv.className += 'IconContainer js-tooltip';
      button.appendChild(innerDiv);

      var iconSpan = document.createElement('span');
      iconSpan.className += 'Icon Icon--retweet spongemockButton';
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

document.addEventListener('click', function (e) {
  if (e.target && e.target.className.includes('spongemockButton')) {
    var textbox = document.querySelector('#tweet-box-global').firstChild;
    var tweet = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.js-tweet-text-container').textContent;
    console.log(tweet);
    textbox.innerText = 'https://aconanlai.github.io/spongemock/';
  }
});


// js-tweet-text-container.firstChild.innerText