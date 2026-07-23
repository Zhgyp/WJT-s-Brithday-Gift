console.log("game.js 已成功加载");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const cover = document.getElementById("cover");
const intro = document.getElementById("intro");
const kitchen = document.getElementById("kitchen");
const pourScene = document.getElementById("pourScene");
const ovenScene = document.getElementById("ovenScene");
const decorateScene = document.getElementById("decorateScene");
const candleScene = document.getElementById("candleScene");
const introText = document.getElementById("introText");

const introDialogues = [
    "今天有一个小任务。",
    "欢迎来到厨房，\n做一个独一无二的蛋糕吧。",
    "准备好了吗？"
];

let dialogueIndex = 0;

function showScene(sceneToShow) {
    const scenes = [cover, intro, kitchen, pourScene, ovenScene, decorateScene, candleScene];

    scenes.forEach(function (scene) {
        scene.hidden = scene !== sceneToShow;
    });
}

function showDialogue() {
    introText.textContent = introDialogues[dialogueIndex];

    const isLastDialogue =
        dialogueIndex === introDialogues.length - 1;

    nextBtn.innerHTML = isLastDialogue
        ? '进入厨房 <span class="dialog-arrow">▶</span>'
        : '继续 <span class="dialog-arrow">▼</span>';
}

startBtn.addEventListener("click", function () {
    dialogueIndex = 0;

    showScene(intro);
    showDialogue();
});

nextBtn.addEventListener("click", function () {
    const isLastDialogue =
        dialogueIndex === introDialogues.length - 1;

    if (isLastDialogue) {
        showScene(kitchen);
        return;
    }

    dialogueIndex += 1;
    showDialogue();
});
/* =========================
   厨房游戏
========================= */

const kitchenTip = document.getElementById("kitchenTip");

const eggBtn = document.getElementById("eggBtn");
const milkBtn = document.getElementById("milkBtn");
const flourBtn = document.getElementById("flourBtn");
const mixBtn = document.getElementById("mixBtn");
const milkAnimation = document.getElementById("milkAnimation");
const milkSplash = document.getElementById("milkSplash");

const flourStep = document.querySelector('[data-step="flour"]');
const eggAnimation = document.getElementById("eggAnimation");
const bowlLiquid = document.getElementById("bowlLiquid");
const bowlYolk = document.getElementById("bowlYolk");
const flourMix = document.getElementById("flourMix");
const flourAnimation = document.getElementById("flourAnimation");
const flourBag = flourAnimation.querySelector(".flour-bag");
const whisk = document.getElementById("whisk");
const batterSurface = document.getElementById("batterSurface");
const mixSparkles = document.getElementById("mixSparkles");
const mixStep = document.querySelector('[data-step="mix"]');
const toPourBtn = document.getElementById("toPourBtn");
const pourTip = document.getElementById("pourTip");
const pourBtn = document.getElementById("pourBtn");
const pourBowl = document.getElementById("pourBowl");
const pourBatterInside = document.getElementById("pourBatterInside");
const batterStream = document.getElementById("batterStream");
const moldBatter = document.getElementById("moldBatter");
const pourSparkles = document.getElementById("pourSparkles");
const toOvenBtn = document.getElementById("toOvenBtn");
const ovenTip = document.getElementById("ovenTip");
const bakeBtn = document.getElementById("bakeBtn");
const ovenTray = document.getElementById("ovenTray");
const bigOven = document.getElementById("bigOven");
const ovenDoor = document.getElementById("ovenDoor");
const ovenGlow = document.getElementById("ovenGlow");
const ovenDisplay = document.getElementById("ovenDisplay");
const ovenFlames = document.getElementById("ovenFlames");
const ovenSteam = document.getElementById("ovenSteam");
const ovenDing = document.getElementById("ovenDing");
const ovenCake = document.getElementById("ovenCake");
const ovenSparkles = document.getElementById("ovenSparkles");
const toDecorateBtn = document.getElementById("toDecorateBtn");
const decorateTip = document.getElementById("decorateTip");
const creamBtn = document.getElementById("creamBtn");
const creamBag = document.getElementById("creamBag");
const creamCanvas = document.getElementById("creamCanvas");
const creamProgress = document.getElementById("creamProgress");
const decorateCake = document.getElementById("decorateCake");
const cakeTopArea = document.getElementById("cakeTopArea");
const cakeTopCream = document.querySelector(".cake-top-cream");
const creamRosettes = document.getElementById("creamRosettes");
const creamStatus = document.getElementById("creamStatus");
const fruitStatus = document.getElementById("fruitStatus");
const fruitHelp = document.getElementById("fruitHelp");
const fruitChoiceButtons = Array.from(document.querySelectorAll(".fruit-choice"));
const creamChoiceButtons = Array.from(document.querySelectorAll(".cream-choice"));
const creamChoiceHelp = document.getElementById("creamChoiceHelp");
const creamBagBody = document.getElementById("creamBagBody");
const decorateSceneRoot = document.querySelector(".decorate-scene");
const resetFruitBtn = document.getElementById("resetFruitBtn");
const confirmDecorateBtn = document.getElementById("confirmDecorateBtn");
const toCandleBtn = document.getElementById("toCandleBtn");
const decorateSparkles = document.getElementById("decorateSparkles");
const creamDecorateStep = document.querySelector('[data-decorate-step="cream"]');
const fruitDecorateStep = document.querySelector('[data-decorate-step="fruit"]');
const eggStep = document.querySelector('[data-step="egg"]');
const milkStep = document.querySelector('[data-step="milk"]');

let kitchenBusy = false;
let eggCompleted = false;
let milkCompleted = false;
let flourCompleted = false;
let mixCompleted = false;
let pourCompleted = false;
let bakeCompleted = false;
let creamCompleted = false;
let decorateCompleted = false;
let fruitLayer = 100;
let creamModeActive = false;
let creamPointerId = null;
let creamCoverageComplete = false;
let selectedCream = "vanilla";
const creamCoveredCells = new Set();
const creamGridColumns = 20;
const creamGridRows = 8;
const creamTargetPercent = 90;

const creamTypes = {
    vanilla: { name: "香草", light: "#fffef8", mid: "#fff4dc", dark: "#e7c9a5", edge: "#d9af84", side: "#fff1d6", bag: ["#f5b7c1", "#fff1d8", "#e99cac"], label: "#7a4b4e" },
    strawberry: { name: "草莓", light: "#fff0f4", mid: "#f7a9bd", dark: "#df7f9d", edge: "#d66f8e", side: "#f5a4b9", bag: ["#ff9fba", "#ffd8e2", "#e9799c"], label: "#8f3655" },
    chocolate: { name: "巧克力", light: "#a96951", mid: "#75402f", dark: "#4c281f", edge: "#4d291f", side: "#6a382b", bag: ["#8c5741", "#d8a17e", "#5b3026"], label: "#fff1df" },
    matcha: { name: "抹茶", light: "#e8f2c9", mid: "#a9c778", dark: "#789b52", edge: "#668748", side: "#a7c873", bag: ["#8fb765", "#e3efbd", "#71974e"], label: "#35532d" },
    blueberry: { name: "蓝莓", light: "#eeeafe", mid: "#a69ad7", dark: "#7768b1", edge: "#6c5ca5", side: "#9d90cf", bag: ["#8f80c5", "#e3ddfa", "#6c5aa8"], label: "#3f356d" }
};

function applyCreamTheme(type) {
    const config = creamTypes[type] || creamTypes.vanilla;
    selectedCream = type in creamTypes ? type : "vanilla";
    decorateSceneRoot.style.setProperty("--cream-light", config.light);
    decorateSceneRoot.style.setProperty("--cream-mid", config.mid);
    decorateSceneRoot.style.setProperty("--cream-dark", config.dark);
    decorateSceneRoot.style.setProperty("--cream-edge", config.edge);
    decorateSceneRoot.style.setProperty("--cream-side", config.side);
    decorateSceneRoot.style.setProperty("--cream-label", config.label);
    decorateSceneRoot.style.setProperty("--cream-bag-a", config.bag[0]);
    decorateSceneRoot.style.setProperty("--cream-bag-b", config.bag[1]);
    decorateSceneRoot.style.setProperty("--cream-bag-c", config.bag[2]);
    creamBagBody.textContent = config.name;
    creamChoiceButtons.forEach(function (button) {
        const selected = button.dataset.cream === selectedCream;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    creamChoiceHelp.textContent = "已选择：" + config.name + "奶油";
}

creamChoiceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (creamModeActive || creamCompleted) return;
        applyCreamTheme(button.dataset.cream);
        decorateTip.textContent = "已选择" + creamTypes[button.dataset.cream].name + "奶油，可以开始手动涂抹啦！";
    });
});

