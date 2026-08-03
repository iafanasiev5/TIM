# TIM — Intelligence Management

Готовая статическая версия сайта находится в корне репозитория:

- `index.html` — точка входа;
- `assets/` — стили и JavaScript;
- `logo-t1-innotech*.svg` — логотипы.

Сайт можно опубликовать на любом статическом хостинге, включая GitHub Pages.

## Локальный просмотр

```bash
python3 -m http.server 8080
```

После запуска откройте `http://localhost:8080/`.

## Исходный проект

React/TypeScript-исходники находятся в папке `app`.

```bash
cd app
npm ci
npm run build
```

