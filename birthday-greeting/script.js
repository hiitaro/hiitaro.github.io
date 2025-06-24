const contentBlocks = [
    `<h1>с днём рождения, кисонька моя! 🎉</h1>
<p>
  сегодня твой день, и я хочу, чтобы ты знала, как ты <span style="color: #ff69b4;">важна</span> для меня. <br>
  но перед тем как поздравлять, я бы хотел кое-что сказать.<br><br>

  прости меня, котик <img src="sticker.webp" alt="🥺"><br><br>

  иногда между нами случаются трудные моменты, очень. <br>
  но даже в такие дни — ты остаёшься для меня самым родным человеком.<img src="rose.webp" alt="🥺"> <br>
  моим домом, моим уютом, моей самой родной и любимой.<img src="bheart.webp" alt="🥺"><br><br>

  мне может не хватать слов или сил, но я всегда хочу одного — <br>
  <span style="color: #ff69b4;">быть рядом</span>, держать твою руку, <br>
  поддерживать, любить и быть твоей опорой. <br><br>

  мы не идеальны, но я верю, что наша любовь — настоящая. <br>
  и я готов идти через всё, лишь бы идти <b>вместе с тобой</b>.
</p>
`,
    `<h1>мне очень страшно потерять тебя<img src="sticker.webp" style="min-width:45px" alt="🥺"></h1>
<p>
  я конечно не самый идеальный парень на свете, далеко не самый<img src="sad.webp" alt="🥺"> <br>
  но я всё равно хочу исправится и сделать тебя снова счастливой. <br><br>

  я не хочу быть с тобой только в радостные дни — <br>
  я хочу быть рядом, когда тебе грустно, тяжело или одиноко<img src="put.webp" alt="🥺"> <br><br>

  хочу быть тем, кто укроет пледом, <br>
  обнимет, поймёт без лишних вопросов, <br>
  и просто будет вселять доверие и спокойствие <br><br>

  мне тяжело дышать, когда тебя не рядом <br>
  я не знаю как передать словами, насколько тяжело мне было эти несколько дней <br>
  но я всё ещё верю в <span style="color: #ff69b4;">нас</span>, котик.
</p>
`,
    `<p>я ценю каждый <span style="color: #e75480;">момент</span>, проведённый с тобой.
    <br>каждый смех, каждую улыбку, каждый взгляд<img src="put.webp" alt="🥺"><br>
    <br>ты делаешь мою жизнь ярче и лучше, и я хочу, чтобы ты знала, как сильно я тебя люблю. 
    <br>извини меня, котик<img src="sticker.webp" alt="🥺">
    <br>я хочу, чтобы ты была счастлива, и я готов сделать всё, чтобы это произошло.
    <br>но я тоже человек, и иногда мне бывает сложно. <br>
    <br>я тоже могу уставать, грустить или злиться, но я всегда хочу, чтобы ты знала — <br>
    <span style="color: #ff69b4;">ты для меня важнее всего</span>.<br>
    <br>мне очень жаль, что нам пришлось пройти через всё это <img src="sticker.gif" alt="🥺"> <br>
    </p>`,
    `<p>мы разошлись, продолжения нет, прости</p>`,
];

let currentBlock = 0;

const contentElement = document.getElementById('content');
const nextButton = document.getElementById('nextButton');

function showNextBlock() {
    currentBlock++;
    if (currentBlock < contentBlocks.length) {
        contentElement.innerHTML = contentBlocks[currentBlock];
    } else {
        contentElement.innerHTML = `<h2>спасибо за всё.</h2>`;
        nextButton.style.display = 'none';
    }
}
contentElement.innerHTML = contentBlocks[currentBlock];

nextButton.addEventListener('click', showNextBlock);
