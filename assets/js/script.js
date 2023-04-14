
//display date/time on top
// let dayTime = dayjs().format('dddd, MMMM D YYYY');
// $('#currentDay').text(dayTime);



// This is a jQuery function that waits until the DOM is fully loaded before it begins using JS to do any work.  Once it is 'ready' or loaded the anonymous callback function is called.
// This first part of the mega function handles local storage.  I was trying to use getAttribute or attr to pluck the div ID (e.g. hour-9) because I wanted that to be my key in local storage along with the value inputted into the HTML <textarea>
// Local storage is populated with the event id (hour-9, 10, 11, etc) and the value of the textarea (user input)
// Then it checks to see if savedContent is true, or rather does it see things in local storage to get.  If so it puts it back into the textarea for us.
$(document).ready(function () {
  function saveAndDisplayEvent(textarea) {
    const parentElement = textarea.parentNode;
    const eventId = parentElement.id;
    const eventContent = textarea.value;
    localStorage.setItem(eventId, eventContent);
    const savedContent = localStorage.getItem(eventId);
    if (savedContent) {
      $(textarea).val(savedContent);
    }
  }

  //This adds a click event listener to the saveBtn class which calls an anonymous function that targets the previous DOM element with the class 'description'.  Previous to the clicked button, that is.  Then we can call the save/display function using the parameter "textarea".  In this case there is only one element in the collection of elements that matches .description, hence the get(0), however there could be more in other cases.
  $('.saveBtn').click(function () {
    const textarea = $(this).prev('.description');
    saveAndDisplayEvent(textarea.get(0));
  });

  //This function uses dayjs to change the color of the hour blocks depending on the current time.
  // It does this by setting the current time and current hour as variables, as well as the element we want to change.  The element we want to change is the ID given to each hour block.  id^='hour-' is saying any id that contains hour-.
  function changeColor() {
    let currentTime = dayjs();
    let currentHour = currentTime.hour();
    let elementToChange = $("[id^='hour-']");
    elementToChange.remove("past present future");
    console.log(currentTime); 

    // this is an argument that tests against each case of hour- every 5 seconds.  For the element it is looking at (this), hour will be an integer value of the 2nd element within an array that was formed by splitting the hour-9 id and removing the -.
    //if this number that corresponds to the id is greater than the hour determined by dayjs, the color past class will be added changing the color to grey.  And so on for === and less than.

    elementToChange.each(function () {
      let hour = parseInt($(this).attr("id").split("-")[1]);
      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  setInterval(changeColor, 5000);


// I am not entirely sure why this seems to be the first thing that happens.
// What it is doing is looking at the time-block class for each div, then grabbing its ID so that it can be retrieved from local storage where it was saved by that ID.  If savedContent is true, meaning there is something to get, then jquery finds the descendant of the current selected element (this) and gives it the value of savedContent
  $('.time-block').each(function () {
    const eventId = $(this).attr('id');
    const savedContent = localStorage.getItem(eventId)
    if (savedContent) {
      $(this).find('.description').val(savedContent);
    }
  });

  // This is the dayjs syntax taken from our lessons.
  let dayTime = dayjs().format('dddd, MMMM D YYYY');
  $('#currentDay').text(dayTime);
});



// Job 1, add current date in the header. The area has an ID of #currentDay
// Job 2 Create 6 more blocks of time by copy pasting in the HTML
// Job 3 using dayjs? jquery? google? add and remove classes to the appropriate blocks of time
// Job 4 Clicking on a block of time will allow me to input data
// Job 5 have the save button save the entered event to local storage.  When the page is refreshed the saved events persist
// Job 6 move all of these functions into the provided function