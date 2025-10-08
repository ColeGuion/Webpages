const shortcut_tables = {
    "chrome": {
        "Navigation": [
            ["CTRL + T", "Open a New Tab"],
            ["CTRL + W", "Close the current tab"],
            ["CTRL + TAB", "Go to the Next tab"],
            ["CTRL + SHIFT + TAB", "Go to the Previous tab"],
            ["CTRL + 1<b>-</b>8", "Jump to a specific tab"],
            ["CTRL + 9", "Jump to rightmost tab"],
            ["CTRL + SHIFT + PgUp<b>/</b>PgDown", "Move tab Left/Right"]
        ],
        "More Actions": [
            ["CTRL + R", "Normal Reload"],
            ["CTRL + SHIFT + R", "Hard Reload"],
            ["WIN + TAB", "Open Task View"],
            ["CTRL + D", "Duplicate Tab"],
            ["F11", "Full screen mode"],
            ["ALT + F", "Select & print html element in console"],
            ["ALT + G", "Open Gemini"],
        ],
        "Editing": [
            ["CTRL + Z", "Undo Change"],
            ["CTRL + Y", "Redo Change"],
        ]
    }
}

function FillTables() {
    for (const section_id in shortcut_tables) {
        const section_element = document.getElementById(section_id);
        const cuts_div = section_element.querySelector('.cuts');
        
        for (const table_name in shortcut_tables[section_id]) {
            // Create new table
            const newTable = document.createElement('div');
            newTable.classList.add('scTable');

            // Fill table with shortcuts
            newTable.innerHTML = `<div class="tableName">${table_name}</div>`;
            shortcut_tables[section_id][table_name].forEach(row => {
                newTable.innerHTML += `<div>${row[0]}</div><div>${row[1]}</div>`;
            });
            cuts_div.appendChild(newTable);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    FillTables();
});

