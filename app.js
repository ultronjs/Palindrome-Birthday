var birthDay = document.getElementById("input_birthday");
var btnCheck = document.getElementById("btn_check");
var birthDayImg = document.getElementById("birthday_img");
var resultContainer = document.getElementsByClassName("container_result");
var loader = document.querySelector(".loader");

btnCheck.addEventListener("click", function(){
  if(birthDay.value === ""){
    alert("Please Enter the Date to Proceed")
  }
  else{
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
    clickHandler();
  }, 3000);
  }
})


function reverseStr(str){
  var listOfChar = str.split('');
  var reverseListOfChar = listOfChar.reverse();
  var reversedStr = reverseListOfChar.join('');
  return reversedStr;
}

function isPalindrome(str){
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToString(date){
  var dateStr = {day:'',month: '',year: ''};
  if(date.day <10){
    dateStr.day = '0' + date.day;
  }else{
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date){
  var dateStr = convertDateToString(date)

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day; ;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date){
  var listOfAllDateFormats = getAllDateFormats(date);
  console.log(listOfAllDateFormats)
  var isPalindromeFlag = false;
  for(var i=0;i<listOfAllDateFormats.length;i++){
    if(isPalindrome(listOfAllDateFormats[i])){
      isPalindromeFlag = true;
      break;
    }
  }
  return isPalindromeFlag;
}

function isLeapYear(year){
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0 ){
    return false;
  }
  if(year % 4 ===0){
    return true;
  }
  return false;
}

function getNextDate(date){
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
  if(month === 2){
    if(isLeapYear(year)){
      if(day > 29){
        day = 1;
        month++; 
      }
    }
    else if(day > 28){
      day = 1;
      month++;
      }
    }
  else{
    if(day > daysInMonth[month - 1 ]){
      day = 1;
      month++;
    }
  }
  if(month > 12){
    month = 1;
    year++;
  }

  return{day:day,month:month,year:year}
}

function getNextPalindromeDate(date){
  var ctr = 0;
  var nextDate = getNextDate(date);

  while(1){
    ctr++;
    var isPalindromeFlag = checkPalindromeForAllFormats(nextDate);
    if(isPalindromeFlag){
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [ctr,nextDate]
}

function clickHandler(){
   var date = {
     day: Number(birthDay.value.split("-")[2]),
     month: Number(birthDay.value.split("-")[1]),
     year: Number(birthDay.value.split("-")[0]),
   };
   console.log(date)
   var result = checkPalindromeForAllFormats(date);
   console.log(result)
   var img = document.createElement("img");
   var heading = document.createElement("h2");
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
    var [resultCounter, nextPalindromeDate] = getNextPalindromeDate(date);
    console.log(resultCounter, nextPalindromeDate);
    console.log("Your BirthDay is Not a Palindrome");
    img.setAttribute("id", "notLucky_img");
    img.setAttribute("src", "./images/notLucky.png");
    heading.setAttribute("id", "result_heading");
    resultContainer[0].appendChild(heading);
    heading.innerHTML =
      heading.innerHTML = `<h2>Sorry!!! Your BirthDate is not a Palindrome</h2>
                          <h3>The next Palindrome Date is ${nextPalindromeDate.day}-${nextPalindromeDate.month}-${nextPalindromeDate.year} .that is after ${resultCounter} days</h3>`;
   }
   loader.style.display = "none";
   resultContainer[0].appendChild(img);
}


//var counter;


// function getNextPalindrome(date) {
//   var nextDay = new Date(date.toDateString());
//   nextDay.setDate(date.getDate() + 1);
//   var isPalindrome = getDateInAllFormatAndCheckPalindrome(nextDay)
//   while (1) { 
//     counter += 1;
//     if (isPalindrome) {
//       break;
//     } else {
//       nextDay = getNextPalindrome(nextDay)[1];
//       break;
//     }
//   }
//   return [counter,nextDay]
// }

// function getDateInAllFormatAndCheckPalindrome(date){
//   if (date.getDate() < 10) {
//     dateString = "0" + date.getDate().toString();
//   } else {
//     dateString = date.getDate().toString();
//   }
//   if (date.getMonth() + 1 < 10) {
//     monthString = "0" + (date.getMonth() + 1).toString();
//   } else {
//     monthString = (date.getMonth() + 1).toString();
//   }
//   var dateMonthYearString =
//     dateString + monthString + date.getFullYear().toString();
//   var monthDayFUllYearFormatString =
//     monthString + dateString + date.getFullYear().toString();
//   var monthDayYearFormatString =
//     monthString + dateString + date.getFullYear().toString().substr(-2);
//   var result_ddmmyyyy = checkPalindrome(dateMonthYearString);
//   var result_mmddyyyy = checkPalindrome(monthDayFUllYearFormatString);
//   var result_mmddyy = checkPalindrome(monthDayYearFormatString);
//   if(result_ddmmyyyy || result_mmddyyyy || result_mmddyy){
//     return true;
//   }else{
//     return false;
//   }
// }

// function palindrome() {
//    var date = new Date(birthDay.value);
//    var result = getDateInAllFormatAndCheckPalindrome(date);
//    var img = document.createElement("img");
//    var heading = document.createElement("h2");
//    var heading = document.createElement("div")
//    if (result) {
//     console.log("Your BirthDay is Palindrome");
//     img.setAttribute("src", "./images/celebration.png");
//     img.setAttribute("id", "celebration_img");
//     heading.setAttribute("id", "result_heading");
//     resultContainer[0].appendChild(heading);
//     heading.innerHTML = `<h2>Congrats!!! Your BirthDate is a Palindrome</h2>`
//    } else {
//     counter = 0;
//     var[resultCounter,nextPalindromeDate]  = getNextPalindrome(date);
//     console.log(resultCounter, nextPalindromeDate);
//     console.log("Your BirthDay is Not a Palindrome");
//     img.setAttribute("id", "notLucky_img");
//     img.setAttribute("src", "./images/notLucky.png");
//     heading.setAttribute("id", "result_heading");
//     resultContainer[0].appendChild(heading);
//     heading.innerHTML =
//       heading.innerHTML = `<h2>Congrats!!! Your BirthDate is a Palindrome</h2>
//                           <h3>The next Palindrome Date is ${nextPalindromeDate.getDate()}-${nextPalindromeDate.getMonth() + 1}-${nextPalindromeDate.getFullYear()} .that is after ${resultCounter} days</h3>`;
//    }
//    loader.style.display = "none";
//    resultContainer[0].appendChild(img);
// }

// function checkPalindrome(dateString){
//     for (i = 0; i < dateString.length; i++) {
//       var palindrome_flag = true;
//       if (dateString[i] !== dateString[dateString.length - 1 - i]) {
//         palindrome_flag = false;
//         return palindrome_flag;
//       }
//     }
//     return palindrome_flag;    
// }
