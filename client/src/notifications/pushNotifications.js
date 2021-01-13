/**
 * checks if Push notification and service workers are supported by your browser
 */
const isPushNotificationSupported = () => {
    return "serviceWorker" in navigator && "PushManager" in window;
  };
  
  /**
   * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
   */
  const initializePushNotifications = async () => {
    // request user grant to show notification
    return await Notification.requestPermission()
  };

  const createNotificationSubscription = async ()=> {
    //wait for service worker installation to be ready
    const serviceWorker = await navigator.serviceWorker.ready;
    // subscribe and return the subscription
    return await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: pushServerPublicKey
    });
  };

  const postSubscription = async (subscription)=> {
    const response = await fetch(`https://push-notification-demo-server.herokuapp.com/subscription`, {
      credentials: "omit",
      headers: { "content-type": "application/json;charset=UTF-8", "sec-fetch-mode": "cors" },
      body: JSON.stringify(subscription),
      method: "POST",
      mode: "cors"
    });
    return await response.json();
  };

  sendNotification(
    pushSubscription,
    JSON.stringify({
      title: "New Product Available ",
      text: "HEY! Take a look at this brand new t-shirt!",
      tag: "new-product",
      url: "/new-product-jason-leung-HM6TMmevbZQ-unsplash.html"
    })
  )

//   /**
//    * shows a notification
//    */
//   function sendNotification() {
//     const img = "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg";
//     const text = "Take a look at this brand new t-shirt!";
//     const title = "New Product Available";
//     const options = {
//       body: text,
//       icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
//       vibrate: [200, 100, 200],
//       tag: "new-product",
//       image: img,
//       badge: "https://spyna.it/icons/android-icon-192x192.png",
//       actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
//     };
//     navigator.serviceWorker.ready.then(function(serviceWorker) {
//       serviceWorker.showNotification(title, options);
//     });
//   }
  
//   /**
//    * 
//    */
//   function registerServiceWorker() {
//     navigator.serviceWorker.register("/sw.js").then(function(swRegistration) {
//       //you can do something with the service wrker registration (swRegistration)
//     });
//   }
  
//   export {
//     isPushNotificationSupported,
//     initializePushNotifications,
//     registerServiceWorker,
//     sendNotification
//   };