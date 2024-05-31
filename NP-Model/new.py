import string
import matplotlib.pyplot as plt
import easyocr
from IPython.display import Image
import cv2
from pylab import rcParams
import numpy as np

harcascade = "model/haarcascade_russian_plate_number.xml"

cap = cv2.VideoCapture(0)

cap.set(3, 640) # width
cap.set(4, 480) #height

min_area = 500
count = 0

# OCR
reader = easyocr.Reader(['en'])



while True:
    success, img = cap.read()

    plate_cascade = cv2.CascadeClassifier(harcascade)
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    plates = plate_cascade.detectMultiScale(img_gray, 1.1, 4)

    for (x,y,w,h) in plates:
        area = w * h

        if area > min_area:
            cv2.rectangle(img, (x,y), (x+w, y+h), (0,255,0), 2)
            cv2.putText(img, "Number Plate", (x,y-5), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (255, 0, 255), 2)

            img_roi = img[y: y+h, x:x+w]
            # cv2.imshow("ROI", img_roi)


    
    cv2.imshow("Result", img)

    if cv2.waitKey(1) & 0xFF == ord('s'):
        # // clearing Image
        # R, G, B = cv2.split(img_roi)

        # output1_R = cv2.equalizeHist(R)
        # output1_G = cv2.equalizeHist(G)
        # output1_B = cv2.equalizeHist(B)

        # equ = cv2.merge((output1_R, output1_G, output1_B))
        # # equ = cv2.equalizeHist(img_roi)
        # # blur = cv2.GaussianBlur(equ, (5, 5), 1)
        # th2 = 100 # this threshold might vary!
        # equ[equ>=th2] = 255
        # equ[equ<th2]  = 0
        gray = cv2.cvtColor(img_roi, cv2.COLOR_BGR2GRAY)
        bfilter = cv2.bilateralFilter(gray, 11, 17, 17) #Noise reduction


        cv2.imwrite("plates/scaned_img_" + str(count) + ".jpg", bfilter)
        # cv2.rectangle(img, (0,200), (640,300), (0,255,0), cv2.FILLED)
        # cv2.putText(img, "Plate Saved", (150, 265), cv2.FONT_HERSHEY_COMPLEX_SMALL, 2, (0, 0, 255), 2)
        concatstringg='./plates/scaned_img_'+ str(count) + ".jpg"
        output = reader.readtext(concatstringg)
        outputNumber = open("./OCRText.txt", "a")
        outputText=(output[0][1] + "  -  ")
        outputNumber.write(outputText)
        outputNumber.close()
        print(output[0][1])
        cv2.imshow("Results",img)
        cv2.waitKey(500)
        count += 1

        # clickImage = 0