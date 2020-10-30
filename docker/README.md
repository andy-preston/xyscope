# Building the container for development

You can build the container with:

```bash
docker build -t xyscope-dev ./docker
```

And run the test environment in the container with:

```bash
docker run -it --rm --network="host" \
    --user $(id -u):$(id -g) --volume $(pwd):/usr/local/src \
    --name running-xyscope-dev xyscope-dev
yarn install
```

To get an extra bash prompt inside the container:

```bash
docker container exec -it running-simple-app bash
```
