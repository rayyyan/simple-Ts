const form = document.querySelector("form")! as HTMLFormElement
const addressInput = document.getElementById("address")! as HTMLInputElement

console.log(process.env.DB_HOST)

function searchAddressHandler(event: Event) {
  event.preventDefault()
  const enteredAddress = addressInput.value

  //sending to google api
}

form.addEventListener("submit", searchAddressHandler)