applyCreamTheme("vanilla");

const layerChoiceButtons = Array.from(document.querySelectorAll(".layer-choice"));
const layerChoiceHelp = document.getElementById("layerChoiceHelp");
let selectedCakeLayers = 1;

function applyCakeLayers(count) {
    const next = Math.max(1, Math.min(3, Number(count) || 1));
    selectedCakeLayers = next;
    decorateCake.classList.remove("layers-1", "layers-2", "layers-3");
    decorateCake.classList.add("layers-" + next);

    document.querySelectorAll("[data-cake-model]").forEach(function (model) {
        const active = Number(model.dataset.cakeModel) === next;
        model.hidden = !active;
        model.classList.toggle("active", active);
    });

    const mount = decorateCake.querySelector('[data-top-mount="' + next + '"]');
    if (mount && cakeTopArea.parentElement !== mount) {
        mount.appendChild(cakeTopArea);
    }

    const topWidths = {1: 500, 2: 370, 3: 255};
    const canvasWidths = {1: 500, 2: 370, 3: 255};
    cakeTopArea.style.width = topWidths[next] + "px";
    creamCanvas.width = canvasWidths[next];
    creamCanvas.height = 112;
    creamCoveredCells.clear();
    creamCoverageComplete = false;
    creamCompleted = false;
    creamProgress.textContent = "奶油覆盖：0%";
    cakeTopCream.classList.remove("finished");
    creamRosettes.classList.remove("visible");
    const ctx = creamCanvas.getContext("2d");
    ctx.clearRect(0, 0, creamCanvas.width, creamCanvas.height);

    layerChoiceButtons.forEach(function (button) {
        const selected = Number(button.dataset.layers) === next;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    if (layerChoiceHelp) layerChoiceHelp.textContent = "当前：" + ({1:"单层",2:"双层",3:"三层"}[next]) + "蛋糕";
}

layerChoiceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (creamModeActive || creamCompleted) return;
        applyCakeLayers(button.dataset.layers);
        decorateTip.textContent = "已选择" + ({1:"单层",2:"双层",3:"三层"}[selectedCakeLayers]) + "蛋糕，再挑选奶油口味吧！";
    });
});

applyCakeLayers(1);

function wait(milliseconds) {
    return new Promise(function (resolve) {
        window.setTimeout(resolve, milliseconds);
    });
}

function completeStep(stepElement) {
    stepElement.classList.remove("active", "locked");
    stepElement.classList.add("completed");

    const status = stepElement.querySelector(".step-status");

    if (status) {
        status.textContent = "✓";
    }
}

function unlockStep(stepElement, buttonElement) {
    stepElement.classList.remove("locked");
    stepElement.classList.add("active");

    const status = stepElement.querySelector(".step-status");

    if (status) {
        status.textContent = "";
    }

    buttonElement.disabled = false;
    buttonElement.classList.add("active");

    const lock = buttonElement.querySelector(".ingredient-lock");

    if (lock) {
        lock.remove();
    }
}

async function playEggAnimation() {
    if (kitchenBusy || eggCompleted) {
        return;
    }

    kitchenBusy = true;
    eggBtn.disabled = true;

    kitchenTip.textContent = "轻轻敲一下……";

    eggAnimation.classList.remove("is-playing", "is-finished");

    // 强制浏览器重新计算动画状态
    void eggAnimation.offsetWidth;

    eggAnimation.classList.add("is-playing");

    await wait(1150);

    kitchenTip.textContent = "咔——蛋壳裂开了！";

    await wait(750);

    kitchenTip.textContent = "蛋液正在流进碗里……";

    await wait(920);

    bowlLiquid.classList.add("has-egg");
    bowlYolk.classList.add("visible");

    eggAnimation.classList.add("is-finished");

    eggCompleted = true;

    eggBtn.classList.remove("active");
    eggBtn.classList.add("completed");

    completeStep(eggStep);
    unlockStep(milkStep, milkBtn);

    kitchenTip.textContent = "鸡蛋加入完成！接下来加入牛奶。";

    kitchenBusy = false;
}

eggBtn.addEventListener("click", playEggAnimation);
// =========================
// 牛奶动画
// =========================
async function playMilkAnimation() {
    if (kitchenBusy || milkCompleted || !eggCompleted) {
        return;
    }

    kitchenBusy = true;
    milkBtn.disabled = true;

    kitchenTip.textContent = "把牛奶盒移到碗的左上方……";

    milkAnimation.classList.remove("is-playing", "is-finished");
    milkSplash.classList.remove("visible");

    // 强制重新计算动画状态
    void milkAnimation.offsetWidth;

    milkAnimation.classList.add("is-playing");

    await wait(620);

    kitchenTip.textContent = "轻轻倾斜牛奶盒。";

    await wait(580);

    kitchenTip.textContent = "开口打开了，牛奶流出来啦！";

    await wait(650);

    milkSplash.classList.add("visible");

    await wait(850);

    bowlLiquid.classList.add("has-milk");

    await wait(620);

    milkAnimation.classList.add("is-finished");

    milkCompleted = true;

    milkBtn.classList.remove("active");
    milkBtn.classList.add("completed");

    completeStep(milkStep);
    unlockStep(flourStep, flourBtn);

    kitchenTip.textContent = "牛奶加入完成！接下来加入面粉。";

    kitchenBusy = false;
}

milkBtn.addEventListener("click", playMilkAnimation);
async function playFlourAnimation() {
    if (kitchenBusy || flourCompleted || !milkCompleted) {
        return;
    }

    kitchenBusy = true;
    flourBtn.disabled = true;

    kitchenTip.textContent = "拿起面粉袋……";

    flourAnimation.classList.remove("pouring");
    flourAnimation.style.opacity = "1";
    flourBag.style.transform = "translateX(-50%) rotate(0deg)";
    flourAnimation.style.transform =
        "translateX(-50%) translateY(-80px) scale(0.8)";
    flourAnimation.style.transition =
        "transform 0.8s ease, opacity 0.3s ease";

    await wait(50);

    flourAnimation.style.transform =
        "translateX(-50%) translateY(0) scale(1)";

    await wait(900);

    kitchenTip.textContent = "面粉袋已经准备好了。";
    flourBag.style.transform =
        "translateX(-50%) rotate(28deg)";

    await wait(600);

    flourAnimation.classList.add("pouring");
    kitchenTip.textContent = "开始加入面粉……";

    flourMix.style.opacity = "1";
    flourMix.style.width = "170px";
    flourMix.style.height = "34px";

    await wait(1000);

    flourAnimation.classList.remove("pouring");
    kitchenTip.textContent = "面粉加入完成！";

    flourBag.style.transform =
        "translateX(-50%) rotate(0deg)";

    await wait(500);

    flourAnimation.style.opacity = "0";

    await wait(300);

    flourCompleted = true;
    flourBtn.classList.remove("active");
    flourBtn.classList.add("completed");

    completeStep(flourStep);
    unlockStep(mixStep, mixBtn);

    kitchenTip.textContent = "材料准备好了，开始搅拌吧！";
    kitchenBusy = false;
}

flourBtn.addEventListener("click", playFlourAnimation);

