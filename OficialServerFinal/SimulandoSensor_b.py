from Sensor import SensorDeTemperatura
import sys, json
import time
import requests
import datetime


#Constants
server_address = 'http://localhost:8888'
client_id = 'sensor_b'
sleep_time=30
threshold_temp_alerta=50

def get_temperature():    
    NumeroDaPortaDeLeitura = int(sys.argv[1]) 
    sensor1 = SensorDeTemperatura(NumeroDaPortaDeLeitura)
    resultado = sensor1.monitoramento()
    if (resultado>threshold_temp_alerta):
        resultado1={'alerta':'yes'}
    else:
        resultado1={'alerta':'no'}
    
    palavra = str(resultado)
    resultado1['temperature'] = resultado
    return resultado1
    
def main():
    while True:
        temp = get_temperature()
        temp['id'] = client_id
        temp['time'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S ")
        
        r = requests.post(server_address,data=temp)
        print(r)
        time.sleep(sleep_time)


if __name__ == "__main__":
    main()
        
        



