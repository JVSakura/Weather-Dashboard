const button = document.querySelector('.button')
//const inputValue = document.querySelector('.inputValue')
const name = document.querySelector('.name');
const description = document.querySelector('.description');
const temperature = document.querySelector('.temperature');

//button.addEventListener('click', function () {
//fetch(`https://api.openweathermap.org/data/2.5/forecast?q='${inputValue}'&appid=e468a5ea337d341b2776e0ac72dbe4c1`)
//.then(response => response.json())
//.then(data => {
// let nameValue = data['name'];
// let temperatureValue = data['main']['temp'];
//let descriptionValue = date['weather'][0]['description'];

//name.innerHTML = nameValue;
//temp.innerHTML = temperatureValue;
//description.innerHTML = descriptionValue;


// .catch(err => console.error(err))

document.getElementById('button').addEventListener('click', event => {
  let inputValue = document.getElementsByClassName('inputValue').value
  console.log(inputValue)

  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${'london'}&appid=e468a5ea337d341b2776e0ac72dbe4c1`)
    .then(res => {
      let display = res.data
      console.log(display)



    })
})