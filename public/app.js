// POSTING DATA TO API
function setup() {
    let lat, lon;
    noCanvas();
    //Create var hold pic through video source (webcam)
    const video = createCapture(VIDEO);
    video.size(320, 240);
    video.loadPixels();
    const image = video.canvas.toDataURL();
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        lat = position.coords.latitude.toFixed(2);
        lon = position.coords.longitude.toFixed(2);
        document.getElementById('lat').textContent = lat;
        document.getElementById('lon').textContent = lon;
    })

    document.querySelector('#submit').addEventListener('click', async () => {
        const mood = document.getElementById('mood').value;
        const data = { mood, lat, lon, image };
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch('/api', options);
        const feedback = await response.json();
        console.log(feedback);
    })
}
