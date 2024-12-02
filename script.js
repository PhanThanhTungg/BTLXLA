const imageInput = document.getElementById('imageInput');
const originalImage = document.getElementById('originalImage');
const processedImage = document.getElementById('processedImage');
const algorithmSelect = document.getElementById('algorithm');
const processBtn = document.getElementById('processBtn');
const originalEmpty = document.getElementById('originalEmpty');
const processedEmpty = document.getElementById('processedEmpty');
const imageUrlInput = document.getElementById('imageUrlInput');
const loadUrlBtn = document.getElementById('loadUrlBtn');
const gammaControl = document.getElementById('gammaControl');
const gammaInput = document.getElementById('gammaInput');
const gammaValue = document.getElementById('gammaValue');
const maskSizeControl = document.getElementById('maskSizeControl');
const maskSizeInput = document.getElementById('maskSizeInput');
const maskSizeValue = document.getElementById('maskSizeValue');
const kernelSizeControl = document.getElementById('kernelSizeControl');
const kernelSizeInput = document.getElementById('kernelSizeInput');
const kernelSizeValue = document.getElementById('kernelSizeValue');
const radiusControl = document.getElementById('radiusControl');
const radiusInput = document.getElementById('radiusInput');
const radiusValue = document.getElementById('radiusValue');
const maxRadiusControl = document.getElementById('maxRadiusControl');
const maxRadiusInput = document.getElementById('maxRadiusInput');
const maxRadiusValue = document.getElementById('maxRadiusValue');
const midRadiusControl = document.getElementById('midRadiusControl');
const midRadiusInput = document.getElementById('midRadiusInput');
const midRadiusValue = document.getElementById('midRadiusValue');
const sizeInfo = document.getElementById('sizeInfo');
const originalSizeSpan = document.getElementById('originalSize');
const originalResolutionSpan = document.getElementById('originalResolution');
const processedSizeSpan = document.getElementById('processedSize');
const processedResolutionSpan = document.getElementById('processedResolution');
const compressionRatioSpan = document.getElementById('compressionRatio');
const thresholdControl = document.getElementById('thresholdControl');
const thresholdInput = document.getElementById('thresholdInput');
const thresholdValue = document.getElementById('thresholdValue');
const piecewiseControl = document.getElementById('piecewiseControl');
const r1Input = document.getElementById('r1Input');
const s1Input = document.getElementById('s1Input');
const r2Input = document.getElementById('r2Input');
const s2Input = document.getElementById('s2Input');
const r1Value = document.getElementById('r1Value');
const s1Value = document.getElementById('s1Value');
const r2Value = document.getElementById('r2Value');
const s2Value = document.getElementById('s2Value');
let otsuThresholdInfo = document.getElementById('otsuThresholdInfo');
let otsuThresholdValue = document.getElementById('otsuThresholdValue');
const isodataThresholdInfo = document.getElementById('isodataThresholdInfo');
const isodataThresholdValue = document.getElementById('isodataThresholdValue');
const backgroundSymmetryThresholdInfo = document.getElementById('backgroundSymmetryThresholdInfo');
const backgroundSymmetryThresholdValue = document.getElementById('backgroundSymmetryThresholdValue');
const triangleThresholdInfo = document.getElementById('triangleThresholdInfo');
const triangleThresholdValue = document.getElementById('triangleThresholdValue');
const brightnessControl = document.getElementById('brightnessControl');
const brightnessFactorInput = document.getElementById('brightnessFactorInput');
const brightnessFactorValue = document.getElementById('brightnessFactorValue');
const rotateControl = document.getElementById('rotateControl');
const rotationAngleInput = document.getElementById('rotationAngleInput');
const rotationAngleValue = document.getElementById('rotationAngleValue');
const contrastControl = document.getElementById('contrastControl');
const contrastInput = document.getElementById('contrastInput');
const contrastValue = document.getElementById('contrastValue');
const sharpenControl = document.getElementById('sharpenControl');
const sharpenInput = document.getElementById('sharpenInput');
const sharpenValue = document.getElementById('sharpenValue');
const highlightsControl = document.getElementById('highlightsControl');
const highlightsInput = document.getElementById('highlightsInput');
const highlightsValue = document.getElementById('highlightsValue');
const shadowsControl = document.getElementById('shadowsControl');
const shadowsInput = document.getElementById('shadowsInput');
const shadowsValue = document.getElementById('shadowsValue');

const transferButton = document.getElementById('transferButton');

imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            originalImage.src = event.target.result;
            originalImage.onload = function() {
                originalImage.style.display = 'block';
                originalEmpty.style.display = 'none';
            };
        };
        reader.readAsDataURL(file);
    }
});

algorithmSelect.addEventListener('change', function() {
    gammaControl.style.display = this.value === 'power' ? 'block' : 'none';
    maskSizeControl.style.display = this.value === 'lowpass' ? 'block' : 'none';
    kernelSizeControl.style.display = this.value === 'median' ? 'block' : 'none';
    radiusControl.style.display = this.value === 'minimum' ? 'block' : 'none';
    maxRadiusControl.style.display = this.value === 'maximum' ? 'block' : 'none';
    midRadiusControl.style.display = this.value === 'midpoint' ? 'block' : 'none';
    thresholdControl.style.display = this.value === 'threshold' ? 'block' : 'none';
    piecewiseControl.style.display = this.value === 'piecewise' ? 'block' : 'none';
    brightnessControl.style.display = this.value === 'brightness' ? 'block' : 'none';
    rotateControl.style.display = this.value === 'rotate' ? 'block' : 'none';
    highlightsControl.style.display = this.value === 'highlights' ? 'block' : 'none';
    shadowsControl.style.display = this.value === 'shadows' ? 'block' : 'none';
    contrastControl.style.display = this.value === 'contrast' ? 'block' : 'none';
    sharpenControl.style.display = this.value === 'sharpen' ? 'block' : 'none';
    if (this.value !== 'otsu') {
        otsuThresholdInfo.style.display = 'none';
    }
    if (this.value !== 'isodata') {
        isodataThresholdInfo.style.display = 'none';
    }
    if (this.value !== 'background_symmetry') {
        backgroundSymmetryThresholdInfo.style.display = 'none';
    }
    if (this.value !== 'triangle') {
        triangleThresholdInfo.style.display = 'none';
    }
});

