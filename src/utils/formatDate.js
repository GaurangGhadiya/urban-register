const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (+1 because January is 0) and pad with leading zero if necessary
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
const formatDatePiyush = (dateString) => {
    const dateStr = dateString;
const [day, month, year] = dateStr.split('/');
const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };


  function formatDateTime(input) {
    // Parse input string to Date object
    let dateObj = new Date(input);

    // Get components of the date
    let year = dateObj.getFullYear();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Months are zero based
    let day = ('0' + dateObj.getDate()).slice(-2);
    let hours = ('0' + dateObj.getHours()).slice(-2);
    let minutes = ('0' + dateObj.getMinutes()).slice(-2);
    let seconds = ('0' + dateObj.getSeconds()).slice(-2);

    // Format the date as DD-MM-YYYY
    let formattedDate = `${day}-${month}-${year}`;

    // Determine if it's AM or PM
    let period = (hours < 12) ? 'AM' : 'PM';

    // Adjust hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format the time as HH:MM AM/PM
    let formattedTime = `${hours}:${minutes} ${period}`;

    // Combine date and time in the required format
    let formattedDateTime = `${formattedDate} (${formattedTime})`;

    return formattedDateTime;
}

export {formatDateTime,formatDatePiyush}
  export default  formatDate
