// Job 1, add current date in the header. The area has an ID of #currentDay
// Job 2 Create 6 more blocks of time by copy pasting in the HTML
// !Job 3 using dayjs? jquery? google? add and remove classes to the appropriate blocks of time
// !Job 4 Clicking on a block of time will allow me to input data
// !Job 5 have the save button save the entered event to local storage.  When the page is refreshed the saved events persist

// TODO use dayjs to create a current day in the header.

let dayTime = dayjs().format('dddd, MMMM D YYYY');
$('#currentDay').text(dayTime);


//function to loop through each elementID that begins with 'hour-'
// because the IDs are labeled with the corresponding hour, the fucntion turns the id (eg. hour-15) into an array of 2 parts, exluding the "-".  (.split does this)
//it then takes the 2nd element of that array [1] and reads it as an integer (parseInt).  
//if that value is < = or > that the current hour as determined by dayjs, the function adds/removes classes as necessary.
function changeColor() {
  let currentTime = dayjs();  
  let currentHour=currentTime.hour();
  let elementToChange=$("[id^='hour-']");
  elementToChange.remove("past present future");

  elementToChange.each(function() {
    let hour = parseInt($(this).attr("id").split("-")[1]);
    if (hour < currentHour) {
      $(this).addClass("past");
    } else if (hour === currentHour) {
      $(this).addClass("present");
    } else $(this).addClass("future");
  })
}

changeColor();
setInterval(changeColor, 5000);








// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
