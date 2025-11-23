
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { create } from 'zustand';
import { GameStatus, RUN_SPEED_BASE, VocabItem, NEON_COLORS, WrongAnswer } from './types';

// Define Lesson Data Structure
type LessonData = {
    [key: string]: VocabItem[];
};

const LESSON_DATA: LessonData = {
    'L6': [
        { char: '黏', question: '(  )ㄋㄧㄢˊ 土' }, 
        { char: '木', question: '(  )ㄇㄨˋ 頭' }, 
        { char: '製', question: '(  )ㄓˋ 作' }, 
        { char: '部', question: '(  )ㄅㄨˋ 分' }, 
        { char: '混', question: '(  )ㄏㄨㄣˋ 合' }, 
        { char: '斷', question: '(  )ㄉㄨㄢˋ 裂' }, 
        { char: '解', question: '(  )ㄐㄧㄝˇ 答' }, 
        { char: '機', question: '(  )ㄐㄧ 器' }, 
        { char: '器', question: '機(  )ㄑㄧˋ' }, 
        { char: '另', question: '(  )ㄌㄧㄥˋ 外' }, 
        { char: '治', question: '(  )ㄓˋ 療' }, 
        { char: '枝', question: '樹(  )ㄓ' }, 
        { char: '桿', question: '欄(  )ㄍㄢˇ' }, 
        { char: '擦', question: '(  )ㄘㄚ 拭' }, 
        { char: '削', question: '(  )ㄒㄧㄠ 皮' }
    ],
    'L7': [
        { char: '鹹', question: '(  )ㄒㄧㄢˊ 味' }, 
        { char: '蔚', question: '(  )ㄨㄟˋ 藍' }, 
        { char: '航', question: '(  )ㄏㄤˊ 空' }, 
        { char: '乘', question: '(  )ㄔㄥˊ 客' }, 
        { char: '橇', question: '雪(  )ㄑㄧㄠ' }, 
        { char: '坡', question: '山(  )ㄆㄛ' }, 
        { char: '野', question: '(  )ㄧㄝˇ 外' }, 
        { char: '滾', question: '(  )ㄍㄨㄣˇ 動' }, 
        { char: '閉', question: '(  )ㄅㄧˋ 上' }, 
        { char: '深', question: '(  )ㄕㄣ 入' }, 
        { char: '吸', question: '(  )ㄒㄧ 收' }, 
        { char: '欣', question: '(  )ㄒㄧㄣ 賞' }, 
        { char: '賞', question: '欣(  )ㄕㄤˇ' }, 
        { char: '瞞', question: '隱(  )ㄇㄢˊ' }
    ],
    'L8': [
        { char: '寄', question: '(  )ㄐㄧˋ 信' }, 
        { char: '蟹', question: '螃(  )ㄒㄧㄝˋ' }, 
        { char: '灘', question: '沙(  )ㄊㄢ' }, 
        { char: '螃', question: '(  )ㄆㄤˊ 蟹' }, 
        { char: '堆', question: '(  )ㄉㄨㄟ 疊' }, 
        { char: '杯', question: '水(  )ㄅㄟ' }, 
        { char: '類', question: '種(  )ㄌㄟˋ' }, 
        { char: '撿', question: '(  )ㄐㄧㄢˇ 起' }, 
        { char: '瓶', question: '(  )ㄆㄧㄥˊ 子' }, 
        { char: '蓋', question: '(  )ㄍㄞˋ 子' }, 
        { char: '淨', question: '乾(  )ㄐㄧㄥˋ' }, 
        { char: '志', question: '(  )ㄓˋ 願' }, 
        { char: '品', question: '物(  )ㄆㄧㄣˇ' }, 
        { char: '應', question: '(  )ㄧㄥ 該' }
    ],
    'L9': [
        { char: '挑', question: '(  )ㄊㄧㄠ 選' },
        { char: '教', question: '(  )ㄐㄧㄠˋ 室' },
        { char: '導', question: '指(  )ㄉㄠˇ' },
        { char: '叢', question: '草(  )ㄘㄨㄥˊ' },
        { char: '喊', question: '大(  )ㄏㄢˇ' },
        { char: '投', question: '(  )ㄊㄡˊ 票' },
        { char: '繼', question: '(  )ㄐㄧˋ 續' },
        { char: '續', question: '連(  )ㄒㄩˋ' },
        { char: '岸', question: '海(  )ㄢˋ' },
        { char: '淺', question: '(  )ㄑㄧㄢˇ 水' },
        { char: '捲', question: '(  )ㄐㄩㄢˇ 髮' },
        { char: '沿', question: '(  )ㄧㄢˊ 路' },
        { char: '踩', question: '(  )ㄘㄞˇ 踏' },
        { char: '座', question: '(  )ㄗㄨㄛˋ 位' },
        { char: '般', question: '一(  )ㄅㄢ' }
    ],
    'L10': [
        { char: '婚', question: '結(  )ㄏㄨㄣ' },
        { char: '禮', question: '(  )ㄌㄧˇ 貌' },
        { char: '盪', question: '(  )ㄉㄤˋ 鞦韆' },
        { char: '服', question: '衣(  )ㄈㄨˊ' },
        { char: '代', question: '(  )ㄉㄞˋ 替' },
        { char: '福', question: '祝(  )ㄈㄨˊ' },
        { char: '結', question: '(  )ㄐㄧㄝˊ 束' },
        { char: '束', question: '花(  )ㄕㄨˋ' },
        { char: '酒', question: '喝(  )ㄐㄧㄡˇ' },
        { char: '敬', question: '尊(  )ㄐㄧㄥˋ' },
        { char: '舞', question: '跳(  )ㄨˇ' },
        { char: '習', question: '學(  )ㄒㄧˊ' },
        { char: '俗', question: '風(  )ㄙㄨˊ' },
        { char: '惜', question: '愛(  )ㄒㄧˊ' },
        { char: '互', question: '(  )ㄏㄨˋ 相' }
    ],
    'L11': [
        { char: '除', question: '(  )ㄔㄨˊ 夕' },
        { char: '嬸', question: '大(  )ㄕㄣˇ' },
        { char: '煙', question: '(  )ㄧㄢ 火' },
        { char: '炮', question: '鞭(  )ㄆㄠˋ' },
        { char: '附', question: '(  )ㄈㄨˋ 近' },
        { char: '店', question: '商(  )ㄉㄧㄢˋ' },
        { char: '息', question: '休(  )ㄒㄧˊ' },
        { char: '修', question: '(  )ㄒㄧㄡ 理' },
        { char: '廠', question: '工(  )ㄔㄤˇ' },
        { char: '壞', question: '破(  )ㄏㄨㄞˋ' },
        { char: '查', question: '檢(  )ㄔㄚˊ' },
        { char: '擺', question: '(  )ㄅㄞˇ 放' },
        { char: '幸', question: '(  )ㄒㄧㄥˋ 福' },
        { char: '零', question: '(  )ㄌㄧㄥˊ 件' }
    ],
    'L12': [
        { char: '團', question: '(  )ㄊㄨㄢˊ 圓' },
        { char: '窗', question: '(  )ㄔㄨㄤ 戶' },
        { char: '剩', question: '(  )ㄕㄥˋ 下' },
        { char: '默', question: '(  )ㄇㄛˋ 默' },
        { char: '匆', question: '(  )ㄘㄨㄥ 忙' },
        { char: '視', question: '電(  )ㄕˋ' },
        { char: '叔', question: '大(  )ㄕㄨˊ' },
        { char: '逗', question: '(  )ㄉㄡˋ 趣' },
        { char: '堂', question: '禮(  )ㄊㄤˊ' },
        { char: '娃', question: '娃(  )ㄨㄚˊ' },
        { char: '壓', question: '(  )ㄧㄚ 力' },
        { char: '錢', question: '金(  )ㄑㄧㄢˊ' },
        { char: '透', question: '(  )ㄊㄡˋ 明' },
        { char: '握', question: '(  )ㄨㄛˋ 手' }
    ]
};