async function playMixAnimation() {
    if (kitchenBusy || mixCompleted || !flourCompleted) {
        return;
    }

    kitchenBusy = true;
    mixBtn.disabled = true;

    kitchenTip.textContent = "打蛋器准备好了……";

    // 重置搅拌动画状态
    whisk.classList.remove("entering", "stirring", "leaving");
    batterSurface.classList.remove("mixing", "finished");
    mixSparkles.classList.remove("visible");
    void whisk.offsetWidth;

    // 显示统一的面糊表面，并隐藏分散材料图层
    batterSurface.classList.add("visible");
    bowlYolk.style.opacity = "0";
    flourMix.style.opacity = "0";
    milkSplash.style.opacity = "0";

    // 打蛋器从右侧进入碗中
    whisk.classList.add("entering");
    await wait(700);

    whisk.classList.remove("entering");
    whisk.classList.add("stirring");
    batterSurface.classList.add("mixing");
    kitchenTip.textContent = "左右搅拌，让材料充分融合……";

    await wait(2200);

    // 面糊融合完成
    whisk.classList.remove("stirring");
    batterSurface.classList.remove("mixing");
    batterSurface.classList.add("finished");

    mixSparkles.classList.add("visible");
    kitchenTip.textContent = "面糊变得细腻又均匀！";

    await wait(650);

    // 打蛋器退出
    whisk.classList.add("leaving");
    await wait(600);
    whisk.classList.remove("leaving");

    mixCompleted = true;
    mixBtn.classList.remove("active");
    mixBtn.classList.add("completed");
    completeStep(mixStep);

    kitchenTip.textContent = "搅拌完成！蛋糕糊已经准备好了。";
    toPourBtn.hidden = false;
    kitchenBusy = false;
}

mixBtn.addEventListener("click", playMixAnimation);


toPourBtn.addEventListener("click", function () {
    if (!mixCompleted || kitchenBusy) return;
    showScene(pourScene);
    pourTip.textContent = "点击按钮，把搅好的面糊倒进模具吧！";
});

async function playPourAnimation() {
    if (pourCompleted) return;

    pourBtn.disabled = true;
    pourTip.textContent = "把碗轻轻抬起来……";

    pourBowl.classList.remove("lifting", "tilting", "returning");
    batterStream.classList.remove("pouring");
    moldBatter.classList.remove("filling", "filled");
    pourSparkles.classList.remove("visible");
    pourBatterInside.classList.remove("emptying");
    void pourBowl.offsetWidth;

    pourBowl.classList.add("lifting");
    await wait(750);

    pourTip.textContent = "慢慢倾斜碗，让面糊流出来……";
    pourBowl.classList.remove("lifting");
    pourBowl.classList.add("tilting");
    await wait(500);

    batterStream.classList.add("pouring");
    pourBatterInside.classList.add("emptying");
    moldBatter.classList.add("filling");
    await wait(1800);

    batterStream.classList.remove("pouring");
    moldBatter.classList.remove("filling");
    moldBatter.classList.add("filled");
    pourTip.textContent = "面糊已经全部倒进模具里啦！";

    await wait(350);
    pourSparkles.classList.add("visible");
    pourBowl.classList.remove("tilting");
    pourBowl.classList.add("returning");
    await wait(850);
    pourBowl.classList.remove("returning");

    pourCompleted = true;
    pourTip.textContent = "倒模完成！接下来可以送进烤箱了。";
    pourBtn.textContent = "倒模完成 ✓";
    toOvenBtn.hidden = false;
}

pourBtn.addEventListener("click", playPourAnimation);

toOvenBtn.addEventListener("click", function () {
    if (!pourCompleted) {
        return;
    }

    showScene(ovenScene);
    ovenTip.textContent = "点击按钮，把装好面糊的模具送进烤箱吧！";
});

async function playBakeAnimation() {
    if (bakeCompleted) {
        return;
    }

    bakeBtn.disabled = true;

    ovenTray.classList.remove("moving-in", "hidden");
    ovenDoor.classList.remove("opening", "closing", "opened");
    bigOven.classList.remove("baking", "finished");
    ovenGlow.classList.remove("active");
    ovenFlames.classList.remove("active");
    ovenSteam.classList.remove("active");
    ovenDing.classList.remove("visible");
    ovenCake.classList.remove("visible");
    ovenSparkles.classList.remove("visible");

    void ovenDoor.offsetWidth;

    ovenTip.textContent = "先把烤箱门打开……";
    ovenDoor.classList.add("opening");

    await wait(700);

    ovenDoor.classList.remove("opening");
    ovenDoor.classList.add("opened");

    ovenTip.textContent = "把模具慢慢送进烤箱……";
    ovenTray.classList.add("moving-in");

    await wait(1100);

    ovenTray.classList.add("hidden");

    ovenTip.textContent = "关上烤箱门，开始烘烤！";
    ovenDoor.classList.remove("opened");
    ovenDoor.classList.add("closing");

    await wait(700);

    ovenDoor.classList.remove("closing");
    bigOven.classList.add("baking");
    ovenGlow.classList.add("active");
    ovenFlames.classList.add("active");
    ovenSteam.classList.add("active");

    ovenDisplay.textContent = "00:03";
    ovenTip.textContent = "蛋糕正在慢慢膨胀……";

    await wait(1000);
    ovenDisplay.textContent = "00:02";

    await wait(1000);
    ovenDisplay.textContent = "00:01";
    ovenTip.textContent = "香味已经飘出来啦！";

    await wait(1000);

    bigOven.classList.remove("baking");
    ovenGlow.classList.remove("active");
    ovenFlames.classList.remove("active");
    ovenSteam.classList.remove("active");

    ovenDisplay.textContent = "DONE";
    ovenDing.classList.add("visible");
    ovenTip.textContent = "Ding！蛋糕胚烤好啦！";

    await wait(850);

    ovenDing.classList.remove("visible");
    ovenDoor.classList.add("opening");

    await wait(700);

    ovenDoor.classList.remove("opening");
    ovenDoor.classList.add("opened");

    ovenCake.classList.add("visible");
    bigOven.classList.add("finished");
    ovenSparkles.classList.add("visible");

    await wait(850);

    bakeCompleted = true;
    bakeBtn.textContent = "烘烤完成 ✓";
    ovenTip.textContent = "金黄色的蛋糕胚出炉了！接下来开始装饰吧。";
    toDecorateBtn.hidden = false;
}

bakeBtn.addEventListener("click", playBakeAnimation);

toDecorateBtn.addEventListener("click", function () {
    if (!bakeCompleted) {
        return;
    }

    showScene(decorateScene);
    decorateTip.textContent = "先在水果篮旁选择奶油口味，再开始手动涂抹吧！";
});

const fruitConfig = {
    strawberry: {
        emoji: "🍓",
        positions: [
            { x: 28, y: 42 },
            { x: 50, y: 30 },
            { x: 72, y: 43 },
            { x: 38, y: 58 },
            { x: 62, y: 58 }
        ]
    },
    blueberry: {
        emoji: "🫐",
        positions: [
            { x: 36, y: 62 },
            { x: 47, y: 52 },
            { x: 58, y: 61 },
            { x: 64, y: 46 },
            { x: 42, y: 36 },
            { x: 55, y: 38 }
        ]
    },
    kiwi: {
        emoji: "🥝",
        positions: [
            { x: 38, y: 35 },
            { x: 62, y: 35 },
            { x: 50, y: 55 },
            { x: 30, y: 55 },
            { x: 70, y: 55 }
        ]
    }
};

const placedFruit = [];

function getCreamContext() {
    return creamCanvas.getContext("2d");
}

function resetCreamCanvas() {
    const context = getCreamContext();

    context.clearRect(
        0,
        0,
        creamCanvas.width,
        creamCanvas.height
    );

    creamCoveredCells.clear();

    creamProgress.textContent =
        "奶油覆盖：0%";

    /*
     * 恢复手动涂抹画布。
     * 上一次完成时它被隐藏了。
     */
    creamCanvas.style.display = "block";
    creamCanvas.style.opacity = "";

    creamCanvas.classList.remove(
        "smoothing",
        "fading-out",
        "completed"
    );

    /*
     * 隐藏上一轮已经完成的光滑奶油层。
     */
    cakeTopCream.classList.remove(
        "finished"
    );

    decorateCake.classList.remove(
        "frosted"
    );
}

