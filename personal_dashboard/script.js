
document.getElementById('user-name').textContent = 'James,'
function loadDate() {
    var date = new Date().toString().split(" ").splice(0, 4).join(" ");
    //date = date
    $("#dateEl").text(date)    
    console.log(date);
}

function loadWeather() {
    var weather = $('#weather')
    var url = 'api.openweathermap.org/data/2.5/weather'
    var apiKey = '0f4c536d3ba206da76f3e1570f5004ce'

    function success(position) {
        var lat = position.coords.latitude
        var lon = position.coords.longitude
        $.getJSON(url + '?units=imperial&lat=' + lat + 
            '&lon=' + lon + 
            '&appid=' +
            apiKey, function(data){
                var main = data.main
                weather.text ('Based on your location, the weather is ' + main.temp +  '°F right now')
            })
    }

    function error() {
        alert('unable to load your location for weather')
    }

    navigator.geolocation.getCurrentPosition(success, error);
    weather.text('fetching weather...')

}

function loadNews() {
    var news = $('#news')
    var url = 'https://newsapi.org/v2/top-headlines?sources=the-next-web&apiKey='
    var apiKey = '2bae5168f3ec43468839341f3a36646f'

    $.getJSON(url+apiKey, function(data) {
        var titles = data.articles.map(function(article) {
            return '<a href=' + article.url + '>' + article.title + '</a>'
        })
        news.html(titles.join('<br><br>'))
    })
     
    news.text('fetching news...')
}

loadDate();
loadWeather();
loadNews();
