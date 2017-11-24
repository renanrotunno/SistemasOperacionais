import spidev
import time

class ConversorAnalogicoDigital(object):

    spi = spidev.SpiDev()

    def __init__(self):
        # abre e seta valores ao objeto
        self.spi.open(0, 0)

    def leradc(self,adcnum):
        # le o dado do SPI do MCP3008, que devera estar no intervalo de 8 digitos
        # 0 a 7
        if adcnum > 7 or adcnum < 0:
            return -1

        # etapa que faz a conversao dos dados lidos de analogico para digital
        r = self.spi.xfer2([1, 8 + adcnum << 4, 0])
        adc_saida = ((r[1] & 3) << 8) + r[2]
        return adc_saida

    
