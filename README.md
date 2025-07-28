
# GRAVMIX — статичный сайт

Готовый статичный сайт для GitHub Pages / Netlify / Vercel / Timeweb.

## Структура
- `index.html` — главная страница (лендинг)
- `404.html` — копия `index.html` для корректной отдачи на GitHub Pages
- `css/`, `js/`, `img/` — ассеты
- `manifest.json` — PWA

## Быстрый деплой на GitHub Pages
1. Создайте публичный репозиторий, например `gravmix-site`.
2. Загрузите сюда все файлы из этого архива.
3. В настройках репозитория: **Settings → Pages → Source → Deploy from a branch**.
4. Выберите ветку **main** и папку **/ (root)**. Сохраните.
5. Через 1–2 минуты сайт будет доступен по адресу:
   `https://<ваш-логин>.github.io/gravmix-site/`

### Кастомный домен
- В **Settings → Pages** укажите свой домен.
- Добавьте DNS-запись CNAME на `username.github.io`.
- Создайте файл `CNAME` в корне репозитория с содержимым вашей доменной зоны, например:
  ```
  gravmix.ru
  ```

## Яндекс.Метрика
Вставьте перед `</head>`:
```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0];
k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(METRIKA_ID, "init", {
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true
});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/METRIKA_ID" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
```
Замените `METRIKA_ID` на ваш ID.

## Контакты
Телефон и адрес: редактируются в `index.html` (секции Hero/Contacts).
Ссылки на Telegram, VK, Ozon, Wildberries — тоже в `index.html`.
```

