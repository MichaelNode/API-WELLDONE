# Weldone

Welldone blog project

## Dependecies

- redis-server


## Windows
install this dependency

```
npm install --global --production windows-build-tools
```

## Installation

- Install all dependencies

```
npm install
```

- Install react dependencies
```
npm run install_react
```

- Install initial data in db

```
npm run seeder
```

## Important

create folders upload and resize within public/images


## Development

- You can use 'npm run dev' for have express in one port and react in other. For this you will need to configure server CORS
```
npm run dev
```

- If you do not want to configure the server CORS, you can run npm run build, you will have the React project accessible in the path /admin
```
npm run build_dev
``` 

## Production

- Do following command
```
npm run build
```
