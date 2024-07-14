let rowCount = 0;
let entries = JSON.parse(localStorage.getItem('instagramList')) || [];

document.addEventListener('DOMContentLoaded', () => {
    entries.forEach((entry, index) => addEntryToTable(entry.link, entry.username, index + 1));
    rowCount = entries.length;
});

function addEntry() {
    const linkInput = document.getElementById('link');
    const usernameInput = document.getElementById('username');
    const link = linkInput.value;
    const username = usernameInput.value;

    if (!link || !username) {
        alert("Belum diisi yaa");
        return;
    }

    rowCount++;
    const entry = { link, username };
    entries.push(entry);
    localStorage.setItem('instagramList', JSON.stringify(entries));
    addEntryToTable(link, username, rowCount);

    // Clear input fields
    linkInput.value = '';
    usernameInput.value = '';
}

function addEntryToTable(link, username, number) {
    const tableBody = document.getElementById('instagram-list');
    const row = document.createElement('tr');

    const numberCell = document.createElement('td');
    numberCell.textContent = number;
    row.appendChild(numberCell);

    const usernameCell = document.createElement('td');
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.textContent = username;
    linkElement.target = "_blank";
    usernameCell.appendChild(linkElement);
    row.appendChild(usernameCell);

    const actionCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.onclick = () => editEntry(row, number - 1);
    actionCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => deleteEntry(row, number - 1);
    actionCell.appendChild(deleteButton);

    row.appendChild(actionCell);

    tableBody.appendChild(row);
}

function deleteEntry(row, index) {
    entries.splice(index, 1);
    localStorage.setItem('instagramList', JSON.stringify(entries));
    row.remove();
    resetRowNumbers();
}

function editEntry(row, index) {
    const newLink = prompt("Add New Url:", entries[index].link);
    const newUsername = prompt("Add New Username:", entries[index].username);

    if (newLink && newUsername) {
        entries[index].link = newLink;
        entries[index].username = newUsername;
        localStorage.setItem('instagramList', JSON.stringify(entries));
        updateRow(row, newLink, newUsername);
    } else {
        alert("Belum diisi yaa");
    }
}

function updateRow(row, link, username) {
    const linkElement = row.querySelector('a');
    linkElement.href = link;
    linkElement.textContent = username;
}

function resetRowNumbers() {
    rowCount = 0;
    const rows = document.querySelectorAll('#instagram-list tr');
    rows.forEach((row, index) => {
        const numberCell = row.firstChild;
        numberCell.textContent = index + 1;
        rowCount++;
    });
}