function isInsideCreamEllipse(x, y) {
    const centerX = creamCanvas.width / 2;
    const centerY = creamCanvas.height / 2;
    const radiusX = creamCanvas.width / 2 - 8;
    const radiusY = creamCanvas.height / 2 - 8;

    const dx = x - centerX;
    const dy = y - centerY;

    return (dx * dx) / (radiusX * radiusX) +
        (dy * dy) / (radiusY * radiusY) <= 1;
}

function markCreamCoverage(x, y, radius) {
    const cellWidth = creamCanvas.width / creamGridColumns;
    const cellHeight = creamCanvas.height / creamGridRows;

    for (let row = 0; row < creamGridRows; row += 1) {
        for (let column = 0; column < creamGridColumns; column += 1) {
            const centerX = (column + 0.5) * cellWidth;
            const centerY = (row + 0.5) * cellHeight;

            if (!isInsideCreamEllipse(centerX, centerY)) {
                continue;
            }

            const distance = Math.hypot(centerX - x, centerY - y);

            if (distance <= radius) {
                creamCoveredCells.add(row + ":" + column);
            }
        }
    }
}

function getCreamCoveragePercent() {
    let totalCells = 0;

    for (let row = 0; row < creamGridRows; row += 1) {
        for (let column = 0; column < creamGridColumns; column += 1) {
            const x = (column + 0.5) * creamCanvas.width / creamGridColumns;
            const y = (row + 0.5) * creamCanvas.height / creamGridRows;

            if (isInsideCreamEllipse(x, y)) {
                totalCells += 1;
            }
        }
    }

    if (totalCells === 0) {
        return 0;
    }

    return Math.min(
        100,
        Math.round(creamCoveredCells.size / totalCells * 100)
    );
}

function drawCreamAt(clientX, clientY) {
    const rect = creamCanvas.getBoundingClientRect();

    const scaleX = creamCanvas.width / rect.width;
    const scaleY = creamCanvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    if (!isInsideCreamEllipse(x, y)) {
        return;
    }

    const context = getCreamContext();
    const radius = 34;

    const gradient = context.createRadialGradient(
        x - 8,
        y - 8,
        4,
        x,
        y,
        radius
    );

    const creamConfig = creamTypes[selectedCream];
    gradient.addColorStop(0, creamConfig.light);
    gradient.addColorStop(0.55, creamConfig.mid);
    gradient.addColorStop(1, creamConfig.dark);

    context.fillStyle = gradient;

    context.beginPath();
    context.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
    );
    context.fill();

    markCreamCoverage(
        x,
        y,
        radius * 0.92
    );

    const percent =
        getCreamCoveragePercent();

    creamProgress.textContent =
        "奶油覆盖：" + percent + "%";

    if (
        percent >= creamTargetPercent &&
        !creamCoverageComplete
    ) {
        autoFinishCream();
    }
}


async function fillRemainingCream() {
    const context = getCreamContext();
    const cellWidth = creamCanvas.width / creamGridColumns;
    const cellHeight = creamCanvas.height / creamGridRows;
    const remainingCells = [];

    for (let row = 0; row < creamGridRows; row += 1) {
        for (let column = 0; column < creamGridColumns; column += 1) {
            const key = row + ":" + column;
            const x = (column + 0.5) * cellWidth;
            const y = (row + 0.5) * cellHeight;

            if (
                isInsideCreamEllipse(x, y) &&
                !creamCoveredCells.has(key)
            ) {
                remainingCells.push({
                    key: key,
                    x: x,
                    y: y
                });
            }
        }
    }

    /*
     * 从左到右补齐未覆盖区域。每一帧补几格，
     * 既保留自动整理动画，也避免等待过程卡住。
     */
    remainingCells.sort(function (a, b) {
        return a.x - b.x || a.y - b.y;
    });

    const brushRadius = Math.max(
        24,
        Math.min(cellWidth, cellHeight) * 0.92
    );

    for (let index = 0; index < remainingCells.length; index += 1) {
        const cell = remainingCells[index];

        const gradient = context.createRadialGradient(
            cell.x - 6,
            cell.y - 6,
            3,
            cell.x,
            cell.y,
            brushRadius
        );

        const creamConfig = creamTypes[selectedCream];
        gradient.addColorStop(0, creamConfig.light);
        gradient.addColorStop(0.58, creamConfig.mid);
        gradient.addColorStop(1, creamConfig.dark);

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(
            cell.x,
            cell.y,
            brushRadius,
            0,
            Math.PI * 2
        );
        context.fill();

        creamCoveredCells.add(cell.key);

        /* 让裱花袋跟随自动补涂的位置。 */
        const canvasRect = creamCanvas.getBoundingClientRect();
        const clientX = canvasRect.left +
            cell.x / creamCanvas.width * canvasRect.width;
        const clientY = canvasRect.top +
            cell.y / creamCanvas.height * canvasRect.height;

        placeCreamBagAtPointer(clientX, clientY);

        if (index % 3 === 0) {
            const percent = getCreamCoveragePercent();
            creamProgress.textContent =
                "奶油覆盖：自动完成 " + percent + "%";
            await wait(22);
        }
    }

    creamProgress.textContent = "奶油覆盖：100%";
}


async function autoFinishCream() {
    if (creamCoverageComplete) {
        return;
    }

    creamCoverageComplete = true;
    creamModeActive = false;
    creamPointerId = null;

    decorateTip.textContent =
        "最后帮你把奶油整理光滑……";

    creamProgress.textContent =
        "奶油覆盖：正在自动完成";

    creamBag.classList.remove(
        "manual-dragging"
    );

    creamBag.classList.add(
        "auto-finish"
    );

    /*
     * 先执行自动补涂动画。
     */
    await fillRemainingCream();

    creamProgress.textContent =
        "奶油覆盖：100%";

    decorateTip.textContent =
        "正在整理奶油表面……";

    /*
     * 让手动画布短暂变柔和。
     */
    creamCanvas.classList.add(
        "smoothing"
    );

    await wait(350);

    /*
     * 显示真正均匀的完整奶油层。
     */
    decorateCake.classList.add(
        "frosted"
    );

    cakeTopCream.classList.add(
        "finished"
    );

    /*
     * 同时把有笔触纹理的 Canvas 淡出。
     */
    creamCanvas.classList.add(
        "fading-out"
    );

    await wait(650);

    /*
     * 淡出以后彻底隐藏 Canvas，
     * 防止圆形笔触继续露出来。
     */
    creamCanvas.style.display = "none";

    await finishManualCream();
}


async function finishManualCream() {
    creamModeActive = false;
    creamPointerId = null;

    decorateCake.classList.add(
        "frosted"
    );

    cakeTopCream.classList.add(
        "finished"
    );

    creamRosettes.classList.add(
        "visible"
    );

    creamBag.classList.remove(
        "manual-active",
        "manual-dragging",
        "auto-finish"
    );

    creamBag.classList.add(
        "leaving"
    );

    decorateTip.textContent =
        "奶油已经整理得光滑均匀！";

    await wait(750);

    creamBag.classList.remove(
        "leaving"
    );

    creamCompleted = true;

    creamBtn.disabled = true;

    creamBtn.textContent =
        "奶油完成 ✓";

    creamStatus.textContent =
        "✓";

    creamProgress.textContent =
        "奶油覆盖：完成 ✓";

    creamDecorateStep.classList.remove(
        "active"
    );

    creamDecorateStep.classList.add(
        "completed"
    );

    fruitDecorateStep.classList.remove(
        "locked"
    );

    fruitDecorateStep.classList.add(
        "active"
    );

    fruitStatus.textContent =
        "0";

    fruitChoiceButtons.forEach(
        function (button) {
            button.disabled = false;
        }
    );

    fruitHelp.textContent =
        "水果数量不限；放好后可拖动调整";

    decorateTip.textContent =
        "自由选择水果吧！至少放一个就可以确认装饰。";
}

