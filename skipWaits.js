/*  This snippet eliminates the delay between lessons, and will automatically *
 *  move to the next module after the current one is finished.                *
 *  This more closely follows the behavior of the Pluralsight app.            *
 * ************************************************************************** */

const skipWaits = (function()  {
  this.goToNextLesson = true;
  this.goToNextModule = true;
  this.moduleRegEx = new RegExp("Start\\s+module\\s+\\d+");
  const traverseChildren = (parentNode) => {
    if (checkAndClick(parentNode)) {
      return true;
    }
    for (const thisChild of parentNode.childNodes) {
      if (traverseChildren(thisChild) == true) {
        return true;
      }
    }
  };
  const checkAndClick = (thisNode) => {
    if (!(goToNextLesson || goToNextModule)) {
      return false;
    }
    if (thisNode.tagName != "BUTTON") {
      return false;
    }
    if (goToNextLesson && thisNode.ariaLabel == "Next Lesson") {
      thisNode.click();
      return true;
    }
    if (!goToNextModule) {
      return false;
    }
    if (moduleRegEx.test(thisNode.innerText)) {
      thisNode.click();
      return true;
    }
  };
  const thisCallback = (mutationList, observer) => {
    for (const thisMutation of mutationList) {
      if (thisMutation.type == "childList") {
        for (const thisNode of thisMutation.addedNodes) {
          if (traverseChildren(thisNode) == true) {
            return;
          }
        }
      }
    }
  };
  this.observer = new MutationObserver(thisCallback);
  this.release = () =>  {
    this.observer.disconnect();
  };
  this.start = () => {
    this.observer.disconnect();
    this.observer.observe(document.getElementById('app'), { attributes: false, childList: true, subtree: true});
  };
  return this;
})();
skipWaits.start();
