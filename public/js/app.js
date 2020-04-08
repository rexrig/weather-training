

const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#weather-output')
weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = encodeURI(search.value)
    msg1.textContent = 'Loading'
        fetch('/weather?location='+location).then((response) => {
            
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = data.error
                } else {

                str = 'The current weather in ' + data.location + ' is '
                str += data.forcast.current.weather_descriptions + ' and the tempiture is ' 
                str += data.forcast.current.temperature + ' degrees celsius and feels like ' 
                str += data.forcast.current.feelslike + ' degrees celsius'
                msg1.textContent = str
            }
                

            })
        })

})
