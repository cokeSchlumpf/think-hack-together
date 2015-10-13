# Think & Hack together
Tolles Projekt.

## UI development cycle
To start the liberty profile with the backend application use Maven in project root directory.

```
mvn integration-test -Dwatch
```

Afterwards start NPM watch.
```
cd src/main/webapp
npm install
npm run watch
```

Now you're able to change the frontent-sources and they will be automatically pushed to the server such as IBM WebSphere Liberty Profile.
