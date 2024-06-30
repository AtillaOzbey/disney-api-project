document.addEventListener('DOMContentLoaded', () => {
  const fetchCharacters = fetch('https://api.disneyapi.dev/character').then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  });

  Promise.all([fetchCharacters])
    .then(([data]) => {
      const tvShowList = document.getElementById('tvshow-list');
      data.data.forEach(character => {
        if (character.tvShows && character.tvShows.length > 0) {
          const tvShowItem = document.createElement('div');
          tvShowItem.classList.add('tvshow-item', 'p-4', 'border', 'rounded', 'shadow', 'bg-white');
          tvShowItem.innerHTML = `
            <img src="${character.imageUrl}" alt="${character.name}" class="w-full h-auto rounded">
            <h2 class="text-lg font-bold mt-2">${character.name}</h2>
            <p>${character.tvShows.join(', ')}</p>
          `;
          tvShowList.appendChild(tvShowItem);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching TV shows:', error);
      document.getElementById('tvshow-list').innerHTML = '<p class="text-red-500">Failed to load TV shows. Please try again later.</p>';
    });
});
