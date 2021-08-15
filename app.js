var birthDay = document.getElementById("input_birthday");
var btnCheck = document.getElementById("btn_check");
var birthDayImg = document.getElementById("birthday_img");
var resultContainer = document.getElementsByClassName("container_result");
var loader = document.querySelector(".loader");
var counter;


function getNextPalindrone(date) {
  var nextDay = new Date(date.toDateString());
  nextDay.setDate(date.getDate() + 1);
  var isPalindrone = getDateInAllFormatAndCheckPalindrone(nextDay)
  while (1) { 
    counter += 1;
    if (isPalindrone) {
      break;
    } else {
      nextDay = getNextPalindrone(nextDay)[1];
      break;
    }
  }
  return [counter,nextDay]
}

function getDateInAllFormatAndCheckPalindrone(date){
  if (date.getDate() < 10) {
    dateString = 0 + date.getDate().toString();
  } else {
    dateString = date.getDate().toString();
  }
  if (date.getMonth() + 1 < 10) {
    monthString = 0 + (date.getMonth() + 1).toString();
  } else {
    monthString = (date.getMonth() + 1).toString();
  }
  var dateMonthYearString =
    dateString + monthString + date.getFullYear().toString();
  var monthDayFUllYearFormatString =
    monthString + dateString + date.getFullYear().toString();
  var monthDayYearFormatString =
    monthString + dateString + date.getFullYear().toString().substr(-2);
  var result_ddmmyyyy = checkPalindrome(dateMonthYearString);
  var result_mmddyyyy = checkPalindrome(monthDayFUllYearFormatString);
  var result_mmddyy = checkPalindrome(monthDayYearFormatString);
  if(result_ddmmyyyy || result_mmddyyyy || result_mmddyy){
    return true;
  }else{
    return false;
  }
}

function palindrone() {
   var date = new Date(birthDay.value);
   var result = getDateInAllFormatAndCheckPalindrone(date);
   var img = document.createElement("img");
  //  var heading = document.createElement("h2");
   var heading = document.createElement("div")
   if (result) {
    console.log("Your BirthDay is Palindrome");
    img.setAttribute("src", "./images/celebration.png");
    img.setAttribute("id", "celebration_img");
    heading.setAttribute("id", "result_heading");
    resultContainer[0].appendChild(heading);
    heading.innerHTML = `<h2>Congrats!!! Your BirthDate is a Palindrome</h2>`
   } else {
    counter = 0;
    var[resultCounter,nextPalindroneDate]  = getNextPalindrone(date);
    console.log(resultCounter, nextPalindroneDate);
    console.log("Your BirthDay is Not a Palindrome");
    img.setAttribute("id", "notLucky_img");
    img.setAttribute("src", "./images/notLucky.png");
    heading.setAttribute("id", "result_heading");
    resultContainer[0].appendChild(heading);
    heading.innerHTML =
      heading.innerHTML = `<h2>Congrats!!! Your BirthDate is a Palindrome</h2>
                          <h3>The next Palindrone Date is ${nextPalindroneDate.getDate()}-${nextPalindroneDate.getMonth() + 1}-${nextPalindroneDate.getFullYear()} .that is after ${resultCounter} days</h3>`;
   }
   loader.style.display = "none";
   resultContainer[0].appendChild(img);
}


btnCheck.addEventListener("click", function(){
  birthDayImg.remove();
  if (document.getElementById("notLucky_img") != null) {
    document.getElementById("notLucky_img").remove();
    document.getElementById("result_heading").remove();
  }
  if (document.getElementById("celebration_img") != null) {
    document.getElementById("celebration_img").remove();
    document.getElementById("result_heading").remove();
  }

  loader.style.display = "block";
  setTimeout(function () {
    palindrone();
  }, 3000);
})




function checkPalindrome(dateString){
    for (i = 0; i < dateString.length; i++) {
      var palindrome_flag = true;
      if (dateString[i] !== dateString[dateString.length - 1 - i]) {
        palindrome_flag = false;
        return palindrome_flag;
      }
    }
    return palindrome_flag;    
}