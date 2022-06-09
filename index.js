const ApiUrl = "https://pokeapi.co/api/v2/pokemon/";

const input = document.getElementById('search');
const render = document.getElementById('render');
const form = document.getElementById('form');

form.addEventListener('submit', async(e) => {
            e.preventDefault();
            const pokemon = input.value;
            e.target.reset();

            try {
                const response = await fetch(`${ApiUrl}${pokemon.toLowerCase()}`);
                const JsonResponse = await response.json();

                const { id, name, weight, height, sprites, types, stats, abilities } = JsonResponse;
                const { front_default: image } = sprites;

                render.innerHTML = `<section>
    <div class="card">
      <img src="${image}" alt="imagen poke">
      <div>
         <h3>${id} ${name}</h3>
    </div>
    <div>
         <span>
           <p><span>Peso: </span>${weight} lbs</p>
           <p><span>Altura: </span>${height}'</p>
         </span>
    </div>
    <span>
        <h4>Tipos:</h4>
        <ul>
          ${types.map(item=>{
         return `<li> ${item.type.name} </li>`;
          })
        .join('')}
         </ul>
    </span>
    <span>
        <h4>Stats:</h4>
        <ul>
        ${stats.map((item) => {
                return `<li>${item?.stat?.name}:<span>${item?.base_stat}</span></li>`;
            })
            .join('')}
        </ul>
    </span>
    <span>
        <h4>Habilidades:</h4>
        <ul>
        ${abilities.map((item) => {
            return `<li>${item?.ability?.name}</li>`;
        })
        .join('')}
         </ul>
    </span>
    </div>
    </section>`;
}
catch (error){
render.innerHTML= `<h1> El pokemon que estas buscando no existe </h1>`
}
});