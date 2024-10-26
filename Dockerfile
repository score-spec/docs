# We use golang because hugo depends on Go as it's module downloader
FROM golang:alpine
# We then install shared libs and dynamic linking dependencies
RUN apk add --no-cache gcc g++ musl-dev git yarn gcompat npm

COPY . /src
WORKDIR /src

# Install all the packages
RUN yarn install

# Do an initial hugo build
RUN yarn hugo --verbose

# Run the hugo server at launch
CMD [ "yarn", "hugo", "server", "--themesDir", "../..", "--disableFastRender", "--renderToMemory", "--bind", "0.0.0.0" ]