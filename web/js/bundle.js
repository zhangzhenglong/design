"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/config/FishConfigs.ts
  var FishConfigs = class {
  };
  FishConfigs.fishConfigs = // 等级1：黄鱼6层 + 1层Boss
  [
    // 等级 1：黄鱼 E1 和第一个 BOSS B1
    [
      {
        id: 1,
        level: 1,
        ridus: 40,
        name: "yellowFish",
        speed: 0.5,
        backSpeed: 20,
        size: 40,
        // E1 鱼的大小
        score: 1,
        skin: "13",
        aTypeLayers: 6,
        // 6 层
        isBoss: false,
        count: 360,
        // 6 层黄鱼总数
        mask: 1
      }
    ],
    [
      {
        id: 2,
        level: 3,
        ridus: 280,
        name: "redFish",
        speed: 2,
        prefab: "EnemyBoss1",
        size: 160,
        // B1 的大小
        score: 600,
        skin: "9",
        isBoss: true,
        count: 1,
        mask: 1
      }
    ],
    // 等级 2：黄鱼 E2 和第二个 BOSS B2
    [
      {
        id: 3,
        level: 2,
        ridus: 680,
        name: "yellowFish",
        speed: 1,
        size: 128,
        // E2 鱼的大小 (0.8 × B1)
        score: 50,
        backSpeed: 40,
        skin: "13",
        aTypeLayers: 5,
        // 6 层
        isBoss: false,
        count: 720,
        // 6 层黄鱼总数
        mask: 1
      }
    ],
    [
      {
        id: 4,
        level: 4,
        ridus: 1640,
        name: "purpleFish",
        speed: 6,
        prefab: "EnemyBoss2",
        size: 512,
        // B2 的大小 (4 × E2)
        score: 4e3,
        skin: "11",
        isBoss: true,
        count: 1,
        mask: 2
      }
    ],
    // 等级 3：黄鱼 E3 和第三个 BOSS B3
    [
      {
        id: 5,
        level: 3,
        ridus: 2900,
        name: "yellowFish",
        speed: 1.5,
        size: 410,
        // E3 鱼的大小 (0.8 × B2)
        score: 50,
        backSpeed: 80,
        skin: "13",
        aTypeLayers: 4,
        // 6 层
        isBoss: false,
        count: 1440,
        // 6 层黄鱼总数
        mask: 2
      }
    ],
    [
      {
        id: 6,
        level: 5,
        ridus: 8600,
        name: "blackFish",
        speed: 10,
        prefab: "EnemyBoss3",
        size: 1638,
        // B3 的大小 (4 × E3)
        score: 2e4,
        skin: "10",
        isBoss: true,
        count: 1,
        mask: 3
      }
    ],
    // 等级 4：黄鱼 E4 和第四个 BOSS B4
    [
      {
        id: 7,
        level: 4,
        ridus: 11e3,
        name: "yellowFish",
        backSpeed: 130,
        speed: 3,
        size: 1310,
        // E4 鱼的大小 (0.8 × B3)
        score: 50,
        skin: "13",
        aTypeLayers: 4,
        // 6 层
        isBoss: false,
        count: 2880,
        // 6 层黄鱼总数
        mask: 3
      }
    ],
    [
      {
        id: 8,
        level: 6,
        ridus: 18e3,
        name: "redFish",
        speed: 20,
        prefab: "EnemyBoss4",
        size: 5243,
        // B4 的大小 (4 × E4)
        score: 1e3,
        skin: "10",
        flySpeed: 40,
        isBoss: true,
        aTypeLayers: 4,
        // 6 层
        count: 1,
        mask: 4
      }
    ]
  ];
  /**
   * 道具配置表
   */
  FishConfigs.propConfigs = [
    {
      type: 1,
      name: "prop_x2",
      poss: { x: 19700, y: 19900 },
      size: 150,
      level: 1
    },
    {
      type: 2,
      name: "prop_x5",
      poss: { x: 19500, y: 21e3 },
      size: 480,
      level: 2
    },
    {
      type: 3,
      name: "prop_citie",
      poss: { x: 19500, y: 19e3 },
      size: 480,
      level: 2
    },
    {
      type: 4,
      name: "prop_boom",
      poss: { x: 19380, y: 22443 },
      size: 1607,
      level: 3
    },
    {
      type: 4,
      name: "prop_boom",
      poss: { x: 21500, y: 21500 },
      size: 1607,
      level: 3
    },
    {
      type: 4,
      name: "prop_boom",
      poss: { x: 19e3, y: 17e3 },
      size: 1607,
      level: 3
    },
    {
      type: 5,
      name: "prop_x1",
      poss: { x: 14e3, y: 23740 },
      size: 5e3,
      level: 4
    },
    {
      type: 6,
      name: "prop_boss",
      poss: { x: 12500, y: 12500 },
      size: 5e3,
      level: 4
    },
    // {
    // 	type: 7,
    // 	name: "prop_zhadan",
    // 	poss: { x: 5000, y: 10000 },
    // 	size: 5000,
    // 	map: "map_left",
    // 	level: 5,
    // },
    {
      type: 7,
      name: "prop_zhadan",
      poss: { x: 72e3, y: 6e3 },
      size: 5e3,
      map: "map_right",
      level: 5
    }
    // {
    // 	type: 7,
    // 	name: "prop_zhadan",
    // 	poss: { x: 65000, y: 65000 },
    // 	size: 5000,
    // 	map: "map_rbottom",
    // 	level: 5,
    // },
    // {
    // 	type: 7,
    // 	name: "prop_zhadan",
    // 	poss: { x: 5000, y: 70000 },
    // 	size: 5000,
    // 	map: "map_lbottom",
    // 	level: 5,
    // },
  ];

  // src/FishRT.generated.ts
  var FishRTBase = class extends Laya.Scene {
  };

  // src/FishRT.ts
  var { regClass } = Laya;
  var FishRT = class extends FishRTBase {
    constructor() {
      super();
      FishRT.instance = this;
    }
  };
  FishRT = __decorateClass([
    regClass("oQqoNh3GQOGXq59fA-ZqFA")
  ], FishRT);

  // src/manager/MapMgr.ts
  var MapMgr = class _MapMgr {
    constructor() {
      /**
       * 初始缩放值
       */
      this.globalScale = 2.5;
      this.scaleDelta = 1;
    }
    static get Instance() {
      if (!this.instance) {
        this.instance = new _MapMgr();
      }
      return this.instance;
    }
    Init(root) {
      let scale = GameManager.getInstance().mapScaleArr.shift();
      this.globalScale = scale;
      root.scale(this.globalScale, this.globalScale);
      this._root = root;
      this._mapRect = new Laya.Rectangle(0, 0, this._root.width, this._root.height);
    }
    //边界检测,超过边界直接拉回
    LimitMapEdge(pos) {
      if (pos[0] < this._mapRect.x + 50 * this.globalScale) {
        pos[0] = this._mapRect.x + 50 * this.globalScale;
      }
      if (pos[1] < this._mapRect.y + 50 * this.globalScale) {
        pos[1] = this._mapRect.y + 50 * this.globalScale;
      }
      if (pos[0] > this._mapRect.width - 50 * this.globalScale) {
        pos[0] = this._mapRect.width - 50 * this.globalScale;
      }
      if (pos[1] > this._mapRect.height - 50 * this.globalScale) {
        pos[1] = this._mapRect.height - 50 * this.globalScale;
      }
      return pos;
    }
    //边界检测,超过边界返回true
    IsOutMapEdge(tx, ty) {
      if (tx < this._mapRect.x) {
        return true;
      }
      if (ty < this._mapRect.y) {
        return true;
      }
      if (tx > this._mapRect.width) {
        return true;
      }
      if (ty > this._mapRect.height) {
        return true;
      }
      return false;
    }
    getNodeVis(node) {
      let vis = true;
      let pot = Laya.Point.create();
      pot.x = 0;
      pot.y = 0;
      let pos = node.localToGlobal(pot, true);
      if (pos.x + (node.width - node.pivotX) * this._root.scaleX < -200) {
        vis = false;
      }
      if (pos.x - node.pivotX * this._root.scaleX > Laya.stage.width + 200) {
        vis = false;
      }
      if (pos.y + (node.height - node.pivotY) * this._root.scaleX < -200) {
        vis = false;
      }
      if (pos.y - node.pivotY * this._root.scaleX > Laya.stage.height + 200) {
        vis = false;
      }
      return vis;
    }
  };

  // src/manager/SoungManager.ts
  var SoundManager = class _SoundManager {
    static getInstance() {
      if (!_SoundManager.instance) {
        _SoundManager.instance = new _SoundManager();
      }
      return _SoundManager.instance;
    }
    playSound(soundName) {
      Laya.SoundManager.playSound(soundName);
    }
    playSoundByUrl(url) {
      Laya.SoundManager.playSound(url);
    }
  };

  // src/prefab/EnemyBase.ts
  var { regClass: regClass2, property } = Laya;
  var EnemyBase = class extends Laya.Script {
    constructor() {
      super(...arguments);
      this.spine = null;
      this.box_spine = null;
      this.img_score = null;
      this.lv = 1;
      this.speed = 5;
      this.backSpeed = 20;
      this.killScore = 1;
      this.isDead = false;
      this.localSkUrl = "";
      this.center = new Laya.Vector2(0, 0);
      this.angularSpeed = Math.PI * 2;
      this.delay = 0;
      this.radius = 0;
      this.separationDistance = 50;
      // 分离距离，根据鱼的大小调整
      this.alignmentFactor = 0.1;
      // 聚集力因子
      this.collisionAvoidanceFactor = 0.2;
      // 碰撞避免因子
      this.maxSpeedChange = 5;
      // 最大速度变化量
      this.vx = 0;
      this.vy = 0;
      this.mass = 1;
      this.enemyStatus = "" /* None */;
      this.player = null;
      this._moveDuration = 200;
      this._timeElapsed = 0;
      this._originalScale = 1;
      this._targetScale = 0;
      this.baseScale = { scaleX: 1, scaleY: 1 };
      this.isImmobilized = false;
    }
    init() {
      this.UID = Laya.Utils.getGID();
      this.rotationEnemy();
      this.separationDistance = this.fishConfigs.size.width;
      this.img_score.skin = "resources/num/score_" + this.fishConfigs.fishInfo.score + ".png";
      const configSpeed = this.fishConfigs.fishInfo.speed;
      this.speed = configSpeed;
    }
    onUpdate() {
      let deltaTime = Laya.timer.delta;
      this.owner.x += this.vx * deltaTime;
      this.owner.y += this.vy * deltaTime;
      this.updateDieAnimation();
    }
    //
    killOwner() {
      this.isDead = true;
      if (this.owner) {
        Laya.Tween.to(this.owner, { scaleX: 0, scaleY: 0 }, 500, null, Laya.Handler.create(this, () => {
          this.owner.removeSelf();
          this.owner.destroy();
        }));
      }
    }
    // 检查是否与另一个对象碰撞
    intersects(other) {
      let radius = this.owner.width / 2;
      let otherRadius = other.owner.width / 2;
      const dx = this.owner.x - other.owner.x;
      const dy = this.owner.y - other.owner.y;
      const distanceSq = dx * dx + dy * dy;
      const minDistance = radius + otherRadius;
      return distanceSq < minDistance * minDistance;
    }
    // 解决碰撞：调整对象位置以避免重叠
    resolveCollisions(objects) {
      for (const other of objects) {
        if (this !== other && this.intersects(other)) {
          this.separate(other);
        }
      }
    }
    // 分离两个碰撞的对象
    separate(other) {
      let radius = this.owner.width / 2;
      let otherRadius = other.owner.width / 2;
      const dx = this.owner.x - other.owner.x;
      const dy = this.owner.y - other.owner.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const overlap = radius + otherRadius - distance;
      if (distance === 0) {
        this.owner.x += radius / 2;
        other.owner.x -= otherRadius / 2;
        return;
      }
      const moveX = dx / distance * (overlap / 2);
      const moveY = dy / distance * (overlap / 2);
      this.owner.x += moveX;
      this.owner.y += moveY;
      other.owner.x -= moveX;
      other.owner.y -= moveY;
    }
    // 简单的边界约束 (如果需要)
    constrain(width, height) {
      let radius = this.owner.width / 2;
      if (this.owner.x - radius < 0) {
        this.owner.x = radius;
      } else if (this.owner.x + radius > width) {
        this.owner.x = width - radius;
      }
      if (this.owner.y - radius < 0) {
        this.owner.y = radius;
      } else if (this.owner.y + radius > height) {
        this.owner.y = height - radius;
      }
    }
    updateDieAnimation() {
      if (this.radius <= 0)
        return;
      const deltaTime = Laya.timer.delta / 1e3;
      if (this.delay > 0) {
        this.delay -= deltaTime;
        return;
      } else {
        this.radius -= 1500 * deltaTime / MapMgr.Instance.globalScale;
        this.angle += this.angularSpeed * deltaTime / MapMgr.Instance.globalScale;
        this.owner.x = this.center.x + this.radius * Math.cos(this.angle);
        this.owner.y = this.center.y + this.radius * Math.sin(this.angle);
        this.angle = this.angle % (2 * Math.PI);
        if (this.angle < 0) {
          this.angle += 2 * Math.PI;
        }
        if (this.radius <= 0) {
          this.owner.removeSelf();
          this.enabled = false;
          this.owner.destroy();
          return;
        }
      }
    }
    onSkill(delay, radius) {
      this.center = new Laya.Vector2(GameManager.getInstance().player.x, GameManager.getInstance().player.y);
      this.delay = delay;
      this.radius = radius;
    }
    enemyActive() {
      if (GameManager.getInstance().gameStatus == 4 /* GAME_END */)
        return;
      if (this.enemyStatus == "ACTIVE" /* ACTIVE */) {
        return;
      }
      this.enemyStatus = "ACTIVE" /* ACTIVE */;
      this.setEnemyStatusInGame();
      this.setEnemyDisableDraw(true);
    }
    updateEnemyDead(deltaTime) {
      if (this.player && this.enabled) {
        const enemy = this.owner;
        this._timeElapsed += deltaTime;
        const playerPos = { x: this.player.x, y: this.player.y };
        const enemyPos = { x: enemy.x, y: enemy.y };
        const direction = new Laya.Point(playerPos.x - enemyPos.x, playerPos.y - enemyPos.y);
        const distance = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        direction.x /= distance;
        direction.y /= distance;
        direction.normalize();
        const moveSpeed = 2;
        enemy.x += direction.x * moveSpeed * deltaTime;
        enemy.y += direction.y * moveSpeed * deltaTime;
        if (this._timeElapsed >= this._moveDuration) {
          enemy.removeSelf();
          this.enabled = false;
          return;
        }
      }
    }
    onEnemyIsEat(xs, ys) {
      this.isDead = true;
      const owner = this.owner;
      SoundManager.getInstance().playSound("resources/sound/eat.mp3");
      Laya.Tween.to(owner, { scaleX: 0, scaleY: 0, x: xs, y: ys }, 200, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
        this.owner.removeSelf();
        this.enabled = false;
      }));
    }
    enemySleep() {
      if (this.enemyStatus == "SLEEP" /* SLEEP */) {
        return;
      }
      this.enemyStatus = "SLEEP" /* SLEEP */;
      this.setEnemyStatusInGame();
      this.setEnemyDisableDraw(false);
    }
    setEnemyStatusInGame() {
    }
    destroyAllCollider() {
    }
    checkEnemyEnable() {
      const box = this.owner;
      if (!this.fishConfigs.fishInfo.isBoss) {
        if (this.lv > GameManager.getInstance().playerLevel) {
          this.enemySleep();
        } else {
          this.enemyActive();
        }
      } else {
        if (this.lv - 1 <= GameManager.getInstance().playerLevel) {
          this.enemyActive();
        } else {
          this.enemySleep();
        }
      }
    }
    isBoxInScreen(box) {
      if (!box)
        return false;
      const vis = MapMgr.Instance.getNodeVis(box);
      box.active = vis;
      return vis;
    }
    getGlobalScale(node) {
      let scaleX = 1;
      let scaleY = 1;
      let current = node;
      while (current) {
        scaleX *= current.scaleX;
        scaleY *= current.scaleY;
        current = current.parent;
      }
      return new Laya.Point(scaleX, scaleY);
    }
    setColliderEnable(enable) {
    }
    destroyAllComponents() {
      const components = this.owner.components;
      const len = components.length;
      for (let i = len - 1; i >= 0; i--) {
        const element = components[i];
        element.destroy();
      }
    }
    setComponentsEnable(enable) {
      const components = this.owner.components;
      for (let i = 0; i < components.length; i++) {
        const element = components[i];
        element.enabled = false;
      }
    }
    setEnemyDisableDraw(visible) {
      this.owner.visible = visible;
    }
    rotationEnemy() {
      const heroPosX = FishRT.instance.Hero.x;
      const heroPosY = FishRT.instance.Hero.y;
      const dx = heroPosX - this.owner.x;
      const dy = heroPosY - this.owner.y;
      const angle = Math.atan2(dy, dx);
      this.angle = angle;
      const direct = angle / Math.PI * 180;
      this.box_spine.rotation = 180 + direct;
    }
    moveToHero() {
      if (GameManager.getInstance().gameStatus == 2 /* UP_LEVEL */)
        return;
      if (this.enemyStatus == "ACTIVE" /* ACTIVE */ && !this.isDead) {
        if (this.lv < GameManager.getInstance().playerLevel) {
          let heroPosX = FishRT.instance.Hero.x;
          let heroPosY = FishRT.instance.Hero.y;
          let dx = heroPosX - this.owner.x;
          let dy = heroPosY - this.owner.y;
          let angle = Math.atan2(dy, dx);
          this.angle = angle;
          let direct = angle / Math.PI * 180;
          this.box_spine.rotation = 180 + direct;
          let configSpeed = this.fishConfigs.fishInfo.speed;
          let speed = this.speed + Math.random() * configSpeed;
          let xspeed = Math.cos(angle) * speed * Laya.timer.delta / 1e3;
          let yspeed = Math.sin(angle) * speed * Laya.timer.delta / 1e3;
          this.owner.x += xspeed;
          this.owner.y += yspeed;
          this.box_spine.rotation = 180 + direct;
        }
      }
    }
    // 维护与 Hero 的安全距离
    maintainSafeDistanceWithHero() {
      if (this.lv < GameManager.getInstance().playerLevel)
        return;
      if (GameManager.getInstance().playerScript._heroState === 2)
        return;
      const distanceToHero = new Laya.Point(this.owner.x, this.owner.y).distance(FishRT.instance.Hero.x, FishRT.instance.Hero.y);
      if (distanceToHero < GameManager.getInstance().heroSafeDistance) {
        const diffX = this.owner.x - FishRT.instance.Hero.x;
        const diffY = this.owner.y - FishRT.instance.Hero.y;
        const angle = Math.atan2(diffY, diffX);
        const pushOutDistance = GameManager.getInstance().heroSafeDistance - distanceToHero;
        this.owner.x += Math.cos(angle) * pushOutDistance;
        this.owner.y += Math.sin(angle) * pushOutDistance;
      }
    }
    // ... (existing methods)
    calculateAlignmentAdjustment(nearbyFishes) {
      if (nearbyFishes.length === 0 || this.isImmobilized)
        return new Laya.Point(0, 0);
      let avgDx = 0;
      let avgDy = 0;
      for (const fish of nearbyFishes) {
        avgDx += fish.owner.x - this.owner.x;
        avgDy += fish.owner.y - this.owner.y;
      }
      avgDx /= nearbyFishes.length;
      avgDy /= nearbyFishes.length;
      const magnitude = Math.sqrt(avgDx * avgDx + avgDy * avgDy);
      if (magnitude > 0) {
        avgDx /= magnitude;
        avgDy /= magnitude;
      }
      const adjustmentFactor = 0.05;
      return new Laya.Point(avgDx * adjustmentFactor, avgDy * adjustmentFactor);
    }
  };
  __decorateClass([
    property({ type: Laya.Spine2DRenderNode })
  ], EnemyBase.prototype, "spine", 2);
  __decorateClass([
    property({ type: Laya.Box })
  ], EnemyBase.prototype, "box_spine", 2);
  __decorateClass([
    property({ type: Laya.Image })
  ], EnemyBase.prototype, "img_score", 2);
  EnemyBase = __decorateClass([
    regClass2("dV82IPiBQRSP7_9gcax5HQ")
  ], EnemyBase);

  // src/prefab/EnemyBoss.ts
  var { regClass: regClass3, property: property2 } = Laya;
  var EnemyBoss = class extends EnemyBase {
    constructor() {
      super();
      this.spine = null;
      this.img_blood = null;
      this.effect_boom = null;
      this.box_spine = null;
      this.canEat = false;
      this.killScore = 50;
      this.propKillScore = 1e3;
      this._animation = null;
      this.backTimeDt = 0;
      this.backTimeTotal = 800;
      this.separationDistance = 100;
      // Boss 之间的分离距离
      this.collisionAvoidanceFactor = 0.3;
    }
    onEnable() {
      this.setNormalFilter();
      this.player = GameManager.getInstance().player;
      this.setEnemyStatusInGame();
    }
    init() {
      this.separationDistance = this.fishConfigs.size.width;
      this.spine.owner.on(Laya.Event.END, this, this.onPlayNextAni);
      this.rotationEnemy();
      const configSpeed = this.fishConfigs.fishInfo.speed;
      this.speed = configSpeed;
    }
    playBoomEffect() {
      if (this.effect_boom) {
        this.effect_boom.owner.visible = true;
        this.effect_boom.play("3", false);
        this.effect_boom.owner.on(Laya.Event.END, this, this.onPlayBoomEnd);
      }
    }
    onPlayBoomEnd() {
      this.owner.removeSelf();
    }
    setEnemyStatusInGame() {
      if (this.spine) {
        if (this.enemyStatus != "SLEEP" /* SLEEP */) {
          this.playAnimation("attack" /* attack */, true);
        } else {
          this.spine.stop();
        }
      }
    }
    reloadSk() {
    }
    backward() {
      if (this.backTimeDt > 0)
        return;
      this.backTimeDt = this.backTimeTotal;
      if (this.lv < GameManager.getInstance().playerLevel) {
        this.setWhiteFilter();
      }
    }
    moveToBack() {
      const heroPosX = FishRT.instance.Hero.x;
      const heroPosY = FishRT.instance.Hero.y;
      const dx = heroPosX - this.owner.x;
      const dy = heroPosY - this.owner.y;
      const angle = Math.atan2(dy, dx);
      this.angle = angle;
      const xspeed = Math.cos(angle) * this.backSpeed * Laya.timer.delta / 1e3;
      const yspeed = Math.sin(angle) * this.backSpeed * Laya.timer.delta / 1e3;
      this.owner.x -= xspeed;
      this.owner.y -= yspeed;
    }
    onAwake() {
    }
    onUpdate() {
      super.onUpdate();
      if (this.isDead) {
        return;
      }
      if (this.backTimeDt > 0) {
        this.backTimeDt -= Laya.timer.delta;
        this.moveToBack();
        if (this.backTimeDt <= 0) {
          this.backTimeDt = 0;
          GameManager.getInstance().onPlayerScoreUp(this.killScore);
        }
      } else {
        this.backTimeDt = 0;
        this.moveToHero();
      }
      this.checkCollisionWithSmallFishes();
      this.checkCollisionWithBosses();
    }
    moveToHero() {
      if (GameManager.getInstance().gameStatus == 2 /* UP_LEVEL */)
        return;
      const heroPosX = FishRT.instance.Hero.x;
      const heroPosY = FishRT.instance.Hero.y;
      const dx = heroPosX - this.owner.x;
      const dy = heroPosY - this.owner.y;
      const angle = Math.atan2(dy, dx);
      this.angle = angle;
      const direct = angle / Math.PI * 180;
      if (this.enemyStatus == "ACTIVE" /* ACTIVE */ && !this.isDead) {
        if (this.lv == GameManager.getInstance().playerLevel + 1 || this.lv == GameManager.getInstance().playerLevel && this.fishConfigs.fishInfo.flySpeed) {
          let configSpeed = this.fishConfigs.fishInfo.speed;
          if (GameManager.getInstance().playerScript.propStatus == 6 /* KILL_ENEMY_BOSS */) {
            configSpeed = this.fishConfigs.fishInfo.flySpeed;
            this.speed = configSpeed;
          }
          const speed = (this.speed + Math.random() * configSpeed) / MapMgr.Instance.globalScale;
          const xspeed = Math.cos(angle) * speed * Laya.timer.delta / 1e3;
          const yspeed = Math.sin(angle) * speed * Laya.timer.delta / 1e3;
          this.owner.x += xspeed;
          this.owner.y += yspeed;
        }
      }
      this.box_spine.rotation = 180 + direct;
    }
    onDisable() {
      this.localSkUrl = "";
      Laya.Pool.recover(`enemyBoss_${this.lv}`, this.owner);
    }
    // 移除 onTriggerEnter
    // onTriggerEnter(other: Laya.CircleCollider, self: Laya.CircleCollider, contact: any): void {
    //     // ... (之前的碰撞处理逻辑)
    // }
    deatInAni() {
      if (this.isDead)
        return;
      this.isDead = true;
      if (this.owner) {
        SoundManager.getInstance().playSound("resources/sound/prop2.mp3");
        this.setWhiteFilter();
        const player = GameManager.getInstance().player;
        const globalScale = MapMgr.Instance.globalScale;
        const scoreX = (this.owner.x - player.x) * globalScale + Laya.stage.width / 2;
        const scoreY = (this.owner.y - player.y) * globalScale + Laya.stage.height / 2;
        GameManager.getInstance().playScoreEffect(this.propKillScore, { x: scoreX, y: scoreY });
        this.showDeadAni({ x: scoreX, y: scoreY });
        Laya.timer.once(500, this, () => {
          this.owner.removeSelf();
          this.owner.destroy();
        });
      }
    }
    //播放死亡动画
    showDeadAni(pos) {
      let count = 3;
      for (let i = 0; i < count; i++) {
        let image = Laya.Pool.getItemByClass("img_dead", Laya.Image);
        image.skin = "resources/effect/img_fish_dead1.png";
        image.anchorX = image.anchorY = 0.5;
        FishRT.instance.box_effect.addChild(image);
        image.pos(pos.x, pos.y);
        image.scale(1, 1);
        let rotation = 120 * Math.random();
        let xs = pos.x + Math.random() * 30 - 10;
        let ys = pos.y - Math.random() * 20 - 50;
        let time1 = 150 + Math.random() * 50;
        Laya.Tween.to(image, { x: xs, y: ys, rotation }, time1, null, Laya.Handler.create(image, () => {
          let xs2 = image.x + Math.random() * 30 - 10;
          let ys2 = image.y + Math.random() * 20 + 300;
          let rotation2 = 240 * Math.random() + image.rotation;
          let time2 = 600 + Math.random() * 200;
          Laya.Tween.to(image, { x: xs2, y: ys2, scaleX: 0.5, scaleY: 0.5, rotation: rotation2 }, time2, Laya.Ease.linearIn, Laya.Handler.create(image, () => {
            image.removeSelf();
            Laya.Pool.recover("img_dead", image);
          }));
        }));
      }
    }
    playAnimation(animation, isLoop = true) {
      if (this._animation == animation)
        return;
      if (this.spine.templet == null)
        return;
      this.canEat = false;
      if (this._animation == "attack" /* attack */) {
        this.canEat = true;
      }
      this._animation = animation;
      this.spine.play(animation, isLoop, true, 0);
    }
    onPlayNextAni() {
      switch (this._animation) {
        case "attack" /* attack */:
          this.canEat = true;
          this.playAnimation("idle2" /* idle2 */, true);
          break;
        case "idle1" /* idle1 */:
          this.canEat = false;
          if (this.lv > GameManager.getInstance().playerLevel) {
            this.playAnimation("attack" /* attack */, true);
          } else {
            this.playAnimation("idle1" /* idle1 */, true);
          }
          break;
        case "idle2" /* idle2 */:
          this.canEat = false;
          if (this.lv > GameManager.getInstance().playerLevel) {
            this.playAnimation("attack" /* attack */, true);
          } else {
            this.playAnimation("idle1" /* idle1 */, true);
          }
          break;
        default:
          this.playAnimation("attack" /* attack */, true);
          break;
      }
    }
    playerEatEnamy(xs, ys) {
      const owner = this.owner;
      Laya.Tween.to(owner, { scaleX: 0, scaleY: 0, x: xs, y: ys }, 100, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
        owner.removeSelf();
      }));
    }
    /**
     * 设置白色滤镜
     */
    setWhiteFilter() {
      const colorFilter = new Laya.ColorFilter([
        1,
        0,
        0,
        0,
        255,
        0,
        1,
        0,
        0,
        255,
        0,
        0,
        1,
        0,
        255,
        0,
        0,
        0,
        1,
        0
      ]);
      this.owner && (this.owner.filters = [colorFilter]);
    }
    /**
     * 设置普通滤镜
     */
    setNormalFilter() {
      this.owner.filters = null;
    }
    // 新增小鱼碰撞检测
    checkCollisionWithSmallFishes() {
      if (!this.canEat)
        return;
      const bossRadius = this.fishConfigs.size.width / 2;
      const bossX = this.owner.x;
      const bossY = this.owner.y;
      const bossRotation = this.box_spine.rotation % 360;
      for (let i = GameManager.getInstance().allEnemy.length - 1; i >= 0; i--) {
        const smallFish = GameManager.getInstance().allEnemy[i];
        if (smallFish && smallFish.owner && smallFish.lv < this.lv && this.canEat) {
          const smallFishRadius = smallFish.fishConfigs.size.width / 2;
          const smallFishX = smallFish.owner.x;
          const smallFishY = smallFish.owner.y;
          const distance = new Laya.Point(bossX, bossY).distance(smallFishX, smallFishY);
          if (distance < bossRadius + smallFishRadius) {
            const dx = smallFishX - bossX;
            const dy = smallFishY - bossY;
            const rotatedX = dx * Math.cos(-bossRotation * Math.PI / 180) - dy * Math.sin(-bossRotation * Math.PI / 180);
            const rotatedY = dx * Math.sin(-bossRotation * Math.PI / 180) + dy * Math.cos(-bossRotation * Math.PI / 180);
            if (bossRotation >= -10 && bossRotation < 10) {
              if (rotatedX > 0) {
                this.eatSmallFish(smallFish);
              }
            } else if (bossRotation >= 80 && bossRotation < 100) {
              if (rotatedY > 0) {
                this.eatSmallFish(smallFish);
              }
            } else if (bossRotation >= 170 || bossRotation < -170) {
              if (rotatedX < 0) {
                this.eatSmallFish(smallFish);
              }
            } else if (bossRotation >= -100 && bossRotation < -80) {
              if (rotatedY < 0) {
                this.eatSmallFish(smallFish);
              }
            }
          }
        }
      }
    }
    eatSmallFish(smallFish) {
      smallFish.onEnemyIsEatByBoss(this.owner.x, this.owner.y);
    }
    // 碰撞避免因子，略微增大
    checkeAllEnemy() {
      let allEnemy = GameManager.getInstance().allEnemyBoss;
      this.resolveCollisions(allEnemy);
    }
    // 新增 Boss 碰撞检测
    checkCollisionWithBosses() {
      const nearbyBosses = this.getNearbyBosses(this.separationDistance);
      const collisionAdjustment = this.calculateCollisionAdjustment(nearbyBosses);
      this.owner.x += collisionAdjustment.x;
      this.owner.y += collisionAdjustment.y;
    }
    // 计算碰撞调整向量 (与 Enemy 类中的类似，但针对 Boss)
    calculateCollisionAdjustment(nearbyBosses) {
      let adjustX = 0;
      let adjustY = 0;
      for (const otherBoss of nearbyBosses) {
        if (otherBoss !== this && otherBoss.owner) {
          const distance = new Laya.Point(this.owner.x, this.owner.y).distance(otherBoss.owner.x, otherBoss.owner.y);
          const minDistance = this.separationDistance;
          if (distance < minDistance) {
            const diffX = this.owner.x - otherBoss.owner.x;
            const diffY = this.owner.y - otherBoss.owner.y;
            const angle = Math.atan2(diffY, diffX);
            const pushOutDistance = minDistance - distance;
            adjustX += Math.cos(angle) * pushOutDistance * this.collisionAvoidanceFactor;
            adjustY += Math.sin(angle) * pushOutDistance * this.collisionAvoidanceFactor;
          }
        }
      }
      return new Laya.Point(adjustX, adjustY);
    }
    // 获取附近的 Boss
    getNearbyBosses(radius) {
      const nearbyBosses = [];
      for (const otherBoss of GameManager.getInstance().allEnemyBoss) {
        if (otherBoss !== this && otherBoss.owner && otherBoss.fishConfigs.fishInfo.level == this.fishConfigs.fishInfo.level) {
          const distance = new Laya.Point(this.owner.x, this.owner.y).distance(otherBoss.owner.x, otherBoss.owner.y);
          if (distance < radius) {
            nearbyBosses.push(otherBoss);
          }
        }
      }
      return nearbyBosses;
    }
  };
  __decorateClass([
    property2({ type: Laya.Spine2DRenderNode })
  ], EnemyBoss.prototype, "spine", 2);
  __decorateClass([
    property2({ type: Laya.Image })
  ], EnemyBoss.prototype, "img_blood", 2);
  __decorateClass([
    property2({ type: Laya.Spine2DRenderNode })
  ], EnemyBoss.prototype, "effect_boom", 2);
  __decorateClass([
    property2({ type: Laya.Box })
  ], EnemyBoss.prototype, "box_spine", 2);
  EnemyBoss = __decorateClass([
    regClass3("JzDaBkG_TwGcUJgTIazDTA")
  ], EnemyBoss);
  var EBossState = /* @__PURE__ */ ((EBossState2) => {
    EBossState2[EBossState2["None"] = 0] = "None";
    EBossState2[EBossState2["Idle"] = 1] = "Idle";
    EBossState2[EBossState2["Attack"] = 2] = "Attack";
    return EBossState2;
  })(EBossState || {});
  var EBossAnimation = /* @__PURE__ */ ((EBossAnimation2) => {
    EBossAnimation2["attack"] = "attack";
    EBossAnimation2["idle1"] = "idle1";
    EBossAnimation2["idle2"] = "idle2";
    return EBossAnimation2;
  })(EBossAnimation || {});

  // src/utils/Awaiters.ts
  var Awaiters = class {
    static NextFrame() {
      return this.Frames(2);
    }
    static Frames(num) {
      return new Promise(function(resolve) {
        Laya.timer.frameOnce(num, null, () => {
          resolve();
        });
      });
    }
    static Seconds(num) {
      return new Promise(function(resolve) {
        Laya.timer.once(num * 1e3, null, () => {
          resolve();
        });
      });
    }
  };

  // src/prefab/Hero.ts
  var Point = Laya.Point;
  var { regClass: regClass4, property: property3 } = Laya;
  var EHeroState = /* @__PURE__ */ ((EHeroState2) => {
    EHeroState2[EHeroState2["None"] = 0] = "None";
    EHeroState2[EHeroState2["Idle"] = 1] = "Idle";
    EHeroState2[EHeroState2["Attack"] = 2] = "Attack";
    EHeroState2[EHeroState2["skill"] = 3] = "skill";
    return EHeroState2;
  })(EHeroState || {});
  var EHeroAnimation = /* @__PURE__ */ ((EHeroAnimation2) => {
    EHeroAnimation2["attack"] = "attack";
    EHeroAnimation2["idle1"] = "idle1";
    EHeroAnimation2["idle2"] = "idle2";
    EHeroAnimation2["skill"] = "skill";
    return EHeroAnimation2;
  })(EHeroAnimation || {});
  var Hero = class extends Laya.Script {
    constructor() {
      super();
      this.spine = null;
      this.effect_fly = null;
      this.effect_skill = null;
      this.box_spine = null;
      this.img_dead = null;
      this.box_guide = null;
      this.img_guide = null;
      this.txt_blood = null;
      // 移除 colliderConfigs，因为不再使用物理碰撞器
      // colliderConfigs = [
      //     { "circle": { x: -10, y: 2, ridus: 40 }, "polygon": { x: 23, y: 0, points: [0, 7, 22, 75, 54, 51, 124, 15, 54, 1] } },
      //     { "circle": { x: -10, y: 2, ridus: 40 }, "polygon": { x: 23, y: 0, points: [0, 7, 22, 75, 54, 51, 82, 51, 40, 18] } },
      //     { "circle": { x: -28, y: -20, ridus: 60 }, "polygon": { x: 10, y: -40, points: [0, 7, 23, 113, 56, 109, 125, 81, 54, 1] } },
      //     { "circle": { x: -28, y: -20, ridus: 60 }, "polygon": { x: 10, y: -40, points: [0, 7, 23, 113, 56, 109, 125, 81, 54, 1] } },
      //     { "circle": { x: -28, y: -20, ridus: 60 }, "polygon": { x: 10, y: -40, points: [0, 7, 23, 113, 56, 109, 125, 81, 54, 1] } },
      //     { "circle": { x: -139, y: -110, ridus: 60 }, "polygon": { x: -26, y: -102, points: [0, 7, -56, 165, 112, 200, 309, 104, 106, 72] } },
      // ]
      this._collisionRadius = 40;
      /** 记录stage上的鼠标点，当频繁使用stage坐标转化时，可以减少实例开销 */
      this.stagePoint = new Point();
      this.lv = 1;
      this._heroState = 0 /* None */;
      this._animation = null;
      /**攻击时间点 */
      this._atkCd = 180;
      /**攻击动作持续时间 */
      this._atkDuration = 1e3;
      this._atkDtTotal = 0;
      /**是否可以吃到鱼 */
      this.bEat = false;
      this.propStatus = 0;
      // 保留 colliderConfigs，用于升级时改变碰撞半径
      this.colliderConfigs = [
        { circle: { x: -10, y: 2, ridus: 40 } },
        { circle: { x: -10, y: 2, ridus: 40 } },
        { circle: { x: -28, y: -20, ridus: 70 } },
        { circle: { x: -28, y: -20, ridus: 70 } },
        { circle: { x: -28, y: -20, ridus: 70 } },
        { circle: { x: -139, y: -110, ridus: 70 } }
      ];
    }
    // 定义主角的碰撞半径
    onPlayerUp() {
      if (this.colliderConfigs.length > 0) {
        this._collisionRadius = this.colliderConfigs.shift().circle.ridus * this.owner.scaleX;
      } else {
        console.warn("No more collider configurations.");
      }
      this.setHeroState(1 /* Idle */);
    }
    onEnable() {
      this.lv = GameManager.getInstance().playerLevel;
      this.player = this.owner;
      GameManager.getInstance().player = this.player;
      GameManager.getInstance().playerScript = this.player.getComponent(Hero);
      this.effect_fly.stop();
      this.effect_skill.stop();
      this.effect_fly.owner.on(Laya.Event.END, this, this.onCloseFly);
      this.effect_skill.owner.on(Laya.Event.END, this, this.onCloseSkill);
      this.onPlayerUp();
    }
    onCloseSkill() {
      this.effect_skill.stop();
      this.effect_skill.owner.visible = false;
    }
    onCloseFly() {
      this.effect_fly.stop();
      this.effect_fly.owner.visible = false;
    }
    onStart() {
      setTimeout(() => {
        this.setHeroState(1 /* Idle */);
        this.playAnimation("idle2" /* idle2 */);
        let ske = this.spine.getSkeleton();
      }, 100);
    }
    // 移除 onTriggerEnter，替换为手动碰撞检测
    // onTriggerEnter(other: Laya.CircleCollider, self: Laya.CircleCollider, contact: any): void {
    //     // ... (之前的碰撞处理逻辑)
    // }
    changeSkin(skin) {
      return new Promise((resolve, reject) => {
        Laya.loader.load(`resources/spine/${skin}/${skin}.json`, Laya.Loader.SPINE).then((templet) => {
          this.spine.templet = templet;
          resolve(null);
        });
      });
    }
    playerMoveToBoss(otherowner) {
      if (GameManager.getInstance().gameStatus == 4 /* GAME_END */)
        return;
      GameManager.getInstance().gameStatus = 4 /* GAME_END */;
      FishRT.instance.entity_root.addChild(otherowner);
      const enemyBoss = otherowner.getComponent(EnemyBoss);
      enemyBoss && enemyBoss.playAnimation("attack" /* attack */, true);
      GameManager.getInstance().destoryAllEnemyComps();
      const dx = this.owner.x - otherowner.x;
      const dy = this.owner.y - otherowner.y;
      const playerMovex = dx / 10 * 7 + otherowner.x;
      const playerMovey = dy / 10 * 7 + otherowner.y;
      const enemyMoveX = dx / 10 * 3 + otherowner.x;
      const enemyMoveY = dy / 10 * 3 + otherowner.y;
      const previousX = otherowner.x;
      const previousY = otherowner.y;
      const previousPlayerX = this.owner.x;
      const previousPlayerY = this.owner.y;
      SoundManager.getInstance().playSound("resources/sound/dead.mp3");
      Laya.Tween.to(
        otherowner,
        { x: enemyMoveX, y: enemyMoveY },
        500,
        Laya.Ease.linearIn,
        Laya.Handler.create(this, () => {
          Laya.Tween.to(
            otherowner,
            { x: previousX, y: previousY },
            100,
            Laya.Ease.linearIn
          );
        })
      );
      Laya.Tween.to(
        this.owner,
        { x: playerMovex, y: playerMovey },
        500,
        Laya.Ease.linearIn,
        Laya.Handler.create(this, () => {
          this.img_dead.visible = true;
          this.img_dead.rotation = this.box_spine.rotation;
          this.box_spine.visible = false;
          Laya.Tween.to(
            this.owner,
            { x: previousPlayerX, y: previousPlayerY },
            500,
            Laya.Ease.linearIn,
            Laya.Handler.create(this, () => {
              GameManager.getInstance().onGameOver();
            })
          );
        })
      );
    }
    addRoateProp() {
      this.box_guide.visible = true;
      this.propStatus = 6 /* KILL_ENEMY_BOSS */;
      Laya.loader.load(`prefab/PropSkill.lh`).then((res) => {
        const box = res.create();
        this.box_roa = box;
        FishRT.instance.entity_root.addChildAt(box, 0);
      });
    }
    onUpdate() {
      if (GameManager.getInstance().gameIsOver)
        return;
      this.txt_blood.text = GameManager.getInstance().playerScore.toString();
      CameraMgr.Inst.LookAt(this.owner.x, this.owner.y);
      this.checkCollisions();
      this.checkGuidePos();
    }
    checkGuidePos() {
      if (this.propStatus == 6 /* KILL_ENEMY_BOSS */ && this.box_guide.visible) {
        let dx = 7e4 - this.owner.x;
        let dy = 6e3 - this.owner.y;
        let angleRad = Math.atan2(-dx, dy);
        let angleDeg = angleRad * (180 / Math.PI);
        this.box_guide.rotation = angleDeg;
      }
    }
    onLateUpdate() {
      switch (this._heroState) {
        case 2 /* Attack */:
          this._atkDtTotal += Laya.timer.delta;
          this.playAnimation("attack" /* attack */);
          this.bEat = true;
          break;
        case 1 /* Idle */:
          this.bEat = false;
          this._atkDtTotal = 0;
          this.playAnimation("idle2" /* idle2 */);
          break;
        case 3 /* skill */:
          this.bEat = false;
          this._atkDtTotal = 0;
          this.playAnimation("skill" /* skill */);
          break;
      }
    }
    playAnimation(animation, isLoop = true) {
      if (this._animation == animation)
        return;
      if (this.spine.templet == null)
        return;
      this._animation = animation;
      this.spine.play(animation, isLoop, true, 0);
    }
    setHeroState(state) {
      if (this._heroState != state) {
        this._heroState = state;
      }
    }
    onDisable() {
    }
    // 新增碰撞检测方法
    checkCollisions() {
      this.checkCollisionWithEnemies();
      this.checkCollisionWithEnemyBosses();
      this.checkCollisionWithProps();
    }
    checkCollisionWithEnemies() {
      const playerRadius = this._collisionRadius;
      const playerX = this.owner.x;
      const playerY = this.owner.y;
      for (let i = GameManager.getInstance().allEnemy.length - 1; i >= 0; i--) {
        const enemy = GameManager.getInstance().allEnemy[i];
        if (enemy.enemyStatus == "SLEEP" /* SLEEP */)
          continue;
        if (enemy && enemy.owner && !enemy.isDead) {
          const enemyRadius = enemy.fishConfigs.size.width / 2;
          const enemyX = enemy.owner.x;
          const enemyY = enemy.owner.y;
          const distance = new Point(playerX, playerY).distance(enemyX, enemyY);
          if (distance < playerRadius + enemyRadius && this.bEat) {
            this.eatEnemy(enemy);
          }
        }
      }
    }
    eatEnemy(enemy) {
      GameManager.getInstance().onPlayerScoreUp(enemy.killScore);
      enemy.isDead = true;
      const globalScale = MapMgr.Instance.globalScale;
      const scoreX = (enemy.owner.x - this.owner.x) * globalScale + Laya.stage.width / 2;
      const scoreY = (enemy.owner.y - this.owner.y) * globalScale + Laya.stage.height / 2;
      GameManager.getInstance().playScoreEffect(enemy.killScore, {
        x: scoreX,
        y: scoreY
      });
      const rotation = this.box_spine.rotation;
      const deltaX = -40;
      const deltaY = 0;
      const theta = rotation * Math.PI / 180;
      const xs = this.player.x + deltaX * Math.cos(theta) - deltaY * Math.sin(theta);
      const ys = this.player.y + deltaX * Math.sin(theta) + deltaY * Math.cos(theta);
      const dx = enemy.owner.x - this.owner.x;
      const dy = enemy.owner.y - this.owner.y;
      const rotatedX = dx * Math.cos(-rotation * Math.PI / 180) - dy * Math.sin(-rotation * Math.PI / 180);
      const rotatedY = dx * Math.sin(-rotation * Math.PI / 180) + dy * Math.cos(-rotation * Math.PI / 180);
      if (rotation >= -10 && rotation < 10) {
        if (rotatedX > 0) {
          enemy.onEnemyIsEat(xs, ys);
        }
      } else if (rotation >= 80 && rotation < 100) {
        if (rotatedY > 0) {
          enemy.onEnemyIsEat(xs, ys);
        }
      } else if (rotation >= 170 || rotation < -170) {
        if (rotatedX < 0) {
          enemy.onEnemyIsEat(xs, ys);
        }
      } else if (rotation >= -100 && rotation < -80) {
        if (rotatedY < 0) {
          enemy.onEnemyIsEat(xs, ys);
        }
      }
    }
    checkCollisionWithEnemyBosses() {
      const playerRadius = this._collisionRadius;
      const playerX = this.owner.x;
      const playerY = this.owner.y;
      for (let i = GameManager.getInstance().allEnemyBoss.length - 1; i >= 0; i--) {
        const enemyBoss = GameManager.getInstance().allEnemyBoss[i];
        if (enemyBoss.enemyStatus == "SLEEP" /* SLEEP */ || enemyBoss.owner.parent == null)
          continue;
        if (enemyBoss && enemyBoss.owner && !enemyBoss.isDead) {
          const enemyBossRadius = enemyBoss.fishConfigs.size.width / 2;
          const enemyBossX = enemyBoss.owner.x;
          const enemyBossY = enemyBoss.owner.y;
          const distance = new Point(playerX, playerY).distance(
            enemyBossX,
            enemyBossY
          );
          if (distance < playerRadius + enemyBossRadius) {
            this.handleCollisionWithEnemyBoss(enemyBoss);
          }
        }
      }
    }
    handleCollisionWithEnemyBoss(enemyBoss) {
      if (this.bEat) {
        if (enemyBoss.lv <= GameManager.getInstance().playerLevel) {
          GameManager.getInstance().onPlayerScoreUp(enemyBoss.killScore);
          const globalScale = MapMgr.Instance.globalScale;
          const scoreX = (enemyBoss.owner.x - this.owner.x) * globalScale + Laya.stage.width / 2;
          const scoreY = (enemyBoss.owner.y - this.owner.y) * globalScale + Laya.stage.height / 2;
          GameManager.getInstance().playScoreEffect(enemyBoss.killScore, {
            x: scoreX,
            y: scoreY
          });
          const rotation = this.box_spine.rotation;
          const deltaX = -40;
          const deltaY = 0;
          const theta = rotation * Math.PI / 180;
          const xs = this.player.x + deltaX * Math.cos(theta) - deltaY * Math.sin(theta);
          const ys = this.player.y + deltaX * Math.sin(theta) + deltaY * Math.cos(theta);
          const dx = enemyBoss.owner.x - this.owner.x;
          const dy = enemyBoss.owner.y - this.owner.y;
          const rotatedX = dx * Math.cos(-rotation * Math.PI / 180) - dy * Math.sin(-rotation * Math.PI / 180);
          const rotatedY = dx * Math.sin(-rotation * Math.PI / 180) + dy * Math.cos(-rotation * Math.PI / 180);
          if (rotation >= -10 && rotation < 10) {
            if (rotatedX > 0) {
              enemyBoss.onEnemyIsEat(xs, ys);
            }
          } else if (rotation >= 80 && rotation < 100) {
            if (rotatedY > 0) {
              enemyBoss.onEnemyIsEat(xs, ys);
            }
          } else if (rotation >= 170 || rotation < -170) {
            if (rotatedX < 0) {
              enemyBoss.onEnemyIsEat(xs, ys);
            }
          } else if (rotation >= -100 && rotation < -80) {
            if (rotatedY < 0) {
              enemyBoss.onEnemyIsEat(xs, ys);
            }
          }
        } else {
          this.playerMoveToBoss(enemyBoss.owner);
        }
      } else {
        if (enemyBoss.lv > GameManager.getInstance().playerLevel) {
          this.playerMoveToBoss(enemyBoss.owner);
        }
      }
    }
    checkCollisionWithProps() {
      const playerRadius = this._collisionRadius;
      const playerX = this.owner.x;
      const playerY = this.owner.y;
      for (let i = GameManager.getInstance().propArr.length - 1; i >= 0; i--) {
        const propScript = GameManager.getInstance().propArr[i];
        if (propScript && propScript.owner) {
          const propRadius = propScript.propConfigs.size / 2;
          const propX = propScript.owner.x;
          const propY = propScript.owner.y;
          const distance = new Point(playerX, playerY).distance(propX, propY);
          if (distance < playerRadius + propRadius) {
            this.handleCollisionWithProp(propScript);
          }
        }
      }
    }
    handleCollisionWithProp(prop) {
      GameManager.getInstance().gameStatus = 2 /* UP_LEVEL */;
      this.playAnimation("skill" /* skill */);
      const propConfigs = prop.propConfigs;
      if (propConfigs.type == 1 /* KILL_ENEMY_FISH_X2 */) {
        this.effect_skill.play("animation", false);
        this.effect_skill.owner.visible = true;
        GameManager.getInstance().onPlayerSkillEffect(300, true);
        this.playAnimation("skill" /* skill */, true);
        Laya.timer.once(1500, this, () => {
          console.log("propConfigs.type", propConfigs.type);
          GameManager.getInstance().flyToPlayer();
          SoundManager.getInstance().playSound("resources/sound/prop.mp3");
          this.effect_fly.play("2", true);
          this.effect_fly.owner.visible = true;
        });
      } else if (propConfigs.type == 2 /* KILL_ENEMY_FISH_X5 */) {
        GameManager.getInstance().onPlayerSkillEffect(1e3);
        this.effect_skill.play("animation", false);
        this.effect_skill.owner.visible = true;
        this.playAnimation("skill" /* skill */, true);
        Laya.timer.once(1500, this, () => {
          this.effect_fly.play("2", false);
          this.effect_fly.owner.visible = true;
          GameManager.getInstance().castSpiralSkill();
          SoundManager.getInstance().playSound("resources/sound/prop.mp3");
        });
      } else if (propConfigs.type == 3 /* KILL_ENEMY_FISH_CITIE */) {
        GameManager.getInstance().onPlayerSkillEffect(1e3);
        this.playAnimation("skill" /* skill */, true);
        this.effect_skill.play("animation", false);
        this.effect_skill.owner.visible = true;
        Laya.timer.once(1500, this, () => {
          this.effect_fly.play("2", false);
          this.effect_fly.owner.visible = true;
          GameManager.getInstance().castSpiralSkill();
          SoundManager.getInstance().playSound("resources/sound/prop.mp3");
        });
      } else if (propConfigs.type == 4 /* KILL_ENEMY_BOOM */) {
        FishRT.instance.box_other_map.visible = true;
        let otherMap = FishRT.instance.box_other_map;
        Laya.Tween.to(otherMap, { alpha: 1 }, 300, Laya.Ease.linearIn);
        this.effect_skill.play("animation", false);
        this.effect_skill.owner.visible = true;
        GameManager.getInstance().playBoom();
        GameManager.getInstance().bossBoom(3e3);
        GameManager.getInstance().gameStatus = 2 /* UP_LEVEL */;
        return;
      } else if (propConfigs.type == 5 /* KILL_ENEMY_FISH_X1 */) {
        GameManager.getInstance().gameStatus = 0 /* GAME_START */;
        prop.removeProp();
        return;
      } else if (propConfigs.type == 6 /* KILL_ENEMY_BOSS */) {
        this.showUpDown(500, true);
        GameManager.getInstance().killAllFish();
        this.effect_skill.play("animation", false);
        this.effect_skill.owner.visible = true;
        GameManager.getInstance().onPlayerLevelUp();
        Laya.timer.once(1e3, this, () => {
          this.addRoateProp();
          GameManager.getInstance().gameStatus = 0 /* GAME_START */;
        });
      } else if (propConfigs.type == 7 /* KILL_GAME_OVER */) {
        this.effect_skill.play("animation", false);
        this.effect_skill.owner.visible = true;
        GameManager.getInstance().gameIsOver = true;
        this.box_guide.visible = false;
        Laya.Tween.clearAll(this.img_guide);
        Laya.Tween.to(FishRT.instance.Root, { pivotX: this.player.x, pivotY: this.player.y }, 500);
        GameManager.getInstance().onPlayerLevelUp();
        this.box_roa && this.box_roa.removeSelf();
        this.box_roa && this.box_roa.destroy();
        Laya.timer.once(1500, this, () => {
          this.playerOver(propConfigs);
        });
      }
      GameManager.getInstance().destoryPropByLevel(prop.propConfigs.level);
    }
    playerOver(propConfigs) {
      return __async(this, null, function* () {
        let box = FishRT.instance.box_other_map.getChildAt(0);
        let block = box.getChildByName("box_right");
        let list = [];
        SoundManager.getInstance().playSound("resources/sound/wall_boom.mp3");
        for (let i = 0; i < block.numChildren; i++) {
          let image = block.getChildAt(i);
          image.scaleX;
          list.push(
            Awaiters.Seconds(Math.random()).then(() => {
              Laya.Tween.to(
                image,
                { y: image.y + 6e3, scaleX: 0, scaleY: 0 },
                1e3
              ).to;
            })
          );
        }
        yield Promise.all(list);
        Laya.timer.once(1500, this, () => {
          GameManager.getInstance().onGameWin();
        });
      });
    }
    hitWall(box_, img_map) {
      let count = box_.numChildren;
      for (let i = 0; i < count; i++) {
        let image = box_.getChildAt(i);
        let ys = image.y + 1e3 + Math.random() * 500;
        let time = Math.random() * 1e3 + 1500;
        Laya.Tween.to(image, { y: ys }, time);
      }
      Laya.timer.once(2e3, this, () => {
        box_.visible = false;
        img_map.visible = true;
      });
      Laya.timer.once(1e4, this, () => {
        GameManager.getInstance().onGameWin();
      });
    }
    showUpDown(time = 1e3, isLoop = true) {
      let spr = this.img_guide;
      Laya.Tween.clearAll(spr);
      let firstY = spr.y;
      Laya.Tween.to(
        spr,
        { y: firstY + 50 },
        time,
        Laya.Ease.sineIn,
        Laya.Handler.create(spr, () => {
          Laya.Tween.to(
            spr,
            { y: firstY },
            time,
            Laya.Ease.sineOut,
            Laya.Handler.create(spr, () => {
              if (isLoop) {
                this.showUpDown(time, isLoop);
              }
            })
          );
        })
      );
    }
  };
  __decorateClass([
    property3({ type: Laya.Spine2DRenderNode })
  ], Hero.prototype, "spine", 2);
  __decorateClass([
    property3({ type: Laya.Spine2DRenderNode })
  ], Hero.prototype, "effect_fly", 2);
  __decorateClass([
    property3({ type: Laya.Spine2DRenderNode })
  ], Hero.prototype, "effect_skill", 2);
  __decorateClass([
    property3({ type: Laya.Box })
  ], Hero.prototype, "box_spine", 2);
  __decorateClass([
    property3({ type: Laya.Image })
  ], Hero.prototype, "img_dead", 2);
  __decorateClass([
    property3({ type: Laya.Box })
  ], Hero.prototype, "box_guide", 2);
  __decorateClass([
    property3({ type: Laya.Image })
  ], Hero.prototype, "img_guide", 2);
  __decorateClass([
    property3({ type: Laya.Text })
  ], Hero.prototype, "txt_blood", 2);
  Hero = __decorateClass([
    regClass4("rSYDoeuLR5uK9Qg_vyS-eQ")
  ], Hero);

  // src/utils/BezierEasing.ts
  var _BezierEasing = class _BezierEasing {
    constructor(x1, y1, x2, y2) {
      if (!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)) {
        throw new Error("Bezier x values must be in [0, 1] range");
      }
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.sampleValues = new Float32Array(_BezierEasing.kSplineTableSize);
      for (let i = 0; i < _BezierEasing.kSplineTableSize; i++) {
        this.sampleValues[i] = this.calcBezier(i * _BezierEasing.kSampleStepSize, this.x1, this.x2);
      }
    }
    static A(a1, a2) {
      return 1 - 3 * a2 + 3 * a1;
    }
    static B(a1, a2) {
      return 3 * a2 - 6 * a1;
    }
    static C(a1) {
      return 3 * a1;
    }
    calcBezier(t, a1, a2) {
      return ((_BezierEasing.A(a1, a2) * t + _BezierEasing.B(a1, a2)) * t + _BezierEasing.C(a1)) * t;
    }
    getSlope(t, a1, a2) {
      return 3 * _BezierEasing.A(a1, a2) * t * t + 2 * _BezierEasing.B(a1, a2) * t + _BezierEasing.C(a1);
    }
    binarySubdivide(x, a, b) {
      let currentX, currentT;
      let i = 0;
      do {
        currentT = a + (b - a) / 2;
        currentX = this.calcBezier(currentT, this.x1, this.x2) - x;
        if (currentX > 0) {
          b = currentT;
        } else {
          a = currentT;
        }
      } while (Math.abs(currentX) > _BezierEasing.SUBDIVISION_PRECISION && ++i < _BezierEasing.SUBDIVISION_MAX_ITERATIONS);
      return currentT;
    }
    newtonRaphsonIterate(x, guessT) {
      for (let i = 0; i < _BezierEasing.NEWTON_ITERATIONS; i++) {
        const currentSlope = this.getSlope(guessT, this.x1, this.x2);
        if (currentSlope === 0)
          return guessT;
        const currentX = this.calcBezier(guessT, this.x1, this.x2) - x;
        guessT -= currentX / currentSlope;
      }
      return guessT;
    }
    getTForX(x) {
      let intervalStart = 0;
      let currentSample = 1;
      const lastSample = _BezierEasing.kSplineTableSize - 1;
      for (; currentSample !== lastSample && this.sampleValues[currentSample] <= x; ++currentSample) {
        intervalStart += _BezierEasing.kSampleStepSize;
      }
      --currentSample;
      const dist = (x - this.sampleValues[currentSample]) / (this.sampleValues[currentSample + 1] - this.sampleValues[currentSample]);
      const guessForT = intervalStart + dist * _BezierEasing.kSampleStepSize;
      const initialSlope = this.getSlope(guessForT, this.x1, this.x2);
      if (initialSlope >= _BezierEasing.NEWTON_MIN_SLOPE) {
        return this.newtonRaphsonIterate(x, guessForT);
      } else if (initialSlope === 0) {
        return guessForT;
      } else {
        return this.binarySubdivide(x, intervalStart, intervalStart + _BezierEasing.kSampleStepSize);
      }
    }
    getValue(x) {
      if (x === 0 || x === 1)
        return x;
      return this.calcBezier(this.getTForX(x), this.y1, this.y2);
    }
  };
  _BezierEasing.NEWTON_ITERATIONS = 4;
  _BezierEasing.NEWTON_MIN_SLOPE = 1e-3;
  _BezierEasing.SUBDIVISION_PRECISION = 1e-7;
  _BezierEasing.SUBDIVISION_MAX_ITERATIONS = 10;
  _BezierEasing.kSplineTableSize = 11;
  _BezierEasing.kSampleStepSize = 1 / (_BezierEasing.kSplineTableSize - 1);
  var BezierEasing = _BezierEasing;

  // src/manager/GameManager.ts
  var Point2 = Laya.Point;
  var Bezier = Laya.Bezier;
  var GameManager = class _GameManager {
    constructor() {
      /**
       * 处理鱼的整体缩放等
       * 如果升级，则需要做动画效果
       * 然后修改缩放的值
       */
      this.gameScale = 1;
      this.heroSafeDistance = 100;
      this.maxPlayerLevel = 5;
      this.playerLevel = 2;
      this.playerConfig = {
        2: {
          score: 2,
          skin: "8",
          prefab: "Hero"
        },
        3: {
          score: 610,
          skin: "7",
          prefab: "Hero_1"
        },
        4: {
          score: 43800,
          skin: "6",
          prefab: "Hero_2"
        },
        5: {
          score: 342600,
          skin: "5",
          prefab: "Hero_3"
        },
        6: {
          skin: "4",
          prefab: "Hero_4"
        },
        7: {
          skin: "3",
          prefab: "Hero_5"
        }
      };
      this.allEnemy = [];
      this.allEnemyBoss = [];
      this.gameIsOver = false;
      this.rangeSkill = 400 * 400;
      this.fishDistance = 50;
      this.objectScaleArr = [1.5, 1.5, 1.5, 1, 1.5];
      // mapScaleArr = [2, 2, 2, 1, 2]
      // playerScale = [1.5, 1.5, 1.5, 1, 1.5]
      // mapScaleArr = [8, 6, 4, 2, 1]
      // mapScaleArr = [9.00, 6.7, 5.1, 3.5, 2.25, 1.67]
      // mapScaleArr = [1.5, 0.468725, 0.14, 0.04, 0.03]
      this.mapScaleArr = [1.5, 0.468725, 0.14, 0.04, 0.03, 0.015];
      this.playerScale = [3.2, 6.122, 21.43, 28.58, 39.592];
      this.mapwid = 8e4;
      this.mapHei = 8e4;
      this.emenyCanUserAny = [];
      this.spiralDuration = 20;
      // 动画持续时间（毫秒）
      this.spiralRadius = 100;
      // 缓动函数 easeOutCubic
      this.playerScore = 2;
      this.propArr = [];
      this.gameStatus = 0 /* GAME_START */;
    }
    static getInstance() {
      if (!_GameManager.instance) {
        _GameManager.instance = new _GameManager();
      }
      return _GameManager.instance;
    }
    updateEnemyStatus() {
      let allEnemy = this.allEnemy;
      let len1 = allEnemy.length;
      for (let i = len1 - 1; i >= 0; i--) {
        const enemy = allEnemy[i];
        if (enemy.owner && enemy.owner.parent) {
          enemy.checkEnemyEnable();
        } else {
          if (enemy.isDead) {
            allEnemy.splice(i, 1);
          }
        }
      }
      let allEnemyBoss = this.allEnemyBoss;
      let len2 = allEnemyBoss.length;
      for (let i = len2 - 1; i >= 0; i--) {
        const enemy = allEnemyBoss[i];
        if (enemy.owner && enemy.owner.parent) {
          enemy.checkEnemyEnable();
        } else {
          if (enemy.isDead) {
            allEnemyBoss.splice(i, 1);
          }
        }
      }
    }
    onPlayerLevelUp() {
      return __async(this, null, function* () {
        this.playerLevel++;
        console.warn("playerLevel");
        let data = this.playerConfig[this.playerLevel];
        if (data && data.skin) {
          yield _GameManager.instance.playerScript.changeSkin(data.skin);
        }
        this.playerScript.setHeroState(1 /* Idle */);
        if (data && data.score)
          this.playerScore = data.score;
        let mapScale = this.mapScaleArr.shift();
        let playerScale = this.playerScale.shift();
        SoundManager.getInstance().playSound("resources/sound/up.mp3");
        Laya.Tween.to(
          this.player,
          { scaleX: playerScale, scaleY: playerScale },
          1e3,
          Laya.Ease.quartInOut,
          Laya.Handler.create(this, () => {
            _GameManager.instance.updateEnemysByLevel();
            MapMgr.Instance.globalScale = mapScale;
            CameraMgr.Inst.cameraScale(MapMgr.Instance.globalScale, 400);
            _GameManager.instance.heroSafeDistance = 100 / MapMgr.Instance.globalScale;
            _GameManager.instance.playerScript.onPlayerUp();
            _GameManager.getInstance().gameStatus = 0 /* GAME_START */;
          })
        );
      });
    }
    updateEnemysByLevel() {
      this.allEnemy.forEach((enemy) => {
        if (enemy.owner && enemy.owner.parent == null) {
          if (enemy.fishConfigs.fishInfo.level == this.playerLevel) {
            FishRT.instance.box_enemy.addChildAt(enemy.owner, 0);
          }
        }
      });
      this.allEnemyBoss.forEach((enemyBoss) => {
        if (enemyBoss.owner && enemyBoss.owner.parent == null) {
          if (enemyBoss.fishConfigs.fishInfo.level == this.playerLevel + 1) {
            FishRT.instance.box_enemy_boss.addChildAt(enemyBoss.owner, 0);
          }
        }
      });
    }
    destoryAllFish() {
      this.allEnemy.forEach((enemy) => {
        enemy.owner && enemy.owner.destroy(true);
      });
      this.allEnemyBoss.forEach((enemy) => {
        enemy.owner && enemy.owner.destroy(true);
      });
      this.allEnemy.length = 0;
      this.allEnemyBoss.length = 0;
    }
    getRandomElements(arr, count) {
      if (count > arr.length) {
        throw new Error("指定数量超过数组长度");
      }
      let result = [];
      for (let i = 0; i < count; i++) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        result.push(arr[randomIndex]);
      }
      return result;
    }
    bossBoom(fishDistance) {
      let allEnemyBoss = this.allEnemyBoss;
      let allCanBoomBossEnemy = allEnemyBoss.filter((enemy) => enemy.lv <= 5);
      let boomBossEnemy = this.getRandomElements(allCanBoomBossEnemy, 10);
      let len = boomBossEnemy.length;
      boomBossEnemy.forEach((enemy, index) => {
        enemy.enemyStatus = "SLEEP" /* SLEEP */;
        let delay = 200 * index;
        Laya.timer.once(delay, enemy, () => {
          enemy.setColliderEnable(false);
          enemy.setEnemyDisableDraw(false);
          enemy.playBoomEffect();
        });
      });
      Laya.timer.once(len * 200 + 500, this, () => {
        _GameManager.getInstance().flyToPlayer2();
        SoundManager.getInstance().playSound("resources/sound/prop.mp3");
      });
    }
    flyToPlayer2() {
      const playerPos = { x: this.player.x, y: this.player.y };
      let len = this.emenyCanUserAny.length;
      let count = 0;
      if (len == 0) {
        this.onPlayerLevelUp();
        return;
      }
      for (let i = 0; i < len; i++) {
        const element = this.emenyCanUserAny[i];
        element.enemyChangeScoreFlyToPos(playerPos.x, playerPos.y, null);
      }
      Laya.timer.once(1500, this, () => {
        this.emenyCanUserAny.length = 0;
        this.killAllFish();
        this.onPlayerLevelUp();
      });
    }
    onPlayerSkillEffect(fishDistance, changeScore = false) {
      if (fishDistance == null) {
        fishDistance = this.fishDistance;
      }
      let allEnemy = this.checkEnemyByDistance(this.allEnemy, fishDistance, this.player);
      for (let i = 0; i < allEnemy.length; i++) {
        const enemy = allEnemy[i];
        if (enemy.lv >= this.playerLevel)
          continue;
        if (changeScore) {
          enemy.changeScore();
        } else
          enemy.backward();
        this.emenyCanUserAny.push(enemy);
      }
      let allEnemyBoss = this.checkEnemyByDistance(
        this.allEnemyBoss,
        this.fishDistance,
        this.player
      );
      for (let i = 0; i < allEnemyBoss.length; i++) {
        const element = allEnemyBoss[i];
        if (element.enemyStatus == "SLEEP" /* SLEEP */)
          continue;
        element.backward();
      }
    }
    flyToPlayer() {
      const playerPos = { x: this.player.x, y: this.player.y };
      let len = this.emenyCanUserAny.length;
      let count = 0;
      if (len == 0) {
        this.onPlayerLevelUp();
        return;
      }
      for (let i = 0; i < len; i++) {
        const element = this.emenyCanUserAny[i];
        element.enemyChangeScoreFlyToPos(playerPos.x, playerPos.y, () => {
          count++;
          if (count >= len) {
            this.emenyCanUserAny.length = 0;
            this.killAllFish();
            this.onPlayerLevelUp();
          }
        });
      }
    }
    killAllFish() {
      let len = this.allEnemy.length;
      for (let i = len - 1; i >= 0; i--) {
        let enemy = this.allEnemy[i];
        if (enemy.lv < this.playerLevel) {
          enemy.setComponentsEnable(false);
          enemy.isDead = true;
          enemy.killOwner();
          this.allEnemy.splice(i, 1);
        }
      }
      len = this.allEnemyBoss.length;
      for (let i = len - 1; i >= 0; i--) {
        let enemy = this.allEnemyBoss[i];
        if (enemy.lv <= this.playerLevel) {
          enemy.setComponentsEnable(false);
          enemy.isDead = true;
          enemy.killOwner();
          this.allEnemyBoss.splice(i, 1);
        }
      }
    }
    /**
     * 通过距离筛选敌人
     * @param enemys
     * @param distance
     */
    checkEnemyByDistance(enemys, distance = 100, player) {
      return enemys.filter((enemy) => {
        const dx = enemy.owner.x - player.x;
        const dy = enemy.owner.y - player.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared <= distance * distance) {
          enemy.dis = distanceSquared;
          return true;
        } else {
          return false;
        }
      });
    }
    /**
     * 释放技能 螺旋收鱼
     */
    castSpiralSkill() {
      const playerPos = { x: this.player.x, y: this.player.y };
      const totalDuration = this.spiralDuration;
      const enemies = this.emenyCanUserAny.filter(
        (enemy) => enemy.lv <= this.playerLevel
      );
      let len = enemies.length;
      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        if (!enemy)
          continue;
        enemy.destroyAllCollider();
        let distance = Math.sqrt(
          Math.pow(this.player.x - enemy.owner.x, 2) + Math.pow(this.player.y - enemy.owner.y, 2)
        );
        let delay = distance / 1e3 * MapMgr.Instance.globalScale;
        enemy.onSkill(delay, distance);
      }
      Laya.timer.once(1500, this, () => {
        this.killAllFish();
        this.onPlayerLevelUp();
      });
    }
    spiralMoveToTarget(enemy, targetPos, delay, spiralIndex, totalDuration) {
      const initialRadius = this.spiralRadius;
      const angleOffset = spiralIndex === 0 ? 0 : Math.PI;
      let time = 0;
      Laya.timer.once(delay, enemy, () => {
        this.absorbEnemy2D(enemy, this.player);
      });
    }
    // 贝塞尔曲线计算函数
    bezierThree(t, start, control1, control2, end) {
      let x = Math.pow(1 - t, 3) * start.x + 3 * Math.pow(1 - t, 2) * t * control1.x + 3 * (1 - t) * Math.pow(t, 2) * control2.x + Math.pow(t, 3) * end.x;
      let y = Math.pow(1 - t, 3) * start.y + 3 * Math.pow(1 - t, 2) * t * control1.y + 3 * (1 - t) * Math.pow(t, 2) * control2.y + Math.pow(t, 3) * end.y;
      return new Laya.Vector2(x, y);
    }
    bezierTwo(t, start, control1, end) {
      let x = Math.pow(1 - t, 2) * start.x + 2 * (1 - t) * t * control1.x + Math.pow(t, 2) * end.x;
      let y = Math.pow(1 - t, 2) * start.y + 2 * (1 - t) * t * control1.y + Math.pow(t, 2) * end.y;
      return new Laya.Vector2(x, y);
    }
    enemyMoveByBesir(enemy, targetPos) {
      let startPoint = new Laya.Point(enemy.x, enemy.y);
      let duration = 400;
      let startTime = Date.now();
      const easing = new BezierEasing(0.57, 0, 0.85, 0);
      Laya.timer.frameLoop(1, enemy, () => {
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = easing.getValue(t);
        const currentX = Laya.MathUtil.lerp(startPoint.x, targetPos.x, easedT);
        const currentY = Laya.MathUtil.lerp(startPoint.y, targetPos.y, easedT);
        enemy.pos(currentX, currentY);
        enemy.scaleX -= 0.05;
        enemy.scaleY -= 0.05;
        if (t >= 1) {
          Laya.timer.clearAll(enemy);
          enemy.removeSelf();
        }
      });
    }
    // ... (假设你已经有了主角 player 和小兵 enemy 的 Sprite 对象)
    absorbEnemy2D(enemy, player) {
      const startPos = new Point2(enemy.x, enemy.y);
      const endPos = new Point2(player.x, player.y);
      const dx = endPos.x - startPos.x;
      const dy = endPos.y - startPos.y;
      const controlPoint1 = new Point2(
        startPos.x + dx * 0.3 + dx * 0.5,
        // 垂直偏移增加
        startPos.y + dy * 0.3 + dy * 0.5
      );
      const controlPoint2 = new Point2(
        startPos.x + dx * 0.7 + dx * 0.3,
        // 垂直偏移减少
        startPos.y + dy * 0.7 + dy * 0.3
      );
      const bezier = new Bezier();
      const bezierPoints = bezier.getBezierPoints(
        [
          startPos.x,
          startPos.y,
          controlPoint1.x,
          controlPoint1.y,
          controlPoint2.x,
          controlPoint2.y,
          endPos.x,
          endPos.y
        ],
        20,
        // 调整插值点数量
        3
        // 三次贝塞尔曲线
      );
      Laya.timer.frameLoop(1, enemy, () => {
        let position1 = bezierPoints.shift();
        let position2 = bezierPoints.shift();
        if (position1 && position2) {
          enemy.scaleX -= 0.05;
          enemy.scaleY -= 0.05;
          enemy.pos(position1, position2);
        }
        if (position1 == null) {
          Laya.timer.clearAll(enemy);
          enemy.removeSelf();
          return;
        }
      });
    }
    onPlayerScoreUp(score) {
      this.playerScore += score;
    }
    playScoreEffect(score, pos) {
      let img_score = Laya.Pool.getItemByClass(
        "img_socre",
        Laya.Image
      );
      img_score.skin = `resources/num/score_${score}.png`;
      img_score.scale(1, 1);
      img_score.alpha = 1;
      img_score.pos(pos.x, pos.y);
      FishRT.instance.box_effect.addChild(img_score);
      Laya.Tween.to(
        img_score,
        { y: pos.y - 100, scaleX: 0.1, scaleY: 0.1, alpha: 0 },
        1e3,
        Laya.Ease.linearIn,
        Laya.Handler.create(this, () => {
          Laya.Pool.recover("img_socre", img_score);
          img_score.removeSelf();
        })
      );
    }
    /**创建加分特效 */
    playScoreEffect1(score, pos, index, len) {
      let img_score = Laya.Pool.getItemByClass(
        "img_socre",
        Laya.Image
      );
      img_score.skin = `resources/num/score_${score}.png`;
      img_score.scale(1, 1);
      img_score.alpha = 1;
      img_score.pos(pos.x, pos.y);
      FishRT.instance.box_effect.addChild(img_score);
      let num = index / len;
      if (num <= 0.25) {
        num = 0.25;
      } else if (num <= 0.5) {
        num = 0.5;
      } else if (num <= 0.75) {
        num = 0.75;
      } else {
        num = 1;
      }
      let tweenTime = 600 * num;
      Laya.Tween.to(
        img_score,
        { y: pos.y - 100, scaleX: 0.1, scaleY: 0.1, alpha: 0 },
        tweenTime,
        Laya.Ease.linearIn,
        Laya.Handler.create(this, () => {
          Laya.Pool.recover("img_socre", img_score);
          img_score.removeSelf();
        })
      );
    }
    generateFishConfig(fishTypes, initialRadius = 40, center = { x: 0, y: 0 }, flagdis = 0) {
      const config = { fish: [] };
      let currentRadius = initialRadius;
      let layerCounter = 1;
      for (let typeIndex = 0; typeIndex < fishTypes.length; typeIndex++) {
        const currentType = fishTypes[typeIndex][0];
        const aTypeLayers = currentType.aTypeLayers || 1;
        const fishSize = currentType.size;
        const fishDiameter = fishSize;
        const moreRidus = currentType.ridus || 0;
        const layerGap = currentType.name === "yellowFish" ? fishDiameter : 0;
        for (let aLayer = 0; aLayer < aTypeLayers; aLayer++) {
          const radius = currentRadius + fishDiameter + (aLayer != 0 && currentType.prefab == "EnemyBoss4" ? 2500 : 0);
          const circumference = 2 * Math.PI * radius;
          let count = Math.floor(circumference / fishDiameter);
          count = Math.max(count, 8);
          count = Math.min(count, 64);
          const positions = [];
          const angleStep = 360 / count;
          for (let i = 0; i < count; i++) {
            const angle = angleStep * i * Math.PI / 180;
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
            positions.push({ x: Math.round(x), y: Math.round(y) });
          }
          config.fish.push({
            layer: layerCounter++,
            type: currentType.name,
            count,
            size: {
              width: Math.round(fishSize),
              height: Math.round(fishSize)
            },
            radius,
            positions,
            fishInfo: currentType
          });
          currentRadius = radius;
        }
        currentRadius += flagdis;
      }
      return config;
    }
    createConfigs() {
      return this.generateFishConfig(FishConfigs.fishConfigs, 40, {
        x: 39960,
        y: 39960
      });
    }
    updatePorpArr() {
      let propArr = _GameManager.getInstance().propArr;
      let len = propArr.length;
      for (let i = len - 1; i >= 0; i--) {
        let prop = propArr[i];
        if (prop.propConfigs.level < this.playerLevel) {
          prop.onOpenAni();
        } else {
          prop.closeAni();
        }
      }
    }
    destoryPropByLevel(level) {
      let propArr = _GameManager.getInstance().propArr;
      let len = propArr.length;
      for (let i = len - 1; i >= 0; i--) {
        let prop = propArr[i];
        if (prop.propConfigs.level == level) {
          prop.enabled = false;
          prop.owner.removeSelf();
          prop.owner && prop.owner.destroy(true);
          propArr.splice(i, 1);
        }
      }
    }
    playBoom() {
      let propArr = _GameManager.getInstance().propArr;
      let len = propArr.length;
      let propNewArr = [];
      for (let i = len - 1; i >= 0; i--) {
        let prop = propArr[i];
        if (prop.propConfigs.level == 3) {
          propArr.splice(i, 1);
          propNewArr.push(prop);
        }
      }
      for (let i = 0; i < propNewArr.length; i++) {
        const prop = propNewArr[i];
        this.destoryBoomAroundFish(prop, i * 500);
      }
      propNewArr.length = 0;
    }
    destoryBoomAroundFish(prop, delay) {
      Laya.timer.once(delay, this, () => {
        prop.playEffectBoom();
        SoundManager.getInstance().playSound("resources/sound/boom.mp3");
        this.getAroundFish(
          { x: prop.owner.x, y: prop.owner.y },
          prop.propConfigs.size
        );
      });
    }
    getAroundFish(pos, distacne) {
      let allEnemy = _GameManager.instance.allEnemy;
      allEnemy.forEach((enemy) => {
        const dx = enemy.owner.x - pos.x;
        const dy = enemy.owner.y - pos.y;
        const distanceSquared = dx * dx + dy * dy;
        const sumOfRadiiSquared = distacne * distacne;
        if (distanceSquared < sumOfRadiiSquared) {
          if (!enemy.isDead) {
            enemy.changeScore();
            enemy.isDead = true;
            this.emenyCanUserAny.push(enemy);
          }
        }
      });
    }
    destoryAllEnemyComps() {
      this.allEnemy.forEach((enemy) => {
        enemy.destroyAllComponents();
      });
      this.allEnemyBoss.forEach((enemy) => {
        enemy.destroyAllComponents();
      });
    }
    onGameOver() {
      console.log("onGameOver");
      if (wx) {
        wx.notifyMiniProgramPlayableStatus({
          isEnd: true
        });
      }
    }
    checkCircleCollision(fish1, fish2) {
      const dx = fish1.x - fish2.x;
      const dy = fish1.y - fish2.y;
      const distanceSquared = dx * dx + dy * dy;
      const sumOfRadiiSquared = (fish1.radius + fish2.radius) * (fish1.radius + fish2.radius);
      return distanceSquared < sumOfRadiiSquared;
    }
    onGameWin() {
      console.log("游戏胜利");
      if (wx) {
        wx.notifyMiniProgramPlayableStatus({
          isEnd: true
        });
      }
    }
    onGameFail() {
      console.log("游戏失败");
      if (wx) {
        wx.notifyMiniProgramPlayableStatus({
          isEnd: true
        });
      }
    }
  };

  // src/manager/CameraMgr.ts
  var CameraMgr = class _CameraMgr {
    constructor() {
      this._tweenS = 0.5;
      //地图缓动系数
      this._tweenA = 2;
      //多少像素内强制校准
      this._looklock = false;
    }
    static get Inst() {
      if (_CameraMgr._INST == null) {
        _CameraMgr._INST = new _CameraMgr();
      }
      return _CameraMgr._INST;
    }
    Init(root) {
      root.scale(MapMgr.Instance.globalScale, MapMgr.Instance.globalScale);
      this._root = root;
      this._quakeRoot = this._root.getChildByName("bg");
      this._decPoint = new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2);
      this._rangeRect = new Laya.Rectangle(this._decPoint.x, this._decPoint.y, this._root.width - this._decPoint.x, this._root.height - this._decPoint.y);
      this._viewPortRect = new Laya.Rectangle();
      this._looklock = false;
    }
    /**
     * 镜头推拉
     * from&to:0~2 原始大小为1
     * 
     */
    PullPush(from, to) {
      Laya.Tween.clearAll(this._root);
      this._root.scale(from, from);
      this._looklock = true;
      Laya.Tween.to(this._root, {
        scaleX: to,
        scaleY: to
      }, 500, null, Laya.Handler.create(this, () => {
        this._looklock = false;
      }));
    }
    /**
     * 镜头缩放
     * @param scaleTarget 目标缩放值
     * @param time 时间
     */
    cameraScale(scaleTarget, time) {
      Laya.Tween.clearAll(this._root);
      this._looklock = true;
      Laya.Tween.to(this._root, {
        scaleX: scaleTarget,
        scaleY: scaleTarget
      }, time, null, Laya.Handler.create(this, () => {
        this._looklock = false;
      }));
    }
    Quake() {
      Laya.Tween.clearAll(this._quakeRoot);
      this._quakeRoot.x = this._quakeRoot.y = 0;
      let timeline = new Laya.TimeLine();
      timeline.to(this._quakeRoot, { x: -5, y: 5 }, 40).to(this._quakeRoot, { x: 5, y: -5 }, 20).to(this._quakeRoot, { x: 0, y: 0 }, 10);
      timeline.play();
    }
    Quake2() {
      Laya.Tween.clearAll(this._quakeRoot);
      this._quakeRoot.x = this._quakeRoot.y = 0;
      let timeline = new Laya.TimeLine();
      timeline.to(this._quakeRoot, { x: -8, y: 8 }, 40).to(this._quakeRoot, { x: 8, y: -8 }, 20).to(this._quakeRoot, { x: 0, y: 0 }, 10);
      timeline.play();
    }
    /**
     * 后坐力抖动 
     * faceto:面向
     * range:抖动幅度
    */
    BackQuack(faceto, range, time) {
      Laya.Tween.clearAll(this._quakeRoot);
      this._quakeRoot.x = this._quakeRoot.y = 0;
      let angle = faceto + Math.PI;
      let tox = range * Math.cos(angle);
      let toy = range * Math.sin(angle);
      let timeline = new Laya.TimeLine();
      timeline.to(this._quakeRoot, { x: tox, y: toy }, time).to(this._quakeRoot, { x: 0, y: 0 }, time);
      timeline.play();
    }
    LookAt(tox, toy) {
      if (this._looklock) {
        return;
      }
      this._root.pivot(tox, toy);
      this._root.x = this._decPoint.x;
      this._root.y = this._decPoint.y;
      this.rangeCheck();
    }
    GetViewPortRect() {
      this._viewPortRect.x = this._root.pivotX - this._decPoint.x;
      this._viewPortRect.y = this._root.pivotY - this._decPoint.y;
      this._viewPortRect.width = Laya.stage.width;
      this._viewPortRect.height = Laya.stage.height;
      return this._viewPortRect;
    }
    rangeCheck() {
      let scale = MapMgr.Instance.globalScale;
      const mapWidth = GameManager.getInstance().mapwid;
      const mapHeight = GameManager.getInstance().mapHei;
      const screenWidth = Laya.stage.width;
      const screenHeight = Laya.stage.height;
      const scaledWidth = screenWidth / scale;
      const scaledHeight = screenHeight / scale;
      const left = scaledWidth / 2;
      const top = scaledHeight / 2;
      const right = mapWidth - scaledWidth / 2;
      const bottom = mapHeight - scaledHeight / 2;
      let player = GameManager.getInstance().player;
      this._root.pivotX = player.x;
      this._root.pivotY = player.y;
      if (this._root.pivotX < left) {
        this._root.pivotX = left;
      } else if (this._root.pivotX > right) {
        this._root.pivotX = right;
      }
      if (this._root.pivotY < top) {
        this._root.pivotY = top;
      } else if (this._root.pivotY > bottom) {
        this._root.pivotY = bottom;
      }
    }
    lookAtOtherPos(x, y) {
      let scale = MapMgr.Instance.globalScale;
      const mapWidth = GameManager.getInstance().mapwid;
      const mapHeight = GameManager.getInstance().mapHei;
      const screenWidth = Laya.stage.width;
      const screenHeight = Laya.stage.height;
      const scaledWidth = (screenWidth - 210) / scale;
      const scaledHeight = (screenHeight - 210) / scale;
      const left = scaledWidth / 2;
      const top = scaledHeight / 2;
      const right = mapWidth - scaledWidth / 2;
      const bottom = mapHeight - scaledHeight / 2;
      this._root.pivotX = x;
      this._root.pivotY = y;
      if (this._root.pivotX < left) {
        this._root.pivotX = left;
      } else if (this._root.pivotX > right) {
        this._root.pivotX = right;
      }
      if (this._root.pivotY < top) {
        this._root.pivotY = top;
      } else if (this._root.pivotY > bottom) {
        this._root.pivotY = bottom;
      }
    }
    updateCamera() {
      const screenWidth = Laya.stage.width;
      const screenHeight = Laya.stage.height;
      let player = GameManager.getInstance().player;
      let root = FishRT.instance.Root;
      let playerPosInRoot = { x: player.x, y: player.y };
      let offsetX = screenWidth / 2 - playerPosInRoot.x * root.scaleX;
      let offsetY = screenHeight / 2 - playerPosInRoot.y * root.scaleY;
      const rootAnchorX = 0;
      const rootAnchorY = 0;
      const scaledWidth = root.width * root.scaleX;
      const scaledHeight = root.height * root.scaleY;
      const minOffsetX = screenWidth - scaledWidth + rootAnchorX * root.scaleX;
      const maxOffsetX = rootAnchorX * root.scaleX;
      const minOffsetY = screenHeight - scaledHeight + rootAnchorY * root.scaleY;
      const maxOffsetY = rootAnchorY * root.scaleY;
      offsetX = Math.max(minOffsetX, Math.min(offsetX, maxOffsetX));
      offsetY = Math.max(minOffsetY, Math.min(offsetY, maxOffsetY));
      root.pos(offsetX, offsetY);
    }
  };

  // src/prefab/Enemy.ts
  var { regClass: regClass5, property: property4 } = Laya;
  var Enemy = class extends EnemyBase {
    constructor() {
      super();
      this.box_spine = null;
      this.img_score = null;
      this.backTimeDt = 0;
      this.backTimeTotal = 800;
      this.dis = 0;
      this.tween = null;
    }
    onEnable() {
      this.setNormalFilter();
      this.img_score.visible = false;
      this.player = GameManager.getInstance().player;
    }
    onUpdate() {
      super.onUpdate();
      if (this.isDead) {
        return;
      }
      if (this.backTimeDt > 0) {
        this.backTimeDt -= Laya.timer.delta;
        this.moveToBack();
        if (this.backTimeDt <= 0) {
          this.backTimeDt = 0;
        }
      } else {
        this.backTimeDt = 0;
        this.moveToPlayer();
      }
    }
    moveToPlayer() {
      if (GameManager.getInstance().gameStatus == 2 /* UP_LEVEL */)
        return;
      if (this.enemyStatus !== "ACTIVE" /* ACTIVE */ || this.isDead) {
        return;
      }
      if (this.lv >= GameManager.getInstance().playerLevel)
        return;
      const targetX = FishRT.instance.Hero.x;
      const targetY = FishRT.instance.Hero.y;
      const currentX = this.owner.x;
      const currentY = this.owner.y;
      const dxToPlayer = targetX - currentX;
      const dyToPlayer = targetY - currentY;
      const distanceToPlayer = Math.sqrt(dxToPlayer * dxToPlayer + dyToPlayer * dyToPlayer);
      const safeDistance = this.fishConfigs.size.width + GameManager.getInstance().heroSafeDistance;
      let angle = Math.atan2(dyToPlayer, dxToPlayer);
      this.angle = angle;
      let direct = angle / Math.PI * 180;
      this.box_spine.rotation = 180 + direct;
      if (distanceToPlayer > safeDistance) {
        let moveX = dxToPlayer / distanceToPlayer;
        let moveY = dyToPlayer / distanceToPlayer;
        let avoidanceX = 0;
        let avoidanceY = 0;
        let hasAvoidance = false;
        let otherEnemies = GameManager.getInstance().allEnemy;
        const comfortDistanceFactor = 1.2;
        for (const otherEnemy of otherEnemies) {
          if (otherEnemy.fishConfigs.fishInfo.level != this.fishConfigs.fishInfo.level)
            continue;
          if (otherEnemy === this)
            continue;
          const otherX = otherEnemy.owner.x;
          const otherY = otherEnemy.owner.y;
          const dxOther = otherX - currentX;
          const dyOther = otherY - currentY;
          const distanceToOther = Math.sqrt(dxOther * dxOther + dyOther * dyOther);
          const combinedRadius = this.fishConfigs.size.width / 2 + otherEnemy.fishConfigs.size.width / 2;
          if (distanceToOther < combinedRadius * comfortDistanceFactor) {
            hasAvoidance = true;
            const avoidanceStrength = 1 - distanceToOther / (combinedRadius * comfortDistanceFactor);
            avoidanceX -= dxOther / distanceToOther * avoidanceStrength;
            avoidanceY -= dyOther / distanceToOther * avoidanceStrength;
          }
        }
        if (hasAvoidance) {
          moveX += avoidanceX;
          moveY += avoidanceY;
        }
        const moveMagnitude = Math.sqrt(moveX * moveX + moveY * moveY);
        if (moveMagnitude > 0) {
          moveX /= moveMagnitude;
          moveY /= moveMagnitude;
        }
        const smoothingFactor = 0.1;
        this.owner.x += (moveX * this.speed - (this.owner.x - currentX)) * smoothingFactor;
        this.owner.y += (moveY * this.speed - (this.owner.y - currentY)) * smoothingFactor;
      }
    }
    moveToHero() {
      if (GameManager.getInstance().gameStatus == 2 /* UP_LEVEL */)
        return;
      if (this.enemyStatus == "ACTIVE" /* ACTIVE */ && !this.isDead) {
        if (this.lv < GameManager.getInstance().playerLevel) {
          let heroPosX = FishRT.instance.Hero.x;
          let heroPosY = FishRT.instance.Hero.y;
          let dx = heroPosX - this.owner.x;
          let dy = heroPosY - this.owner.y;
          let angle = Math.atan2(dy, dx);
          this.angle = angle;
          let direct = angle / Math.PI * 180;
          this.box_spine.rotation = 180 + direct;
          let configSpeed = this.fishConfigs.fishInfo.speed;
          let speed = this.speed + Math.random() * configSpeed;
          let xspeed = Math.cos(angle) * speed * Laya.timer.delta / 1e3;
          let yspeed = Math.sin(angle) * speed * Laya.timer.delta / 1e3;
        }
      }
    }
    checkeAllEnemy() {
      let allEnemy = GameManager.getInstance().allEnemy;
      this.resolveCollisions(allEnemy);
    }
    calculateCollisionAdjustment(nearbyFishes) {
      let adjustX = 0;
      let adjustY = 0;
      for (const otherFish of nearbyFishes) {
        if (otherFish !== this && otherFish.owner) {
          const distance = new Laya.Point(this.owner.x, this.owner.y).distance(otherFish.owner.x, otherFish.owner.y);
          const minDistance = this.separationDistance;
          if (distance < minDistance) {
            const diffX = this.owner.x - otherFish.owner.x;
            const diffY = this.owner.y - otherFish.owner.y;
            const angle = Math.atan2(diffY, diffX);
            const pushOutDistance = minDistance - distance;
            adjustX += Math.cos(angle) * pushOutDistance * this.collisionAvoidanceFactor;
            adjustY += Math.sin(angle) * pushOutDistance * this.collisionAvoidanceFactor;
          }
        }
      }
      return new Laya.Point(adjustX, adjustY);
    }
    getNearbyFishes(radius) {
      const nearbyFishes = [];
      for (const otherFish of GameManager.getInstance().allEnemy) {
        if (otherFish !== this && otherFish.owner && !otherFish.isImmobilized) {
          const distance = new Laya.Point(this.owner.x, this.owner.y).distance(otherFish.owner.x, otherFish.owner.y);
          if (distance < radius) {
            nearbyFishes.push(otherFish);
          }
        }
      }
      return nearbyFishes;
    }
    calculateAlignmentAdjustment(nearbyFishes) {
      if (nearbyFishes.length === 0 || this.isImmobilized)
        return new Laya.Point(0, 0);
      let avgDx = 0;
      let avgDy = 0;
      for (const fish of nearbyFishes) {
        avgDx += fish.owner.x - this.owner.x;
        avgDy += fish.owner.y - this.owner.y;
      }
      avgDx /= nearbyFishes.length;
      avgDy /= nearbyFishes.length;
      const magnitude = Math.sqrt(avgDx * avgDx + avgDy * avgDy);
      if (magnitude > 0) {
        avgDx /= magnitude;
        avgDy /= magnitude;
      }
      return new Laya.Point(avgDx * this.alignmentFactor, avgDy * this.alignmentFactor);
    }
    changeScore() {
      if (this.backTimeDt > 0)
        return;
      this.backTimeDt = this.backTimeTotal;
      if (this.img_score) {
        this.img_score.visible = true;
      }
      if (this.box_spine) {
        this.box_spine.removeSelf();
        this.spine && this.spine.stop();
      }
    }
    backward() {
      if (this.backTimeDt > 0)
        return;
      this.backTimeDt = this.backTimeTotal;
      if (this.lv < GameManager.getInstance().playerLevel) {
        this.setWhiteFilter();
      }
    }
    moveToBack() {
      const heroPosX = FishRT.instance.Hero.x;
      const heroPosY = FishRT.instance.Hero.y;
      const dx = heroPosX - this.owner.x;
      const dy = heroPosY - this.owner.y;
      const angle = Math.atan2(dy, dx);
      this.angle = angle;
      const xspeed = Math.cos(angle) * this.backSpeed * Laya.timer.delta / 1e3;
      const yspeed = Math.sin(angle) * this.backSpeed * Laya.timer.delta / 1e3;
      this.owner.x -= xspeed;
      this.owner.y -= yspeed;
    }
    /**
     * 设置白色滤镜
     */
    setWhiteFilter() {
      const colorFilter = new Laya.ColorFilter([
        1,
        0,
        0,
        0,
        255,
        0,
        1,
        0,
        0,
        255,
        0,
        0,
        1,
        0,
        255,
        0,
        0,
        0,
        1,
        0
      ]);
      this.owner && (this.owner.filters = [colorFilter]);
    }
    /**
     * 设置普通滤镜
     */
    setNormalFilter() {
      this.owner.filters = null;
    }
    onDisable() {
      Laya.Pool.recover(`enemy_${this.lv}`, this.owner);
    }
    enemyChangeScoreFlyToPos(xs, ys, callback) {
      if (this.tween) {
        callback && callback();
        return;
      }
      const owner = this.owner;
      if (this.img_score) {
        this.img_score.visible = true;
      }
      const startX = owner.x;
      const startY = owner.y;
      const distance = Math.sqrt(Math.pow(xs - startX, 2) + Math.pow(ys - startY, 2));
      const speed = 800 + Math.random() * 200;
      let minDuration = 500 + Math.random() * 500;
      let duration = distance / speed * 1e3;
      duration = Math.min(duration, minDuration);
      this.tween = Laya.Tween.to(owner, { scaleX: 0, scaleY: 0, x: xs, y: ys }, duration, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
        owner.removeSelf();
        callback && callback();
      }));
    }
    onEnemyIsEatByBoss(xs, ys) {
      const owner = this.owner;
      Laya.Tween.to(owner, { scaleX: 0, scaleY: 0, x: xs, y: ys }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
        owner.removeSelf();
      }));
    }
  };
  __decorateClass([
    property4({ type: Laya.Box })
  ], Enemy.prototype, "box_spine", 2);
  __decorateClass([
    property4({ type: Laya.Image })
  ], Enemy.prototype, "img_score", 2);
  Enemy = __decorateClass([
    regClass5("rjprm3uYTDWC4FKDMtZmJA")
  ], Enemy);

  // src/manager/AniManager.ts
  var AniManager = class _AniManager {
    static getInstance() {
      if (!_AniManager.instance) {
        _AniManager.instance = new _AniManager();
      }
      return _AniManager.instance;
    }
    onRoatationSprite(sprite) {
      Laya.Tween.to(sprite, { rotation: sprite.rotation + 360 }, 1e3, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
        sprite.rotation = 0;
        this.onRoatationSprite(sprite);
      }));
    }
    onRoatationSpriteByTime(sprite, addRoa = 20) {
      Laya.timer.frameLoop(1, sprite, () => {
        sprite.rotation = sprite.rotation + addRoa;
      });
    }
  };

  // src/prefab/Prop.ts
  var { regClass: regClass6, property: property5 } = Laya;
  var Prop = class extends Laya.Script {
    constructor() {
      super(...arguments);
      this.prop_light = null;
      this.prop_star = null;
      this.prop_type = null;
      this.effect_boom = null;
      this.propConfigs = null;
      this.aniIsOpen = false;
    }
    playEffectBoom() {
      if (this.effect_boom) {
        this.effect_boom.owner.visible = true;
        this.effect_boom.play("3", false);
        this.effect_boom.owner.on(Laya.Event.END, this, this.onPlayBoomEnd);
      }
    }
    onPlayBoomEnd() {
      this.owner.removeSelf();
      this.owner.destroy(true);
    }
    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake() {
    }
    // 组件被启用后执行，例如节点被添加到舞台后
    onEnable() {
      this.initPropConfig();
    }
    initPropConfig(propConfigs) {
      if (propConfigs) {
        this.propConfigs = propConfigs;
      } else
        return;
      if (this.prop_type) {
        this.prop_type.skin = "resources/prop/" + propConfigs.name + ".png";
      }
    }
    onOpenAni() {
      if (this.aniIsOpen)
        return;
      this.aniIsOpen = true;
      AniManager.getInstance().onRoatationSprite(this.prop_light);
    }
    closeAni() {
      if (!this.aniIsOpen)
        return;
      this.aniIsOpen = false;
      Laya.Tween.clearAll(this.prop_light);
    }
    // 组件被禁用时执行，例如从节点从舞台移除后
    onDisable() {
      Laya.Tween.clearAll(this.prop_light);
    }
    removeProp() {
      this.owner.removeSelf();
      this.enabled = false;
      this.destroy();
      this.owner.destroy(true);
    }
    //第一次执行update之前执行，只会执行一次
    //onStart(): void {}
    //手动调用节点销毁时执行
    //onDestroy(): void {}
    //每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
    //onUpdate(): void {}
    //每帧更新时执行，在update之后执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
    //onLateUpdate(): void {}
    //鼠标点击后执行。与交互相关的还有onMouseDown等十多个函数，具体请参阅文档。
    //onMouseClick(): void {}
  };
  __decorateClass([
    property5({ type: Laya.Image })
  ], Prop.prototype, "prop_light", 2);
  __decorateClass([
    property5({ type: Laya.Image })
  ], Prop.prototype, "prop_star", 2);
  __decorateClass([
    property5({ type: Laya.Image })
  ], Prop.prototype, "prop_type", 2);
  __decorateClass([
    property5({ type: Laya.Spine2DRenderNode })
  ], Prop.prototype, "effect_boom", 2);
  Prop = __decorateClass([
    regClass6("0nONBFWmSPOwF87U8svXyg")
  ], Prop);

  // src/Fish.ts
  var { regClass: regClass7, property: property6 } = Laya;
  var Fish = class extends Laya.Script {
    // Store the generated fish configuration
    constructor() {
      super();
      this.Root = null;
      this.createCount = 10;
      this.enemyPositions = [];
      this.enemyBossPositions = [];
      this.numEnemies = 0;
      this.numEnemiesBoss = 0;
      // 初始半径
      this._createEnemyComplete = false;
      this._createEnemyBossComplete = false;
      this.layertotal_enemy = 10;
      //10层小鱼
      this.layertotal_enemyBoss = 1;
      this.createEnemyIndex = 0;
      this.createEnemyBossIndex = 0;
    }
    onStart() {
      Laya.SketonOptimise.normalRenderSwitch = false;
      this.redFishX = FishRT.instance.entity_root.width / 2;
      this.redFishY = FishRT.instance.entity_root.height / 2;
      this.enemySize = 60;
      this.enemySize_Boss = 160;
      this.enemyPositions = [];
      this.enemyBossPositions = [];
      this.radius = 150;
      this._createEnemyComplete = false;
      FishRT.instance.Hero.pos(
        this.redFishX - FishRT.instance.Hero.width / 2,
        this.redFishY - FishRT.instance.Hero.height / 2
      );
      this.fishConfig = GameManager.getInstance().createConfigs();
      console.log(this.fishConfig);
      this.createEnemiesFromConfig();
      MapMgr.Instance.Init(this.Root);
      CameraMgr.Inst.Init(this.Root);
      Laya.Physics2D.I.stop();
    }
    createEnemiesFromConfig() {
      let index = 0;
      for (const fishTypeData of this.fishConfig.fish) {
        if (fishTypeData.type === "yellowFish") {
          for (let i = 0; i < fishTypeData.positions.length; i++) {
            const fishConfig = {
              x: fishTypeData.positions[i].x,
              y: fishTypeData.positions[i].y,
              fishInfo: fishTypeData.fishInfo,
              type: fishTypeData.type,
              size: fishTypeData.size,
              layer: fishTypeData.layer,
              radius: fishTypeData.radius
            };
            this.enemyPositions.push(fishConfig);
            this.numEnemies++;
          }
        } else {
          for (let i = 0; i < fishTypeData.positions.length; i++) {
            const fishConfig = {
              x: fishTypeData.positions[i].x,
              y: fishTypeData.positions[i].y,
              fishInfo: fishTypeData.fishInfo,
              type: fishTypeData.type,
              size: fishTypeData.size,
              layer: fishTypeData.radius
            };
            this.enemyBossPositions.push(fishConfig);
            this.numEnemiesBoss++;
          }
        }
        this.radius += fishTypeData.fishInfo.size * 10 / 1.2;
        index++;
      }
      const propConfigs = FishConfigs.propConfigs;
      propConfigs.forEach((propConfig) => {
        this.createPropByPropConfig(propConfig);
      });
    }
    onUpdate() {
      if (!this._createEnemyComplete && this.enemyPositions.length >= this.numEnemies) {
        for (let i = 0; i < this.createCount; i++) {
          if (this.createEnemyIndex < this.enemyPositions.length) {
            this.createSingleEnemy(this.createEnemyIndex);
            this.createEnemyIndex++;
          } else {
            this._createEnemyComplete = true;
            break;
          }
        }
      }
      if (!this._createEnemyBossComplete && this.enemyBossPositions.length >= this.numEnemiesBoss) {
        for (let i = 0; i < this.createCount; i++) {
          if (this.createEnemyBossIndex < this.enemyBossPositions.length) {
            this.createSingleEnemyBoss(this.createEnemyBossIndex);
            this.createEnemyBossIndex++;
          } else {
            this._createEnemyBossComplete = true;
            break;
          }
        }
      }
      this.updateScenePos();
      GameManager.getInstance().updateEnemyStatus();
      GameManager.getInstance().updatePorpArr();
    }
    createPropByPropConfig(propConfig) {
      const box = Laya.Pool.getItemByCreateFun(
        `prop_1`,
        this.prop.create,
        this.prop
      );
      if (propConfig.level != 5)
        box.pos(propConfig.poss.x + 2e4, propConfig.poss.y + 2e4);
      else
        box.pos(propConfig.poss.x, propConfig.poss.y);
      box.name = propConfig.name;
      FishRT.instance.entity_root.addChildAt(box, 0);
      const scale = propConfig.size / 200;
      box.scale(scale, scale);
      const prop = box.getComponent(Prop);
      prop.initPropConfig(propConfig);
      GameManager.getInstance().propArr.push(prop);
    }
    createSingleEnemy(index) {
      const info = this.enemyPositions[index];
      const x = info.x;
      const y = info.y;
      const box = Laya.Pool.getItemByCreateFun(
        `enemy_1`,
        this.enemy.create,
        this.enemy
      );
      box.pos(x, y);
      const enemy = box.getComponent(Enemy);
      enemy.fishConfigs = info;
      enemy.init();
      enemy.killScore = info.fishInfo.score;
      if (enemy.fishConfigs.fishInfo.level <= 2) {
        FishRT.instance.box_enemy.addChildAt(box, 0);
      }
      enemy.lv = info.fishInfo.level;
      const scale = info.size.width / 80;
      box.scale(scale, scale);
      enemy.baseScale = { scaleX: scale, scaleY: scale };
      GameManager.getInstance().allEnemy.push(enemy);
    }
    createSingleEnemyBoss(index) {
      const info = this.enemyBossPositions[index];
      const enemyBossLv = 1;
      const x = info.x;
      const y = info.y;
      Laya.loader.load(`prefab/${info.fishInfo.prefab}.lh`).then((res) => {
        const box = res.create();
        box.pos(x, y);
        const enemyBoss = box.getComponent(EnemyBoss);
        enemyBoss.fishConfigs = info;
        enemyBoss.init();
        enemyBoss.lv = info.fishInfo.level;
        enemyBoss.killScore = info.fishInfo.score;
        const scale = info.size.width / 120;
        box.scale(scale, scale);
        if (enemyBoss.lv === 3) {
          FishRT.instance.box_enemy_boss.addChildAt(box, 0);
        }
        enemyBoss.baseScale = { scaleX: scale, scaleY: scale };
        GameManager.getInstance().allEnemyBoss.push(enemyBoss);
      });
    }
    updateScenePos() {
    }
  };
  __decorateClass([
    property6(Laya.Prefab)
  ], Fish.prototype, "enemy", 2);
  __decorateClass([
    property6(Laya.Prefab)
  ], Fish.prototype, "prop", 2);
  __decorateClass([
    property6(Laya.Prefab)
  ], Fish.prototype, "enemyBoss1", 2);
  __decorateClass([
    property6(Laya.Prefab)
  ], Fish.prototype, "enemyBoss2", 2);
  __decorateClass([
    property6(Laya.Prefab)
  ], Fish.prototype, "enemyBoss3", 2);
  __decorateClass([
    property6(Laya.Prefab)
  ], Fish.prototype, "enemyBoss4", 2);
  __decorateClass([
    property6(Laya.Prefab)
  ], Fish.prototype, "skill", 2);
  __decorateClass([
    property6(Laya.Box)
  ], Fish.prototype, "Root", 2);
  Fish = __decorateClass([
    regClass7("azlN0sV5Q7iclfYo2R_RRA")
  ], Fish);

  // src/Joystick.ts
  var { regClass: regClass8, property: property7 } = Laya;
  var Event = Laya.Event;
  var Point3 = Laya.Point;
  var Joystick = class extends Laya.Script {
    // /** 角色动画的节点 */
    // private roleAniNode: Laya.Sprite;
    // private _animator: Laya.Animator2D;
    // private isRun: boolean = false;
    constructor() {
      super();
      this.heroFish = null;
      /** 记录stage上的鼠标点，当频繁使用stage坐标转化时，可以减少实例开销 */
      this.stageMouse = new Point3();
      /** 中心点坐标偏移值 */
      this.axisPivot = new Point3();
      /** 摇杆角度 */
      this.angle = 0;
      /** 摇杆弧度 */
      this.radian = 0;
      /** 是否允许跑动 */
      this.isMoving = false;
      this.hero = null;
    }
    onEnable() {
      this.joystickBG = this.owner;
      this.joystickAxis = this.owner.getChildByName("joystickAxis");
      this.maxDistance = this.joystickBG.width - this.joystickAxis.width;
      this.axisPivot.x = this.joystickAxis.x;
      this.axisPivot.y = this.joystickAxis.y;
      this.sceneWindow.on(Event.MOUSE_DOWN, this, this.mouseDown);
      this.sceneWindow.on(Event.MOUSE_MOVE, this, this.mouseMove);
      this.sceneWindow.on(Event.MOUSE_UP, this, this.mouseUp);
      this.sceneWindow.on(Event.MOUSE_OUT, this, this.mouseUp);
      this.hero = this.heroFish.getComponent(Hero);
      this.box_spine = this.heroFish.getChildByName("box_spine");
    }
    /** 侦听panel 鼠标\手势按下时 */
    mouseDown(e) {
      if (GameManager.getInstance().gameIsOver) {
        return;
      }
      if (GameManager.getInstance().gameStatus == 2 /* UP_LEVEL */) {
        return;
      }
      this.joystickBG.visible = true;
      this.joystickBG.x = e.stageX;
      this.joystickBG.y = e.stageY;
      this.touchId = e.touchId;
      this.isMoving = false;
      if (GameManager.getInstance().gameStatus != 2 /* UP_LEVEL */) {
        GameManager.getInstance().gameStatus = 1 /* MOVEING */;
      }
      this.hero.setHeroState(2 /* Attack */);
      this.setBodyColliderEnable(false);
      this.updateJoystickPoint();
    }
    setBodyColliderEnable(enabled) {
      let circleColliders = this.heroFish.getComponent(Laya.PolygonCollider);
      circleColliders && (circleColliders.enabled = enabled);
    }
    /** 更新摇杆按下的位置 */
    updateJoystickPoint() {
      if (GameManager.getInstance().gameStatus == 2 /* UP_LEVEL */)
        return;
      this.stageMouse.x = Laya.stage.mouseX;
      this.stageMouse.y = Laya.stage.mouseY;
      let joystickBGMouse = this.joystickBG.globalToLocal(this.stageMouse), mouseX = joystickBGMouse.x - this.joystickAxis.width / 2, mouseY = joystickBGMouse.y - this.joystickAxis.height / 2;
      this.radian = Math.atan2(mouseY - this.axisPivot.y, mouseX - this.axisPivot.x);
      this.lastAngle = this.angle;
      this.angle = Math.round(this.radian * 180 / Math.PI * 10) / 10;
      this.angle < 0 && (this.angle += 360);
      let distance = this.getDistance(this.joystickBG.width / 2, this.joystickBG.height / 2, joystickBGMouse.x, joystickBGMouse.y);
      if (distance > this.maxDistance && this.lastAngle !== this.angle) {
        this.joystickAxis.x = Math.floor(Math.cos(this.radian) * this.maxDistance) + this.axisPivot.x;
        this.joystickAxis.y = Math.floor(Math.sin(this.radian) * this.maxDistance) + this.axisPivot.y;
      } else {
        this.joystickAxis.pos(joystickBGMouse.x - this.joystickAxis.width / 2, joystickBGMouse.y - this.joystickAxis.height / 2);
      }
    }
    // /** 切换动画
    //  * @param aniType 动作类型
    //  */
    // switchAni(aniType: string): void {
    //     if (aniType == "run") {
    //         let _runAniName: string = this.getOrientation(this.angle, this.runAniName);
    //         if (_runAniName !== this.lastRunAniName) {
    //             this.lastRunAniName = _runAniName;
    //             this._animator.play(_runAniName);
    //         }
    //         this.isRun = true;
    //     } else {
    //         this.isRun = false;
    //         let standS: string = this.getOrientation(this.angle, this.standAniName);
    //         this.lastAngle !== this.angle && this._animator.play(standS);
    //     }
    // }
    /** 鼠标抬起时 */
    mouseUp(e) {
      if (e.touchId != this.touchId)
        return;
      this.touchId = null;
      this.setBodyColliderEnable(true);
      this.isMoving = false;
      this.joystickAxis.pos(this.axisPivot.x, this.axisPivot.y);
      this.joystickBG.visible = false;
      if (GameManager.getInstance().gameStatus == 2 /* UP_LEVEL */) {
        this.hero.setHeroState(3 /* skill */);
      } else {
        this.hero.setHeroState(1 /* Idle */);
      }
    }
    /** 鼠标移动的时候 */
    mouseMove(e) {
      if (e.touchId != this.touchId)
        return;
      this.isMoving = true;
      if (GameManager.getInstance().gameStatus == 2 /* UP_LEVEL */) {
        this.joystickBG.visible = false;
        this.sceneWindow.event(Event.MOUSE_UP, e);
        return;
      }
      this.updateJoystickPoint();
    }
    /** 根据角度得到朝向动画名 
     * @param angle 角度
     * @param aniName 动画名称字符串
     * @return 动画名
    */
    getOrientation(angle, aniName) {
      let aniArr = aniName.split(",");
      const angleConditions = 360 / aniArr.length;
      return aniArr[Math.floor(angle / angleConditions)];
    }
    onUpdate() {
      if (!this.isMoving)
        return;
      if (GameManager.getInstance().gameStatus == 2 /* UP_LEVEL */)
        return;
      if (GameManager.getInstance().gameStatus == 4 /* GAME_END */)
        return;
      this.updateRoleMove();
    }
    /** 更新角色移动相关 */
    updateRoleMove() {
      let dx = Math.cos(this.radian) * 5 / MapMgr.Instance.globalScale;
      let dy = Math.sin(this.radian) * 5 / MapMgr.Instance.globalScale;
      this.heroFish.x += dx;
      this.heroFish.y += dy;
      let displayWid = this.heroFish.displayWidth;
      let displayHeight = this.heroFish.displayHeight;
      if (this.heroFish.x <= displayWid)
        this.heroFish.x = displayWid;
      if (this.heroFish.y <= displayHeight)
        this.heroFish.y = displayHeight;
      if (this.heroFish.x >= 8e4 - displayWid)
        this.heroFish.x = 8e4 - displayWid;
      if (this.heroFish.y >= 8e4 - displayHeight)
        this.heroFish.y = 8e4 - displayHeight;
      this.box_spine.rotation = 180 + this.angle;
      let rotation = this.box_spine.rotation % 360;
      if (rotation >= 90 && rotation <= 235) {
        this.box_spine.scaleY = -1;
      } else {
        this.box_spine.scaleY = 1;
      }
    }
    /** 
    * 获得两个坐标点的直线距离，
    * 依据勾股定理，用目标坐标的分量与原始坐标的分量计算斜边(目标点到鼠标点的直线距离)，用于判断是否超出限制范围
    * @param centerX 原始的中心点坐标X轴位置
    * @param centerY 原始的中心点坐标Y轴位置
    * @param mouseX 鼠标点X轴位置
    * @param mouseY 鼠标点Y轴位置
    */
    getDistance(centerX, centerY, mouseX, mouseY) {
      let dx = centerX - mouseX, dy = centerY - mouseY;
      return Math.sqrt(dx * dx + dy * dy);
    }
  };
  __decorateClass([
    property7({ type: Laya.Sprite })
  ], Joystick.prototype, "heroFish", 2);
  __decorateClass([
    property7({ type: Laya.Panel })
  ], Joystick.prototype, "sceneWindow", 2);
  Joystick = __decorateClass([
    regClass8("VCw2xH4NTUa_SwvVR_8RMg")
  ], Joystick);

  // src/prefab/PropSkill.ts
  var { regClass: regClass9, property: property8 } = Laya;
  var PropSkill = class extends Laya.Script {
    constructor() {
      super(...arguments);
      // 假设飞轮有半径属性，或者你可以根据其尺寸计算
      this.propellerRadius = 42;
      // 示例半径
      this.boxRadius = 150;
    }
    onEnable() {
      this.box_prop.visible = true;
      AniManager.getInstance().onRoatationSpriteByTime(this.box_prop, 5);
    }
    onDisable() {
      Laya.timer.clearAll(this.box_prop);
    }
    onUpdate() {
      let player = GameManager.getInstance().player;
      this.owner.x = player.x;
      this.owner.y = player.y;
      this.owner.scale(player.scaleX, player.scaleY);
      this.checkCircularCollisions();
    }
    checkCircularCollisions() {
      const targets = GameManager.getInstance().allEnemyBoss;
      let boxCenter = { x: 150, y: 150 };
      let boxScale = this.owner.scaleX;
      let boxPropRotation = this.box_prop.rotation % 360;
      let flywheel1LocalPos = { x: 0, y: 150 };
      let flywheel1AbsolutePos = this.calculateFlywheelPosition(flywheel1LocalPos, boxCenter, boxScale, boxPropRotation);
      let propleRadius = this.propellerRadius * this.owner.scaleX;
      let f1x = flywheel1AbsolutePos.x + this.owner.x;
      let f1y = flywheel1AbsolutePos.y + this.owner.y;
      let f2x = flywheel1AbsolutePos.absoluteX2 + this.owner.x;
      let f2y = flywheel1AbsolutePos.absoluteY2 + this.owner.y;
      if (targets) {
        for (const target of targets) {
          const targetInOwnerX = target.owner.x;
          const targetInOwnerY = target.owner.y;
          const targetRadiusScaled = target.fishConfigs.size.width / 2;
          if (this.checkCircularCollision({ x: f1x, y: f1y }, propleRadius, { x: targetInOwnerX, y: targetInOwnerY }, targetRadiusScaled)) {
            this.onPropellerCollision(this.propeller1, target);
            return;
          }
          if (this.checkCircularCollision({ x: f2x, y: f2y }, propleRadius, { x: targetInOwnerX, y: targetInOwnerY }, targetRadiusScaled)) {
            this.onPropellerCollision(this.propeller2, target);
            return;
          }
        }
      }
    }
    /**
     * 计算两个圆形是否碰撞
     * @param center1 圆形1的中心点
     * @param radius1 圆形1的半径
     * @param center2 圆形2的中心点
     * @param radius2 圆形2的半径
     * @returns
     */
    checkCircularCollision(center1, radius1, center2, radius2) {
      const dx = center1.x - center2.x;
      const dy = center1.y - center2.y;
      const distanceSq = dx * dx + dy * dy;
      const radiiSum = radius1 + radius2;
      return distanceSq < radiiSum * radiiSum;
    }
    /**
     * 当飞轮发生碰撞时执行
     * @param propeller 发生碰撞的飞轮
     * @param target 碰撞到的目标物体
     */
    onPropellerCollision(propeller, target) {
      console.log("飞轮碰撞发生!", propeller.name, "碰撞到", target.owner.name);
      target.deatInAni();
    }
    /**
    * 计算飞轮的绝对位置
    * @param {Object} localPos 飞轮的局部坐标 { x, y }
    * @param {Object} boxCenter box 的中心点 { x, y }
    * @param {number} boxScale box 的缩放因子
    * @param {number} rotation box_prop 的旋转角度（以度数表示）
    * @returns {Object} 飞轮的绝对位置 { x, y }
    */
    calculateFlywheelPosition(localPos, boxCenter, boxScale, rotation) {
      let radian = rotation * Math.PI / 180;
      let { x, y } = this.calculateSmallCircleCenter(boxCenter, this.boxRadius, rotation);
      let xs = 300 - x;
      let ys = 300 - y;
      let absoluteX = (x - boxCenter.x) * boxScale;
      let absoluteY = (y - boxCenter.y) * boxScale;
      let absoluteX2 = (xs - boxCenter.x) * boxScale;
      let absoluteY2 = (ys - boxCenter.y) * boxScale;
      return { x: absoluteX, y: absoluteY, absoluteX2, absoluteY2 };
    }
    /**
     * 计算小圆 c 在任意角度的圆心坐标
     * @param theta 旋转角度（弧度制）
     * @returns { x: number, y: number } 小圆圆心的坐标
     */
    calculateSmallCircleCenter(bigCircleCenter, bigCircleRadius, theta) {
      const radian = theta * Math.PI / 180;
      const x = bigCircleCenter.x + bigCircleRadius * Math.cos(radian);
      const y = bigCircleCenter.y + bigCircleRadius * Math.sin(radian);
      return { x, y };
    }
  };
  __decorateClass([
    property8({ type: Laya.Box })
  ], PropSkill.prototype, "box_prop", 2);
  __decorateClass([
    property8({ type: Laya.Sprite })
  ], PropSkill.prototype, "propeller1", 2);
  __decorateClass([
    property8({ type: Laya.Sprite })
  ], PropSkill.prototype, "propeller2", 2);
  PropSkill = __decorateClass([
    regClass9("kqFqKfHBTdSr8ijOCc_Fhg")
  ], PropSkill);
})();
