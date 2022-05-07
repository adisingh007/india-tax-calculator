This app calculates taxes in India!  
###### NOTE: Not considering deductions right now. Just flat tax!  
  
BUILD:
------
  
Build the docker image: `docker build . -t taxy`  

RUN:  
----  
1. Run in detached mode: `docker run -d -p 8080:8080 --name taxy-container taxy`  
2. You can also run in interactive mode: `docker run -it -p 8080:8080 --name taxy-container taxy`  
  
CHECK:  
------  
1. To test if the app is running, you can visit: <http://localhost:8080/> on your browser!  
2. After running, you can refer swagger document for API at `Coming Soon`  
  
STOP:  
-----  
1. You can stop the container: `docker stop taxy-container`  
2. Then delete the container: `docker rm taxy-container`  
3. You can then delete the image: `docker rmi taxy`  
    
Enjoy 🙂  