processBtn.addEventListener('click', function() {
    if (!originalImage.src) {
        alert('Vui lòng chọn ảnh trước!');
        return;
    }
    
    const ctx = processedImage.getContext('2d');
    processedImage.width = originalImage.naturalWidth;
    processedImage.height = originalImage.naturalHeight;
    ctx.drawImage(originalImage, 0, 0);
    
    let imageData = ctx.getImageData(0, 0, processedImage.width, processedImage.height);
    const pixels = imageData.data;
    
    switch(algorithmSelect.value) {

        // Tăng độ sáng
        case 'brightness':
            const factor = parseFloat(brightnessFactorInput.value);
            for(let i = 0; i < pixels.length; i += 4) {
                pixels[i] = Math.min(255, pixels[i] * factor);
                pixels[i + 1] = Math.min(255, pixels[i + 1] * factor);
                pixels[i + 2] = Math.min(255, pixels[i + 2] * factor);
            }
            break;
        
        // Ảnh âm bản
        case 'negative':
            for(let i = 0; i < pixels.length; i += 4) {
                pixels[i] = 255 - pixels[i];
                pixels[i + 1] = 255 - pixels[i + 1];
                pixels[i + 2] = 255 - pixels[i + 2];
            }
            break;
        
        case 'threshold':
            const threshold = parseInt(thresholdInput.value);
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i+1] + 0.114 * pixels[i+2]);
                const value = gray > threshold ? 255 : 0;
                pixels[i] = pixels[i+1] = pixels[i+2] = value;
            }
            break;
        // Ảnh xám
        case 'grayscale':
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]);
                pixels[i] = pixels[i + 1] = pixels[i + 2] = gray;
            }
            break;
        // Biến đổi logarit
        case 'log':
            // Chuyển ảnh sang grayscale
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i+1] + 0.114 * pixels[i+2]);
                pixels[i] = pixels[i+1] = pixels[i+2] = gray;
            }

            // Tìm giá trị pixel lớn nhất
            let maxPixel = 0;
            for(let i = 0; i < pixels.length; i += 4) {
                maxPixel = Math.max(maxPixel, pixels[i]);
            }
            
            // Tính hệ số c
            const c = 255 / Math.log(1 + maxPixel);
            
            // Áp dụng biến đổi log
            for(let i = 0; i < pixels.length; i += 4) {
                const newValue = c * Math.log(1 + pixels[i]);
                pixels[i] = pixels[i+1] = pixels[i+2] = newValue;
            }
            break;
            //Biến đổi log ánh xạ một dải hẹp mức xám
            //thấp của ảnh đầu vào đầu vào sang một
            //dải rộng hơn cho ảnh đầu ra
    
        // Biến đổi hàm mũ
        case 'power':
            const gamma = parseFloat(gammaInput.value);
            if (isNaN(gamma) || gamma <= 0) {
                alert('Vui lòng nhập giá trị gamma hợp lệ (lớn hơn 0)');
                return;
            }
            
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i+1] + 0.114 * pixels[i+2]);
                const newValue = Math.min(255, Math.pow(gray / 255, gamma) * 255);
                pixels[i] = pixels[i+1] = pixels[i+2] = newValue;
            }
            break;

            //Biến đổi hàm mũ ánh xạ một dải hẹp mức xám
            //thấp của ảnh đầu vào sang một dải rộng hơn
            //cho ảnh đầu ra

        
        // Biến đổi tuyến tính từng phần
        case 'piecewise':
            const r1 = parseInt(r1Input.value);
            const s1 = parseInt(s1Input.value);
            const r2 = parseInt(r2Input.value);
            const s2 = parseInt(s2Input.value);
            // Biến đổi tuyến tính từng phần chia ảnh thành 3 đoạn:
            // 1. Từ 0 đến r1: Ánh xạ tuyến tính từ 0 đến s1
            // 2. Từ r1 đến r2: Ánh xạ tuyến tính từ s1 đến s2  
            // 3. Từ r2 đến 255: Ánh xạ tuyến tính từ s2 đến 255
            function pixelVal(pix, r1, s1, r2, s2) {
                if (0 <= pix && pix <= r1) {
                    // Đoạn 1: Ánh xạ tuyến tính từ (0,0) đến (r1,s1)
                    return (s1 / r1) * pix;
                } else if (r1 < pix && pix <= r2) {
                    // Đoạn 2: Ánh xạ tuyến tính từ (r1,s1) đến (r2,s2)
                    return ((s2 - s1)/(r2 - r1)) * (pix - r1) + s1;
                } else {
                    // Đoạn 3: Ánh xạ tuyến tính từ (r2,s2) đến (255,255)
                    return ((255 - s2)/(255 - r2)) * (pix - r2) + s2;
                }
            }
            
            // Áp dụng biến đổi cho từng pixel
            // Áp dụng biến đổi cho cả 3 kênh màu R,G,B
            for(let i = 0; i < pixels.length; i += 4) {
                pixels[i] = pixelVal(pixels[i], r1, s1, r2, s2);
                pixels[i + 1] = pixelVal(pixels[i + 1], r1, s1, r2, s2); 
                pixels[i + 2] = pixelVal(pixels[i + 2], r1, s1, r2, s2);
            }
            break;
        
        // Cân bằng histogram
        case 'histogram':
            const histogram1 = new Array(256).fill(0);
            const totalPixels1 = pixels.length / 4;
        
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i+1] + 0.114 * pixels[i+2]);
                histogram1[gray]++;
                pixels[i] = pixels[i+1] = pixels[i+2] = gray; 
            }
            // Tính bảng lookup dựa trên CDF
            let cdf = 0;
            const lookupTable = new Array(256);
            // Tìm giá trị CDF nhỏ nhất khác 0
            const minCdf = histogram1.find(x => x > 0);

            for(let i = 0; i < 256; i++) {
                cdf += histogram1[i]; 
                lookupTable[i] = Math.round((cdf - minCdf) * 255 / (totalPixels1 - minCdf));
            }
            for(let i = 0; i < pixels.length; i += 4) {
                pixels[i] = pixels[i+1] = pixels[i+2] = lookupTable[pixels[i]];
            }
            break;
        
        // Bộ lọc trung bình (Low Pass Filter)
        case 'lowpass':
            const maskSize = parseInt(maskSizeInput.value);
            const mask = new Array(maskSize * maskSize).fill(1 / (maskSize * maskSize));
            const tempPixels = new Uint8ClampedArray(pixels);
            const offset = Math.floor(maskSize / 2);
            
            for (let y = 0; y < processedImage.height; y++) {
                for (let x = 0; x < processedImage.width; x++) {
                    let rSum = 0, gSum = 0, bSum = 0;
            
                    // Áp dụng mask
                    for (let my = 0; my < maskSize; my++) {
                        for (let mx = 0; mx < maskSize; mx++) {
                            const px = x + mx - offset;
                            const py = y + my - offset;
            
                            if (px >= 0 && px < processedImage.width && py >= 0 && py < processedImage.height) {
                                const i = (py * processedImage.width + px) * 4;
                                const maskIndex = my * maskSize + mx;
                                
                                rSum += tempPixels[i] * mask[maskIndex];
                                gSum += tempPixels[i + 1] * mask[maskIndex];
                                bSum += tempPixels[i + 2] * mask[maskIndex];
                            }
                        }
                    }
            
                    const i = (y * processedImage.width + x) * 4;
                    pixels[i] = rSum;
                    pixels[i + 1] = gSum;
                    pixels[i + 2] = bSum;
                    pixels[i + 3] = tempPixels[i + 3]; // Giữ nguyên alpha
                }
            }
            break;

        // Bộ lọc trung vị (Median Filter)
        case 'median':
            const kernelSize = parseInt(kernelSizeInput.value);
            const medianTempPixels = new Uint8ClampedArray(pixels);
            const medianOffset = Math.floor(kernelSize / 2);
            
            for (let y = 0; y < processedImage.height; y++) {
                for (let x = 0; x < processedImage.width; x++) {
                    let r = [], g = [], b = [];
            
                    // Thu thập các giá trị pixel trong vùng kernel
                    for (let ky = 0; ky < kernelSize; ky++) {
                        for (let kx = 0; kx < kernelSize; kx++) {
                            const px = x + kx - medianOffset;
                            const py = y + ky - medianOffset;
            
                            if (px >= 0 && px < processedImage.width && py >= 0 && py < processedImage.height) {
                                const i = (py * processedImage.width + px) * 4;
                                r.push(medianTempPixels[i]);
                                g.push(medianTempPixels[i + 1]);
                                b.push(medianTempPixels[i + 2]);
                            }
                        }
                    }
                    // Sắp xếp và lấy giá trị trung vị cho mỗi kênh màu
                    r.sort((a, b) => a - b);
                    g.sort((a, b) => a - b);
                    b.sort((a, b) => a - b);
            
                    const medianIndex = Math.floor(r.length / 2);
                    const i = (y * processedImage.width + x) * 4;
                    
                    pixels[i] = r[medianIndex];
                    pixels[i + 1] = g[medianIndex];
                    pixels[i + 2] = b[medianIndex];
                    pixels[i + 3] = medianTempPixels[i + 3]; // Giữ nguyên alpha
                }
            }
            break;
        
        // Bộ lọc minimum
        case 'minimum':
            const radius = parseInt(radiusInput.value);
            const minimumTempPixels = new Uint8ClampedArray(pixels);
            
            for (let y = 0; y < processedImage.height; y++) {
                for (let x = 0; x < processedImage.width; x++) {
                    let minR = 255, minG = 255, minB = 255;
            
                    // Tìm giá trị nhỏ nhất trong vùng lân cận
                    for (let dy = -radius; dy <= radius; dy++) {
                        for (let dx = -radius; dx <= radius; dx++) {
                            const px = x + dx;
                            const py = y + dy;
            
                            if (px >= 0 && px < processedImage.width && py >= 0 && py < processedImage.height) {
                                const i = (py * processedImage.width + px) * 4;
                                minR = Math.min(minR, minimumTempPixels[i]);
                                minG = Math.min(minG, minimumTempPixels[i + 1]);
                                minB = Math.min(minB, minimumTempPixels[i + 2]);
                            }
                        }
                    }
            
                    const i = (y * processedImage.width + x) * 4;
                    pixels[i] = minR;
                    pixels[i + 1] = minG;
                    pixels[i + 2] = minB;
                    pixels[i + 3] = minimumTempPixels[i + 3]; // Giữ nguyên alpha
                }
            }
            break;
        
        // Bộ lọc maximum 
        case 'maximum':
            const maxRadius = parseInt(maxRadiusInput.value);
            const maxTempPixels = new Uint8ClampedArray(pixels);
            
            for (let y = 0; y < processedImage.height; y++) {
                for (let x = 0; x < processedImage.width; x++) {
                    let maxR = 0, maxG = 0, maxB = 0;
            
                    // Tìm giá trị lớn nhất trong vùng lân cận
                    for (let dy = -maxRadius; dy <= maxRadius; dy++) {
                        for (let dx = -maxRadius; dx <= maxRadius; dx++) {
                            const px = x + dx;
                            const py = y + dy;
            
                            if (px >= 0 && px < processedImage.width && py >= 0 && py < processedImage.height) {
                                const i = (py * processedImage.width + px) * 4;
                                maxR = Math.max(maxR, maxTempPixels[i]);
                                maxG = Math.max(maxG, maxTempPixels[i + 1]);
                                maxB = Math.max(maxB, maxTempPixels[i + 2]);
                            }
                        }
                    }
            
                    const i = (y * processedImage.width + x) * 4;
                    pixels[i] = maxR;
                    pixels[i + 1] = maxG;
                    pixels[i + 2] = maxB;
                    pixels[i + 3] = maxTempPixels[i + 3]; // Giữ nguyên alpha
                }
            }
            break;

        // Bộ lọc midpoint
        case 'midpoint':
            const midRadius = parseInt(midRadiusInput.value);
            const midTempPixels = new Uint8ClampedArray(pixels);
            const midSize = midRadius * 2 + 1;
            
            for (let y = 0; y < processedImage.height; y++) {
                for (let x = 0; x < processedImage.width; x++) {
                    let minR = 255, minG = 255, minB = 255;
                    let maxR = 0, maxG = 0, maxB = 0;
            
                    // Tìm giá trị lớn nhất và nhỏ nhất trong vùng lân cận
                    for (let dy = -midRadius; dy <= midRadius; dy++) {
                        for (let dx = -midRadius; dx <= midRadius; dx++) {
                            const px = x + dx;
                            const py = y + dy;
            
                            if (px >= 0 && px < processedImage.width && py >= 0 && py < processedImage.height) {
                                const i = (py * processedImage.width + px) * 4;
                                // Tìm min
                                minR = Math.min(minR, midTempPixels[i]);
                                minG = Math.min(minG, midTempPixels[i + 1]);
                                minB = Math.min(minB, midTempPixels[i + 2]);
                                // Tìm max
                                maxR = Math.max(maxR, midTempPixels[i]);
                                maxG = Math.max(maxG, midTempPixels[i + 1]);
                                maxB = Math.max(maxB, midTempPixels[i + 2]);
                            }
                        }
                    }
            
                    // Tính giá trị trung điểm (midpoint)
                    const i = (y * processedImage.width + x) * 4;
                    pixels[i] = (minR + maxR) / 2;
                    pixels[i + 1] = (minG + maxG) / 2;
                    pixels[i + 2] = (minB + maxB) / 2;
                    pixels[i + 3] = midTempPixels[i + 3]; // Giữ nguyên alpha
                }
            }
            console.log("123213")
            break;
            
        // Phát hiện biên bằng toán tử Roberts
        case 'roberts':
            const tempPixelsRoberts = new Uint8ClampedArray(pixels.length);
            const widthRoberts = processedImage.width;
            const heightRoberts = processedImage.height;
            for (let i = 0; i < pixels.length; i += 4) {
                const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i+1] + 0.114 * pixels[i+2]);
                tempPixelsRoberts[i] = tempPixelsRoberts[i + 1] = tempPixelsRoberts[i + 2] = gray;
                tempPixelsRoberts[i + 3] = pixels[i + 3];
            }
            const robertsX = [[1, 0], [0, -1]];
            const robertsY = [[0, 1], [-1, 0]];

            for (let y = 0; y < heightRoberts - 1; y++) {
                for (let x = 0; x < widthRoberts - 1; x++) {
                    let gx = 0, gy = 0; 
                    for (let i = 0; i < 2; i++) {
                        for (let j = 0; j < 2; j++) {
                            const idx = ((y + i) * widthRoberts + (x + j)) * 4;
                            // Tính tổng tích chập với ma trận Roberts
                            gx += tempPixelsRoberts[idx] * robertsX[i][j]; // Gradient theo x
                            gy += tempPixelsRoberts[idx] * robertsY[i][j]; // Gradient theo y
                        }
                    }
                    // Gradient là vector thể hiện hướng và độ lớn của sự thay đổi cường độ sáng trong ảnh
                    // - gx: thành phần gradient theo phương ngang (trục x)
                    // - gy: thành phần gradient theo phương dọc (trục y)
                    // Gradient được tính bằng cách tích chập ma trận ảnh với các ma trận toán tử (Roberts, Sobel, Prewitt...)
                    // Tính độ lớn gradient tổng hợp bằng công thức Euclid
                    const magnitude = Math.sqrt(gx * gx + gy * gy);
                    
                    // Gán giá trị độ lớn gradient cho pixel đầu ra
                    const idx = (y * widthRoberts + x) * 4;
                    pixels[idx] = pixels[idx + 1] = pixels[idx + 2] = magnitude; // Gán cùng giá trị cho R,G,B
                    pixels[idx + 3] = tempPixelsRoberts[idx + 3]; // Giữ nguyên kênh alpha
                }
            }
            break;
        
        // Phát hiện biên bằng toán tử Sobel
        case 'sobel':
            const tempPixelsSobel = new Uint8ClampedArray(pixels);
            const widthSobel = processedImage.width;
            const heightSobel = processedImage.height;
            // Chuyển sang ảnh xám
            for (let i = 0; i < tempPixelsSobel.length; i += 4) {
                const gray = Math.round(0.299 * tempPixelsSobel[i] + 0.587 * tempPixelsSobel[i+1] + 0.114 * tempPixelsSobel[i+2]);
                tempPixelsSobel[i] = tempPixelsSobel[i + 1] = tempPixelsSobel[i + 2] = gray;
            }
            const sobelX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
            const sobelY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
            for (let y = 1; y < heightSobel - 1; y++) {
                for (let x = 1; x < widthSobel - 1; x++) {
                    let gx = 0, gy = 0;
                    // Tính gradient theo x và y
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const idx = ((y + i) * widthSobel + (x + j)) * 4;
                            gx += tempPixelsSobel[idx] * sobelX[i + 1][j + 1];
                            gy += tempPixelsSobel[idx] * sobelY[i + 1][j + 1];
                        }
                    }
                    const magnitude = Math.sqrt(gx * gx + gy * gy); // Độ lớn gradient
                    // Gán giá trị cho pixel
                    const idx = (y * widthSobel + x) * 4;
                    pixels[idx] = pixels[idx + 1] = pixels[idx + 2] = magnitude;
                    pixels[idx + 3] = tempPixelsSobel[idx + 3];
                }
            }
            break;

        // Phát hiện biên bằng toán tử Prewitt
        case 'prewitt':
            const tempPixelsPrewitt = new Uint8ClampedArray(pixels);
            const widthPrewitt = processedImage.width;
            const heightPrewitt = processedImage.height;
            for (let i = 0; i < tempPixelsPrewitt.length; i += 4) {
                const gray = Math.round(0.299 * tempPixelsPrewitt[i] + 0.587 * tempPixelsPrewitt[i+1] 
                    + 0.114 * tempPixelsPrewitt[i+2]);
                tempPixelsPrewitt[i] = tempPixelsPrewitt[i + 1] = tempPixelsPrewitt[i + 2] = gray;
                tempPixelsPrewitt[i + 3] = pixels[i + 3];
            }
            const prewittX = [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]];
            const prewittY = [[-1, -1, -1], [0, 0, 0], [1, 1, 1]];
            for (let y = 1; y < heightPrewitt - 1; y++) {
                for (let x = 1; x < widthPrewitt - 1; x++) {
                    let gx = 0, gy = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const idx = ((y + i) * widthPrewitt + (x + j)) * 4;
                            gx += tempPixelsPrewitt[idx] * prewittX[i + 1][j + 1];
                            gy += tempPixelsPrewitt[idx] * prewittY[i + 1][j + 1];
                        }
                    }
                    const magnitude = Math.sqrt(gx * gx + gy * gy);
            
                    const idx = (y * widthPrewitt + x) * 4;
                    pixels[idx] = pixels[idx + 1] = pixels[idx + 2] = magnitude;
                    pixels[idx + 3] = tempPixelsPrewitt[idx + 3]; 
                }
            }
            break;
        
        // Phát hiện biên bằng toán tử Laplacian
        case 'laplacian':
            const tempPixelsLaplacian = new Uint8ClampedArray(pixels);
            const widthLaplacian = processedImage.width;
            const heightLaplacian = processedImage.height;
            for (let i = 0; i < tempPixelsLaplacian.length; i += 4) {
                const gray = Math.round(0.299 * tempPixelsLaplacian[i] + 0.587 * tempPixelsLaplacian[i+1] + 
                    0.114 * tempPixelsLaplacian[i+2]);
                tempPixelsLaplacian[i] = tempPixelsLaplacian[i + 1] = tempPixelsLaplacian[i + 2] = gray;
                tempPixelsLaplacian[i + 3] = pixels[i + 3];
            }
            const laplacianKernel = [[0, 1, 0],[1, -4, 1], [0, 1, 0]];
            for (let y = 1; y < heightLaplacian - 1; y++) {
                for (let x = 1; x < widthLaplacian - 1; x++) {
                    let sum = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const idx = ((y + i) * widthLaplacian + (x + j)) * 4;
                            sum += tempPixelsLaplacian[idx] * laplacianKernel[i + 1][j + 1];
                        }
                    }
                    const magnitude = Math.abs(sum);
            
                    const idx = (y * widthLaplacian + x) * 4;
                    pixels[idx] = pixels[idx + 1] = pixels[idx + 2] = magnitude;
                    pixels[idx + 3] = tempPixelsLaplacian[idx + 3];
                }
            }
            break;
            
        // Phát hiện biên bằng toán tử Canny
        case 'canny':
            const tempPixelsCanny = new Uint8ClampedArray(pixels);
            const widthCanny = processedImage.width;
            const heightCanny = processedImage.height;
            for (let i = 0; i < pixels.length; i += 4) {
                const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i+1] + 0.114 * pixels[i+2]);
                tempPixelsCanny[i] = tempPixelsCanny[i + 1] = tempPixelsCanny[i + 2] = gray;
                tempPixelsCanny[i + 3] = pixels[i + 3];
            }
            const gaussianKernel = [
                [2, 4, 5, 4, 2],
                [4, 9, 12, 9, 4],
                [5, 12, 15, 12, 5],
                [4, 9, 12, 9, 4],
                [2, 4, 5, 4, 2]
            ];
            const kernelSum = 159;

            // Bước 1: Giảm nhiễu bằng bộ lọc Gaussian
            // ở đây mình dùng 2 vì bộ lọc gaussian có kích thước 5x5 nên bán kính là 2, phải trừ đi 2 pixel ở 2 đầu
            for (let y = 2; y < heightCanny - 2; y++) {
                for (let x = 2; x < widthCanny - 2; x++) {
                    let sum = 0;
                    for (let i = -2; i <= 2; i++) {
                        for (let j = -2; j <= 2; j++) {
                            const idx = ((y + i) * widthCanny + (x + j)) * 4;
                            sum += tempPixelsCanny[idx] * gaussianKernel[i + 2][j + 2];
                        }
                    }
                    const blurredValue = sum / kernelSum;
                    const idx = (y * widthCanny + x) * 4;
                    pixels[idx] = pixels[idx + 1] = pixels[idx + 2] = blurredValue;
                }
            }

            // Bước 2: Tính gradient theo Sobel
            // bước này để tính độ lớn và hướng của gradient
            const sobelx = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
            const sobely = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];

            // Tạo mảng lưu magnitude và góc
            const gradientMagnitude = new Array(widthCanny * heightCanny).fill(0);
            const gradientAngles = new Array(widthCanny * heightCanny).fill(0);

            for (let y = 1; y < heightCanny - 1; y++) {
                for (let x = 1; x < widthCanny - 1; x++) {
                    let gx = 0, gy = 0;
                    
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const idx = ((y + i) * widthCanny + (x + j)) * 4;
                            const gray = pixels[idx];
                            gx += gray * sobelx[i + 1][j + 1];
                            gy += gray * sobely[i + 1][j + 1];
                        }
                    }

                    const idx = y * widthCanny + x;
                    gradientMagnitude[idx] = Math.sqrt(gx * gx + gy * gy);
                    gradientAngles[idx] = Math.atan2(gy, gx) * 180 / Math.PI;
                }
            }

            // Bước 3: Non-maximum suppression
            for (let y = 1; y < heightCanny - 1; y++) {
                for (let x = 1; x < widthCanny - 1; x++) {
                    const idx = y * widthCanny + x;
                    const angle = gradientAngles[idx];
                    const magnitude = gradientMagnitude[idx];

                    // Làm tròn góc về 4 hướng chính: 0, 45, 90, 135
                    const roundedAngle = Math.round(angle / 45) * 45;
                    // xác định 2 pixel lân cận theo hướng gradient
                    let neighbor1, neighbor2;
                    if (roundedAngle === 0 || roundedAngle === 180 || roundedAngle === -180) {
                        neighbor1 = gradientMagnitude[idx - 1]; // trái
                        neighbor2 = gradientMagnitude[idx + 1]; // phải
                    } else if (roundedAngle === 45 || roundedAngle === -135) {
                        neighbor1 = gradientMagnitude[(y - 1) * widthCanny + (x + 1)]; // trên phải
                        neighbor2 = gradientMagnitude[(y + 1) * widthCanny + (x - 1)]; // dưới trái
                    } else if (roundedAngle === 90 || roundedAngle === -90) {
                        neighbor1 = gradientMagnitude[(y - 1) * widthCanny + x]; // trên
                        neighbor2 = gradientMagnitude[(y + 1) * widthCanny + x]; // dưới
                    } else {
                        neighbor1 = gradientMagnitude[(y - 1) * widthCanny + (x - 1)]; // trên trái
                        neighbor2 = gradientMagnitude[(y + 1) * widthCanny + (x + 1)]; // dưới phải
                    }

                    // Nếu giá trị gradient của pixel hiện tại lớn hơn hoặc bằng hai pixel lân cận theo hướng gradient
                    // thì giữ nguyên giá trị gradient, ngược lại thì đặt giá trị gradient về 0
                    // Làm mỏng biên: Chỉ giữ lại những pixel nằm trên biên thực sự, loại bỏ các pixel xung quanh.
                    const pixelIdx = (y * widthCanny + x) * 4;
                    if (magnitude >= neighbor1 && magnitude >= neighbor2) {
                        pixels[pixelIdx] = pixels[pixelIdx + 1] = pixels[pixelIdx + 2] = magnitude;
                    } else {
                        pixels[pixelIdx] = pixels[pixelIdx + 1] = pixels[pixelIdx + 2] = 0;
                    }
                }
            }

            // Bước 4: Double thresholding và hysteresis
            
            const lowThreshold = 20;
            const highThreshold = 60;
            // Phân loại biên thành 3 loại: biên mạnh có cường độ lớn hơn highThreshold, biên yếu có cường độ nằm giữa lowThreshold và highThreshold,
            // không phải biên có cường độ nhỏ hơn lowThreshold
            for (let y = 0; y < heightCanny; y++) {
                for (let x = 0; x < widthCanny; x++) {
                    const idx = (y * widthCanny + x) * 4;
                    const magnitude = pixels[idx];

                    if (magnitude > highThreshold) {
                        pixels[idx] = pixels[idx + 1] = pixels[idx + 2] = 255;
                    } else if (magnitude < lowThreshold) {
                        pixels[idx] = pixels[idx + 1] = pixels[idx + 2] = 0;
                    }
                }
            }

            // Hysteresis
            for (let y = 1; y < heightCanny - 1; y++) {
                for (let x = 1; x < widthCanny - 1; x++) {
                    const idx = (y * widthCanny + x) * 4;
                    const magnitude = pixels[idx];

                    // Nếu giá trị độ lớn gradient magnitude nằm trong khoảng từ lowThreshold đến highThreshold, 
                    //pixel này được xem là biên yếu và cần được kiểm tra xem nó có liên kết với biên mạnh không.
                    if (magnitude > lowThreshold && magnitude <= highThreshold) {
                        let hasStrongNeighbor = false;
                        
                        // Kiểm tra 8 pixel lân cận
                        for (let i = -1; i <= 1; i++) {
                            for (let j = -1; j <= 1; j++) {
                                if (i === 0 && j === 0) continue;
                                const neighborIdx = ((y + i) * widthCanny + (x + j)) * 4;
                                if (pixels[neighborIdx] > highThreshold) {
                                    hasStrongNeighbor = true;
                                    break;
                                }
                            }
                            if (hasStrongNeighbor) break;
                        }

                        pixels[idx] = pixels[idx + 1] = pixels[idx + 2] = hasStrongNeighbor ? 255 : 0;
                    }
                    pixels[idx + 3] = tempPixelsCanny[idx + 3]; 
                }
            }
            break;
        
        // Phân ngưỡng Otsu
        case 'otsu':
            // Chuyển ảnh về grayscale
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]);
                pixels[i] = pixels[i + 1] = pixels[i + 2] = gray;
            }
            // Tính histogram
            const histogram = new Array(256).fill(0);
            const totalPixels = processedImage.width * processedImage.height;
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = pixels[i]; 
                histogram[gray]++;
            }
            // Tính xác suất xuất hiện của các mức xám
            const p = histogram.map(h => h / totalPixels);
            // Tính mG 
            const mG = p.reduce((sum, pi, i) => sum + i * pi, 0);
            // Tìm ngưỡng tối ưu
            let maxVariance = 0;
            let optimalThresholds = [];
            for(let k = 0; k < 256; k++) {
                // Tính P1(k)
                const P1 = p.slice(0, k + 1).reduce((sum, pi) => sum + pi, 0);
                if(P1 === 0 || P1 === 1) continue
                // Tính m(k)
                const mk = p.slice(0, k + 1).reduce((sum, pi, i) => sum + i * pi, 0);
                // Tính phương sai giữa các nhóm
                const variance = Math.pow(mG * P1 - mk, 2) / (P1 * (1 - P1));
                if(variance > maxVariance) {
                    maxVariance = variance;
                    optimalThresholds = [k];
                } else if(variance === maxVariance) {
                    optimalThresholds.push(k);
                }
            }
            // Lấy ngưỡng trung bình nếu có nhiều cực đại
            const optimalThreshold = Math.round(optimalThresholds.reduce((sum, t) => sum + t, 0) / optimalThresholds.length);
            console.log(optimalThreshold)
            otsuThresholdValue.textContent = optimalThreshold;
            otsuThresholdInfo.style.display = 'block';

            // Áp dụng ngưỡng
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = pixels[i];
                const value = gray > optimalThreshold ? 255 : 0;
                pixels[i] = pixels[i + 1] = pixels[i + 2] = value;
            }
            break;
        
        case 'isodata':
            // Khởi tạo ngưỡng ban đầu là 127
            let T = 127;
            const deltaT = 1;
            // Chuyển ảnh về grayscale
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]);
                pixels[i] = pixels[i + 1] = pixels[i + 2] = gray;
            }
            // Tính histogram
            const histogramm = new Array(256).fill(0);
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = pixels[i];
                histogramm[gray]++;
            }
            while(true) {
                const G1 = histogramm.slice(0, T + 1);
                const G2 = histogramm.slice(T + 1);
                // Tính giá trị trung bình của nhóm 1
                let mean_G1 = 0;
                let sum_G1 = 0;
                for(let i = 0; i <= T; i++) {
                    mean_G1 += i * G1[i];
                    sum_G1 += G1[i];
                }
                mean_G1 = sum_G1 > 0 ? mean_G1 / sum_G1 : 0;
                // Tính giá trị trung bình của nhóm 2
                let mean_G2 = 0;
                let sum_G2 = 0;
                for(let i = T + 1; i < 256; i++) {
                    mean_G2 += i * G2[i - T - 1];
                    sum_G2 += G2[i - T - 1];
                }
                mean_G2 = sum_G2 > 0 ? mean_G2 / sum_G2 : 0;

                // Tính ngưỡng mới
                const new_T = Math.round((mean_G1 + mean_G2) / 2);

                // Kiểm tra điều kiện dừng
                if(Math.abs(new_T - T) < deltaT) {
                    break;
                }
                T = new_T;
            }
            isodataThresholdValue.textContent = T;
            isodataThresholdInfo.style.display = 'block';
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = pixels[i];
                const value = gray > T ? 255 : 0;
                pixels[i] = pixels[i + 1] = pixels[i + 2] = value;
            }
            break;
        
        // Phân ngưỡng Background Symmetry
        case 'background_symmetry': 
            // Chuyển ảnh sang grayscale
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i+1] + 0.114 * pixels[i+2]);
                pixels[i] = pixels[i+1] = pixels[i+2] = gray;
            }

            // Tính histogram
            const histogramBS = new Array(256).fill(0);
            let totalPixel = 0;
            for(let i = 0; i < pixels.length; i += 4) {
                histogramBS[pixels[i]]++;
                totalPixel++;
            }

            let maxp = 0; 
            let maxpIndex = 0; 
            for(let i = 0; i < 256; i++) {
                if(histogramBS[i] > maxp) {
                    maxp = histogramBS[i];
                    maxpIndex = i;
                }
            }

            const pp = 95; 
            const pixelThreshold = totalPixel * pp / 100;
            let rightPoint = 0;
            let sumPixels = 0;
            for(let i = 0; i < 256; i++) {
                sumPixels += histogramBS[i];
                if(sumPixels >= pixelThreshold) {
                    rightPoint = i;
                    console.log(sumPixels)
                    break;
                }
            }
            const thresholdBS = Math.abs(maxpIndex - (rightPoint - maxpIndex))
            backgroundSymmetryThresholdValue.textContent = thresholdBS;
            backgroundSymmetryThresholdInfo.style.display = 'block';
            for(let i = 0; i < pixels.length; i += 4) {
                const value = pixels[i] > thresholdBS ? 255 : 0;
                pixels[i] = pixels[i+1] = pixels[i+2] = value;
            }
            break;
        
        // Phân ngưỡng Triangle
        case 'triangle':
            for(let i = 0; i < pixels.length; i += 4) {
                const gray = Math.round(0.299 * pixels[i] + 0.587 * pixels[i+1] + 0.114 * pixels[i+2]);
                pixels[i] = pixels[i+1] = pixels[i+2] = gray;
            }
            const histogramTriangle = new Array(256).fill(0);
            for(let i = 0; i < pixels.length; i += 4) {
                histogramTriangle[pixels[i]]++;
            }
            // Tìm bmax (điểm cao nhất của histogram)
            let bmax = 0;
            let bmaxLoc = 0;
            for(let i = 0; i < 256; i++) {
                if(histogramTriangle[i] > bmax) {
                    bmax = histogramTriangle[i];
                    bmaxLoc = i;
                }
            }
            // Tìm bmin (điểm cuối cùng của histogram)
            let bmin = 255;
            while(bmin > 0 && histogramTriangle[bmin] === 0) {
                bmin--;
            }
            // Tính khoảng cách từ đường thẳng đến histogram
            let maxDistance = 0;
            let thresholdTriangle = 0;
            
            // Tính hệ số của đường thẳng nối bmax và bmin
            const aCoef = bmin - bmaxLoc;
            
            const bCoef = histogramTriangle[bmin] - bmax;
        
            // sqrt(a^2 + b^2) với a,b là hiệu hoành độ và tung độ
            const cCoef = Math.sqrt(aCoef*aCoef + bCoef*bCoef);

            // Tìm điểm có khoảng cách lớn nhất đến đường thẳng
            for(let i = bmaxLoc; i <= bmin; i++) {
                // - (x,y) là điểm cần tính khoảng cách: (i, histogram[i])
                // - (x1,y1) là điểm đầu đường thẳng: (bmaxLoc, bmax)
                // - aCoef, bCoef là hệ số đường thẳng đã tính ở trên
                // - cCoef = sqrt(aCoef^2 + bCoef^2) là độ dài đường thẳng
                // Công thức tính khoảng cách từ một điểm đến đường thẳng
                // d = |ax0 + by0 + c| / sqrt(a^2 + b^2)
                const distance = Math.abs(
                    bCoef*(i - bmaxLoc) - aCoef*(histogramTriangle[i] - bmax)
                ) / cCoef;

                if(distance > maxDistance) {
                    maxDistance = distance;
                    thresholdTriangle = i;
                }
            }
            triangleThresholdValue.textContent = thresholdTriangle;
            triangleThresholdInfo.style.display = 'block';

            // Áp dụng ngưỡng vào ảnh
            for(let i = 0; i < pixels.length; i += 4) {
                const value = pixels[i] > thresholdTriangle ? 255 : 0;
                pixels[i] = pixels[i+1] = pixels[i+2] = value;
            }
            break;
    
        // Xoay ảnh
        case 'rotate':
            // Tạo canvas tạm để vẽ ảnh xoay
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            
            // Đặt kích thước canvas tạm bằng với ảnh gốc
            tempCanvas.width = processedImage.width;
            tempCanvas.height = processedImage.height;
            
            // Vẽ ảnh gốc vào canvas tạm
            tempCtx.putImageData(imageData, 0, 0);
            
            // Tạo input cho góc xoay
            let rotationAngle = parseInt(rotationAngleInput.value);
            
            // Chuyển đổi góc sang radian
            const angleInRadians = (parseFloat(rotationAngle) * Math.PI) / 180;
            
            // Tính toán kích thước mới sau khi xoay
            const sin = Math.abs(Math.sin(angleInRadians));
            const cos = Math.abs(Math.cos(angleInRadians));
            const newWidth = Math.floor(processedImage.width * cos + processedImage.height * sin);
            const newHeight = Math.floor(processedImage.height * cos + processedImage.width * sin);
            
            // Điều chỉnh kích thước canvas chính
            processedImage.width = newWidth;
            processedImage.height = newHeight;
            
            // Xoá canvas chính
            ctx.clearRect(0, 0, newWidth, newHeight);
            
            // Di chuyển điểm gốc tọa độ đến tâm canvas mới
            ctx.translate(newWidth/2, newHeight/2);
            
            // Xoay theo góc đã nhập
            ctx.rotate(angleInRadians);
            
            // Vẽ lại ảnh từ canvas tạm
            ctx.drawImage(tempCanvas, -tempCanvas.width/2, -tempCanvas.height/2);
            
            // Lấy dữ liệu pixel sau khi xoay
            const rotatedData = ctx.getImageData(0, 0, newWidth, newHeight);
            
            // Tạo ImageData mới với kích thước đã xoay 
            const newImageData = new ImageData(rotatedData.data, newWidth, newHeight);
            imageData = newImageData;
            
            // Reset transform về mặc định
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            break;
    
        // Chỉnh độ tương phản
        case 'contrast':
            const contrastInputValue = parseFloat(document.getElementById('contrastInput').value)
            const contrastFactor = (259 * (contrastInputValue + 255)) / (255 * (259 - contrastInputValue));
            for (let i = 0; i < pixels.length; i += 4) {
                pixels[i] = Math.min(255, Math.max(0, contrastFactor * (pixels[i] - 128) + 128));
                pixels[i + 1] = Math.min(255, Math.max(0, contrastFactor * (pixels[i + 1] - 128) + 128));
                pixels[i + 2] = Math.min(255, Math.max(0, contrastFactor * (pixels[i + 2] - 128) + 128));
            }
            break;
    
        // Làm sắc nét ảnh
        case 'sharpen':
            // Lấy giá trị đầu vào cho độ sắc nét
            const sharpenIntensity = parseFloat(document.getElementById('sharpenInput').value);

            // Tạo kernel làm sắc nét với cường độ điều chỉnh
            const sharpenKernel = [
                0, -1, 0,
                -1, 4 + sharpenIntensity, -1,
                0, -1, 0
            ];

            // Áp dụng kernel làm sắc nét lên ảnh
            const sharpenedPixels = new Uint8ClampedArray(pixels);
            const imageWidth = processedImage.width;
            const imageHeight = processedImage.height;
            const kernelDimension = Math.sqrt(sharpenKernel.length);
            const kernelOffset = Math.floor(kernelDimension / 2);

            for (let y = 0; y < imageHeight; y++) {
                for (let x = 0; x < imageWidth; x++) {
                    let rSum = 0, gSum = 0, bSum = 0;

                    // Áp dụng kernel
                    for (let ky = 0; ky < kernelDimension; ky++) {
                        for (let kx = 0; kx < kernelDimension; kx++) {
                            const px = x + kx - kernelOffset;
                            const py = y + ky - kernelOffset;

                            if (px >= 0 && px < imageWidth && py >= 0 && py < imageHeight) {
                                const i = (py * imageWidth + px) * 4;
                                const kernelIndex = ky * kernelDimension + kx;

                                rSum += pixels[i] * sharpenKernel[kernelIndex];
                                gSum += pixels[i + 1] * sharpenKernel[kernelIndex];
                                bSum += pixels[i + 2] * sharpenKernel[kernelIndex];
                            }
                        }
                    }

                    const i = (y * imageWidth + x) * 4;
                    sharpenedPixels[i] = Math.min(255, Math.max(0, rSum));
                    sharpenedPixels[i + 1] = Math.min(255, Math.max(0, gSum));
                    sharpenedPixels[i + 2] = Math.min(255, Math.max(0, bSum));
                }
            }

            // Cập nhật dữ liệu pixel sau khi làm sắc nét
            for (let i = 0; i < pixels.length; i++) {
                pixels[i] = sharpenedPixels[i];
            }
            break;
    
        // Điều chỉnh chỉ số highlights
        case 'highlights':
            const highlightFactor = parseInt(document.getElementById('highlightsInput').value);
            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i] > 200 || pixels[i + 1] > 200 || pixels[i + 2] > 200) {
                    pixels[i] = Math.min(255, pixels[i] + highlightFactor);     // Red
                    pixels[i + 1] = Math.min(255, pixels[i + 1] + highlightFactor); // Green 
                    pixels[i + 2] = Math.min(255, pixels[i + 2] + highlightFactor); // Blue
                }
            }
            break;
    
        // Điều chỉnh chỉ số shadows
        case 'shadows':
            const shadowFactor = parseInt(document.getElementById('shadowsInput').value);
            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i] < 100 && pixels[i + 1] < 100 && pixels[i + 2] < 100) {
                    pixels[i] = Math.max(0, pixels[i] + shadowFactor);     // Red
                    pixels[i + 1] = Math.max(0, pixels[i + 1] + shadowFactor); // Green
                    pixels[i + 2] = Math.max(0, pixels[i + 2] + shadowFactor); // Blue
                }
            }
            break;
    }    

    ctx.putImageData(imageData, 0, 0);
    processedImage.style.display = 'block';
    processedEmpty.style.display = 'none';

    // Sau khi xử lý xong, cập nhật thông tin ảnh đã xử lý
    updateProcessedImageInfo();
    
});

