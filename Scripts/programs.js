const Linux_Commands = [
    //TODO: Make certain parts of command not copyable (like the C:\\Users\\Cole\\Docs path)
    /* [
        //"<span>scp tech@172.21.188.179:<div class='ignore'>/home/tech/f1.txt C:\\Users\\Cole\\Docs</div></span>", 
        //"<span>scp tech@172.21.188.179:</span><div class='ignore'>/home/tech/f1.txt C:\\Users\\Cole\\Docs</div>", 
        "<span>scp tech@172.21.188.179:</span>/home/tech/f1.txt C:\\Users\\Cole\\Docs", 
        "Copy file from Linux <i class=\"fas fa-arrow-right\"></i> Windows machine"
    ], */
    //["COMMAND", "DESCRIPTION"],
    //["chmod +x script.sh", "Make a script executable"],
    //["./script.sh", "Run a script in the current directory"],
    //["bash script.sh", "Run a bash script in the current directory"],
    //["source script.sh", "Run a bash script in the current shell (keeps any changes to env variables)"],
    ["nano ~/.bashrc", "Edit linux bash profile"],
    ["nano ~/.bash_aliases", "Edit linux bash script for aliases",],
    ["source ~/.bashrc", "Apply the changes to ~/.bashrc",],
    ["<span>realpath /Models/GibbOnnx/<br><span style=\"color: green; font-weight: normal\">/home/tech/Documents/Models/GibbOnnx</span></span>", "Get full path from any spot"],
    ["mv -i /path/to/src/* /path/to/destination/", "Move all files from one directory to another<br>Use `<b>-i</b>` to prompt before overwriting any existing files."],
    [
        [
            "<span>find . -name \"*Word*\"</span><br>",
            "<span class=\"comment\">// Case insensitive search</span><br>",
            "$ <span>find . -iname \"*Word*\"</span><br>",
            "<span class=\"comment\">// Search only for directories</span><br>",
            "$ <span>find . -type d -name \"*Word*\"</span>",
        ], "Find file or folder with the word <em>\"Word\"</em> in it"
    ],
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

    // "Processes" Section
    ["HEADER", "Processes", "lx-processes"], 
    ["ps", "Show processes for current shell"],
    ["ps aux", "Show all processes for all users"],
    ["ps -p PID", "Show specific process by PID"],
    ["top", "Interactive process viewer"],
    ["pgrep process_name", "Find PIDs by process name"],
    ["ps aux | grep process_name", "Classic grep search"],
    ["kill PID", "Graceful termination"],
    ["kill -9 PID", "Forceful kill"],
    ["killall process_name", "Kill all processes by name"],
    ["kill -STOP PID", "Pause process"],
    ["ps -o pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head", "Top CPU processes"],
    ["ps -o pid,ppid,cmd,%mem,%cpu --sort=-%mem | head", "Top memory processes"],
    ["<span>ps aux --sort=-%cpu | head -10</span><br>$ <span>ps aux --sort=-%mem | head -10</span>", "Top 10 cpu / memory using processes"],

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

const Powershell_Commands = [
    //TODO: Make certain parts of command not copyable (like the C:\\Users\\Cole\\Docs path)
    [
        "scp tech@172.21.188.179:/home/tech/f1.txt C:\\Users\\Cole\\Docs", 
        "Copy file from Linux <i class=\"fas fa-arrow-right\"></i> Windows machine"
    ],
    [
        "scp C:\\Users\\Cole\\Docs\\f1.txt tech@172.21.188.179:/home/tech/Documents", 
        "Copy file from Windows <i class=\"fas fa-arrow-right\"></i> Linux machine"
    ],
    [
        [
            "<span>$size = (Get-ChildItem \"C:\\Users\\Cole\\Documents\\Data\" -Recurse | Measure-Object -Property Length -Sum).Sum</span>",
            "<pre>5501150314</pre>",
            "<span><span style=\"font-weight: normal\">$</span> Write-Host \"Folder size: $([math]::Round($size/1MB, 2)) MB\"</span>",
            "<pre>Folder size: 5246.31 MB</pre>",
            "<span><span style=\"font-weight: normal\">$</span> Write-Host \"Folder size: $([math]::Round($size/1GB, 2)) GB\"</span>",
            "<pre>Folder size: 5.12 GB</pre>"
        ], 
        "Get folder size and print it in MB / GB"
    ],
    [
        "Get-ChildItem -Path . -Recurse -Include *repetition*",
        "Find file or folder with the word <em>\"repetition\"</em> in it",
    ],
    [
        "ps -Name ssh | select Id, Name, CPU, StartTime",
        "Get details from running processes with the name \"ssh\""
    ],
    [
        "Stop-Process -Id 28488",
        "Stop a running process by PID"
    ],
    [
        "pip list | Select-String \"tr\"",
        "List pip modules that contain \"tr\""
    ],
    [
        "ps | sort cpu -d | select -Property id,name,cpu",
        "List running processes by CPU usage. Show the ID, Name, & CPU level"
    ],
    [
        "ps | sort cpu -d | where {$_.cpu -gt 100}",
        "List running processes by CPU usage. Only show those with a CPU level > 100"
    ],
    [
        "tasklist | findstr pyth",
        "List running processes and show only those that contain the word \"pyth\""
    ],
    [
        "ipconfig | findstr /R \"IPv4.*\"",
        "Find IP address directly by only returning line starting with \"IPv4\""
    ],
    [
        "Get-ChildItem | ForEach-Object { \"### $($_.Name)\" }",
        "Print all files with \"### \" in front of the file name"
    ],
    [
        "Get-ChildItem -Path .\\Documents -Filter *.ps1 -Recurse -File",
        "Find all .ps1 files in the Documents folder."
    ],
    [
        "Get-ChildItem -Path C:\\Users\\Cole\\Documents -Name *Profile* -Recurse",
        "Find all files and folders with the word <em>\"Profile\"</em> in them."
    ]

];

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
    addCommands('linux-table');
    addCommands('powershell-table');
    highlightSection();

    // Add onclick attribute to every <td> element with class="commands"
    /* document.querySelectorAll('table td.commands').forEach(function(td) {
        td.setAttribute('onclick', 'copyText(this)');
    }); */

    // Handle the hash when the page loads
    //window.addEventListener('load', highlightSection);
    // Also handle hash changes (e.g., when user clicks a link)
    window.addEventListener('hashchange', highlightSection);


    //Fill_PyTable(); //* Works, but haven't extended past Dictionaries yet
    document.addEventListener("click", function (event) {
        const cmd_cell = event.target.closest("td.commands");
        let tt_text = "";
        console.log("Copy Element:", cmd_cell);
        cmd_cell.querySelectorAll('span').forEach(span => {
            // Remove text in angle brackets <>
            let cleanedText = span.innerText.replace(/<.*?>/g, '');
            cleanedText = removeIgnoreTags(cleanedText);
            console.log(`Cleaned Text: "${cleanedText}"`);
            tt_text += cleanedText + "\n";
        });
        navigator.clipboard.writeText(tt_text.trim()).then(() => {
            const tooltip = document.createElement("div");
            tooltip.className = "tooltips";
            tooltip.textContent = "Copied!";
            tooltip.style.top = `${event.clientY + window.scrollY - 30}px`;
            tooltip.style.left = `${event.clientX + window.scrollX}px`;

            document.body.appendChild(tooltip);

            setTimeout(() => {
                tooltip.style.opacity = "0";
                setTimeout(() => tooltip.remove(), 300);
            }, 1000);
        }).catch(err => console.error("Failed to copy:", err));
    });
});


