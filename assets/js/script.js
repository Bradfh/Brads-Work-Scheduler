
//display date/time on top
// let dayTime = dayjs().format('dddd, MMMM D YYYY');
// $('#currentDay').text(dayTime);


//function to loop through each elementID that begins with 'hour-'
// because the IDs are labeled with the corresponding numerical hour, the function turns the id (eg. hour-15) into an array of 2 parts, excluding the "-".  (.split does this)
//it then takes the 2nd element of that array [1] and reads it as an integer (parseInt).  
//if that value is < = or > that the current hour as determined by dayjs, the function adds/removes classes as necessary.
// because the function is looping through every element with the id of hour-, (this) makes it point at the element it is currently on
// function changeColor() {
//   let currentTime = dayjs();  
//   let currentHour=currentTime.hour();
//   let elementToChange=$("[id^='hour-']");
//   elementToChange.remove("past present future");
//   console.log(currentTime); //logging time every 5s is working!

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
  $('.saveBtn').click(function () {
    const textarea = $(this).prev('.description');
    saveAndDisplayEvent(textarea.get(0));
  });

  function changeColor() {
    let currentTime = dayjs();
    let currentHour = currentTime.hour();
    let elementToChange = $("[id^='hour-']");
    elementToChange.remove("past present future");
    console.log(currentTime); //logging time every 5s is working!

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

  $('.time-block').each(function () {
    const eventId = $(this).attr('id');
    const savedContent = localStorage.getItem(eventId)
    if (savedContent) {
      $(this).find('.description').val(savedContent);
    }
  });

  let dayTime = dayjs().format('dddd, MMMM D YYYY');
  $('#currentDay').text(dayTime);
});
.


// Job 1, add current date in the header. The area has an ID of #currentDay
// Job 2 Create 6 more blocks of time by copy pasting in the HTML
// Job 3 using dayjs? jquery? google? add and remove classes to the appropriate blocks of time
// Job 4 Clicking on a block of time will allow me to input data
// Job 5 have the save button save the entered event to local storage.  When the page is refreshed the saved events persist
// Job 6 move all of these functions into the provided function