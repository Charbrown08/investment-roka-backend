const parsedUserSchemaResponse = (response) => {
  return {
    id: response.id,
    name: response.name,
    surname: response.surname,
    age: response.age,
    city: response.city,
    email: response.email,
    profession: response.profession,
    companyName: response.companyName,
    phoneNumbers: response.phoneNumbers,
    homeAddress: response.homeAddress,
    workAddress: response.workAddress,
    guarantorName: response.guarantorName,
    guarantorPhone: response.guarantorPhone,
    guarantorAddress: response.guarantorAddress,
    loanAmount: response.loanAmount,
    loanDate: response.loanDate,
    interestRate: response.interestRate,
    //  automatic
    interest: response.interest,
    status: response.status,
    systemEntryDate: response.systemEntryDate,
    payday: response.payday,
    amountWithInterest: response.amountWithInterest,
    daysOverdue: response.daysOverdue,
    interestPaid: response.interestPaid
  }
}

export default parsedUserSchemaResponse
