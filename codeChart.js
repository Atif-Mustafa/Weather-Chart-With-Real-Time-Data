const ctx = document.getElementById('myChart');
      
let weather = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Weather Update ',
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    layout:{
        padding: 20
    },
    scales: {
      x:{
        
        position: 'bottom',
        title:{
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        title:{
          display: true,
          text:'Teperature in Celsius'
        }
      }
    }
  }
});