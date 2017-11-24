import RPi.GPIO as GPIO

class InicializadorDeBoard():

    def __init__(self):
        GPIO.setmode(GPIO.BOARD)            #Utiliza a numeracao dos pinos como na placa
        GPIO.setwarnings(False)             #Desabilita as mensagens

    def definePinoComoEntrada(self, numeroPino):
        GPIO.setup(numeroPino, GPIO.IN)

    
