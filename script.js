// declaring the filters object with all essential properties
let filters = {
    brightness: {
        min: 0,
        max: 200,
        value: 100,
        unit: '%',
    },
    saturation: {
        min: 0,
        max: 200,
        value: 100,
        unit: '%',
    },
    contrast: {
        min: 0,
        max: 200,
        value: 100,
        unit: '%',
    },
    hueRotation: {
        min: 0,
        max: 360,
        value: 0,
        unit: 'deg',
    },
    blur: {
        min: 0,
        max: 20,
        value: 0,
        unit: 'px',
    },
    grayscale: {
        min: 0,
        max: 100,
        value: 0,
        unit: '%',
    },
    invert: {
        min: 0,
        max: 100,
        value: 0,
        unit: '%',
    },
    sepia: {
        min: 0,
        max: 100,
        value: 0,
        unit: '%',
    },
    opacity: {
        min: 0,
        max: 100,
        value: 100,
        unit: '%',
    },

}

// Declarinng essential DOM elements 

const imageCanvas = document.getElementById('image-canvas');
const imageInput = document.getElementById('img-input');
const canvasCtx = imageCanvas.getContext('2d');
const resetBtn = document.getElementById('reset-btn');
const downloadBtn = document.getElementById('download-btn');
let file = null;
let image = null
const presetsDiv = document.querySelector('.presets');

// creating filter elements (div) dynamically
function createFilterElem(name, unit, min, max, value) {
    const div = document.createElement('div');
    div.classList.add('filter');
    const label = document.createElement('label');
    label.innerText = name;
    label.setAttribute('for', name);
    const input = document.createElement('input');
    input.type = 'range';
    input.id = name;
    input.min = min;
    input.max = max;
    input.value = value;



    div.appendChild(label);
    div.appendChild(input);

    input.addEventListener('input', (event) => {
        filters[name].value = input.value;
        applyFilters();
        
    });



    return div;

    
}


function showFilters(){
    Object.keys(filters).forEach(filterName => {
    const filter = filters[filterName];
    const filterdiv = createFilterElem(filterName, filter.unit, filter.min, filter.max, filter.value);
    document.querySelector('.filters').appendChild(filterdiv);
})
}
showFilters();

// handling the image upload 
imageInput.addEventListener('change', (e) => {
    file = e.target.files[0];
    const placeholder = document.querySelector('.placeholder');
    placeholder.style.display = 'none';
    imageCanvas.style.display = 'block';

    const img = new Image();
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
        image = img;
    }
});


// applying filters on canvas 
function applyFilters(){
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    if (!image) return;
    canvasCtx.filter = `brightness(${filters.brightness.value}${filters.brightness.unit}) 
    saturate(${filters.saturation.value}${filters.saturation.unit}) 
    contrast(${filters.contrast.value}${filters.contrast.unit}) 
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit}) 
    blur(${filters.blur.value}${filters.blur.unit}) 
    grayscale(${filters.grayscale.value}${filters.grayscale.unit}) 
    invert(${filters.invert.value}${filters.invert.unit}) 
    sepia(${filters.sepia.value}${filters.sepia.unit}) 
    opacity(${filters.opacity.value}${filters.opacity.unit})`.trim();

    canvasCtx.drawImage(image, 0, 0); 
}

// for reset button 
resetBtn.addEventListener('click', () => {
    filters = {
    brightness: {
        min: 0,
        max: 200,
        value: 100,
        unit: '%',
    },
    saturation: {
        min: 0,
        max: 200,
        value: 100,
        unit: '%',
    },
    contrast: {
        min: 0,
        max: 200,
        value: 100,
        unit: '%',
    },
    hueRotation: {
        min: 0,
        max: 360,
        value: 0,
        unit: 'deg',
    },
    blur: {
        min: 0,
        max: 20,
        value: 0,
        unit: 'px',
    },
    grayscale: {
        min: 0,
        max: 100,
        value: 0,
        unit: '%',
    },
    invert: {
        min: 0,
        max: 100,
        value: 0,
        unit: '%',
    },
    sepia: {
        min: 0,
        max: 100,
        value: 0,
        unit: '%',
    },
    opacity: {
        min: 0,
        max: 100,
        value: 100,
        unit: '%',
    },

}
    applyFilters()
    document.querySelector('.filters').innerHTML = '';
    showFilters();
})

// for download button
const formatSelection = document.querySelector('.formatSelection');

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    const format = formatSelection.querySelector('input[name="format"]:checked').id;
    link.download = `edited-image.${format}`;
    link.href = imageCanvas.toDataURL();
    link.click();
})

// Preset functionality