gammaInput.addEventListener('input', function() {
    gammaValue.textContent = this.value;
});

maskSizeInput.addEventListener('input', function() {
    maskSizeValue.textContent = this.value;
});

kernelSizeInput.addEventListener('input', function() {
    kernelSizeValue.textContent = this.value;
});

radiusInput.addEventListener('input', function() {
    radiusValue.textContent = this.value;
});

maxRadiusInput.addEventListener('input', function() {
    maxRadiusValue.textContent = this.value;
});

midRadiusInput.addEventListener('input', function() {
    midRadiusValue.textContent = this.value;
});

thresholdInput.addEventListener('input', function() {
    thresholdValue.textContent = this.value;
});

r1Input.addEventListener('input', function() {
    r1Value.textContent = this.value;
});

s1Input.addEventListener('input', function() {
    s1Value.textContent = this.value;
});

r2Input.addEventListener('input', function() {
    r2Value.textContent = this.value;
});

s2Input.addEventListener('input', function() {
    s2Value.textContent = this.value;
});

brightnessFactorInput.addEventListener('input', function() {
    brightnessFactorValue.textContent = this.value;
});

rotationAngleInput.addEventListener('input', function() {
    rotationAngleValue.textContent = this.value;
});

contrastInput.addEventListener('input', function() {
    contrastValue.textContent = this.value;

});

