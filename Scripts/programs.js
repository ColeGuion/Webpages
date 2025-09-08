
const Linux_Commands = [
    //["COMMAND", "DESCRIPTION"],
    //["chmod +x script.sh", "Make a script executable"],
    //["./script.sh", "Run a script in the current directory"],
    //["bash script.sh", "Run a bash script in the current directory"],
    //["source script.sh", "Run a bash script in the current shell (keeps any changes to env variables)"],
    ["alias ll='ls -lh'", "Create a bash alias `ll` that runs `ls -lh`"],
    ["wget URL", "Download a file"],
    ["ps -eo %cpu,comm,cmd,pid --sort=-%cpu | head -n 8", "Display the first 8 running processes sorted by cpu usage"],
    ["ps -eo pid,comm,%cpu --sort=-%cpu | awk 'NR==1 || $3>0.5'", "Running processes using more than .5% of the CPU (`NR==1` displays headings)"],
    ["sudo apt upgrade -y", "Upgrades all installed packages without asking for confirmation"],
    ["tree -L 2", "Show directory structure up to 2 levels deep"],
    ["find . -type f -size +100M", "Find files larger than 100MB in current directory"],
    ["find ./Models -type f -name \"tokenizer.json\" | wc -l", "Find the amount of `tokenizer.json` files anywhere inside the `/Models` directory"],
    ["mv f1.txt newFile.txt", "Rename `f1.txt` to `newFile.txt`"],
    ["mv f1.txt dir", "Move `f1.txt` to the specified directory"],
    ["!$", "Last argument of previous command"],
    ["!!", "Repeat last command"],
    ["cd ~", "Home Directory"],
    ["cd -", "Previous Directory"],
    ["hostname -I", "IP Address"],
    ["pip install -r requirements.txt", "Install pip modules from requirements.txt file"],
    ["pip list --format=freeze > requirements.txt", "Create requirements.txt file from current pip modules"],
    ["ps aux | head -n 5", "View the first 5 running processes"],
    ["pip list | grep -E '^(tr|opt)|onnx'", "List pip modules that start with <em>\"tr\"</em> or <em>\"opt\"</em> OR contain the string <em>\"onnx\"</em>"],
    ["pip list | grep tr", "List pip modules that contain <em>\"tr\"</em>"],
    ["ls -l FILE", "View file permissions"],
    ["source ~/.bashrc", "Apply the changes to ~/.bashrc",],
    ["nano ~/.bash_aliases", "Edit linux bash script for aliases",],
    ["nano ~/.bashrc", "Edit linux bash profile"],
];

document.addEventListener("DOMContentLoaded", function () {
    // Initialize the page
    addCommands();
    highlightSection();

    // Add onclick attribute to every <td> element with class="commands"
    const commandCells = document.querySelectorAll('table td.commands');
    commandCells.forEach(function(td) {
        td.setAttribute('onclick', 'copyText(this)');
    });
    

    // Handle the hash when the page loads
    //window.addEventListener('load', highlightSection);
    // Also handle hash changes (e.g., when user clicks a link)
    window.addEventListener('hashchange', highlightSection);
});

// Click on and copy the code block
function copyText(element) {
    let text = "";
    element.querySelectorAll('span').forEach(span => {
        // Remove text in angle brackets <>
        const cleanedText = span.innerText.replace(/<.*?>/g, '');
        text += cleanedText + "\n";
    });
    navigator.clipboard.writeText(text)
        .then(() => {
            const tooltip = document.createElement('div');
            tooltip.className = "copied-tooltip";
            tooltip.textContent = 'Copied!';
            const rect = element.getBoundingClientRect();
            
            console.log(`Element Position - Top: ${rect.top}, Left: ${rect.left}`);
            console.log(`Element Offset - Top: ${element.offsetTop}, Left: ${element.offsetLeft}, Width: ${element.offsetWidth}`);
            console.log(element);
            //tooltip.style.top = rect.top + 'px';
            //tooltip.style.left = (element.offsetLeft + element.offsetWidth/2) + 'px';
            tooltip.style.top = element.offsetTop + 190 + 'px';
            tooltip.style.left = (element.offsetLeft + element.offsetWidth/2) + 'px';
            document.body.appendChild(tooltip);
            
            // Remove tooltip after 1 second
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 300); // Wait for fade out to complete
            }, 1000);
        })
        .catch((err) => {
            console.error('Failed to copy text: ', err);
        });
}

// Fill out tables
function addCommands() {
    const table = document.getElementById('linux-table');
    if (!table || table.rows.length < 1) return; // Ensure table exists

    // Get the header row (first row)
    const headerRow = table.rows[0];
    
    Linux_Commands.forEach(command => {
        const row = document.createElement('tr');
        
        const commandCell = document.createElement('td');
        commandCell.className = 'commands';
        const commandSpan = document.createElement('span');
        commandSpan.textContent = command[0];
        commandCell.appendChild(commandSpan);
        
        const descCell = document.createElement('td');
        descCell.className = 'description';
        descCell.innerHTML = command[1];
        
        row.appendChild(commandCell);
        row.appendChild(descCell);
        
        // Insert after the header row but before the existing rows
        //table.insertBefore(row, table.rows[1]);
        headerRow.parentNode.insertBefore(row, headerRow.nextSibling);
        
        
    });
}

// Python section button bar scroll
function scrollToPySection(trId) {
    var el = document.getElementById(trId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('py-highlight');
        setTimeout(function() {
            el.classList.remove('py-highlight');
        }, 1200);
    }
}

// Highlight and display this programming language section
function highlightSection() {
    // Hide all sections
    document.querySelectorAll('.active-section').forEach(section => {
        section.classList.remove('active-section');
    });
    document.querySelectorAll('#prognav a').forEach(link => {
        link.classList.remove('active');
    });

    const hash = window.location.hash.substring(1); // Get value after '#'
    const hash_sect = `${hash.toLowerCase()}-sect`;
    console.log(`Hash Section: "${hash_sect}"`);

    if (hash_sect) {
        const target = document.getElementById(hash_sect);
        if (target) {
            target.classList.add('active-section');
        }
        const activeLink = document.querySelector(`#prognav a[data-target="${hash_sect}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}


