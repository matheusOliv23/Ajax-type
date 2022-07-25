const endpoint =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";


const cities = [];

fetch(endpoint)
    .then((response) => response.json()) // busco os dados
    .then((data) => cities.push(...data)); // insiro os dados no array vazio

function findMatches(wordToMatch) {
    return cities.filter((place) => {
        // usar o filter para filtrar as palavras que dão match com o que for pesquisado
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex);
    });
}

function numberWithDot(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function displayMatches() {
    const matchAray = findMatches(this.value, cities);
    const html = matchAray
        .map((place) => {
            const regex = new RegExp(this.value, "gi");
            const cityName = place.city.replace(
                regex,
                `<span class"h1">${this.value}</span>`
            );
            const stateName = place.state.replace(
                regex,
                `<span class"h1">${this.value}</span>`
            );
            return `
      <li>
        <span class="name" >${cityName}, ${stateName}</span>
        <span class="population" >${numberWithDot(place.population)}</span>
      </li>
    `;
        })
        .join("");
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);