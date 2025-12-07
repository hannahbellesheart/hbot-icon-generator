// Icon Generator Application
(function() {
    'use strict';

    // DOM Elements
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewSection = document.getElementById('previewSection');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Canvas elements
    const canvases = {
        512: document.getElementById('canvas512'),
        256: document.getElementById('canvas256'),
        128: document.getElementById('canvas128'),
        64: document.getElementById('canvas64'),
        32: document.getElementById('canvas32'),
        16: document.getElementById('canvas16')
    };

    // Options
    const roundedCornersCheckbox = document.getElementById('roundedCorners');
    const addPaddingCheckbox = document.getElementById('addPadding');
    const transparentBgCheckbox = document.getElementById('transparentBg');
    const bgColorInput = document.getElementById('bgColor');

    // State
    let currentImage = null;

    // Event Listeners
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    });

    downloadBtn.addEventListener('click', downloadAllIcons);
    resetBtn.addEventListener('click', resetApp);

    // Add event listeners for options to regenerate icons
    roundedCornersCheckbox.addEventListener('change', () => {
        if (currentImage) generateIcons(currentImage);
    });

    addPaddingCheckbox.addEventListener('change', () => {
        if (currentImage) generateIcons(currentImage);
    });

    transparentBgCheckbox.addEventListener('change', () => {
        if (currentImage) generateIcons(currentImage);
    });

    bgColorInput.addEventListener('change', () => {
        if (currentImage && !transparentBgCheckbox.checked) {
            generateIcons(currentImage);
        }
    });

    // Handle file upload
    function handleFile(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file (PNG, JPG, SVG, etc.)');
            return;
        }

        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                currentImage = img;
                generateIcons(img);
                previewSection.style.display = 'block';
                uploadArea.style.display = 'none';
            };
            img.onerror = () => {
                alert('Failed to load image. Please try a different file.');
            };
            img.src = e.target.result;
        };

        reader.onerror = () => {
            alert('Failed to read file. Please try again.');
        };
        
        reader.readAsDataURL(file);
    }

    // Generate icons for all sizes
    function generateIcons(img) {
        const sizes = [512, 256, 128, 64, 32, 16];
        const roundCorners = roundedCornersCheckbox.checked;
        const addPadding = addPaddingCheckbox.checked;
        const transparentBg = transparentBgCheckbox.checked;
        const bgColor = bgColorInput.value;

        sizes.forEach(size => {
            const canvas = canvases[size];
            const ctx = canvas.getContext('2d');
            
            // Clear canvas
            ctx.clearRect(0, 0, size, size);

            // Calculate dimensions with padding if enabled
            let drawSize = size;
            let offset = 0;
            
            if (addPadding) {
                const padding = size * 0.1;
                drawSize = size - (padding * 2);
                offset = padding;
            }

            // Draw background
            if (!transparentBg) {
                ctx.fillStyle = bgColor;
                
                if (roundCorners) {
                    drawRoundedRect(ctx, 0, 0, size, size, size * 0.2);
                    ctx.fill();
                } else {
                    ctx.fillRect(0, 0, size, size);
                }
            }

            // Save context state
            ctx.save();

            // Apply rounded corners to image if needed
            if (roundCorners) {
                drawRoundedRect(ctx, offset, offset, drawSize, drawSize, drawSize * 0.2);
                ctx.clip();
            }

            // Draw image
            ctx.drawImage(img, offset, offset, drawSize, drawSize);

            // Restore context state
            ctx.restore();
        });
    }

    // Helper function to draw rounded rectangle
    function drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    // Download all icons individually
    async function downloadAllIcons() {
        const sizes = [512, 256, 128, 64, 32, 16];
        
        // Download each icon individually
        // Note: To create a ZIP file, consider using the JSZip library
        for (const size of sizes) {
            const canvas = canvases[size];
            const dataUrl = canvas.toDataURL('image/png');
            
            const link = document.createElement('a');
            link.download = `icon-${size}x${size}.png`;
            link.href = dataUrl;
            link.click();
            
            // Small delay between downloads to prevent browser blocking
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    // Reset application
    function resetApp() {
        currentImage = null;
        fileInput.value = '';
        previewSection.style.display = 'none';
        uploadArea.style.display = 'block';
        
        // Clear all canvases
        Object.values(canvases).forEach(canvas => {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }

    // Initialize tooltips or additional features here if needed
    console.log('HBot Icon Generator initialized');
})();
