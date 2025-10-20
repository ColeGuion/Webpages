const Linux_Commands = [
    //["COMMAND", "DESCRIPTION"],
    //["chmod +x script.sh", "Make a script executable"],
    //["./script.sh", "Run a script in the current directory"],
    //["bash script.sh", "Run a bash script in the current directory"],
    //["source script.sh", "Run a bash script in the current shell (keeps any changes to env variables)"],
    ["nano ~/.bashrc", "Edit linux bash profile"],
    ["nano ~/.bash_aliases", "Edit linux bash script for aliases",],
    ["source ~/.bashrc", "Apply the changes to ~/.bashrc",],
    ["<span>realpath /Models/GibbOnnx/<br><span style=\"color: green; font-weight: normal\">/home/tech/Documents/Models/GibbOnnx</span></span>", "Get full path from any spot"],
    ["mv /path/to/src/* /path/to/destination/", "Move all files from one directory to another"],
    ["ls -l FILE", "View file permissions"],
    ["pip list | grep tr", "List pip modules that contain <em>\"tr\"</em>"],
    ["pip list | grep -E '^(tr|opt)|onnx'", "List pip modules that start with <em>\"tr\"</em> or <em>\"opt\"</em> OR contain the string <em>\"onnx\"</em>"],
    ["ps aux | head -n 5", "View the first 5 running processes"],
    ["pip list --format=freeze > requirements.txt", "Create requirements.txt file from current pip modules"],
    ["pip install -r requirements.txt", "Install pip modules from requirements.txt file"],
    ["hostname -I", "IP Address"],
    ["cd -", "Previous Directory"],
    ["cd ~", "Home Directory"],
    ["!!", "Repeat last command"],
    ["!$", "Last argument of previous command"],
    ["mv f1.txt dir", "Move `f1.txt` to the specified directory"],
    ["mv f1.txt newFile.txt", "Rename `f1.txt` to `newFile.txt`"],
    ["find ./Models -type f -name \"tokenizer.json\" | wc -l", "Find the amount of `tokenizer.json` files anywhere inside the `/Models` directory"],
    ["find . -type f -size +100M", "Find files larger than 100MB in current directory"],
    ["tree -L 2", "Show directory structure up to 2 levels deep"],
    ["sudo apt upgrade -y", "Upgrades all installed packages without asking for confirmation"],
    ["ps -eo pid,comm,%cpu --sort=-%cpu | awk 'NR==1 || $3>0.5'", "Running processes using more than .5% of the CPU (`NR==1` displays headings)"],
    ["ps -eo %cpu,comm,cmd,pid --sort=-%cpu | head -n 8", "Display the first 8 running processes sorted by cpu usage"],
    ["wget URL", "Download a file"],
    ["alias ll='ls -lh'", "Create a bash alias `ll` that runs `ls -lh`"],
    ["<span>man ps</span><br>$ <span>ps --help</span><br>$ <span>ps --help all</span><br>$ <span>info ps</span>", "Get Help for the Linux `ps` command"],

    // "Memory Management" Section
    ["HEADER", "Memory Management", "lx-memory"], // [HEADER, Name, id]
    ["ls -lh", "Get the size of every file in a folder"],
    ["df -h", "Available disk space"],
    ["du -sh /home/tech/Downloads/", "Get the size of the Downloads folder"],
    ["du -h --max-depth=1 /Models | sort -hr", "List the sizes of the largest folders in `/Models`<br>Change to `du -ah` to list files too"],
    ["du -ah ~ | sort -rh | head -20", "Check large files in home directory"],

    // "Screen" Section
    ["HEADER", "Screen", "lx-screen"], 
    ["screen", "Start a new screen session"],
    ["screen -ls", "List available screens"],
    ["screen -s <name>", "Start a new named screen session"],
    ["screen -r <ID or name>", "Reattach a detached screen"],
    ["screen -d <ID or name>", "Detach a running screen session remotely"],
    ["screen -X -S <ID or name> quit", "Kill a specific screen session"],
    ["screen -wipe", "Remove dead (terminated screen sessions)"],

    // "Advanced & GPU" Section
    ["HEADER", "Advanced & GPU", "lx-gpu"], 
    ["nvtop", "GPU Usage"],
    ["htop", "CPU Usage"],
    ["mokutil --sb-state", "Check if secure boot is enabled"],
    ["sudo systemctl reboot --firmware-setup", "Reboot directly into secure boot"],
    ["uname -r", "Get the kernel version"],
    ["lspci | grep -i vga", "List GPU driver (GeForce 2080)"],
    ["lsmod | grep nvidia", "List nvidia stuff (drivers? modules?)"],
];