export const LESSON_NAMES: Record<string, string> = {
    'L6': '翰林3上 第6課 (黏、木...)',
    'L7': '翰林3上 第7課 (鹹、蔚...)',
    'L8': '翰林3上 第8課 (寄、蟹...)',
    'L9': '翰林3上 第9課 (挑、教...)',
    'L10': '翰林3上 第10課 (婚、禮...)',
    'L11': '翰林3上 第11課 (除、嬸...)',
    'L12': '翰林3上 第12課 (團、窗...)'
};

const ANSWERS_PER_LEVEL = 5; // Level up every 5 answers
const SAVE_KEY = 'gemini-runner-save-v1';

interface GameState {
  status: GameStatus;
  score: number;
  highScore: number;
  lives: number;
  maxLives: number;
  speed: number;
  
  // Vocabulary State
  selectedLessonIds: string[]; // Support multiple lessons
  victoryTarget: number; // Configurable goal (20, 30, 40)
  
  currentVocabList: VocabItem[];
  currentVocab: VocabItem | null;
  consecutiveIgnores: number; // How many times the correct answer was missed
  
  correctAnswersCount: number; // Current level progress
  totalCorrectAnswers: number; // Total game progress
  targetCountForLevel: number;
  
  wrongAnswers: WrongAnswer[]; // Track mistakes
  