function applyContrast(contrast) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    for(let i = 0; i < pixels.length; i += 4) {
        for(let j = 0; j < 3; j++) {
            const pixel = pixels[i + j];
            pixels[i + j] = Math.min(255, Math.max(0, ((pixel - 128) * contrast) + 128));
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
}

function createLowpassMask(size) {
    const mask = new Array(size * size).fill(1 / (size * size));
    return mask;
}

function applyFilter(pixels, width, height, mask) {
    const tempPixels = new Uint8ClampedArray(pixels);
    const maskSize = Math.sqrt(mask.length);
    const offset = Math.floor(maskSize / 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let rSum = 0, gSum = 0, bSum = 0;

            // Áp dụng mask
            for (let my = 0; my < maskSize; my++) {
                for (let mx = 0; mx < maskSize; mx++) {
                    const px = x + mx - offset;
                    const py = y + my - offset;

                    if (px >= 0 && px < width && py >= 0 && py < height) {
                        const i = (py * width + px) * 4;
                        const maskIndex = my * maskSize + mx;
                        
                        rSum += tempPixels[i] * mask[maskIndex];
                        gSum += tempPixels[i + 1] * mask[maskIndex];
                        bSum += tempPixels[i + 2] * mask[maskIndex];
                    }
                }
            }

            const i = (y * width + x) * 4;
            pixels[i] = rSum;
            pixels[i + 1] = gSum;
            pixels[i + 2] = bSum;
            pixels[i + 3] = tempPixels[i + 3]; // Giữ nguyên alpha
        }
    }
}

