const endpoint =
    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios/";
const cities = [];

fetch(endpoint)
    .then((response) => response.json()) // busco os dados
    .then((data) => cities.push(...data)); // insiro os dados no array vazio

function findMatches(wordToMatch) {
    return cities.filter((place) => {
        // usar o filter para filtrar as palavras que dão match com o que for pesquisado
        const regex = new RegExp(wordToMatch, "gi");

        return place.nome.match(regex);
    });
}

function numberWithDot(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function displayMatches() {
    const matchAray = findMatches(this.value, cities);
    console.log(this.value);
    const html = matchAray
        .map((place) => {
            const regex = new RegExp(this.value, "gi");
            const cityName = place.nome.replace(
                regex,
                `<span class"h1">${this.value}</span>`
            );

            return `
      <li>
        <span class="name" >${cityName}</span>       
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