// popup.js

// let timePrompt = prompt("How long");

// // console.log(timePrompt);
// var currentDate = new Date();

// var countDownDate = new Date(currentDate.getTime() + timePrompt*60000);

// console.log(countDownDate);


// var x = setInterval(function() {
//     var now = new Date().getTime();

//     var distance = countDownDate - now;

//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//     + minutes + "m " + seconds + "s ";

//     if (distance < 0) {
//         clearInterval(x);
//         document.getElementById("demo").innerHTML = "EXPIRED";
//       }

// }, 1000);

// document.getElementById('grayscaleButton').addEventListener('click', function() {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.scripting.executeScript({
//         target: { tabId: tabs[0].id },
//         function: () => {
//           chrome.runtime.sendMessage({ message: 'clicked_browser_action' });
//         }
//       });
//     });
//   });

document.addEventListener('DOMContentLoaded', function() {
  let waterAmount = 0;

  // Load previous water amount from storage
  chrome.storage.sync.get(['waterAmount'], function(result) {
    waterAmount = result.waterAmount || 0;
    updateWaterBottle();
  });

  // Set a reminder every 30 minutes
  setInterval(function() {
    chrome.notifications.create('reminder', {
      type: 'basic',
      iconUrl: 'water_bottle.jpg',
      title: 'Drink Water Reminder',
      message: 'It\'s time to drink water!'
    });
  }, 30 * 60 * 1000);

  // Update water bottle when the user clicks the "I drank water!" button
  document.getElementById('drinkButton').addEventListener('click', function() {
    waterAmount += 100; // You can adjust the amount based on the user input
    updateWaterBottle();
    chrome.storage.sync.set({ 'waterAmount': waterAmount });
  });

  // Update the water bottle graphic based on the current water amount
  function updateWaterBottle() {
    const bottle = document.getElementById('waterBottle');
    const fillPercentage = Math.min(waterAmount, 1000) / 1000 * 100;
    bottle.style.backgroundSize = `100% ${fillPercentage}%`;
  }
});
  