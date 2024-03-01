import cv2 as cv
import numpy as np




haystack_image = cv.imread("C:\\Users\\Arcb0\\OneDrive\\Desktop\\Projects\\riskBot\\images\\map.png", cv.IMREAD_REDUCED_COLOR_2)
cv.cvtColor(haystack_image, cv.COLOR_BGR2GRAY)
cv.imshow('original', haystack_image)
cv.waitKey()

gray_image = cv.cvtColor(haystack_image, cv.COLOR_BGR2GRAY)
cv.imshow('gray', gray_image)
cv.waitKey()

needle_image = cv.imread("C:\\Users\\Arcb0\\OneDrive\\Desktop\\Projects\\riskBot\\images\\Background.png", cv.IMREAD_REDUCED_COLOR_2)

needle_image = cv.cvtColor(needle_image, cv.COLOR_BGR2GRAY)
cv.imshow('needle', needle_image)
cv.waitKey()

result = cv.matchTemplate(gray_image, needle_image, cv.TM_CCOEFF_NORMED)

min_val, max_val, min_loc, max_loc = cv.minMaxLoc(result)

print(f"Best match {max_loc[0]}, {max_loc[1]}")
print(f"Confidence {max_val}")


top_left = max_loc
bottom_right = (top_left[0] + needle_image.shape[1], top_left[1] + needle_image.shape[0])
cv.rectangle(haystack_image, top_left, bottom_right, color=(0, 255, 0), thickness=2, lineType=cv.LINE_4)
cv.imshow('Result', haystack_image)
cv.waitKey()