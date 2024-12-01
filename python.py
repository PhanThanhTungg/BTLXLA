import cv2
import pywt
import numpy as np
import matplotlib.pyplot as plt

def wavelet_denoise(image, wavelet='haar', level=1, thresholding='soft', threshold_multiplier=3):
    """
    Khử nhiễu ảnh bằng biến đổi Wavelet.
    
    Args:
        image: Ảnh đầu vào (grayscale).
        wavelet: Loại wavelet (mặc định 'haar').
        level: Số mức phân giải.
        thresholding: Phương pháp áp dụng ngưỡng ('soft' hoặc 'hard').
        threshold_multiplier: Hệ số để điều chỉnh ngưỡng.

    Returns:
        Ảnh đã khử nhiễu.
    """
    # Thực hiện biến đổi Wavelet
    coeffs = pywt.wavedec2(image, wavelet, level=level)
    coeffs_arr, coeff_slices = pywt.coeffs_to_array(coeffs)

    # Tính ngưỡng dựa trên phương sai của các hệ số chi tiết
    sigma = np.median(np.abs(coeffs_arr)) / 0.6745
    threshold = threshold_multiplier * sigma

    # Áp dụng ngưỡng trên các hệ số chi tiết
    coeffs_thresholded = []
    for c in coeffs:
        if isinstance(c, tuple):  # Các hệ số chi tiết (horizontal, vertical, diagonal)
            c_thresh = tuple(pywt.threshold(coeff, threshold, mode=thresholding) for coeff in c)
            coeffs_thresholded.append(c_thresh)
        else:  # Thành phần approximation
            coeffs_thresholded.append(c)

    # Khôi phục ảnh bằng biến đổi Wavelet nghịch đảo
    denoised_image = pywt.waverec2(coeffs_thresholded, wavelet)
    denoised_image = np.clip(denoised_image, 0, 255).astype(np.uint8)  # Đảm bảo giá trị ảnh trong khoảng [0, 255]

    return denoised_image

# Đọc ảnh và chuyển sang grayscale
image_path = './Chuong3NangCaoChatLuongAnh/inputLocTrungBinhTrungVi.png'
image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

if image is None:
    raise FileNotFoundError(f"Không thể đọc ảnh: {image_path}")

# Khử nhiễu
denoised_image = wavelet_denoise(image, wavelet='haar', level=100, thresholding='soft', threshold_multiplier=12)

# Hiển thị ảnh gốc và ảnh đã khử nhiễu
plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1)
plt.imshow(image, cmap='gray')
plt.title('Ảnh gốc')
plt.axis('off')

plt.subplot(1, 2, 2)
plt.imshow(denoised_image, cmap='gray')
plt.title('Ảnh đã khử nhiễu')
plt.axis('off')

plt.tight_layout()
plt.show()
