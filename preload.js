window.addEventListener('DOMContentLoaded', () => {
  const webview = document.getElementById('webview');

  const backBtn = document.getElementById('back');
  const forwardBtn = document.getElementById('forward');
  const reloadBtn = document.getElementById('reload');

  const updateButtons = () => {
    webview.canGoBack().then((canGoBack) => {
      backBtn.disabled = !canGoBack;
    });
    webview.canGoForward().then((canGoForward) => {
      forwardBtn.disabled = !canGoForward;
    });
  };

  backBtn.addEventListener('click', () => {
    webview.goBack();
  });

  forwardBtn.addEventListener('click', () => {
    webview.goForward();
  });

  reloadBtn.addEventListener('click', () => {
    webview.reload();
  });

  // Update buttons on navigation events
  webview.addEventListener('did-navigate', updateButtons);
  webview.addEventListener('did-navigate-in-page', updateButtons);
  webview.addEventListener('dom-ready', updateButtons); // ensure it's available
});
