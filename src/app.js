document.addEventListener('DOMContentLoaded', () => {
  const fetchCharacters = fetch('https://api.disneyapi.dev/character').then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  });

  Promise.all([fetchCharacters])
    .then(([data]) => {
      const characterList = document.getElementById('character-list');
      data.data.forEach(character => {
        const characterItem = document.createElement('div');
        characterItem.classList.add('character-item', 'p-4', 'border', 'rounded', 'shadow', 'bg-white');
        characterItem.innerHTML = `
          <img src="${character.imageUrl}" alt="${character.name}" class="w-full h-auto rounded">
          <h2 class="text-lg font-bold mt-2">${character.name}</h2>
          <a href="character.html?id=${character._id}" class="text-blue-500">View Details</a>
        `;
        characterList.appendChild(characterItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});