let cole=true;
const Python_Commmands = [
    {
        Description: "List Indexing",
        Code: `
            x = [1,2,3,4,5,6,7,8,9,10]
            x[:<b class="idx">3</b>]   # [1, 2, 3]
            x[<b class="idx">3</b>:]   # [4, 5, 6, 7, 8, 9, 10]

            x[<b class="idx">3</b>:<b class="idx">6</b>]  # [4, 5, 6]
            x[<b class="idx">-3</b>:]  # [8, 9, 10]
            x[:<b class="idx">-3</b>]  # [1, 2, 3, 4, 5, 6, 7]

            x[::<b class="idx">2</b>]  # [1, 3, 5, 7, 9]
            x[::<b class="idx">3</b>]  # [1, 4, 7, 10]
        `
    },
    {
        Description: "Print Formatting",
        Code: `
            x = <span class="str">"I Love Cake"</span>
            x.center(20, <span class="str">'_'</span>) # "____I Love Cake_____"
            x.ljust(20, <span class="str">'_'</span>) # "I Love Cake_________"
            x.rjust(20, <span class="str">'_'</span>) # "_________I Love Cake"
        `
    },
    {
        Description: "Check if a path exists on your computer",
        Code: `
            os.path.exists(<span class="str">"/home/tech/Documents/GEC"</span>)
        `
    },
    {
        Description: "Count the number of unique \"type\" values in a list of object",
        Code: `
            from collections import Counter
            type_counts = Counter(obj[<span class="str">"type"</span>] for obj in x)

            # Print the results
            for type_name, count in type_counts.items():
                print(<b>f</b><span class="str">"{type_name}: {count}"</span>)
        `
    },

    //***** Dictionaries *****
    {
        Description: "",
        Code: `
            CODE
        `
    },
    {
        Description: "",
        Code: `
            CODE
        `
    },
]

function Fill_PyTable() {
    const pyTable = document.getElementById('python-table');

    Python_Commmands.forEach(item => {
        // Strip whitespace and remove first 8 characters from each line
        const codeStr = item.Code
            .trim()
            .split('\n')
            .map(line => line.replace(/^\s{0,12}/, '')) // Remove up to 12 leading spaces
            .map(line => line.includes('#') ? line.replace('#', '<span class="comment">#') + '</span>' : line) // Wrap comments in span
            .join('\n');
        
        pyTable.innerHTML += `<tr><td class="code">${codeStr}</td><td class="description">${item.Description}</td></tr>`;
        
    });
}

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

    //Fill_PyTable(); //* Works, but haven't extended past Dictionaries yet
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
    console.log(headerRow);
    console.log(headerRow.parentNode.parentNode);
    console.log(headerRow.nextSibling);
    
    Linux_Commands.reverse();
    Linux_Commands.forEach(command => {
        const row = document.createElement('tr');

        if (command[0] === "HEADER") {
            // Create a header row
            row.id = command[2];
            row.innerHTML = `<td colspan="2" class="tabSect">${command[1]}</td>`;
        } else {
            const commandCell = document.createElement('td');
            commandCell.className = 'commands';
            if (command[0].startsWith("<span>")) {
                commandCell.innerHTML = command[0];
            } else {
                const commandSpan = document.createElement('span');
                commandSpan.textContent = command[0];
                commandCell.appendChild(commandSpan);
            }
            
            const descCell = document.createElement('td');
            descCell.className = 'description';
            descCell.innerHTML = command[1];

            row.appendChild(commandCell);
            row.appendChild(descCell);
        }
        
        // Insert after the header row but before the existing rows
        //headerRow.parentNode.parentNode.appendChild(row);
        headerRow.parentNode.insertBefore(row, headerRow.nextSibling);
    });
}

// Python section button bar scroll
function scrollToPySection(trId) {
    var el = document.getElementById(trId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('sect-highlight');
        setTimeout(function() {
            el.classList.remove('sect-highlight');
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