function applyMedianFilter(pixels, width, height, kernelSize) {
    const tempPixels = new Uint8ClampedArray(pixels);
    const offset = Math.floor(kernelSize / 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = [], g = [], b = [];

            // Thu thập các giá trị pixel trong vùng kernel
            for (let ky = 0; ky < kernelSize; ky++) {
                for (let kx = 0; kx < kernelSize; kx++) {
                    const px = x + kx - offset;
                    const py = y + ky - offset;

                    if (px >= 0 && px < width && py >= 0 && py < height) {
                        const i = (py * width + px) * 4;
                        r.push(tempPixels[i]);
                        g.push(tempPixels[i + 1]);
                        b.push(tempPixels[i + 2]);
                    }
                }
            }

            // Sắp xếp và lấy giá trị trung vị cho mỗi kênh màu
            r.sort((a, b) => a - b);
            g.sort((a, b) => a - b);
            b.sort((a, b) => a - b);

            const medianIndex = Math.floor(r.length / 2);
            const i = (y * width + x) * 4;
            
            pixels[i] = r[medianIndex];
            pixels[i + 1] = g[medianIndex];
            pixels[i + 2] = b[medianIndex];
            pixels[i + 3] = tempPixels[i + 3]; // Giữ nguyên alpha
        }
    }
}

