const form = document.querySelector('form');
const entryList = document.getElementById('entryList');
let userEntries = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const entryInput = document.getElementById('entry');
  const entryText = entryInput.value;
  if (entryText === '') {
    return;
  }
  const entry = {
    text: entryText,
    user: 'User' + (userEntries.length + 1),
  };
  userEntries.push(entry);
  const entryElement = createEntryElement(entry);
  entryList.appendChild(entryElement);
  entryInput.value = '';
});

entryList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    const entryElement = event.target.closest('li');
    const entryUser = entryElement.getAttribute('data-user');
    const currentUser = userEntries[userEntries.length - 1].user;
    // Check if the current user matches the user who created the entry
    if (entryUser === currentUser) {
      // Remove the entry from the userEntries array
      userEntries = userEntries.filter(entry => entry.user !== entryUser);
      // Remove the entry element from the DOM
      entryElement.remove();
    }
  }
});

function createEntryElement(entry) {
  const li = document.createElement('li');
  li.innerText = entry.text;
  li.setAttribute('data-user', entry.user);
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('delete-button');
  // Disable the delete button if the entry was not created by the current user
  if (entry.user !== userEntries[userEntries.length - 1].user) {
    deleteButton.disabled = true;
    deleteButton.classList.add('disabled');
  }
  li.appendChild(deleteButton);
  return li;
}






