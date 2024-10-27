(async () => {
    const url = 'https://api.tradingeconomics.com/news';
    const headers = { 'Authorization': '259af8797951407:3dpfepx232zbvlj' };
    const newsBoard = document.getElementById("news-board");

    try {
        const response = await fetch(url, { method: 'GET', headers });
        const data = await JSON.parse(await response.text());
        data.forEach(newsItem => {
            const newsCard = `
            <div class="uk-card uk-card-body uk-card-default shadow-none border-none">
                <h1 class="font-bold text-2xl">${newsItem.title}</h1>
                <div class="mt-2">
                    <span class="uk-badge uk-badge-secondary">${newsItem.country}</span>
                    <span class="uk-badge uk-badge-primary">${newsItem.category}</span>
                    <span class="uk-badge">${new Date(newsItem.date).toLocaleString()}</span>
                </div>
                <p class="uk-margin">
                    ${newsItem.description}
                </p>
                <div class="uk-card-footer uk-flex uk-flex-between">
                    <a href="#"></a>
                    <a href="https://tradingeconomics.com${newsItem.url}">
                        <button class="uk-button uk-button-primary">More</button>
                    </a>
                </div>
            </div>
            `
            newsBoard.innerHTML += newsCard
        })
    } catch (error) {
        console.error(error);
        alert("Something went wrong!")
        newsBoard.innerHTML += '<h1><span class="uk-text-danger">Somethig went wrong! Refrech.</span></h1>'
    }
    document.getElementById("loading-indicator").remove();


    if (window.innerWidth < 480) {
        document.getElementById("main").style.flexDirection = "column"
    }
})();