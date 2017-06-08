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
      iconSpan.className += 'Icon Icon--spongemock spongemockButton';
      innerDiv.appendChild(iconSpan);

      var tooltipSpan = document.createElement('span');
      tooltipSpan.className += 'u-hiddenVisually';
      innerDiv.appendChild(tooltipSpan);

      node.appendChild(div);
    }
  });
}

var disconnecter;

function initializeAndObserve() {
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
  disconnecter = function() {
    observer.disconnect();
  }
}

document.addEventListener('click', function (e) {
  if (e.target && e.target.className.includes('spongemockButton')) {
    var textbox = document.querySelector('#tweet-box-global').firstChild;
    var tweet = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.js-tweet-text-container').textContent.trim();
    // truncate tweet to 118 chars
    console.log(tweet);
    var shortened = Array.from(tweet.substring(0, 110).toLowerCase().replace(/(\r\n|\n|\r)/gm, ' '));
    for (var i = 0; i < shortened.length; i += 1) {
      if (i % 2 == 0) {
        shortened[i] = shortened[i].toUpperCase();
      }
    };
    textbox.innerText = shortened.join('') + ' https://aconanlai.github.io/spongemock'; // 22 chars
  }
});

initializeAndObserve();

var currentHref = window.location.href;

setInterval(function() {
  if (window.location.href !== currentHref) {
    currentHref = window.location.href;
    disconnecter();
    initializeAndObserve();
  }
}, 2000);
