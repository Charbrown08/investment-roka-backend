const parsedUserSchemaResponse = (response) => {
  return {
    id: response.id,
    name: response.name,
    lastName: response.lastName,
    email: response.email,
    numbersPhone: response.numbersPhone,
    age: response.age,
    address: response.address
  }
}

export default parsedUserSchemaResponse
