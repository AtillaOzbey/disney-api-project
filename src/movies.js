document.addEventListener('DOMContentLoaded', () => {
  const fetchCharacters = fetch('https://api.disneyapi.dev/character').then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  });

  Promise.all([fetchCharacters])
    .then(([data]) => {
      const movieList = document.getElementById('movie-list');
      data.data.forEach(character => {
        if (character.films && character.films.length > 0) {
          const movieItem = document.createElement('div');
          movieItem.classList.add('movie-item', 'p-4', 'border', 'rounded', 'shadow', 'bg-white');
          movieItem.innerHTML = `
            <img src="${character.imageUrl}" alt="${character.name}" class="w-full h-auto rounded">
            <h2 class="text-lg font-bold mt-2">${character.name}</h2>
            <p>${character.films.join(', ')}</p>
          `;
          movieList.appendChild(movieItem);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
      document.getElementById('movie-list').innerHTML = '<p class="text-red-500">Failed to load movies. Please try again later.</p>';
    });
});
