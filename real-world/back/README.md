Back-end for event web-site
===============
Heading level 2
---------------
If you want to lauch the server locally then all you will need is Java 12. From the backend directory run:
```bash
./gradlew
```
or for windows-users:
```bash
./gradlew.bat
```
and then to lauch the server:
```bash
java jar ./build/libs/realworld-0.0.1-SNAPSHOT.jar
```

Also there is a dockerfile to build a docker image ready to deploy on a server. To do so from the backend directory run:
```bash
docker build -t realworld
```

To start a container with the created image run:
```bash
docker run -it -p 8081:8081 realworld
```
