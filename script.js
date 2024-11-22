

let apiKey = "da879f23a7564a8da5b34102242111";

function fetchLocation(){
     navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    fetchData(latitude, longitude);

}
function onError(){
    console.log("Failed to get your location")
}



setInterval(()=>{
    fetchLocation();
}, 5000);

fetchLocation();


// Chat GPT 

// Updated updateChart function to animate data points
function updateChart(dataToUpdate) {
    let date = new Date();
    
    // Get the old data point (last temperature) if it exists
    const oldTemp = weather.data.datasets[0].data.length > 0 
        ? weather.data.datasets[0].data[weather.data.datasets[0].data.length - 1]
        : 0;
    
    // Get the new temperature from the API response
    const newTemp = dataToUpdate.current.temp_c;

    // Animate the transition using Anime.js
    anime({
        targets: { temp: oldTemp },
        temp: newTemp,
        easing: 'easeInOutQuad',
        duration: 1000,
        round: 1,
        update: function (anim) {
            // Update the latest temperature during the animation
            weather.data.datasets[0].data[weather.data.datasets[0].data.length - 1] = anim.animations[0].currentValue;
            weather.update('none'); // Disable default Chart.js animation
        },
        complete: function () {
            // Once the animation completes, push new data to the chart
            weather.data.labels.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
            weather.data.datasets[0].data.push(newTemp);
            weather.update(); // Update the chart with the new data point
        }
    });
}

function showLoadingAnimation() {
    anime({
        targets: '#chart-container',
        opacity: [0.5, 1],
        duration: 500,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: 2
    });
}


async function fetchData(latitude, longitude) {
    showLoadingAnimation(); // Show loading animation
    let location = `${latitude} ${longitude}`;
    
    try {
        const rawdata = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
        const data = await rawdata.json();
        updateChart(data);
    } catch (error) {
        console.log(error);
    }
}