function startManualCreamMode() {
    if (creamCompleted || creamModeActive) {
        return;
    }

    creamModeActive = true;
    creamCoverageComplete = false;
    resetCreamCanvas();

    creamBtn.textContent = "拖动裱花袋涂" + creamTypes[selectedCream].name + "奶油";
    creamBtn.disabled = true;
    creamChoiceButtons.forEach(function (button) { button.disabled = true; });
    layerChoiceButtons.forEach(function (button) { button.disabled = true; });
    creamChoiceHelp.textContent = creamTypes[selectedCream].name + "奶油已装入裱花袋";

    creamBag.classList.remove("entering", "spreading", "leaving");
    creamBag.classList.add("manual-active");

    decorateTip.textContent =
        "按住蛋糕表面拖动，裱花袋会跟随指针涂抹奶油。";
}

function isPointerOverCake(clientX, clientY) {
    const rect = creamCanvas.getBoundingClientRect();

    const canvasX =
        (clientX - rect.left) *
        creamCanvas.width /
        rect.width;

    const canvasY =
        (clientY - rect.top) *
        creamCanvas.height /
        rect.height;

    return isInsideCreamEllipse(
        canvasX,
        canvasY
    );
}


function placeCreamBagAtPointer(clientX, clientY) {
    /*
     * 拖动期间直接使用浏览器窗口坐标。
     * 不再依赖裱花袋父元素的位置，
     * 因此可以移动到整个蛋糕区域。
     */

    creamBag.style.position = "fixed";
    creamBag.style.left = clientX + "px";
    creamBag.style.top = clientY + "px";
    creamBag.style.right = "auto";
    creamBag.style.bottom = "auto";
}


function startCreamDrag(event) {
    if (
        !creamModeActive ||
        creamCompleted ||
        creamCoverageComplete
    ) {
        return;
    }

    if (
        creamPointerId !== null &&
        creamPointerId !== undefined
    ) {
        return;
    }

    creamPointerId = event.pointerId;

    creamBag.classList.add(
        "manual-dragging"
    );

    placeCreamBagAtPointer(
        event.clientX,
        event.clientY
    );

    if (
        isPointerOverCake(
            event.clientX,
            event.clientY
        )
    ) {
        drawCreamAt(
            event.clientX,
            event.clientY
        );
    }

    event.preventDefault();
}


function moveCreamDrag(event) {
    if (
        !creamModeActive ||
        creamCompleted ||
        creamCoverageComplete ||
        creamPointerId !== event.pointerId
    ) {
        return;
    }

    placeCreamBagAtPointer(
        event.clientX,
        event.clientY
    );

    if (
        isPointerOverCake(
            event.clientX,
            event.clientY
        )
    ) {
        drawCreamAt(
            event.clientX,
            event.clientY
        );
    }

    event.preventDefault();
}


function stopCreamDrag(event) {
    if (
        creamPointerId !== event.pointerId
    ) {
        return;
    }

    creamBag.classList.remove(
        "manual-dragging"
    );

    creamPointerId = null;

    event.preventDefault();
}


/*
 * 只有按住裱花袋才能开始。
 */
creamBag.addEventListener(
    "pointerdown",
    startCreamDrag
);


/*
 * 移动和松开监听在 document 上。
 * 即使鼠标离开裱花袋，也可以继续拖动。
 */
document.addEventListener(
    "pointermove",
    moveCreamDrag,
    {
        passive: false
    }
);

document.addEventListener(
    "pointerup",
    stopCreamDrag,
    {
        passive: false
    }
);

document.addEventListener(
    "pointercancel",
    stopCreamDrag,
    {
        passive: false
    }
);

function getPlacedCount(type) {
    return placedFruit.filter(function (item) {
        return item.type === type;
    }).length;
}

function updateFruitButton(button, type) {
    const count = getPlacedCount(type);
    const countLabel = button.querySelector("em");

    countLabel.textContent = "已放 " + count;
    button.disabled = !creamCompleted || decorateCompleted;
}

function updateDecorationProgress() {
    fruitChoiceButtons.forEach(function (button) {
        updateFruitButton(button, button.dataset.fruit);
    });

    fruitStatus.textContent = String(placedFruit.length);
    resetFruitBtn.hidden = placedFruit.length === 0 || decorateCompleted;
    confirmDecorateBtn.hidden =
        placedFruit.length === 0 || decorateCompleted;

    if (placedFruit.length > 0 && !decorateCompleted) {
        decorateTip.textContent =
            "水果数量不限，可以继续添加或拖动调整；满意后点击确认装饰。";
    }
}

function positionFruit(element, xPercent, yPercent) {
    element.dataset.x = String(xPercent);
    element.dataset.y = String(yPercent);
    element.style.left = xPercent + "%";
    element.style.top = yPercent + "%";
}

function clampPointToCake(x, y, element) {
    const rect = cakeTopArea.getBoundingClientRect();
    const halfWidth = Math.max(element.offsetWidth / 2, 18);
    const halfHeight = Math.max(element.offsetHeight / 2, 18);
    const radiusX = Math.max(rect.width / 2 - halfWidth, 1);
    const radiusY = Math.max(rect.height / 2 - halfHeight, 1);
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    let dx = x - centerX;
    let dy = y - centerY;
    const ellipseDistance = (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY);

    if (ellipseDistance > 1) {
        const scale = 1 / Math.sqrt(ellipseDistance);
        dx *= scale;
        dy *= scale;
    }

    return {
        x: centerX + dx,
        y: centerY + dy,
        xPercent: ((centerX + dx) / rect.width) * 100,
        yPercent: ((centerY + dy) / rect.height) * 100
    };
}

function enableFruitDragging(element) {
    let activePointerId = null;

    element.addEventListener("pointerdown", function (event) {
        if (decorateCompleted) {
            return;
        }

        activePointerId = event.pointerId;
        fruitLayer += 1;
        element.style.zIndex = String(fruitLayer);
        element.classList.add("dragging");
        element.setPointerCapture(activePointerId);
        event.preventDefault();
    });

    element.addEventListener("pointermove", function (event) {
        if (activePointerId !== event.pointerId || decorateCompleted) {
            return;
        }

        const rect = cakeTopArea.getBoundingClientRect();
        const localX = event.clientX - rect.left;
        const localY = event.clientY - rect.top;
        const point = clampPointToCake(localX, localY, element);

        positionFruit(element, point.xPercent, point.yPercent);
        event.preventDefault();
    });

    function finishDrag(event) {
        if (activePointerId !== event.pointerId) {
            return;
        }

        element.classList.remove("dragging");
        element.classList.add("dropped");
        window.setTimeout(function () {
            element.classList.remove("dropped");
        }, 260);

        if (element.hasPointerCapture(activePointerId)) {
            element.releasePointerCapture(activePointerId);
        }

        activePointerId = null;
    }

    element.addEventListener("pointerup", finishDrag);
    element.addEventListener("pointercancel", finishDrag);
}

function addFruit(type, sourceButton) {
    if (!creamCompleted || decorateCompleted) {
        return;
    }

    const config = fruitConfig[type];
    const index = getPlacedCount(type);

    if (!config) {
        return;
    }

    const baseTarget =
        config.positions[index % config.positions.length];

    const cycle = Math.floor(index / config.positions.length);
    const offsetX = ((cycle % 5) - 2) * 3;
    const offsetY = ((cycle % 3) - 1) * 3;

    const target = {
        x: Math.max(16, Math.min(84, baseTarget.x + offsetX)),
        y: Math.max(18, Math.min(82, baseTarget.y + offsetY))
    };
    const element = document.createElement("div");
    element.className = "cake-fruit cake-fruit-" + type;
    element.textContent = config.emoji;
    element.dataset.fruit = type;
    element.setAttribute("role", "img");
    element.setAttribute("aria-label", type);

    positionFruit(element, target.x, target.y);
    cakeTopArea.appendChild(element);
    enableFruitDragging(element);

    fruitLayer += 1;
    element.style.zIndex = String(fruitLayer);

    const sourceRect = sourceButton.getBoundingClientRect();
    const cakeRect = cakeTopArea.getBoundingClientRect();
    const targetX = cakeRect.left + cakeRect.width * target.x / 100;
    const targetY = cakeRect.top + cakeRect.height * target.y / 100;
    const startX = sourceRect.left + sourceRect.width / 2;
    const startY = sourceRect.top + sourceRect.height / 2;

    element.animate(
        [
            {
                transform: "translate(-50%, -50%) translate(" + (startX - targetX) + "px, " + (startY - targetY) + "px) scale(0.45) rotate(-18deg)",
                opacity: 0.25
            },
            {
                transform: "translate(-50%, -50%) translate(0, -18px) scale(1.18) rotate(6deg)",
                opacity: 1,
                offset: 0.78
            },
            {
                transform: "translate(-50%, -50%) translate(0, 0) scale(1) rotate(0deg)",
                opacity: 1
            }
        ],
        {
            duration: 720,
            easing: "cubic-bezier(.2,.85,.35,1)"
        }
    );

    placedFruit.push({
        type: type,
        element: element,
        initialX: target.x,
        initialY: target.y
    });

    decorateTip.textContent = config.emoji + " 已经放上蛋糕，可以拖动它调整位置。";
    updateDecorationProgress();
}

fruitChoiceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        addFruit(button.dataset.fruit, button);
    });
});

resetFruitBtn.addEventListener("click", function () {
    if (decorateCompleted) {
        return;
    }

    placedFruit.forEach(function (item) {
        positionFruit(item.element, item.initialX, item.initialY);
        item.element.classList.add("dropped");
        window.setTimeout(function () {
            item.element.classList.remove("dropped");
        }, 260);
    });

    decorateTip.textContent = "水果已经恢复到初始位置，可以继续拖动调整。";
});

confirmDecorateBtn.addEventListener("click", async function () {
    if (decorateCompleted || confirmDecorateBtn.hidden) {
        return;
    }

    decorateCompleted = true;

    placedFruit.forEach(function (item) {
        item.element.classList.add("locked");
    });

    fruitChoiceButtons.forEach(function (button) {
        button.disabled = true;
    });

    confirmDecorateBtn.hidden = true;
    resetFruitBtn.hidden = true;
    fruitDecorateStep.classList.remove("active");
    fruitDecorateStep.classList.add("completed");
    fruitStatus.textContent = "✓";

    decorateSparkles.classList.remove("visible");
    void decorateSparkles.offsetWidth;
    decorateSparkles.classList.add("visible");
    decorateTip.textContent = "装饰完成！这是独一无二的水果蛋糕。";

    await wait(850);
    toCandleBtn.hidden = false;
});

creamBtn.addEventListener("click", startManualCreamMode);

/* =========================
   蜡烛关卡
========================= */

const candleTip = document.getElementById("candleTip");
const candleCakeMount = document.getElementById("candleCakeMount");
const candleLayer = document.getElementById("candleLayer");
const candleChoiceButtons = Array.from(document.querySelectorAll(".candle-choice"));
const changeCandleBtn = document.getElementById("changeCandleBtn");
const confirmCandleBtn = document.getElementById("confirmCandleBtn");
const lightCandleBtn = document.getElementById("lightCandleBtn");
const wishBtn = document.getElementById("wishBtn");
const wishDoneBtn = document.getElementById("wishDoneBtn");
const blowBtn = document.getElementById("blowBtn");
const micBlowBtn = document.getElementById("micBlowBtn");
const blowChoiceTitle = document.getElementById("blowChoiceTitle");
const birthdayFinale = document.getElementById("birthdayFinale");
const confettiField = document.getElementById("confettiField");
const replayBirthdayBtn = document.getElementById("replayBirthdayBtn");
const candleSparkles = document.getElementById("candleSparkles");
const candleChooseStatus = document.querySelector('[data-candle-status="choose"]');
const candleInsertStatus = document.querySelector('[data-candle-status="insert"]');
const candleLightStatus = document.querySelector('[data-candle-status="light"]');

let selectedCandleType = null;
let candleConfirmed = false;
let candlesLit = false;
let wishCompleted = false;
let microphoneStream = null;
let microphoneFrame = null;

function resetCandleStatus() {
    [candleChooseStatus, candleInsertStatus, candleLightStatus].forEach(function (item) {
        item.classList.remove("active", "completed");
        item.classList.add("locked");
    });
    candleChooseStatus.classList.remove("locked");
    candleChooseStatus.classList.add("active");
    candleChooseStatus.querySelector("em").textContent = "●";
    candleInsertStatus.querySelector("em").textContent = "🔒";
    candleLightStatus.querySelector("em").textContent = "🔒";
}

function mountFinishedCake() {
    candleCakeMount.innerHTML = "";
    const cakeClone = decorateCake.cloneNode(true);
    cakeClone.removeAttribute("id");
    cakeClone.classList.add("candle-finished-cake");
    cakeClone.querySelectorAll("[id]").forEach(function (element) {
        element.removeAttribute("id");
    });
    const canvas = cakeClone.querySelector("canvas");
    if (canvas) canvas.remove();
    candleCakeMount.appendChild(cakeClone);
}

function createFlame() {
    const flame = document.createElement("span");
    flame.className = "candle-flame";
    flame.innerHTML = "<i></i>";
    return flame;
}

function createNormalCandle(index) {
    const candle = document.createElement("div");
    candle.className = "birthday-candle normal-candle candle-drop";
    candle.style.setProperty("--candle-index", String(index));
    candle.style.setProperty("--candle-color", ["#f28fa5", "#76c7c0", "#ffd166", "#8db3e2", "#c69be8"][index]);
    candle.style.left = ["30%", "40%", "50%", "60%", "70%"][index];
    candle.style.top = ["43%", "34%", "30%", "34%", "43%"][index];
    candle.appendChild(createFlame());
    candle.insertAdjacentHTML("beforeend", '<span class="candle-wick"></span><span class="candle-stick"></span>');
    return candle;
}

function createNumberCandle(number, side) {
    const candle = document.createElement("div");
    candle.className = "birthday-candle number-candle candle-drop number-" + number;
    candle.style.setProperty("--candle-index", side === "left" ? "0" : "1");
    candle.style.left = side === "left" ? "43%" : "57%";
    candle.style.top = "30%";
    candle.appendChild(createFlame());
    candle.insertAdjacentHTML("beforeend", '<span class="number-wick"></span><span class="number-body">' + number + '</span><span class="number-pick"></span>');
    return candle;
}

function previewCandles(type) {
    if (candleConfirmed) return;
    selectedCandleType = type;
    candleLayer.innerHTML = "";
    candleChoiceButtons.forEach(function (button) {
        button.classList.toggle("selected", button.dataset.candle === type);
    });

    if (type === "normal") {
        for (let index = 0; index < 5; index += 1) {
            candleLayer.appendChild(createNormalCandle(index));
        }
        candleTip.textContent = "五根彩色蜡烛已经插好，确认位置吧！";
    } else {
        candleLayer.appendChild(createNumberCandle("2", "left"));
        candleLayer.appendChild(createNumberCandle("3", "right"));
        candleTip.textContent = "23 数字蜡烛已经放在蛋糕中央。";
    }

    confirmCandleBtn.disabled = false;
    confirmCandleBtn.classList.add("action-ready");
    changeCandleBtn.hidden = false;
    candleChooseStatus.classList.remove("active");
    candleChooseStatus.classList.add("completed");
    candleChooseStatus.querySelector("em").textContent = "✓";
    candleInsertStatus.classList.remove("locked");
    candleInsertStatus.classList.add("active");
    candleInsertStatus.querySelector("em").textContent = "●";
}

function resetCandleChoice() {
    if (candleConfirmed) return;
    selectedCandleType = null;
    candleLayer.innerHTML = "";
    candleChoiceButtons.forEach(function (button) {
        button.classList.remove("selected");
    });
    confirmCandleBtn.disabled = true;
    confirmCandleBtn.classList.remove("action-ready");
    changeCandleBtn.hidden = true;
    candleTip.textContent = "请选择一种蜡烛放到蛋糕上。";
    resetCandleStatus();
}

