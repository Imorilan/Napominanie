const messages = [
  "Приступай к компьютерным играм, только когда сделал все домашние задания!",
  "Играй в компьютерные игры не дольше 1 часа в день!",
  "Никогда не пропускай дополнительные занятия!",
  "Игры  и общение с друзьями лучше компьютерных игр!"
  
];

function randomMessage() {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  console.log(`Random message: ${randomMessage}`);
  if (swReg !== null) {
    swReg.showNotification(randomMessage);
  }
}


let swReg = null;
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register('/napominanie/serviceWorker.js', { scope: '/napominanie/' })
      .then(res => {
        console.log("service worker registered", res);
        swReg = res;
      })
      .catch(err => console.log("service worker not registered", err));
  });
}
Notification.requestPermission().then((result) => {
  if (result === "granted") {
    console.log("send message");
    setTimeout(randomMessage, 1000);
    setInterval(randomMessage, 3600000);
  }
});

