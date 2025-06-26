window.addEventListener('DOMContentLoaded', () => {
  const webview = document.getElementById('webview');

  const backBtn = document.getElementById('back');
  const forwardBtn = document.getElementById('forward');
  const reloadBtn = document.getElementById('reload');

  const updateButtons = () => {
    try {
      backBtn.disabled = !webview.canGoBack();
      forwardBtn.disabled = !webview.canGoForward();
    } catch (err) {
      console.error("❌ Error updating nav buttons", err);
    }
  };

  // Once the webview is ready
  webview.addEventListener('dom-ready', () => {
    console.log("✅ Webview is ready");

    // Enable buttons immediately
    updateButtons();

    // Event listeners for buttons
    backBtn.addEventListener('click', () => {
      if (webview.canGoBack()) webview.goBack();
    });

    forwardBtn.addEventListener('click', () => {
      if (webview.canGoForward()) webview.goForward();
    });

    reloadBtn.addEventListener('click', () => {
      webview.reload();
    });

    // Listen to all page changes to update button state
    const navEvents = ['did-navigate', 'did-navigate-in-page', 'did-finish-load'];

    navEvents.forEach(evt => {
      webview.addEventListener(evt, () => {
        updateButtons();

        // Store user info on dashboard
        if (webview.getURL().includes('/admin/dashboard')) {
          webview.executeJavaScript(`
            try {
              const user = JSON.parse(localStorage.getItem('user'));
              user;
            } catch (e) {
              null;
            }
          `).then(userData => {
            if (userData) {
              console.log("👤 User found and stored in local app storage:", userData);
              localStorage.setItem('franko-user', JSON.stringify(userData));
            } else {
              console.log("⚠️ No user data found in site localStorage");
            }
          });
        }
      });
    });
  });
});
