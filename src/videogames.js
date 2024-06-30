document.addEventListener('DOMContentLoaded', () => {
  const fetchCharacters = fetch('https://api.disneyapi.dev/character').then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  });

  Promise.all([fetchCharacters])
    .then(([data]) => {
      const videoGameList = document.getElementById('videogame-list');
      data.data.forEach(character => {
        if (character.videoGames && character.videoGames.length > 0) {
          const videoGameItem = document.createElement('div');
          videoGameItem.classList.add('videogame-item', 'p-4', 'border', 'rounded', 'shadow', 'bg-white');
          videoGameItem.innerHTML = `
            <img src="${character.imageUrl}" alt="${character.name}" class="w-full h-auto rounded">
            <h2 class="text-lg font-bold mt-2">${character.name}</h2>
            <p>${character.videoGames.join(', ')}</p>
          `;
          videoGameList.appendChild(videoGameItem);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching video games:', error);
      document.getElementById('videogame-list').innerHTML = '<p class="text-red-500">Failed to load video games. Please try again later.</p>';
    });
});
