const getLocationBtn = document.querySelector("#get-location");
const latitude = document.querySelector("#user-latitude");
const longitude = document.querySelector("#user-longitude");
const accuracy = document.querySelector("#user-accuracy");

let userLatitude;
let userLongitude;
let userAccuracy;


getLocationBtn.addEventListener("click", () => {
  getLocation();
});

function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(

     async function(position){
         userLatitude = position.coords.latitude;
         latitude.textContent = userLatitude.toFixed(6);

         userLongitude = position.coords.longitude;
         longitude.textContent = userLongitude.toFixed(6);

         userAccuracy = position.coords.accuracy;
         accuracy.textContent = `${userAccuracy} metres`;

        await  getAddress();

      },

      function(error){
        alert(error.message);
      }



    );
  }else{
    alert("Browser not supported!");
  }
}

 
async function getAddress(){
  const response =await  fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${userLatitude}&lon=${userLongitude}&format=json`,
  );

  const data = await response.json();

  console.log(data);

  const userDistrict = data.address.state_district;
  document.querySelector("#district").textContent = userDistrict;

  
  const userCity = data.address.city;
  document.querySelector("#city").textContent = userCity;

  const userState = data.address.state;
  document.querySelector("#state").textContent = userState;

  const userCountry = data.address.country;
  document.querySelector("#country").textContent = userCountry;

  const postalCode = data.address.postcode;
  document.querySelector("#postal-code").textContent = postalCode;

}