FROM node:16.15.0 AS dependency_files

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

COPY packages packages

# Find and remove non-package.json files
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

FROM node:16.15.0 AS build

WORKDIR /app

COPY --from=dependency_files /app .

RUN yarn install --frozen-lockfile

COPY . .

# To restore workspaces symlinks
RUN yarn install --frozen-lockfile

RUN yarn build

# (just using docker to verify build works -- we don't actually deploy this anywhere)