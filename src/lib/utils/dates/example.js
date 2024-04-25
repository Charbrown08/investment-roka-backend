const moment = require('moment')

// Function to calculate the number of overdue days
function calculateOverdueDays(paymentDate, interestPaid) {
  // Convert payment date to Moment.js
  const dueDate = moment(paymentDate, 'DD/MM/YYYY')

  // Calculate the current date
  const currentDate = moment()

  // Check if interest has been paid and if the current date is after the due date
  if (!interestPaid && currentDate.isAfter(dueDate)) {
    return currentDate.diff(dueDate, 'days')
  } else {
    return 0 // No overdue days
  }
}

// Example usage
const paymentDate = '23/04/2024' // Example payment date (in DD/MM/YYYY format)
const interestPaid = false // Example interestPaid flag

const overdueDays = calculateOverdueDays(paymentDate, interestPaid)
console.log('Number of overdue days:', overdueDays)
