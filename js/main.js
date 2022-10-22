"use strict";
const formElement = document.getElementById('input');
const dataStorage = [];



function getFormElement(event) {
  event.preventDefault();
  const valX1 = document.getElementById('X-value').value;
  const valY = document.getElementById('Y-value').value;
  const valR = document.querySelector('input[name = R]:checked').value;
  
  if (validate(valX1, valR)) {
    const valX = Number(valX1);
    console.log(valX);
    console.log(valX1);
    sendRequest(valX, valY, valR)};
}
formElement.addEventListener('submit', getFormElement);

function validate(X, R){
  return validX(X) && validR(R);
}

function validX(X){
  const maxX = 3;
  const minX = -5;
  if(isNaN(X) || X>=maxX || X<=minX || X == "") {
    alert ("please enter -5<X<3");
    return false;
  } else {return true;}
}

function validR(R){
  if(R == 1 || R == 1.5 || R == 2 || R == 2.5 || R == 3) {return true;};
    return false;
}

function onAnswer(ans) {
  let parsedAns = JSON.parse(ans);
  parsedAns.forEach(element => {
      dataStorage.push(element);
  });
  let output = "<table border=\"1\" class=\"resultTable\"><tr><td class=\"cellNum\">№</td><td class=\"cellNum\">X</td><td class=\"cellNum\">Y</td><td class=\"cellNum\">R</td><td class=\"cellRes\">Result</td><td class=\"cellTime\">Working time</td><td class=\"cellTime\">Current time</td></tr>\n";
  for (let i = 0; i < dataStorage.length; i++) {
      let num = i + 1;
      output += "<tr><td>" + num + "</td>";
      let m = dataStorage[i];
      for (let j = 0; j < m.length; j++) {
          output += "<td>" + m[j] + "</td>";
      }
      output += "</tr>\n";
  }
  output += "</table>"
  document.getElementById("outputContainer").innerHTML = output;
}




// let xhr = new XMLHttpRequest();

// xhr.open('GET', 'php/main.php');

// xhr.send();
// xhr.onload = function() {
//   if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
//     alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
//   } else { // если всё прошло гладко, выводим результат
//     onAnswer(xhr.response.length); // response -- это ответ сервера
//   }
// };


function sendRequest(x, y, r) {
  $.ajax({  
     url: "php/main.php",
     method: "GET",
     data: {
         "x": x,
         "y": y,
         "r": r,
         "time": (new Date().getTimezoneOffset())
     },
     success: onAnswer,
      dataType: "text"
  });
}