async function confirmCandles() {
    if (!selectedCandleType || candleConfirmed) return;
    candleConfirmed = true;
    candleChoiceButtons.forEach(function (button) { button.disabled = true; });
    confirmCandleBtn.hidden = true;
    confirmCandleBtn.classList.remove("action-ready");
    changeCandleBtn.hidden = true;
    candleInsertStatus.classList.remove("active");
    candleInsertStatus.classList.add("completed");
    candleInsertStatus.querySelector("em").textContent = "✓";
    candleLightStatus.classList.remove("locked");
    candleLightStatus.classList.add("active");
    candleLightStatus.querySelector("em").textContent = "●";
    candleSparkles.classList.add("visible");
    candleTip.textContent = "蜡烛插好啦！现在把它们点亮吧。";
    await wait(650);
    lightCandleBtn.hidden = false;
    lightCandleBtn.classList.add("action-ready");
}

async function lightCandles() {
    if (!candleConfirmed || candlesLit) return;
    candlesLit = true;
    lightCandleBtn.disabled = true;
    lightCandleBtn.classList.remove("action-ready");
    candleScene.classList.add("lights-dimmed");
    const flames = Array.from(candleLayer.querySelectorAll(".candle-flame"));
    for (const flame of flames) {
        flame.classList.add("lit");
        await wait(260);
    }
    candleLightStatus.classList.remove("active");
    candleLightStatus.classList.add("completed");
    candleLightStatus.querySelector("em").textContent = "✓";
    lightCandleBtn.hidden = true;
    candleTip.textContent = "蜡烛已经点亮。生日愿望正在等你 ✨";
    candleSparkles.classList.remove("visible");
    void candleSparkles.offsetWidth;
    candleSparkles.classList.add("visible");
    await wait(700);
    wishBtn.hidden = false;
    wishBtn.classList.add("action-ready");
}

function enterCandleScene() {
    if (!candleScene) {
        console.error("没有找到 candleScene，请检查 index.html");
        return;
    }

    stopMicrophoneBlow();

    if (candleCakeMount && decorateCake) {
        mountFinishedCake();
    }

    selectedCandleType = null;
    candleConfirmed = false;
    candlesLit = false;
    wishCompleted = false;

    if (candleLayer) {
        candleLayer.innerHTML = "";
    }

    candleScene.classList.remove(
        "lights-dimmed",
        "wish-mode",
        "blow-mode"
    );

    if (birthdayFinale) {
        birthdayFinale.hidden = true;
    }

    if (confettiField) {
        confettiField.innerHTML = "";
    }

    candleChoiceButtons.forEach(function (button) {
        button.disabled = false;
        button.classList.remove("selected");
    });

    if (confirmCandleBtn) {
        confirmCandleBtn.hidden = false;
        confirmCandleBtn.disabled = true;
        confirmCandleBtn.classList.remove("action-ready");
    }

    if (changeCandleBtn) {
        changeCandleBtn.hidden = true;
    }

    if (lightCandleBtn) {
        lightCandleBtn.hidden = true;
        lightCandleBtn.disabled = false;
        lightCandleBtn.classList.remove("action-ready");
    }

    if (wishBtn) {
        wishBtn.hidden = true;
        wishBtn.disabled = false;
        wishBtn.classList.remove("action-ready");
        wishBtn.textContent = "闭上眼睛，开始许愿 ✨";
    }

    if (wishDoneBtn) {
        wishDoneBtn.hidden = true;
        wishDoneBtn.disabled = false;
        wishDoneBtn.classList.remove("action-ready");
    }

    if (blowChoiceTitle) {
        blowChoiceTitle.hidden = true;
    }

    if (blowBtn) {
        blowBtn.hidden = true;
        blowBtn.disabled = false;
        blowBtn.classList.remove("action-ready");
    }

    if (micBlowBtn) {
        micBlowBtn.hidden = true;
        micBlowBtn.disabled = false;
        micBlowBtn.classList.remove(
            "listening",
            "mic-error"
        );
        micBlowBtn.textContent =
            "🎤 用麦克风吹气";
    }

    if (candleTip) {
        candleTip.textContent =
            "请选择一种蜡烛放到蛋糕上。";
    }

    if (
        candleChooseStatus &&
        candleInsertStatus &&
        candleLightStatus
    ) {
        resetCandleStatus();
    }

    showScene(candleScene);
}

candleChoiceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        previewCandles(button.dataset.candle);
    });
});
changeCandleBtn.addEventListener("click", resetCandleChoice);
confirmCandleBtn.addEventListener("click", confirmCandles);
lightCandleBtn.addEventListener("click", lightCandles);
function beginWish() {
    if (!candlesLit) {
        return;
    }

    /*
     * 关灯状态必须在整个许愿和吹蜡烛阶段持续存在。
     */
    candleScene.classList.add(
        "lights-dimmed",
        "wish-mode"
    );

    wishBtn.hidden = true;
    wishBtn.disabled = true;

    wishBtn.classList.remove(
        "action-ready"
    );

    candleTip.textContent =
        "闭上眼睛，认真许一个愿望吧…… ✨";

    window.setTimeout(function () {
        wishDoneBtn.hidden = false;

        wishDoneBtn.classList.add(
            "action-ready"
        );
    }, 1000);
}

function finishWish() {
    if (wishCompleted) return;
    wishCompleted = true;
    candleScene.classList.add("blow-mode");
    wishDoneBtn.hidden = true;
    wishDoneBtn.classList.remove("action-ready");
    blowChoiceTitle.hidden = false;
    blowBtn.hidden = false;
    blowBtn.classList.add("action-ready");
    micBlowBtn.hidden = false;
    candleTip.textContent = "请选择一种方式：点击按钮，或开启麦克风后对着设备吹气。";
}

function extinguishOneCandle(candle) {
    const flame = candle.querySelector(".candle-flame.lit:not(.blown-out)");
    if (!flame) return;
    flame.classList.add("blown-out");
    const oldSmoke = candle.querySelector(".candle-smoke");
    if (oldSmoke) oldSmoke.remove();
    const smoke = document.createElement("span");
    smoke.className = "candle-smoke visible";
    candle.appendChild(smoke);
    window.setTimeout(function () { smoke.remove(); }, 1500);
    checkAllCandlesOut();
}

async function extinguishAllCandles() {
    const burningCandles = Array.from(candleLayer.querySelectorAll(".birthday-candle")).filter(function (candle) {
        return candle.querySelector(".candle-flame.lit:not(.blown-out)");
    });
    for (const candle of burningCandles) {
        extinguishOneCandle(candle);
        await wait(170);
    }
}

function checkAllCandlesOut() {
    const stillBurning = candleLayer.querySelector(".candle-flame.lit:not(.blown-out)");
    if (!stillBurning) finishBirthday();
}

function stopMicrophoneBlow() {
    if (microphoneFrame) cancelAnimationFrame(microphoneFrame);
    microphoneFrame = null;
    if (microphoneStream) {
        microphoneStream.getTracks().forEach(function (track) { track.stop(); });
    }
    microphoneStream = null;
    if (micBlowBtn) micBlowBtn.classList.remove("listening");
}

async function startMicrophoneBlow() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        micBlowBtn.textContent = "麦克风不可用，请选择点击吹灭";
        micBlowBtn.classList.add("mic-error");
        return;
    }
    try {
        microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContextClass();
        const source = audioContext.createMediaStreamSource(microphoneStream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        const values = new Uint8Array(analyser.frequencyBinCount);
        let strongFrames = 0;
        micBlowBtn.classList.add("listening");
        micBlowBtn.textContent = "正在听……请吹气 💨";
        const detect = function () {
            analyser.getByteFrequencyData(values);
            let total = 0;
            for (let index = 0; index < values.length; index += 1) total += values[index];
            const average = total / values.length;
            strongFrames = average > 34 ? strongFrames + 1 : Math.max(0, strongFrames - 1);
            if (strongFrames >= 5) {
                stopMicrophoneBlow();
                audioContext.close();
                extinguishAllCandles();
                return;
            }
            microphoneFrame = requestAnimationFrame(detect);
        };
        detect();
    } catch (error) {
        stopMicrophoneBlow();
        micBlowBtn.textContent = "未获得权限，请选择点击吹灭";
        micBlowBtn.classList.add("mic-error");
    }
}

