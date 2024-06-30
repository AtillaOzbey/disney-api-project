document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const characterId = params.get('id');
  
  const fetchCharacter = fetch(`https://api.disneyapi.dev/character/${characterId}`).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  });

  Promise.all([fetchCharacter])
    .then(([data]) => {
      const character = data.data;
      document.getElementById('character-name').textContent = character.name;
      const characterDetails = document.getElementById('character-details');
      characterDetails.innerHTML = `
        <img src="${character.imageUrl}" alt="${character.name}" class="w-full h-auto rounded">
        <p><strong>Films:</strong> ${character.films.join(', ')}</p>
        <p><strong>TV Shows:</strong> ${character.tvShows.join(', ')}</p>
        <p><strong>Video Games:</strong> ${character.videoGames.join(', ')}</p>
        <p><strong>Park Attractions:</strong> ${character.parkAttractions.join(', ')}</p>
        <p><strong>Allies:</strong> ${character.allies.join(', ')}</p>
        <p><strong>Enemies:</strong> ${character.enemies.join(', ')}</p>
      `;
    })
    .catch(error => console.error('Error fetching character details:', error));
});
