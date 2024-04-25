const moment = require('moment')

const calculateInterestPaymentDate = async (loanDate) => {
  const loanDateMoment = moment(loanDate, 'DD/MM/YYYY')
  const loanDay = loanDateMoment.date()
  const halfMonth = Math.ceil(loanDateMoment.daysInMonth() / 2)
  let payday
  if (loanDay > halfMonth) {
    payday = loanDateMoment.add(1, 'month').endOf('month').format('DD/MM/YYYY')
  } else {
    payday = moment(loanDateMoment).add(1, 'month').date(halfMonth).format('DD/MM/YYYY')
  }

  return payday
}

const calculateOverdueDays = async (payday, interestPaid) => {
  const paydayMoment = moment(payday, 'DD/MM/YYYY')
  const currentDate = moment()

  if (!interestPaid && currentDate.isAfter(paydayMoment)) {
    return currentDate.diff(paydayMoment, 'days')
  } else {
    return 0
  }
}

export { calculateInterestPaymentDate, calculateOverdueDays }
