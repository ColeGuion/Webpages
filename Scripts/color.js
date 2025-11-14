// color.js

document.addEventListener("DOMContentLoaded", function () {
    const volumeInput = document.getElementById("volume-inp");
    const volumeSpan = volumeInput.nextElementSibling;
    volumeInput.addEventListener('input', function() {
        volumeSpan.textContent = `${volumeInput.value}%`;
    });

    // Update colors on input changes
    updateColors();
    document.getElementById("color-inp").addEventListener('input', updateColors);
    volumeInput.addEventListener('input', updateColors);

    // Add click event to color blocks for copying color value
    document.querySelectorAll(".best-colors div.colorBlk").forEach(colorDiv => {
        const bgColor = colorDiv.style.backgroundColor;
        // Convert to hex if it's in rgb format
        let hexColor;
        if (bgColor.startsWith('rgb')) {
            console.log(`Convert rgb to hex for color: "${bgColor}"`);
            hexColor = rgbStringToHex(bgColor);
        } else {
            hexColor = bgColor; // Assume it's already in hex format
        }
        colorDiv.onclick = () => copyColorToClipboard(hexColor, colorDiv);
    });
});

function updateColors() {
    let colorValue = document.getElementById("color-inp").value;
    let lightenPercent = document.getElementById("volume-inp").value;
    
    // Check if valid color input value
    if (/^#[0-9A-F]{6}$/i.test(colorValue)) {
        document.getElementById("color-block").style.backgroundColor = colorValue;
        let newColor = lightenColor(colorValue, lightenPercent);
        let rgbVal = hexToRgb(newColor);
        
        document.getElementById("newColor-block").style.backgroundColor = newColor;
        document.getElementById("hex").value = newColor;
        document.getElementById("rgb").value = `rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`;
    } else {
        console.log("INVALID COLOR VALUE");
    }
}

// Lightens a hex color by a percentage (0–100)
function lightenColor(hex, percent) {
    const rgb = hexToRgb(hex);
    const lighten = (channel) => channel + (255 - channel) * (percent / 100);
    const r = lighten(rgb.r);
    const g = lighten(rgb.g);
    const b = lighten(rgb.b);
    return rgbToHex(r, g, b);
}

// Converts a hex color string to an RGB object
function hexToRgb(hex) { 
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// Converts an RGB object to a hex color string
function rgbToHex(r, g, b) {
    const toHex = (c) => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbStringToHex(colorStr) {
    // Expected Format: colorStr = "rgb(255, 0, 0)"            
    const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    const match = colorStr.match(rgbRegex);

    if (match) {
        return rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
    }
    return null; // Invalid format
}

function copyColorToClipboard(colorHex, element) {
    //alert(`Copying: ${colorHex}`);
    navigator.clipboard.writeText(colorHex).then(() => {
    }).catch(err => {
        console.error('Failed to copy color: ', err);
        alert('Failed to copy color: ', err);
    });
}