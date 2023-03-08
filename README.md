# 🚀 Welcome to your new awesome project!

This project has been created using **webpack-cli**, you can now run

```
npm run build
```

or

```
yarn build
```

Webpack: статика изображения картинки иконки

pre-commit: настройка

Docker: 0. .dockerignore -

1. Dockerfile(from node; workdir /app; copy . .; run npm install; esxpose 3000 cmd ['node','server.js'])
2. docker build .
3. docker images(посмтреть все образы)
4. docker run -d -p 8080:3000 <id:image>

to bundle your application

1.  babel-loader @babel/core
2.  @babel/preset-env
3.  @babel/plugin-syntax-jsx
4.  @babel/preset-typescript

пока забью тк не важно:
Webpack.config.js
{
test: /\.(ts|tsx)$/i,
use: ['babel-loader'],
exclude: ['/node_modules/'],
},

//
babel.config.json
{
"presets": ["@babel/preset-env", "@babel/preset-typescript" ],
"plugins": ["@babel/plugin-syntax-jsx"]
}
// Второй вариант BABEl
{
presets = [
["@babel/preset-env",{targets: "> 0.25%, not dead"}],
"@babel/preset-react",
"@babel/preset-typescript"
];
}

ТЕсты:
1.1 пример с кмпонентом в тесте создаю новый комп и тещу его рендер его getconent типо наличие текста
также можно закинуть setprops типо поменять стиль и посмотреть наличие изменений типо тест componentUpdate
также и с остальными
1.2 роутер лучше тестить через jsdom и проверять хистори у браузера

1. Напишите тесты для шаблонизатора, роутера, компонента, модуля отправки запросов. Файлы с тестами необходимо хранить рядом с тестируемыми элементами. Например, тесты для роутера должны лежать в той же папке, что и файл с кодом роутера. Используйте Mocha и Chai. С Jest вы будете работать в следующем модуле.

2. Не запускать тесты в билд
   Webpack:{
   test: /\.(ts|tsx)$/i,
   loader: "ts-loader",
   options: {configFile: "tsconfig.webpack.json"},
   exclude: ["/node_modules/"],
   }
   tsconfig.webpack.json:{
   "compilerOptions": {
   "target": "es2016",
   "module": "commonjs",
   },
   "include": [
   "**/*.ts",
   "**/*.tsx",
   ],
   "exclude": [
   "node_modules",
   "**/*.test.ts",
   "**/*.test.tsx",
   "**/*.config.ts"
   "**/*.config.tsx"
   ]
   }
