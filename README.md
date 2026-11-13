# Daniel Apresian — portfolio

Одностраничный сайт-портфолио для привлечения заказчиков (малый бизнес). Откройте `index.html` в браузере (нужен интернет для Google Fonts).

## Структура
- `index.html` — готовый сайт, один самодостаточный файл (стили, скрипты, скриншоты и три проекта внутри).
- `assets/screenshots/` — превью работ, которые встроены в `index.html`.
- `assets/og.png` — картинка для превью ссылки в соцсетях и мессенджерах (1200×630).
- `projects/` — исходные HTML-файлы трёх работ. Они же встроены в `index.html` (переменная `SITES`) и открываются по кнопке «Live preview», по клику на картинку или название. В окне просмотра есть кнопка «Open in new tab».
- `robots.txt`, `sitemap.xml` — для поисковиков (лежат в корне сайта).

Если меняете файл в `projects/`, не забудьте обновить такую же работу в `SITES` внутри `index.html`.

## Порядок секций
Hero → Trust bar → Selected work → What your website can do → Services & pricing → How it works → About → Common questions → Contact (форма).

## Что менять
В `index.html` найдите и замените:
- `Daniel Apresian` — имя;
- `luminavedd@gmail.com` — почта (ссылка, текст, кнопка копирования и получатель формы);
- `facebook.com/profile.php?id=61561815989650` — ссылка на Facebook;
- `$199–299` и `$399–599` — цены тарифов Starter и Business (раздел `#pricing`);
- тексты вопросов и ответов в разделе `#faq`, тексты шагов в `#process`.

## Форма заявки
Сейчас в `<form id="lead">` атрибут `data-endpoint=""` пустой. В этом режиме кнопка «Send request» открывает почтовую программу посетителя с готовым письмом, а кнопка «Copy message» копирует текст заявки.

Чтобы заявки приходили на почту без почтовой программы:
1. Зарегистрируйтесь на formspree.io, создайте форму и скопируйте её адрес вида `https://formspree.io/f/xxxxxxxx`.
2. Вставьте его в `data-endpoint="…"` в теге `<form id="lead">`.

После этого форма отправляется в фоне и показывает сообщение «Thank you».

## SEO
- В `<head>` уже заданы title, description, canonical и Open Graph / Twitter-теги. Адрес сайта в них — `https://hiitaro.github.io/`; если домен изменится, замените его во всех метатегах, в `robots.txt` и `sitemap.xml`.
- Добавьте сайт в Google Search Console, отправьте `sitemap.xml` и проверьте скорость на PageSpeed Insights.
- Город в тексте и метатегах намеренно не указан.