// the preset filter values 
const presets = {

  brightPop: {
    brightness: { min: 0, max: 200, value: 115, unit: '%' },
    saturation: { min: 0, max: 200, value: 120, unit: '%' },
    contrast: { min: 0, max: 200, value: 110, unit: '%' },
    hueRotation: { min: 0, max: 360, value: 0, unit: 'deg' },
    blur: { min: 0, max: 20, value: 0, unit: 'px' },
    grayscale: { min: 0, max: 100, value: 0, unit: '%' },
    invert: { min: 0, max: 100, value: 0, unit: '%' },
    sepia: { min: 0, max: 100, value: 0, unit: '%' },
    opacity: { min: 0, max: 100, value: 100, unit: '%' },
  },

  softFade: {
    brightness: { min: 0, max: 200, value: 105, unit: '%' },
    saturation: { min: 0, max: 200, value: 90, unit: '%' },
    contrast: { min: 0, max: 200, value: 85, unit: '%' },
    hueRotation: { min: 0, max: 360, value: 0, unit: 'deg' },
    blur: { min: 0, max: 20, value: 0, unit: 'px' },
    grayscale: { min: 0, max: 100, value: 0, unit: '%' },
    invert: { min: 0, max: 100, value: 0, unit: '%' },
    sepia: { min: 0, max: 100, value: 5, unit: '%' },
    opacity: { min: 0, max: 100, value: 100, unit: '%' },
  },

  moodyDark: {
    brightness: { min: 0, max: 200, value: 90, unit: '%' },
    saturation: { min: 0, max: 200, value: 85, unit: '%' },
    contrast: { min: 0, max: 200, value: 125, unit: '%' },
    hueRotation: { min: 0, max: 360, value: 0, unit: 'deg' },
    blur: { min: 0, max: 20, value: 0, unit: 'px' },
    grayscale: { min: 0, max: 100, value: 0, unit: '%' },
    invert: { min: 0, max: 100, value: 0, unit: '%' },
    sepia: { min: 0, max: 100, value: 10, unit: '%' },
    opacity: { min: 0, max: 100, value: 100, unit: '%' },
  },

  cinematicCool: {
    brightness: { min: 0, max: 200, value: 95, unit: '%' },
    saturation: { min: 0, max: 200, value: 90, unit: '%' },
    contrast: { min: 0, max: 200, value: 120, unit: '%' },
    hueRotation: { min: 0, max: 360, value: 200, unit: 'deg' },
    blur: { min: 0, max: 20, value: 0, unit: 'px' },
    grayscale: { min: 0, max: 100, value: 0, unit: '%' },
    invert: { min: 0, max: 100, value: 0, unit: '%' },
    sepia: { min: 0, max: 100, value: 0, unit: '%' },
    opacity: { min: 0, max: 100, value: 100, unit: '%' },
  },

  vintageFilm: {
    brightness: { min: 0, max: 200, value: 105, unit: '%' },
    saturation: { min: 0, max: 200, value: 80, unit: '%' },
    contrast: { min: 0, max: 200, value: 95, unit: '%' },
    hueRotation: { min: 0, max: 360, value: 30, unit: 'deg' },
    blur: { min: 0, max: 20, value: 0, unit: 'px' },
    grayscale: { min: 0, max: 100, value: 0, unit: '%' },
    invert: { min: 0, max: 100, value: 0, unit: '%' },
    sepia: { min: 0, max: 100, value: 40, unit: '%' },
    opacity: { min: 0, max: 100, value: 100, unit: '%' },
  },

  trueBW: {
    brightness: { min: 0, max: 200, value: 100, unit: '%' },
    saturation: { min: 0, max: 200, value: 0, unit: '%' },
    contrast: { min: 0, max: 200, value: 130, unit: '%' },
    hueRotation: { min: 0, max: 360, value: 0, unit: 'deg' },
    blur: { min: 0, max: 20, value: 0, unit: 'px' },
    grayscale: { min: 0, max: 100, value: 100, unit: '%' },
    invert: { min: 0, max: 100, value: 0, unit: '%' },
    sepia: { min: 0, max: 100, value: 0, unit: '%' },
    opacity: { min: 0, max: 100, value: 100, unit: '%' },
  },

  washedBW: {
    brightness: { min: 0, max: 200, value: 110, unit: '%' },
    saturation: { min: 0, max: 200, value: 0, unit: '%' },
    contrast: { min: 0, max: 200, value: 85, unit: '%' },
    hueRotation: { min: 0, max: 360, value: 0, unit: 'deg' },
    blur: { min: 0, max: 20, value: 0, unit: 'px' },
    grayscale: { min: 0, max: 100, value: 100, unit: '%' },
    invert: { min: 0, max: 100, value: 0, unit: '%' },
    sepia: { min: 0, max: 100, value: 0, unit: '%' },
    opacity: { min: 0, max: 100, value: 100, unit: '%' },
  },

  warmGlow: {
    brightness: { min: 0, max: 200, value: 110, unit: '%' },
    saturation: { min: 0, max: 200, value: 115, unit: '%' },
    contrast: { min: 0, max: 200, value: 105, unit: '%' },
    hueRotation: { min: 0, max: 360, value: 20, unit: 'deg' },
    blur: { min: 0, max: 20, value: 0, unit: 'px' },
    grayscale: { min: 0, max: 100, value: 0, unit: '%' },
    invert: { min: 0, max: 100, value: 0, unit: '%' },
    sepia: { min: 0, max: 100, value: 15, unit: '%' },
    opacity: { min: 0, max: 100, value: 100, unit: '%' },
  },

  coolNeon: {
    brightness: { min: 0, max: 200, value: 105, unit: '%' },
    saturation: { min: 0, max: 200, value: 140, unit: '%' },
    contrast: { min: 0, max: 200, value: 120, unit: '%' },
    hueRotation: { min: 0, max: 360, value: 180, unit: 'deg' },
    blur: { min: 0, max: 20, value: 0, unit: 'px' },
    grayscale: { min: 0, max: 100, value: 0, unit: '%' },
    invert: { min: 0, max: 100, value: 0, unit: '%' },
    sepia: { min: 0, max: 100, value: 0, unit: '%' },
    opacity: { min: 0, max: 100, value: 100, unit: '%' },
  },
};

// making the presets button visible 
Object.keys(presets).forEach(presetName => {
    const presetBtn = document.createElement('button');
    presetBtn.classList.add('btn');
    presetBtn.innerText = presetName
    presetsDiv.appendChild(presetBtn);
})

// making the presets working on each click 
presetsDiv.addEventListener('click', (e) => {
    const presetName = e.target.innerText;
    if (!presets[presetName]) return;  
    filters = presets[presetName];
    console.log(filters);
    applyFilters();
    // clearing the previous filter elements 
    document.querySelector('.filters').innerHTML = '';
    // then showing new ones based on preset
    showFilters();


})