function applyMinimumFilter(pixels, width, height, radius) {
    const tempPixels = new Uint8ClampedArray(pixels);
    const size = radius * 2 + 1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let minR = 255, minG = 255, minB = 255;

            // Tìm giá trị nhỏ nhất trong vùng lân cận
            for (let dy = -radius; dy <= radius; dy++) {
                for (let dx = -radius; dx <= radius; dx++) {
                    const px = x + dx;
                    const py = y + dy;

                    if (px >= 0 && px < width && py >= 0 && py < height) {
                        const i = (py * width + px) * 4;
                        minR = Math.min(minR, tempPixels[i]);
                        minG = Math.min(minG, tempPixels[i + 1]);
                        minB = Math.min(minB, tempPixels[i + 2]);
                    }
                }
            }

            const i = (y * width + x) * 4;
            pixels[i] = minR;
            pixels[i + 1] = minG;
            pixels[i + 2] = minB;
            pixels[i + 3] = tempPixels[i + 3]; // Giữ nguyên alpha
        }
    }
}

function applyMaximumFilter(pixels, width, height, maxRadius) {
    const tempPixels = new Uint8ClampedArray(pixels);
    const size = maxRadius * 2 + 1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let maxR = 0, maxG = 0, maxB = 0;

            // Tìm giá trị lớn nhất trong vùng lân cận
            for (let dy = -maxRadius; dy <= maxRadius; dy++) {
                for (let dx = -maxRadius; dx <= maxRadius; dx++) {
                    const px = x + dx;
                    const py = y + dy;

                    if (px >= 0 && px < width && py >= 0 && py < height) {
                        const i = (py * width + px) * 4;
                        maxR = Math.max(maxR, tempPixels[i]);
                        maxG = Math.max(maxG, tempPixels[i + 1]);
                        maxB = Math.max(maxB, tempPixels[i + 2]);
                    }
                }
            }

            const i = (y * width + x) * 4;
            pixels[i] = maxR;
            pixels[i + 1] = maxG;
            pixels[i + 2] = maxB;
            pixels[i + 3] = tempPixels[i + 3]; // Giữ nguyên alpha
        }
    }
}