  level: number;
  laneCount: number;
  gemsCollected: number;
  distance: number;
  
  // Settings
  startingLivesSetting: number;
  maxSpeedSetting: number; // 0 for unlimited

  // Inventory / Abilities
  hasDoubleJump: boolean;
  hasImmortality: boolean;
  isImmortalityActive: boolean;
  hasFireball: boolean;
  lastFireballTime: number;

  hasFlight: boolean;
  isFlying: boolean;
  flightStartTime: number;
  lastFlightEndTime: number;
  
  // New Skills
  hasPassiveHeal: boolean;
  passiveHealCounter: number; // Tracks consecutive correct answers for healing

  hasGemDoubler: boolean;
  isGemDoublerActive: boolean;
  nextGemDoublerAvailableTime: number; // Cooldown timestamp
  gemDoublerEndTime: number; // Active duration end timestamp
  
  // Gameplay Modifiers
  isManualSlowMotion: boolean; // Spacebar triggered

  // Actions
  toggleLesson: (id: string) => void;
  setVictoryTarget: (target: number) => void;
  setStartingLives: (lives: number) => void;
  setMaxSpeed: (speed: number) => void;
  registerIgnore: () => void;
  
  startGame: () => void;
  restartGame: () => void;
  takeDamage: () => void;
  addScore: (amount: number) => void;
  collectGem: (value: number) => void;
  submitAnswer: (char: string) => boolean;
  setStatus: (status: GameStatus) => void;
  setDistance: (dist: number) => void;
  
  setManualSlowMotion: (active: boolean) => void;
  
  // Shop / Abilities
  buyItem: (type: 'DOUBLE_JUMP' | 'MAX_LIFE' | 'HEAL' | 'IMMORTAL' | 'FIREBALL' | 'FLIGHT' | 'PASSIVE_HEAL' | 'GEM_DOUBLER', cost: number) => boolean;
  advanceLevel: () => void;
  openShop: () => void;
  closeShop: () => void;
  activateImmortality: () => void;
  useFireball: () => void;
  startFlight: () => void;
  endFlight: () => void;
  activateGemDoubler: () => void;
  
  // Persistence
  saveData: () => void;
  loadData: () => void;
  
  // Helpers
  getRandomDistractor: () => string;
}

