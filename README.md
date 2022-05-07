This app calculates taxes in India!  
  
To build, just run:  
  
  
Build the docker image: `docker build . -t taxy`  
Run in detached mode: `docker run -d -p 8080:8080 --name taxy-container taxy`  
You can also run in interactive mode: `docker run -it -p 8080:8080 --name taxy-container taxy`  
  
After running, you can refer swagger document for API at `Coming Soon`  

You can stop the container: `docker stop taxy-container`  
Then delete the container: `docker rm taxy-container`  
You can then delete the image: `docker rmi taxy`  
  
Enjoy 🙂  
