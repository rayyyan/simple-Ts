import axios from "axios"

const form = document.querySelector("form")! as HTMLFormElement
const addressInput = document.getElementById("address")! as HTMLInputElement

const Key = process.env.API_KEY
type GoogleGeoCodingResponse = {
  result: { geometry: { location: { lat: number; lng: number } } }[]
  status: "OK" | "ZERO_RESULTS"
}
declare var google: any
function searchAddressHandler(event: Event) {
  event.preventDefault()
  const enteredAddress = addressInput.value
  axios
    .get<GoogleGeoCodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${Key}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location ")
      }
      const coordinates = response.data.result[0].geometry.location
      const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: 17,
      })
      new google.maps.Marker({ position: coordinates, map: map })
    })
    .catch((err) => {
      alert(err.message)
      console.log(err)
    })
  //sending to google api
}

form.addEventListener("submit", searchAddressHandler)