function applyMidpointFilter(pixels, width, height, midRadius) {
    const tempPixels = new Uint8ClampedArray(pixels);
    const size = midRadius * 2 + 1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let minR = 255, minG = 255, minB = 255;
            let maxR = 0, maxG = 0, maxB = 0;

            // Tìm giá trị lớn nhất và nhỏ nhất trong vùng lân cận
            for (let dy = -midRadius; dy <= midRadius; dy++) {
                for (let dx = -midRadius; dx <= midRadius; dx++) {
                    const px = x + dx;
                    const py = y + dy;

                    if (px >= 0 && px < width && py >= 0 && py < height) {
                        const i = (py * width + px) * 4;
                        // Tìm min
                        minR = Math.min(minR, tempPixels[i]);
                        minG = Math.min(minG, tempPixels[i + 1]);
                        minB = Math.min(minB, tempPixels[i + 2]);
                        // Tìm max
                        maxR = Math.max(maxR, tempPixels[i]);
                        maxG = Math.max(maxG, tempPixels[i + 1]);
                        maxB = Math.max(maxB, tempPixels[i + 2]);
                    }
                }
            }

            // Tính giá trị trung điểm (midpoint)
            const i = (y * width + x) * 4;
            pixels[i] = (minR + maxR) / 2;
            pixels[i + 1] = (minG + maxG) / 2;
            pixels[i + 2] = (minB + maxB) / 2;
            pixels[i + 3] = tempPixels[i + 3]; // Giữ nguyên alpha
        }
    }
}

