This app calculates taxes in India!  
###### NOTE: Not considering deductions right now. Just flat tax!  
  
Powered by Travis CI!  

USING DOCKER-COMPOSE:  
=====================  
    
Build (You can skip this step):  
-------------------------------      
To build, just run: `docker compose build`  
  
Run:  
----  
1. To run, just run: `docker-compose up`  
2. To run in detached more, you can run: `docker-compose up -d`  
  
Stop:  
-----  
To stop containers, run: `docker-compose stop`  
  
Remove:
-------
1. To remove containers, run: `docker-compose rm`  
2. Then delete the image by running: `docker rmi taxy_taxy-api`
  
  
WITH JUST DOCKER:  
=================  
    
Build:
------  
Build the docker image: `docker build . -t taxy`  

Run:  
----  
1. Run in detached mode: `docker run -d -p 8080:8080 --name taxy-api taxy`  
2. You can also run in interactive mode: `docker run -it -p 8080:8080 --name taxy-api taxy`  
  
Check:  
------  
1. To test if the app is running, you can visit: <http://localhost:8080/> on your browser!  
2. After running, you can refer swagger document for API at `Coming Soon`  
  
Stop:  
-----  
You can stop the container: `docker stop taxy-api`  
  
Remove:
-------  
1. Then delete the container: `docker rm taxy-api`  
2. You can then delete the image: `docker rmi taxy`  
    
Enjoy 🙂  