function buildConfetti() {
    confettiField.innerHTML = "";
    const colors = ["#f58ba5", "#ffd166", "#69c5bc", "#8ba9e8", "#c99ae7", "#ff9f68"];
    for (let index = 0; index < 54; index += 1) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.style.setProperty("--confetti-color", colors[index % colors.length]);
        piece.style.setProperty("--confetti-left", Math.random() * 100 + "%");
        piece.style.setProperty("--confetti-rotate", Math.random() * 360 + "deg");
        piece.style.setProperty("--confetti-duration", 3.4 + Math.random() * 3 + "s");
        piece.style.setProperty("--confetti-delay", -Math.random() * 5 + "s");
        piece.style.setProperty("--confetti-drift", -90 + Math.random() * 180 + "px");
        confettiField.appendChild(piece);
    }
}

function finishBirthday() {
    if (!birthdayFinale.hidden) return;
    stopMicrophoneBlow();
    blowBtn.disabled = true;
    blowBtn.classList.remove("action-ready");
    blowChoiceTitle.hidden = true;
    micBlowBtn.disabled = true;
    candleTip.textContent = "蜡烛熄灭啦，正在为你重新开灯……";
    buildConfetti();
    window.setTimeout(function () {
        candleScene.classList.remove("lights-dimmed");
        candleTip.textContent = "灯亮啦！愿望一定会实现！";
    }, 650);
    window.setTimeout(function () {
        birthdayFinale.hidden = false;
    }, 1150);
}

function replayCandles() {
    birthdayFinale.hidden = true;
    confettiField.innerHTML = "";
    candleLayer.querySelectorAll(".candle-flame").forEach(function (flame) {
        flame.classList.remove("blown-out");
        flame.classList.add("lit");
    });
    candleLayer.querySelectorAll(".candle-smoke").forEach(function (smoke) { smoke.remove(); });
    blowChoiceTitle.hidden = false;
    blowBtn.disabled = false;
    blowBtn.hidden = false;
    blowBtn.classList.add("action-ready");
    micBlowBtn.disabled = false;
    micBlowBtn.hidden = false;
    micBlowBtn.classList.remove("mic-error");
    micBlowBtn.textContent = "🎤 用麦克风吹气";
    candleTip.textContent = "再吹一次吧，愿望会被好好收藏。";
}

/* =========================
   蜡烛关卡按钮绑定
========================= */

/*
 * “下一步：插上蜡烛”是装饰页的关键出口，
 * 必须优先绑定，避免其他可选按钮缺失时影响场景切换。
 */
if (toCandleBtn) {
    toCandleBtn.addEventListener("click", function () {
        if (!decorateCompleted) {
            decorateTip.textContent =
                "请先确认蛋糕装饰，再进入插蜡烛环节。";
            return;
        }

        enterCandleScene();
    });
}

/*
 * 下面的按钮属于蜡烛关卡的不同阶段。
 * 使用存在性判断，避免某个按钮缺失导致整个脚本停止。
 */
if (wishBtn) {
    wishBtn.addEventListener(
        "click",
        beginWish
    );
}

if (wishDoneBtn) {
    wishDoneBtn.addEventListener(
        "click",
        finishWish
    );
}

if (blowBtn) {
    blowBtn.addEventListener(
        "click",
        extinguishAllCandles
    );
}

if (micBlowBtn) {
    micBlowBtn.addEventListener(
        "click",
        startMicrophoneBlow
    );
}

if (replayBirthdayBtn) {
    replayBirthdayBtn.addEventListener(
        "click",
        replayCandles
    );
}


// =========================
// V3 食材本体拖放：独立模型，不显示按钮卡片
// =========================
(function enableIngredientObjectDragV3() {
    const bowl = document.getElementById("mixingBowl");
    const items = [
        { button: document.getElementById("eggBtn"), type: "egg", name: "鸡蛋", action: playEggAnimation },
        { button: document.getElementById("milkBtn"), type: "milk", name: "牛奶", action: playMilkAnimation },
        { button: document.getElementById("flourBtn"), type: "flour", name: "面粉", action: playFlourAnimation }
    ].filter(item => item.button);
    if (!bowl || !items.length) return;

    let drag = null;
    let suppressClickUntil = 0;

    function insideBowl(x, y) {
        const r = bowl.getBoundingClientRect();
        return x >= r.left + r.width * .08 && x <= r.right - r.width * .08 &&
               y >= r.top - r.height * .04 && y <= r.top + r.height * .58;
    }

    function createObject(source, type, x, y) {
        const object = document.createElement("div");
        object.className = `food-drag-object-v3 food-${type}-v3`;
        const clone = source.cloneNode(true);
        clone.className = source.className.replace(/ingredient-drag-source|ingredient-model-source|source-is-dragging/g, "").trim();
        clone.removeAttribute("data-drag-source");
        clone.setAttribute("aria-hidden", "true");
        object.appendChild(clone);
        object.style.left = `${x}px`;
        object.style.top = `${y}px`;
        document.body.appendChild(object);
        return object;
    }

    function cleanup(cancelled) {
        if (!drag) return;
        const current = drag;
        current.source.classList.remove("source-is-dragging");
        bowl.classList.remove("drop-target", "drop-hover");
        try { current.source.releasePointerCapture(current.pointerId); } catch (_) {}
        if (current.object && cancelled) {
            current.object.classList.add("food-cancel-v3");
            setTimeout(() => current.object.remove(), 180);
        }
        drag = null;
    }

    function completeDrop(event, current) {
        const bowlRect = bowl.getBoundingClientRect();
        current.object.style.left = `${bowlRect.left + bowlRect.width * .50}px`;
        current.object.style.top = `${bowlRect.top + bowlRect.height * .22}px`;
        current.object.classList.add("food-drop-v3");
        current.source.classList.remove("source-is-dragging");
        bowl.classList.remove("drop-target", "drop-hover");
        try { current.source.releasePointerCapture(current.pointerId); } catch (_) {}
        drag = null;
        kitchenTip.textContent = `${current.item.name}放入成功！`;
        setTimeout(() => {
            current.object.remove();
            current.item.action();
        }, 260);
    }

    items.forEach(item => {
        const source = item.button.querySelector(`[data-drag-source="${item.type}"]`);
        if (!source) return;

        source.addEventListener("pointerdown", event => {
            if (item.button.disabled || kitchenBusy || event.button > 0) return;
            event.preventDefault();
            event.stopPropagation();
            source.setPointerCapture(event.pointerId);
            drag = {
                item, source, pointerId: event.pointerId,
                startX: event.clientX, startY: event.clientY,
                moved: false, object: null
            };
        });

        source.addEventListener("pointermove", event => {
            if (!drag || drag.pointerId !== event.pointerId || drag.source !== source) return;
            const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
            if (!drag.moved && distance > 5) {
                drag.moved = true;
                drag.object = createObject(source, item.type, event.clientX, event.clientY);
                source.classList.add("source-is-dragging");
                bowl.classList.add("drop-target");
                kitchenTip.textContent = `按住${item.name}模型，把它拖进碗口。`;
            }
            if (drag.moved && drag.object) {
                drag.object.style.left = `${event.clientX}px`;
                drag.object.style.top = `${event.clientY}px`;
                bowl.classList.toggle("drop-hover", insideBowl(event.clientX, event.clientY));
            }
        });

        source.addEventListener("pointerup", event => {
            if (!drag || drag.pointerId !== event.pointerId || drag.source !== source) return;
            if (!drag.moved) {
                cleanup(true);
                item.button.click();
                return;
            }
            const current = drag;
            suppressClickUntil = Date.now() + 500;
            if (insideBowl(event.clientX, event.clientY)) {
                completeDrop(event, current);
            } else {
                kitchenTip.textContent = `请把${item.name}模型放进碗口，不要放在碗身上。`;
                cleanup(true);
            }
        });

        source.addEventListener("pointercancel", () => cleanup(true));
        item.button.addEventListener("click", event => {
            if (Date.now() < suppressClickUntil) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }, true);
    });
})();

// Defensive remount for the layer selector build. This keeps the shared decorating
// surface attached to the selected independent cake model after page restore/resize.
window.addEventListener("pageshow", function () {
    if (typeof applyCakeLayers === "function") {
        applyCakeLayers(selectedCakeLayers || 1);
    }
});
