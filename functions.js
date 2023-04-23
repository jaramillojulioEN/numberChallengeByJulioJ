var numbers = [];
var sorted = [];
var userSort = [];
var pos = 0;
var score = 0;
var cssGreen = {
  "padding": "10px",
  "background-color": "#333",
  "color": "#ddd",
  "font-size": "2.2em",
  "box-shadow": "0 0 20px #4f9",
  "border-radius": "16px"
}
var cssRed = {
  "padding": "10px",
  "background-color": "#333",
  "color": "#ddd",
  "font-size": "2.2em",
  "box-shadow": "0 0 20px red",
  "border-radius": "16px"
}
$(document).ready(function () {
  api()
  $("#modal1").load("highScores.html")
  $("#modal2").load("setname.html")
  $("#modal3").load("help.html")


  $("#scores").click(function () {
    $("#highScores").modal("show")
  })

  $("#startPlay").click(function () {
    numbers = [];
    pos = 0
    sorted = quickSort(start());
    $("#startPlay").hide()
    $("#recs").hide()
    $("#ns").hide()
    $("#pocitions").removeAttr("hidden")
    $("#scores").removeAttr("hidden")
    $("#restart").removeAttr("hidden")
    $("#number").removeAttr("hidden")
    $(".ng").text(numbers[0])
    $("#number").removeClass("animate__animated animate__bounceOutUp").addClass("animate__animated animate__bounceInDown")
    $("#pocitions").removeClass("animate__animated animate__bounceOutUp").addClass("animate__animated animate__bounceInDown")
    $("#scores").removeClass("animate__animated animate__bounceOutUp").addClass("animate__animated animate__bounceInDown")
    $("#restart").removeClass("animate__animated animate__bounceOutUp").addClass("animate__animated animate__bounceInDown")

  })

  $("#restart").click(function () {
    endGame();
  })

  $(".n").click(function () {
    let id = this.id
    if ($("#" + id).attr("class") == "n") {
      $("#" + id).removeClass("n")
      $("#" + id).addClass("p")
      $("#" + id).append("<span class='animate__animated animate__flipInY'>" + numbers[pos] + "</span>")
      if (pos < 19) {
        pos++
        $("#number").html('<h1 class="text-center p-5 animate__animated animate__flipInY ng">' + numbers[pos] + '</h1>')
      } else {
        arrayRet = result()
        if (arrayRet[0]) {
          let name = prompt("¡Felicidades! Obtuviste " + score + " puntos. Ingresa tu nombre para guardar tu puntaje:");
          let newScore = {
            "name": name,
            "score": score,
            "old" : arrayRet[1]
          };
          HallOfFame(newScore)
        }
        $("#number").html('<h1 class="text-center p-5 animate__animated animate__flipInY ng" >Puntaje:' + score +'</h1>')
      }
    }
    document.getElementById("number").scrollIntoView();
  })
});

function result() {
  let IsHighScore = false;
  for (let index = 1; index <= 20; index++) {
    userSort.push($("#n" + index).text().split(".")[1])
  }
  for (let i = 0; i < userSort.length; i++) {
    if (userSort[i] == sorted[i]) {
      score = score + 1;
      $("#n" + (i + 1)).css(cssGreen)
    } else {
      $("#n" + (i + 1)).css(cssRed)
    }
  }
  for (let j = 0; j < scores.length; j++) {
    if (Number(score) > Number(scores[j].score)) {
      IsHighScore = [true, scores[j].score];
      break;
    }
  }
  return IsHighScore
}

function start() {
  while (numbers.length < 20) {
    const newNumber = Math.floor(Math.random() * 1000);
    if (!numbers.includes(newNumber)) {
      numbers.push(newNumber);
    }
  }
  return numbers;
}

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

function endGame() {
  $(".p").addClass("n").removeClass("p")
  $("h1 span").remove();
  $("#pocitions h1").removeAttr('style');
  $("#pocitions").addClass("animate__animated animate__bounceOutUp")
  $("#restart").addClass("animate__animated animate__bounceOutUp")
  $("#number").addClass("animate__animated animate__bounceOutUp")
  $("#scores").addClass("animate__animated animate__bounceOutUp")
  $("#ng").text("")
  setTimeout(function() {
    $("#pocitions").attr("hidden", true)
    $("#scores").attr("hidden", true)
    $("#restart").attr("hidden", true)
    $("#number").attr("hidden", true)
    $("#startPlay").show()
    $("#recs").show()
    $("#ns").show()
  }, 800);
  sorted = [];
}