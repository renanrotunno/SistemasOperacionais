from Inicializador_de_Board import InicializadorDeBoard
from ConversorAD import ConversorAnalogicoDigital


class SensorDeTemperatura(object):

    board = InicializadorDeBoard()
    leitorDeTemperatura = ConversorAnalogicoDigital()

    def __init__(self, numeroControle):
        self.numeroControle = numeroControle
        
    def monitoramento(self):
        valor = self.leitorDeTemperatura.leradc(self.numeroControle)
        valorfinal=(valor*3.3*100)/1024
        return valorfinal; 
         



