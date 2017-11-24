from Sensor import SensorDeTemperatura
import sys, json
import time
import requests
import datetime


#Constants
server_address = 'http://localhost:8888/getLastTemperatureById'
client_id = 'sensor_a'
sleep_time=30

def get_clientid():    
    resultado1= {'id':client_id}
    return resultado1
    
def main():
    while True:
        #print("hello")
        temp = get_clientid() 
        r = requests.post(server_address,data=temp)
        print(r)
        time.sleep(sleep_time)


if __name__ == "__main__":
    main()
        
        