// Click on and copy the code block
function copyText(element) {
    let text = "";
    console.log("Copy Element:", element);
    element.querySelectorAll('span').forEach(span => {
        // Remove text in angle brackets <>
        let cleanedText = span.innerText.replace(/<.*?>/g, '');
        cleanedText = removeIgnoreTags(cleanedText);
        console.log(`Cleaned Text: "${cleanedText}"`);
        text += cleanedText + "\n";
    });
    //document.addEventListener("click", function (event) {
    navigator.clipboard.writeText(text)
        .then(() => {
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Copied!';
            tooltip.className = "copied-tooltip";
            console.log(`Element Offset - Top: ${element.offsetTop}, Left: ${element.offsetLeft}, Width: ${element.offsetWidth}`);
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

function removeIgnoreTags(input) {
    //Example:
    //  Input: "This is an<IGNORE>ignore all of this text</IGNORE> example string<IGNORE>!!!? ??!?What?</IGNORE>."
    //  Output: "This is an example string."
    //<span class='ignore'>
    //return input.replace(/<IGNORE>.*?<\/IGNORE>/g, '');
    return input.replace(/<div class='ignore'>.*?<\/div>/g, '');
}

function addCommands(tableId='powershell-table') {
    const table = document.getElementById(tableId);//'powershell-table');
    if (!table || table.rows.length < 1) return; // Ensure table exists

    // Get the header row (first row)
    const headerRow = table.rows[0];
    console.log(headerRow);
    console.log(headerRow.parentNode.parentNode);
    console.log(headerRow.nextSibling);
    
    CommandList = Powershell_Commands;
    if (tableId == 'linux-table') {
        CommandList = Linux_Commands;
    }
    CommandList.reverse();
    CommandList.forEach(command => {
        const row = document.createElement('tr');

        if (command[0] === "HEADER") {
            // Create a header row
            row.id = command[2];
            row.innerHTML = `<td colspan="2" class="tabSect">${command[1]}</td>`;
        } else {
            const commandCell = document.createElement('td');
            commandCell.className = 'commands';
            if (typeof command[0] == 'object') {
                command[0].forEach(line => {
                    commandCell.innerHTML += line;
                });
            } else if (command[0].startsWith("<span>")) {
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