export const useStore = create<GameState>((set, get) => ({
  status: GameStatus.MENU,
  score: 0,
  highScore: 0,
  lives: 3,
  maxLives: 3,
  speed: 0,
  
  selectedLessonIds: ['L6'], // Default
  victoryTarget: 20,
  
  currentVocabList: LESSON_DATA['L6'],
  currentVocab: null,
  consecutiveIgnores: 0,
  
  correctAnswersCount: 0,
  totalCorrectAnswers: 0,
  targetCountForLevel: ANSWERS_PER_LEVEL,
  wrongAnswers: [],

  level: 1,
  laneCount: 3,
  gemsCollected: 0,
  distance: 0,
  
  startingLivesSetting: 3,
  maxSpeedSetting: 100,

  hasDoubleJump: false,
  hasImmortality: false,
  isImmortalityActive: false,
  hasFireball: false,
  lastFireballTime: 0,
  hasFlight: false,
  isFlying: false,
  flightStartTime: 0,
  lastFlightEndTime: 0,
  
  hasPassiveHeal: false,
  passiveHealCounter: 0,
  hasGemDoubler: false,
  isGemDoublerActive: false,
  nextGemDoublerAvailableTime: 0,
  gemDoublerEndTime: 0,
  
  isManualSlowMotion: false,

  toggleLesson: (id) => {
      set((state) => {
          const ids = state.selectedLessonIds;
          // Toggle logic
          let newIds = [];
          if (ids.includes(id)) {
              newIds = ids.filter(i => i !== id);
          } else {
              newIds = [...ids, id];
          }
          
          if (newIds.length === 0 && ids.length === 1) return state; 
          return { selectedLessonIds: newIds };
      });
  },
  
  setVictoryTarget: (target) => set({ victoryTarget: target }),
  setStartingLives: (lives) => set({ startingLivesSetting: lives }),
  setMaxSpeed: (speed) => set({ maxSpeedSetting: speed }),
  
  registerIgnore: () => set(state => ({ consecutiveIgnores: state.consecutiveIgnores + 1 })),

  saveData: () => {
      const state = get();
      const dataToSave = {
          highScore: state.highScore,
          hasDoubleJump: state.hasDoubleJump,
          hasImmortality: state.hasImmortality,
          hasFireball: state.hasFireball,
          hasFlight: state.hasFlight,
          hasPassiveHeal: state.hasPassiveHeal,
          hasGemDoubler: state.hasGemDoubler,
          maxLives: state.maxLives
      };
      try {
          localStorage.setItem(SAVE_KEY, JSON.stringify(dataToSave));
      } catch (e) {
          console.warn('Failed to save game data', e);
      }
  },

  loadData: () => {
      try {
          const saved = localStorage.getItem(SAVE_KEY);
          if (saved) {
              const data = JSON.parse(saved);
              set({
                  highScore: data.highScore || 0,
                  hasDoubleJump: data.hasDoubleJump || false,
                  hasImmortality: data.hasImmortality || false,
                  hasFireball: data.hasFireball || false,
                  hasFlight: data.hasFlight || false,
                  hasPassiveHeal: data.hasPassiveHeal || false,
                  hasGemDoubler: data.hasGemDoubler || false,
                  maxLives: data.maxLives || 3
              });
          }
      } catch (e) {
          console.warn('Failed to load game data', e);
      }
  },

  startGame: () => {
    const { selectedLessonIds, startingLivesSetting, maxLives } = get();
    
    // Aggregate Vocabulary
    let combinedList: VocabItem[] = [];
    selectedLessonIds.forEach(id => {
        if (LESSON_DATA[id]) {
            combinedList = [...combinedList, ...LESSON_DATA[id]];
        }
    });
    
    if (combinedList.length === 0) {
        combinedList = LESSON_DATA['L6'];
    }

    const randomVocab = combinedList[Math.floor(Math.random() * combinedList.length)];
    
    // Determine actual max lives based on upgrades + setting
    // The player's purchased upgrade (maxLives) might be higher than default 3.
    // We should respect the starting setting but allow upgraded max.
    // Logic: If user bought upgrades, maxLives is e.g. 4. If they pick "Start 5", current lives = 5, max = max(4,5).
    const actualLives = startingLivesSetting;
    const newMaxLives = Math.max(maxLives, actualLives);
    
    set({ 
        status: GameStatus.PLAYING, 
        currentVocabList: combinedList, 
        score: 0, 
        lives: actualLives,
        maxLives: newMaxLives,
        speed: RUN_SPEED_BASE,
        currentVocab: randomVocab,
        consecutiveIgnores: 0,
        correctAnswersCount: 0,
        totalCorrectAnswers: 0,
        targetCountForLevel: ANSWERS_PER_LEVEL,
        wrongAnswers: [], 
        level: 1,
        laneCount: 3,
        gemsCollected: 0,
        distance: 0,
        isImmortalityActive: false,
        lastFireballTime: 0,
        isFlying: false,
        flightStartTime: 0,
        lastFlightEndTime: 0,
        passiveHealCounter: 0,
        isGemDoublerActive: false,
        nextGemDoublerAvailableTime: 0,
        gemDoublerEndTime: 0,
        isManualSlowMotion: false
      });
  },

  restartGame: () => {
    const { startingLivesSetting, maxLives } = get();
    const list = get().currentVocabList;
    const randomVocab = list[Math.floor(Math.random() * list.length)];
    
    const actualLives = startingLivesSetting;
    const newMaxLives = Math.max(maxLives, actualLives);

    set({ 
        status: GameStatus.PLAYING, 
        score: 0, 
        lives: actualLives,
        maxLives: newMaxLives,
        speed: RUN_SPEED_BASE,
        currentVocab: randomVocab,
        consecutiveIgnores: 0,
        correctAnswersCount: 0,
        totalCorrectAnswers: 0,
        targetCountForLevel: ANSWERS_PER_LEVEL,
        wrongAnswers: [],
        level: 1,
        laneCount: 3,
        gemsCollected: 0,
        distance: 0,
        isImmortalityActive: false,
        lastFireballTime: 0,
        isFlying: false,
        flightStartTime: 0,
        lastFlightEndTime: 0,
        passiveHealCounter: 0,
        isGemDoublerActive: false,
        nextGemDoublerAvailableTime: 0,
        gemDoublerEndTime: 0,
        isManualSlowMotion: false
    });
  },

  takeDamage: () => {
    const { lives, isImmortalityActive } = get();
    if (isImmortalityActive) return;

    if (lives > 1) {
      set({ lives: lives - 1 });
    } else {
      set({ lives: 0, status: GameStatus.GAME_OVER, speed: 0 });
    }
  },

  addScore: (amount) => {
      const { score, highScore, saveData } = get();
      const newScore = score + amount;
      
      let newHighScore = highScore;
      if (newScore > highScore) {
          newHighScore = newScore;
      }
      
      set({ score: newScore, highScore: newHighScore });
      
      if (newHighScore > highScore) {
          saveData(); // Save if high score updated
      }
  },
  
  collectGem: (value) => {
      const { isGemDoublerActive: activeNow, gemDoublerEndTime, addScore } = get();
      const realActive = activeNow && Date.now() < gemDoublerEndTime;
      const multiplier = realActive ? 2 : 1;
      
      addScore(value * multiplier);
      set((state) => ({ gemsCollected: state.gemsCollected + 1 }));
  },

  setDistance: (dist) => set({ distance: dist }),
  
  setManualSlowMotion: (active) => set({ isManualSlowMotion: active }),

  submitAnswer: (char) => {
    const { currentVocab, correctAnswersCount, totalCorrectAnswers, targetCountForLevel, speed, takeDamage, currentVocabList, wrongAnswers, hasPassiveHeal, passiveHealCounter, lives, maxLives, victoryTarget, addScore, maxSpeedSetting } = get();
    
    if (currentVocab && char === currentVocab.char) {
        // CORRECT
        const newLevelCount = correctAnswersCount + 1;
        const newTotalCount = totalCorrectAnswers + 1;
        
        // Passive Heal Logic
        let newHealCounter = passiveHealCounter;
        if (hasPassiveHeal) {
            newHealCounter += 1;
            if (newHealCounter >= 3) {
                if (lives < maxLives) {
                    set({ lives: lives + 1 });
                }
                newHealCounter = 0;
            }
        }
        
        const speedIncrease = RUN_SPEED_BASE * 0.05;
        let nextSpeed = speed + speedIncrease;
        
        // Cap Speed
        if (maxSpeedSetting > 0 && nextSpeed > maxSpeedSetting) {
            nextSpeed = maxSpeedSetting;
        }

        const nextVocab = currentVocabList[Math.floor(Math.random() * currentVocabList.length)];

        addScore(500); // Reward (Handles High Score Save inside addScore)

        set({
            correctAnswersCount: newLevelCount,
            totalCorrectAnswers: newTotalCount,
            currentVocab: nextVocab,
            consecutiveIgnores: 0, // Reset ignores on success
            speed: nextSpeed,
            passiveHealCounter: newHealCounter
        });

        // Check Victory
        if (newTotalCount >= victoryTarget) {
             addScore(10000); // Bonus
             set({ status: GameStatus.VICTORY });
             return true;
        }

        // Check Level
        if (newLevelCount >= targetCountForLevel) {
             get().advanceLevel();
        }
        return true;
    } else {
        // WRONG
        takeDamage();
        if (currentVocab) {
            set({
                wrongAnswers: [...wrongAnswers, {
                    question: currentVocab.question,
                    correctChar: currentVocab.char,
                    playerChar: char
                }]
            });
        }
        return false;
    }
  },

  advanceLevel: () => {
      const { level, laneCount, speed, maxSpeedSetting } = get();
      const nextLevel = level + 1;
      const speedIncrease = RUN_SPEED_BASE * 0.20;
      let newSpeed = speed + speedIncrease;
      
      // Cap Speed
      if (maxSpeedSetting > 0 && newSpeed > maxSpeedSetting) {
          newSpeed = maxSpeedSetting;
      }

      set({
          level: nextLevel,
          laneCount: Math.min(laneCount + 2, 9),
          status: GameStatus.PLAYING, 
          speed: newSpeed,
          correctAnswersCount: 0,
          targetCountForLevel: ANSWERS_PER_LEVEL
      });
  },

  getRandomDistractor: () => {
      const { currentVocab, currentVocabList } = get();
      let distractor = currentVocab?.char;
      let tries = 0;
      while ((!distractor || distractor === currentVocab?.char) && tries < 10) {
          distractor = currentVocabList[Math.floor(Math.random() * currentVocabList.length)].char;
          tries++;
      }
      return distractor || 'X';
  },

  openShop: () => set({ status: GameStatus.SHOP }),
  
  closeShop: () => set({ status: GameStatus.PLAYING }),

  buyItem: (type, cost) => {
      const { score, maxLives, lives, saveData } = get();
      
      if (score >= cost) {
          let changes = {};
          
          switch (type) {
              case 'DOUBLE_JUMP': changes = { hasDoubleJump: true }; break;
              case 'MAX_LIFE': changes = { maxLives: maxLives + 1, lives: lives + 1 }; break;
              case 'HEAL': changes = { lives: Math.min(lives + 1, maxLives) }; break;
              case 'IMMORTAL': changes = { hasImmortality: true }; break;
              case 'FIREBALL': changes = { hasFireball: true }; break;
              case 'FLIGHT': changes = { hasFlight: true }; break;
              case 'PASSIVE_HEAL': changes = { hasPassiveHeal: true }; break;
              case 'GEM_DOUBLER': changes = { hasGemDoubler: true }; break;
          }
          
          set({ score: score - cost, ...changes });
          saveData(); // Save immediately after purchase
          return true;
      }
      return false;
  },

  activateImmortality: () => {
      const { hasImmortality, isImmortalityActive } = get();
      if (hasImmortality && !isImmortalityActive) {
          set({ isImmortalityActive: true });
          setTimeout(() => {
              set({ isImmortalityActive: false });
          }, 5000);
      }
  },
  
  useFireball: () => {
      set({ lastFireballTime: Date.now() });
  },

  startFlight: () => {
      set({ isFlying: true, flightStartTime: Date.now() });
  },

  endFlight: () => {
      set({ isFlying: false, lastFlightEndTime: Date.now() });
  },
  
  activateGemDoubler: () => {
      const now = Date.now();
      const { nextGemDoublerAvailableTime } = get();
      
      if (now >= nextGemDoublerAvailableTime) {
          set({ 
              isGemDoublerActive: true, 
              gemDoublerEndTime: now + 20000,
              nextGemDoublerAvailableTime: now + 20000 + 3000
          });
          
          setTimeout(() => {
              set({ isGemDoublerActive: false });
          }, 20000);
      }
  },

  setStatus: (status) => set({ status }),
}));