function updateOriginalImageInfo(file) {
    // Kích thước file
    const sizeMB = file.size / (1024 * 1024);
    originalSizeSpan.textContent = sizeMB.toFixed(2) + ' MB';
    
    // Độ phân giải
    originalResolutionSpan.textContent = 
        `${originalImage.naturalWidth} x ${originalImage.naturalHeight}`;
}

function updateProcessedImageInfo() {
    // Lấy kích thước của ảnh đã xử lý
    processedImage.toBlob(function(blob) {
        const sizeMB = blob.size / (1024 * 1024);
        processedSizeSpan.textContent = sizeMB.toFixed(2) + ' MB';
        
        // Tính tỷ lệ nén
        const originalSize = parseFloat(originalSizeSpan.textContent);
        const compressionRatio = ((originalSize - sizeMB) / originalSize * 100);
        compressionRatioSpan.textContent = compressionRatio.toFixed(1) + '%';
    }, 'image/jpeg', 0.8);

    // Độ phân giải
    processedResolutionSpan.textContent = 
        `${processedImage.width} x ${processedImage.height}`;
}

function displayCompressionResult(pixels, encoded) {
    // Giới hạn số lượng giá trị hiển thị
    const maxDisplay = 20;
    
    // Hiển thị dữ liệu gc
    let originalText = 'pixels = [';
    if (algorithmSelect.value === 'rlc' || algorithmSelect.value === 'huffman') {
        // Hiển thị dữ liệu nhị phân cho RLC
        const binaryPixels = new Uint8Array(pixels.length/4);
        for(let i = 0, j = 0; i < Math.min(pixels.length, maxDisplay * 4); i += 4, j++) {
            const avg = (pixels[i] + pixels[i+1] + pixels[i+2])/3;
            binaryPixels[j] = avg > 128 ? 1 : 0;
            originalText += binaryPixels[j];
            if (i + 4 < Math.min(pixels.length, maxDisplay * 4)) originalText += ', ';
        }
    } else {
        // Hiển thị dữ liệu gốc cho các thuật toán khác
        for (let i = 0; i < Math.min(pixels.length, maxDisplay * 4); i += 4) {
            originalText += `${pixels[i]}, ${pixels[i + 1]}, ${pixels[i + 2]}, ${pixels[i + 3]}`;
            if (i + 4 < Math.min(pixels.length, maxDisplay * 4)) originalText += ', ';
        }
    }
    if (pixels.length > maxDisplay * 4) originalText += ', ...';
    originalText += `]\n(${pixels.length} giá trị)`;
    originalData.textContent = originalText;

    // Hiển thị dữ liệu đã nén
    let encodedText = 'encoded = ';
    if (Array.isArray(encoded)) {
        encodedText += JSON.stringify(encoded.slice(0, maxDisplay), null, 2);
        if (encoded.length > maxDisplay) encodedText += ',\n...';
        encodedText += `\n(${encoded.length} giá trị)`;
    } else {
        encodedText += encoded;
    }
    encodedData.textContent = encodedText;

    // Hiển thị kết quả
    compressionResult.style.display = 'block';
}

sharpenInput.addEventListener('input', function() {
    sharpenValue.textContent = this.value;
});

function applySharpen(intensity) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const width = canvas.width;
    const height = canvas.height;
    
    // Tạo một bản sao của dữ liệu pixel
    const tempPixels = new Uint8ClampedArray(pixels);
    
    // Ma trận lọc sắc nét
    const kernel = [
        [0, -1, 0],
        [-1, 4 + intensity, -1],
        [0, -1, 0]
    ];
    
    for(let y = 1; y < height - 1; y++) {
        for(let x = 1; x < width - 1; x++) {
            for(let c = 0; c < 3; c++) {
                const idx = (y * width + x) * 4 + c;
                let sum = 0;
                
                for(let ky = -1; ky <= 1; ky++) {
                    for(let kx = -1; kx <= 1; kx++) {
                        const pixel = tempPixels[((y + ky) * width + (x + kx)) * 4 + c];
                        sum += pixel * kernel[ky + 1][kx + 1];
                    }
                }
                
                pixels[idx] = Math.min(255, Math.max(0, sum));
            }
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
}

// Cập nhật hiển thị giá trị highlights và áp dụng ngay lập tức
highlightsInput.addEventListener('input', function() {
    highlightsValue.textContent = this.value;
});


function applyHighlights(factor) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    for (let i = 0; i < pixels.length; i += 4) {
        const maxChannel = Math.max(pixels[i], pixels[i + 1], pixels[i + 2]);
        if (maxChannel > 128) {
            pixels[i] = Math.min(255, pixels[i] + factor);
            pixels[i + 1] = Math.min(255, pixels[i + 1] + factor);
            pixels[i + 2] = Math.min(255, pixels[i + 2] + factor);
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
}

shadowsInput.addEventListener('input', function() {
    shadowsValue.textContent = this.value;
    applyShadows(parseInt(this.value));
});


function applyShadows(factor) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    for (let i = 0; i < pixels.length; i += 4) {
        const maxChannel = Math.max(pixels[i], pixels[i + 1], pixels[i + 2]);
        if (maxChannel < 128) {
            pixels[i] = Math.min(255, pixels[i] + factor);
            pixels[i + 1] = Math.min(255, pixels[i + 1] + factor);
            pixels[i + 2] = Math.min(255, pixels[i + 2] + factor);
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
}

// Thêm sự kiện click cho nút mũi tên
transferButton.addEventListener('click', function() {
    const ctx = processedImage.getContext('2d');
    // Lấy dữ liệu từ canvas đầu ra
    const outputData = ctx.getImageData(0, 0, processedImage.width, processedImage.height);
    
    // Tạo một ảnh mới từ dữ liệu canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = processedImage.width;
    tempCanvas.height = processedImage.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.putImageData(outputData, 0, 0);
    
    // Tạo một ảnh mới và gán nguồn từ canvas tạm
    const newImage = new Image();
    newImage.onload = function() {
        // Cập nhật ảnh đầu vào
        originalImage.src = newImage.src;
        originalImage.onload = function() {
            // Vẽ lại ảnh đầu vào
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(originalImage, 0, 0);
        };
    };
    newImage.src = tempCanvas.toDataURL();
});


