
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { Heart, Zap, Trophy, MapPin, Diamond, Rocket, ArrowUpCircle, Shield, Activity, PlusCircle, Play, HelpCircle, BookOpen, AlertCircle, Flame, Wind, Target, CheckSquare, Square, WifiOff, Settings, AlertTriangle, Layers, Magnet, User, Volume2, VolumeX, Ghost, Gamepad2, BatteryCharging, Terminal, Baby, PauseCircle, Home, RotateCcw, Percent, Palette, Infinity } from 'lucide-react';
import { useStore } from '../../store';
import { GameStatus, ShopItem, RUN_SPEED_BASE, Difficulty, PetID, ThemeID } from '../../types';
import { audio } from '../System/Audio';
import { LESSON_NAMES, LESSON_DATA } from '../../store';

// Available Shop Items - Sorted by Cost (Low to High)
const SHOP_ITEMS: ShopItem[] = [
    {
        id: 'DOUBLE_JUMP',
        name: '二段跳躍',
        description: '可在空中再次跳躍，對於高處障礙物非常重要。',
        cost: 1000,
        icon: ArrowUpCircle,
        oneTime: true
    },
    {
        id: 'HEAL',
        name: '修復工具包',
        description: '立即恢復 1 點生命值。',
        cost: 1000,
        icon: PlusCircle
    },
    {
        id: 'FIREBALL',
        name: '烈焰衝擊',
        description: '解鎖技能：按下 X 發射火焰摧毀障礙，並獲得 500 寶石 (極速冷卻 1 秒)。',
        cost: 1500,
        icon: Flame,
        oneTime: true
    },
    {
        id: 'MAX_LIFE',
        name: '提升生命上限',
        description: '永久增加一個生命格並恢復生命。',
        cost: 1500,
        icon: Activity
    },
    {
        id: 'MAGNET',
        name: '強力磁鐵',
        description: '被動技能：自動吸取附近的寶石，無冷卻時間。',
        cost: 2000,
        icon: Magnet,
        oneTime: true
    },
    {
        id: 'FLIGHT',
        name: '噴射飛行',
        description: '按下 C 鍵飛行越過障礙 (10秒)，再次按下 C 鍵降落 (冷卻 20 秒)。',
        cost: 2000,
        icon: Rocket,
        oneTime: true
    },
    {
        id: 'GEM_DOUBLER',
        name: '寶石增幅器',
        description: '被動技能：購買後「自動生效」，獲得的寶石數量翻倍 (x2)！',
        cost: 3000,
        icon: Diamond,
        oneTime: true
    },
    {
        id: 'PASSIVE_HEAL',
        name: '生命充能',
        description: '被動技能：每答對 3 題自動恢復 1 點生命。',
        cost: 3000,
        icon: Heart,
        oneTime: true
    },
    {
        id: 'IMMORTAL',
        name: '無敵模式',
        description: '解鎖技能：按下 Enter/Z 鍵即可無敵 5 秒。',
        cost: 3000,
        icon: Shield,
        oneTime: true
    },
    {
        id: 'PET_MECHA',
        name: '暗夜機甲翼',
        description: '被動技能：裝備後，選錯字不會扣除生命值 (撞到障礙物仍會受傷)。',
        cost: 4500,
        icon: Shield,
        oneTime: true,
        petId: PetID.MECHA
    },
    {
        id: 'PET_MARIO',
        name: '水管工夥伴',
        description: '夥伴：自動收集當前跑道寶石，並使獎勵再翻倍！(若已有增幅器，將疊加為 x4 倍)',
        cost: 5000,
        icon: User,
        oneTime: true,
        petId: PetID.MARIO
    },
    {
        id: 'PET_PIKACHU',
        name: '雷電鼠夥伴',
        description: '夥伴：每3秒發射閃電攻擊前方障礙物。',
        cost: 5000,
        icon: Zap,
        oneTime: true,
        petId: PetID.PIKACHU
    },
    {
        id: 'THEME_INFERNO',
        name: '主題：烈焰地獄',
        description: '解鎖深紅與橘黃色系的「烈焰」背景主題，感受燃燒的跑道！(每10關輪替)',
        cost: 8000,
        icon: Flame,
        oneTime: true,
        themeId: ThemeID.INFERNO
    },
    {
        id: 'THEME_GLACIER',
        name: '主題：極地冰封',
        description: '解鎖冰藍與白雪色系的「極地」背景主題，體驗寒冷的極速！(每10關輪替)',
        cost: 8000,
        icon: Wind, // Using Wind icon for cold/ice feel
        oneTime: true,
        themeId: ThemeID.GLACIER
    },
    {
        id: 'THEME_TOXIC',
        name: '主題：荒野毒氣',
        description: '解鎖酸綠與螢光色系的「荒野」背景主題，充滿危險的氣息！(每10關輪替)',
        cost: 8000,
        icon: Ghost,
        oneTime: true,
        themeId: ThemeID.TOXIC
    }
];

const ShopScreen: React.FC = () => {
    const { score, buyItem, closeShop, hasDoubleJump, hasImmortality, hasFireball, hasFlight, hasPassiveHeal, hasGemDoubler, hasMagnet, ownedPets, activePets, togglePet, lives, maxLives, ownedThemes } = useStore();

    const isOwned = (item: ShopItem) => {
        if (item.petId) return ownedPets.includes(item.petId);
        if (item.themeId) return ownedThemes.includes(item.themeId);
        switch (item.id) {
            case 'DOUBLE_JUMP': return hasDoubleJump;
            case 'IMMORTAL': return hasImmortality;
            case 'FIREBALL': return hasFireball;
            case 'FLIGHT': return hasFlight;
            case 'PASSIVE_HEAL': return hasPassiveHeal;
            case 'GEM_DOUBLER': return hasGemDoubler;
            case 'MAGNET': return hasMagnet;
            default: return false;
        }
    };

    return (
        <div className="absolute inset-0 bg-black/90 z-[100] text-white pointer-events-auto backdrop-blur-md overflow-y-auto custom-scrollbar">
             <div className="flex flex-col items-center justify-start min-h-full py-8 px-4">
                 <h2 className="text-3xl md:text-4xl font-black text-cyan-400 mb-2 font-cyber tracking-widest text-center">虛擬商店</h2>
                 
                 {/* Shop Status Bar: Gems + HP */}
                 <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl px-6 py-2 rounded-full border border-gray-700 flex items-center justify-between gap-6 text-white mb-6 shadow-[0_0_15px_rgba(0,255,255,0.1)] min-w-[300px]">
                     <div className="flex items-center text-yellow-400">
                         <Diamond className="w-5 h-5 mr-2 fill-yellow-400" />
                         <span className="text-xl md:text-2xl font-black font-mono">{score.toLocaleString()}</span>
                     </div>
                     <div className="w-px h-6 bg-gray-600"></div>
                     <div className="flex items-center space-x-1">
                        {[...Array(maxLives)].map((_, i) => (
                            <Heart 
                                key={i} 
                                className={`w-5 h-5 ${i < lives ? 'text-pink-500 fill-pink-500' : 'text-gray-600 fill-gray-600'}`} 
                            />
                        ))}
                     </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl w-full mb-8">
                     {SHOP_ITEMS.map(item => {
                         const Icon = item.icon;
                         const owned = isOwned(item);
                         // Logic: Sold out if one-time item is owned.
                         // Exception: Pets can be toggled, Themes are passive unlocks.
                         const isSoldOut = item.oneTime && owned && !item.petId && !item.themeId; 
                         const canAfford = score >= item.cost;
                         const isPet = !!item.petId;
                         const isTheme = !!item.themeId;
                         const isEquipped = isPet && activePets.includes(item.petId!);
                         
                         return (
                             <div 
                                key={item.id} 
                                className={`relative border p-4 md:p-6 rounded-xl flex flex-col items-center text-center transition-all duration-300 ${
                                    isSoldOut 
                                        ? 'bg-gray-900/40 border-gray-800 opacity-60 grayscale' 
                                        : 'bg-gray-900/80 border-gray-700 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)] hover:-translate-y-1'
                                }`}
                             >
                                 <div className={`p-3 md:p-4 rounded-full mb-3 md:mb-4 ${isSoldOut ? 'bg-gray-800 text-gray-500' : 'bg-gray-800 text-cyan-400'}`}>
                                     <Icon className="w-6 h-6 md:w-8 md:h-8" />
                                 </div>
                                 <h3 className={`text-lg md:text-xl font-bold mb-2 ${isSoldOut ? 'text-gray-500' : 'text-white'}`}>{item.name}</h3>
                                 <p className="text-gray-400 text-xs md:text-sm mb-4 h-10 md:h-12 flex items-center justify-center">{item.description}</p>
                                 
                                 {isPet && owned ? (
                                     <button 
                                        onClick={() => togglePet(item.petId!)}
                                        className={`px-4 md:px-6 py-2 rounded font-bold w-full text-sm md:text-base transition-colors ${
                                            isEquipped
                                                ? 'bg-green-600 hover:bg-green-500 text-white border border-green-400'
                                                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                        }`}
                                     >
                                         {isEquipped ? '已裝備 (點擊卸下)' : '點擊裝備'}
                                     </button>
                                 ) : isTheme && owned ? (
                                     <div className="px-4 md:px-6 py-2 rounded font-bold w-full text-sm md:text-base bg-gray-800 text-yellow-400 border border-yellow-600/50 cursor-default">
                                         已解鎖 (自動輪替)
                                     </div>
                                 ) : (
                                     <button 
                                        onClick={() => buyItem(item.id as any, item.cost, item.petId, item.themeId)}
                                        disabled={!canAfford || isSoldOut}
                                        className={`px-4 md:px-6 py-2 rounded font-bold w-full text-sm md:text-base transition-colors ${
                                            isSoldOut 
                                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                                                : canAfford 
                                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 text-white shadow-lg' 
                                                    : 'bg-red-900/20 text-red-400 border border-red-900/50 cursor-not-allowed'
                                        }`}
                                     >
                                         {isSoldOut ? '已購買' : (canAfford ? `${item.cost} 寶石` : '寶石不足')}
                                     </button>
                                 )}
                             </div>
                         );
                     })}
                 </div>

                 <button 
                    onClick={closeShop}
                    className="flex items-center px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg md:text-xl rounded hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,0,255,0.4)] mb-8"
                 >
                     繼續挑戰 <Play className="ml-2 w-5 h-5" fill="white" />
                 </button>
             </div>
        </div>
    );
};

// ... [WrongAnswerReview and MobileControls components remain unchanged] ...
const WrongAnswerReview: React.FC = () => {
    const { wrongAnswers } = useStore();
    if (wrongAnswers.length === 0) return null;

    return (
        <div className="w-full max-w-4xl mt-6 bg-red-900/30 border border-red-500/50 rounded-2xl p-6 overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.2)]">
             <div className="flex items-center text-red-300 mb-4 font-black text-xl md:text-2xl border-b border-red-500/30 pb-2">
                 <AlertCircle className="w-6 h-6 mr-3" />
                 <span>答錯題目複習 ({wrongAnswers.length}題)</span>
             </div>
             <div className="max-h-[50vh] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                 {wrongAnswers.map((item, idx) => (
                     <div key={idx} className="bg-black/60 p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 border border-red-500/20">
                         <div className="text-white font-serif text-2xl md:text-3xl font-bold">{item.question}</div>
                         <div className="flex items-center space-x-8 bg-gray-900/50 px-6 py-2 rounded-lg">
                             <div className="flex flex-col items-center">
                                 <span className="text-xs text-red-400 mb-1">您的答案</span>
                                 <span className="text-3xl font-black text-red-500 line-through opacity-70">{item.playerChar}</span>
                             </div>
                             <div className="w-px h-10 bg-gray-600"></div>
                             <div className="flex flex-col items-center">
                                 <span className="text-xs text-green-400 mb-1">正確答案</span>
                                 <span className="text-4xl font-black text-green-400 drop-shadow-[0_0_10px_lime]">{item.correctChar}</span>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
}

const MobileControls: React.FC = () => {
    const { 
        setManualSlowMotion, 
        hasFireball, lastFireballTime,
        hasFlight, isFlying, lastFlightEndTime,
        hasImmortality
    } = useStore();
    
    const [fireballCooldown, setFireballCooldown] = useState(0);
    const [flightCooldown, setFlightCooldown] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            if (hasFireball) setFireballCooldown(Math.max(0, 1000 - (now - lastFireballTime)));
            if (hasFlight) {
                if (!isFlying) setFlightCooldown(Math.max(0, 20000 - (now - lastFlightEndTime)));
                else setFlightCooldown(0);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [hasFireball, lastFireballTime, hasFlight, isFlying, lastFlightEndTime]);

    return (
        <div 
            className="absolute inset-0 pointer-events-none flex flex-col justify-end pb-8 px-4 z-[60]"
            style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
        >
            <div className="flex justify-between items-end w-full">
                {/* Left: Slow Motion Button */}
                <div className="pointer-events-auto">
                    <button
                        className="w-20 h-20 rounded-full bg-yellow-600/40 border-2 border-yellow-400/60 flex items-center justify-center active:scale-95 active:bg-yellow-500/60 transition-all backdrop-blur-sm shadow-lg"
                        onTouchStart={(e) => { e.preventDefault(); setManualSlowMotion(true); }}
                        onTouchEnd={(e) => { e.preventDefault(); setManualSlowMotion(false); }}
                        onMouseDown={() => setManualSlowMotion(true)}
                        onMouseUp={() => setManualSlowMotion(false)}
                        onMouseLeave={() => setManualSlowMotion(false)}
                    >
                        <Wind className="w-8 h-8 text-yellow-200" />
                    </button>
                    <div className="text-center text-yellow-200 text-xs mt-1 font-bold drop-shadow-md">按住減速</div>
                </div>

                {/* Right: Skills Grid */}
                <div className="pointer-events-auto flex gap-3 items-end">
                     {hasImmortality && (
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('cmd-immortal'))}
                            className="w-14 h-14 rounded-full bg-gray-800/60 border border-yellow-500/50 flex items-center justify-center active:scale-95 active:bg-yellow-500/40 transition-all backdrop-blur-sm"
                        >
                             <Shield className="w-6 h-6 text-yellow-400" />
                        </button>
                    )}

                    {hasFireball && (
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('cmd-fireball'))}
                                disabled={fireballCooldown > 0}
                                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center active:scale-95 transition-all backdrop-blur-sm ${
                                    fireballCooldown > 0 ? 'bg-gray-800/60 border-gray-600 opacity-50' : 
                                    'bg-orange-600/40 border-orange-400 hover:bg-orange-500/50'
                                }`}
                            >
                                <Flame className="w-7 h-7 text-orange-200" />
                            </button>
                            {fireballCooldown > 0 && <span className="text-[10px] text-gray-300 font-mono mt-1">{(fireballCooldown/1000).toFixed(1)}s</span>}
                        </div>
                    )}

                    {hasFlight && (
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('cmd-flight'))}
                                disabled={flightCooldown > 0 && !isFlying}
                                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center active:scale-95 transition-all backdrop-blur-sm ${
                                    isFlying ? 'bg-green-500/50 border-green-300 shadow-[0_0_15px_green]' :
                                    flightCooldown > 0 ? 'bg-gray-800/60 border-gray-600 opacity-50' : 
                                    'bg-blue-600/40 border-blue-400 hover:bg-blue-500/50'
                                }`}
                            >
                                <Rocket className={`w-7 h-7 ${isFlying ? 'text-white' : 'text-blue-200'}`} />
                            </button>
                            {flightCooldown > 0 && !isFlying && <span className="text-[10px] text-gray-300 font-mono mt-1">{(flightCooldown/1000).toFixed(0)}s</span>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const PauseScreen: React.FC = () => {
    const { setStatus, restartGame, returnToMenu } = useStore();
    return (
        <div className="absolute inset-0 bg-black/60 z-[100] text-white pointer-events-auto backdrop-blur-sm flex items-center justify-center">
             <div className="bg-gray-900/90 p-8 rounded-2xl border border-cyan-500/50 shadow-[0_0_40px_rgba(0,255,255,0.2)] flex flex-col items-center w-full max-w-sm">
                 <h2 className="text-4xl font-black text-white mb-8 font-cyber tracking-widest flex items-center">
                     <PauseCircle className="w-10 h-10 mr-3 text-cyan-400" /> 暫停
                 </h2>
                 
                 <button 
                    onClick={() => setStatus(GameStatus.PLAYING)}
                    className="w-full mb-4 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-xl hover:scale-105 transition-transform flex items-center justify-center shadow-lg"
                 >
                     <Play className="w-6 h-6 mr-2 fill-white" /> 繼續遊戲
                 </button>

                 <button 
                    onClick={() => { audio.init(); restartGame(); }}
                    className="w-full mb-4 py-4 bg-gray-700 rounded-xl font-bold text-xl text-gray-200 hover:bg-gray-600 hover:text-white transition-colors flex items-center justify-center"
                 >
                     <RotateCcw className="w-6 h-6 mr-2" /> 重新開始
                 </button>

                 <button 
                    onClick={() => returnToMenu()}
                    className="w-full py-4 bg-red-900/50 border border-red-500/30 rounded-xl font-bold text-xl text-red-200 hover:bg-red-900/80 transition-colors flex items-center justify-center"
                 >
                     <Home className="w-6 h-6 mr-2" /> 返回主畫面
                 </button>
             </div>
        </div>
    );
};

export const HUD: React.FC = () => {
  const { 
    score, lives, maxLives, status, setStatus, restartGame, startGame, 
    distance, isImmortalityActive, speed, currentVocab, totalCorrectAnswers, 
    isManualSlowMotion, toggleLesson, selectedLessonIds, 
    victoryTarget, setVictoryTarget, highScore, consecutiveIgnores,
    startingLivesSetting, setStartingLives, maxSpeedSetting, setMaxSpeed,
    difficulty, setDifficulty,
    ttsEnabled, setTtsEnabled,
    devMode, toggleDevMode,
    returnToMenu,
    wrongAnswers,
    setSpeed
  } = useStore();

  const [imageError, setImageError] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [activeTab, setActiveTab] = useState<'KX' | 'HL' | 'NY'>('HL'); 
  const [activeGrade, setActiveGrade] = useState<1 | 2 | 3>(1);

  useEffect(() => {
      const handleOnline = () => setIsOffline(false);
      const handleOffline = () => setIsOffline(true);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
      };
  }, []);
  
  const containerClass = "absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-8 z-50";

  // Calculate percentage based on current effective speed
  let speedMultiplier = 1.0;
  if (isManualSlowMotion) speedMultiplier *= 0.3;
  
  const effectiveSpeed = speed * speedMultiplier;
  const speedPercent = Math.round((effectiveSpeed / RUN_SPEED_BASE) * 100);

  // Calculate Accuracy for End Screens
  const totalAttempts = totalCorrectAnswers + wrongAnswers.length;
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrectAnswers / totalAttempts) * 100) : 0;

  if (status === GameStatus.SHOP) {
      return <ShopScreen />;
  }
  
  if (status === GameStatus.PAUSED) {
      return <PauseScreen />;
  }

  if (status === GameStatus.MENU) {
      const canStart = selectedLessonIds.length > 0;

      return (
          <div className="absolute inset-0 flex items-center justify-center z-[100] bg-black/80 backdrop-blur-sm p-4 pointer-events-auto overflow-y-auto">
              <button
                onClick={toggleDevMode}
                className={`fixed top-4 right-4 z-[200] flex items-center px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    devMode
                    ? 'bg-green-900/90 text-green-400 border-green-500 shadow-[0_0_10px_lime]'
                    : 'bg-gray-800/80 text-gray-500 border-gray-600 hover:bg-gray-700'
                }`}
              >
                <Terminal className="w-3 h-3 mr-1" />
                {devMode ? 'DEV MODE: ON' : 'DEV MODE'}
              </button>

              <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.2)] border border-white/10 animate-in zoom-in-95 duration-500 my-4">
                <div className="relative w-full bg-gray-900 flex flex-col">
                     <div className="relative h-48 md:h-56 overflow-hidden bg-gray-900 shrink-0">
                        {!imageError ? (
                            <img 
                                src="https://www.gstatic.com/aistudio/starter-apps/gemini_runner/gemini_runner.png" 
                                alt="Gemini Runner Cover" 
                                className="w-full h-full object-cover"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-purple-900 via-blue-900 to-black flex items-center justify-center">
                                <Rocket className="w-20 h-20 text-white/20" />
                            </div>
                        )}
                         <div className="absolute inset-0 bg-gradient-to-t from-[#050011] via-black/30 to-transparent"></div>
                         <div className="absolute inset-0 flex flex-col justify-end items-center p-4">
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-md tracking-wider">生字跑酷</h1>
                            <div className="flex items-center text-yellow-400 font-mono text-sm">
                                <Trophy className="w-4 h-4 mr-1" /> 最高分: {highScore.toLocaleString()}
                            </div>
                         </div>
                     </div>

                     <div className="p-6 md:p-8 bg-gradient-to-b from-[#050011] to-gray-900">
                        <div className="mb-6 bg-gray-800/40 rounded-xl p-4 border border-gray-700">
                            <div className="flex items-center text-gray-300 font-bold mb-4">
                                <Settings className="w-4 h-4 mr-2" /> 遊戲設定
                            </div>
                            <div className="flex flex-wrap gap-4 mb-4">
                                <button
                                    onClick={() => setTtsEnabled(!ttsEnabled)}
                                    className={`flex items-center px-4 py-2 rounded-lg font-bold transition-all border ${
                                        ttsEnabled 
                                        ? 'bg-green-600 border-green-400 text-white' 
                                        : 'bg-gray-700 border-gray-600 text-gray-400'
                                    }`}
                                >
                                    {ttsEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                                    {ttsEnabled ? '語音朗讀: 開啟' : '語音朗讀: 關閉'}
                                </button>
                            </div>

                            <div className="mb-4">
                                <div className="text-sm text-gray-400 mb-2 flex items-center"><Target className="w-3 h-3 mr-1"/> 挑戰題數</div>
                                <div className="flex gap-2">
                                    {[20, 30, 40, 0].map((target) => (
                                        <button
                                            key={target}
                                            onClick={() => setVictoryTarget(target)}
                                            className={`flex-1 py-1.5 rounded-md text-sm font-bold transition-all flex items-center justify-center ${
                                                victoryTarget === target 
                                                ? 'bg-yellow-500 text-black shadow-lg' 
                                                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                            }`}
                                        >
                                            {target === 0 ? <Infinity className="w-4 h-4" /> : `${target} 題`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <div className="text-sm text-gray-400 mb-2 flex items-center"><Heart className="w-3 h-3 mr-1"/> 初始生命</div>
                                    <div className="flex gap-2">
                                        {[3, 5, 8].map((val) => (
                                            <button
                                                key={val}
                                                onClick={() => setStartingLives(val)}
                                                className={`flex-1 py-1.5 rounded-md text-sm font-bold transition-all ${
                                                    startingLivesSetting === val 
                                                    ? 'bg-pink-500 text-white shadow-lg' 
                                                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                                }`}
                                            >
                                                {val}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-2 flex items-center"><Zap className="w-3 h-3 mr-1"/> 最高速度</div>
                                    <div className="flex gap-2">
                                        {[100, 150, 0].map((val) => (
                                            <button
                                                key={val}
                                                onClick={() => setMaxSpeed(val)}
                                                className={`flex-1 py-1.5 rounded-md text-sm font-bold transition-all ${
                                                    maxSpeedSetting === val 
                                                    ? 'bg-cyan-500 text-white shadow-lg' 
                                                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                                }`}
                                            >
                                                {val === 0 ? '無限' : val}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 mb-2 flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> 障礙難度</div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setDifficulty(Difficulty.SUPER_SIMPLE)}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center ${
                                            difficulty === Difficulty.SUPER_SIMPLE
                                            ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-300' 
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                        }`}
                                    >
                                        <Baby className="w-4 h-4 mr-1" />
                                        超級簡單
                                    </button>
                                    <button
                                        onClick={() => setDifficulty(Difficulty.SIMPLE)}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center ${
                                            difficulty === Difficulty.SIMPLE
                                            ? 'bg-green-600 text-white shadow-lg' 
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                        }`}
                                    >
                                        簡單 (一般)
                                    </button>
                                    <button
                                        onClick={() => setDifficulty(Difficulty.COMPLEX)}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center ${
                                            difficulty === Difficulty.COMPLEX
                                            ? 'bg-red-600 text-white shadow-lg border border-red-400' 
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                        }`}
                                    >
                                        複雜 (挑戰)
                                    </button>
                                </div>
                                <div className="text-[10px] text-gray-500 mt-1 text-center">
                                    {difficulty === Difficulty.SUPER_SIMPLE ? "撞到障礙物不會扣血 (適合練習)" : difficulty === Difficulty.COMPLEX ? "會出現需「二段跳」的高牆與需「跳躍/攻擊」的寬牆" : "僅出現標準障礙物"}
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center justify-center text-cyan-400 mb-4 font-bold text-lg">
                                <BookOpen className="w-5 h-5 mr-2" /> 
                                <span>題庫選擇 (可複選)</span>
                            </div>
                            <div className="flex space-x-2 mb-2">
                                <button onClick={() => setActiveTab('KX')} className={`flex-1 py-2 rounded-t-lg font-bold border-b-2 transition-colors ${activeTab === 'KX' ? 'bg-gray-700 border-cyan-400 text-white' : 'bg-gray-800 border-transparent text-gray-500 hover:text-gray-300'}`}>康軒</button>
                                <button onClick={() => setActiveTab('HL')} className={`flex-1 py-2 rounded-t-lg font-bold border-b-2 transition-colors ${activeTab === 'HL' ? 'bg-gray-700 border-cyan-400 text-white' : 'bg-gray-800 border-transparent text-gray-500 hover:text-gray-300'}`}>翰林</button>
                                <button onClick={() => setActiveTab('NY')} className={`flex-1 py-2 rounded-t-lg font-bold border-b-2 transition-colors ${activeTab === 'NY' ? 'bg-gray-700 border-cyan-400 text-white' : 'bg-gray-800 border-transparent text-gray-500 hover:text-gray-300'}`}>南一</button>
                            </div>
                             <div className="flex space-x-2 mb-4 px-4">
                                <button onClick={() => setActiveGrade(1)} className={`flex-1 py-1 rounded-full text-sm font-bold transition-colors ${activeGrade === 1 ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>一年級</button>
                                <button onClick={() => setActiveGrade(2)} className={`flex-1 py-1 rounded-full text-sm font-bold transition-colors ${activeGrade === 2 ? 'bg-purple-600 text-white ring-2 ring-purple-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>二年級</button>
                                <button onClick={() => setActiveGrade(3)} className={`flex-1 py-1 rounded-full text-sm font-bold transition-colors ${activeGrade === 3 ? 'bg-orange-600 text-white ring-2 ring-orange-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>三年級</button>
                            </div>
                            <div className="grid grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar bg-gray-800/30 p-3 rounded-b-lg">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => {
                                        const id = `${activeTab}_${activeGrade}_${num}`; // e.g. KX_1_1
                                        const isAvailable = !!LESSON_DATA[id];
                                        const isSelected = selectedLessonIds.includes(id);
                                        const vocabList = LESSON_DATA[id] || [];
                                        const previewText = vocabList.length > 0 
                                            ? vocabList.slice(0, 3).map(v => v.char).join('、') 
                                            : '無內容';

                                        if (!isAvailable) {
                                            return (
                                                 <div key={id} className="aspect-square rounded-lg border border-gray-800 bg-gray-900/30 flex items-center justify-center opacity-50">
                                                     <span className="text-gray-700 font-bold text-lg">{num}</span>
                                                 </div>
                                            )
                                        }

                                        return (
                                            <button
                                                key={id}
                                                onClick={() => toggleLesson(id)}
                                                className={`group relative aspect-square rounded-lg border text-xs font-bold transition-all flex flex-col items-center justify-center ${isSelected 
                                                    ? 'bg-cyan-900/60 border-cyan-400 text-white shadow-[0_0_5px_rgba(0,255,255,0.2)]' 
                                                    : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:bg-gray-800'}`}
                                            >
                                                <span className={`text-2xl md:text-3xl font-black mb-1 ${isSelected ? 'text-cyan-400' : 'text-gray-500'}`}>{num}</span>
                                                {isSelected && <div className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_5px_cyan]"></div>}
                                                <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[10px] text-gray-300 py-1 px-1 text-center opacity-0 group-hover:opacity-100 transition-opacity truncate rounded-b-lg">
                                                    {previewText}...
                                                </div>
                                            </button>
                                        );
                                })}
                            </div>
                             <div className="mt-2 text-right text-xs text-gray-500">
                                已選擇 {selectedLessonIds.length} 個題庫
                            </div>
                        </div>

                        <button 
                          onClick={() => { 
                              if (canStart) {
                                audio.init(); 
                                startGame(); 
                              }
                          }}
                          disabled={!canStart}
                          className={`w-full group relative px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-xl rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,255,0.2)] overflow-hidden ${!canStart ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:bg-white/20 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] hover:border-cyan-400'}`}
                        >
                            {canStart && <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>}
                            <span className="relative z-10 tracking-widest flex items-center justify-center">
                                {canStart ? (
                                    <>開始遊戲 <Play className="ml-2 w-5 h-5 fill-white" /></>
                                ) : (
                                    <>請先選擇題庫</>
                                )}
                            </span>
                        </button>
                        
                        <div className="mt-4 text-center">
                            <p className="text-cyan-400/60 text-[10px] md:text-xs font-mono tracking-wider">
                                [ 按住空白鍵或螢幕左下角按鈕可減慢速度 ]
                            </p>
                        </div>
                     </div>
                </div>
              </div>
          </div>
      );
  }

  if (status === GameStatus.GAME_OVER) {
       return (
          <div className="absolute inset-0 bg-black/90 z-[100] text-white pointer-events-auto backdrop-blur-sm overflow-y-auto custom-scrollbar">
              <div className="flex flex-col items-center justify-start min-h-full py-12 px-4">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] font-cyber text-center">遊戲結束</h1>
                
                <div className="grid grid-cols-1 gap-3 md:gap-4 text-center mb-6 w-full max-w-md">
                    <div className="bg-gray-900/80 p-3 md:p-4 rounded-lg border border-gray-700 flex items-center justify-between">
                        <div className="flex items-center text-yellow-400 text-sm md:text-base"><Trophy className="mr-2 w-4 h-4 md:w-5 md:h-5"/> 答題進度</div>
                        <div className="text-xl md:text-2xl font-bold font-mono">{totalCorrectAnswers} / {victoryTarget === 0 ? '∞' : victoryTarget}</div>
                    </div>
                    <div className="bg-gray-900/80 p-3 md:p-4 rounded-lg border border-gray-700 flex items-center justify-between">
                        <div className="flex items-center text-green-400 text-sm md:text-base"><Percent className="mr-2 w-4 h-4 md:w-5 md:h-5"/> 正確率</div>
                        <div className="text-xl md:text-2xl font-bold font-mono">{accuracy}%</div>
                    </div>
                     <div className="bg-gray-800/50 p-3 md:p-4 rounded-lg flex items-center justify-between mt-2">
                        <div className="flex items-center text-white text-sm md:text-base">得分</div>
                        <div className="text-2xl md:text-3xl font-bold font-cyber text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{score.toLocaleString()}</div>
                    </div>
                </div>

                <button 
                  onClick={() => { audio.init(); restartGame(); }}
                  className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg md:text-xl rounded hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                >
                    再試一次
                </button>
                
                <button 
                    onClick={() => returnToMenu()}
                    className="mt-4 px-6 py-3 bg-gray-800 text-gray-300 font-bold rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                >
                    回主選單
                </button>

                <WrongAnswerReview />
              </div>
          </div>
      );
  }

  if (status === GameStatus.VICTORY) {
    return (
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/90 to-black/95 z-[100] text-white pointer-events-auto backdrop-blur-md overflow-y-auto custom-scrollbar">
            <div className="flex flex-col items-center justify-start min-h-full py-12 px-4">
                <Rocket className="w-16 h-16 md:w-24 md:h-24 text-yellow-400 mb-4 animate-bounce drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
                <h1 className="text-3xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-500 to-pink-500 mb-2 drop-shadow-[0_0_20px_rgba(255,165,0,0.6)] font-cyber text-center leading-tight">
                    挑戰成功！
                </h1>
                <p className="text-cyan-300 text-lg mb-6">您已完成所有 {victoryTarget} 道題目！</p>
                
                <div className="grid grid-cols-1 gap-4 text-center mb-8 w-full max-w-md">
                    <div className="bg-black/60 p-6 rounded-xl border border-yellow-500/30 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-sm text-gray-400">正確率</div>
                            <div className="text-2xl font-bold text-green-400">{accuracy}%</div>
                        </div>
                        <div className="w-full h-px bg-gray-700 mb-4"></div>
                        <div className="text-xs md:text-sm text-gray-400 mb-1 tracking-wider">最終得分</div>
                        <div className="text-3xl md:text-4xl font-bold font-cyber text-yellow-400">{score.toLocaleString()}</div>
                    </div>
                </div>

                <button 
                  onClick={() => { audio.init(); restartGame(); }}
                  className="px-8 md:px-12 py-4 md:py-5 bg-white text-black font-black text-lg md:text-xl rounded hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] tracking-widest"
                >
                    重新挑戰
                </button>

                <button 
                    onClick={() => returnToMenu()}
                    className="mt-4 px-6 py-3 bg-gray-800 text-gray-300 font-bold rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                >
                    回主選單
                </button>

                <WrongAnswerReview />
            </div>
        </div>
    );
  }

  return (
    <div className={containerClass}>
        {/* Top Bar */}
        <div className="flex justify-between items-start w-full">
            {/* Left Side: Score & Pause */}
            <div className="flex flex-col items-start">
                <div className="flex items-center">
                     {/* PAUSE BUTTON */}
                     <button 
                        onClick={() => setStatus(GameStatus.PAUSED)}
                        className="pointer-events-auto mr-4 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/80 text-cyan-400 border border-cyan-500/30 transition-all"
                     >
                         <PauseCircle className="w-8 h-8 md:w-10 md:h-10" />
                     </button>
                     
                     <div className="text-3xl md:text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_#00ffff] font-cyber">
                        {score.toLocaleString()}
                    </div>
                </div>
            </div>
            
            {/* Right Side: Lives */}
            <div className="flex space-x-1 md:space-x-2">
                {[...Array(maxLives)].map((_, i) => (
                    <Heart 
                        key={i} 
                        className={`w-6 h-6 md:w-8 md:h-8 ${i < lives ? 'text-pink-500 fill-pink-500' : 'text-gray-800 fill-gray-800'} drop-shadow-[0_0_5px_#ff0054]`} 
                    />
                ))}
            </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50">
             <div className="text-sm md:text-lg text-purple-300 font-bold tracking-wider font-mono bg-black/50 px-3 py-1 rounded-full border border-purple-500/30 backdrop-blur-sm">
                答題進度: {totalCorrectAnswers} / {victoryTarget === 0 ? '∞' : victoryTarget}
             </div>
             <div className="text-[10px] text-gray-400 mt-1">
                 {selectedLessonIds.length > 1 ? `多重題庫 (${selectedLessonIds.length})` : selectedLessonIds.length === 1 ? LESSON_NAMES[selectedLessonIds[0]?.split('_')[0]] + ' ' + selectedLessonIds[0]?.split('_')[2] + '課' : '未選擇題庫'}
             </div>
        </div>

        {/* QUESTION DISPLAY */}
        {currentVocab && (
             <div className="absolute top-20 md:top-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="bg-black/80 backdrop-blur-md border border-cyan-500/50 rounded-2xl p-4 md:p-6 shadow-[0_0_30px_rgba(0,255,255,0.3)] min-w-[280px] md:min-w-[400px] text-center relative">
                     {/* TTS Button on Question Box */}
                     {ttsEnabled && (
                         <button 
                            onClick={() => {
                                const cleanText = currentVocab.question.replace(/\(\s*\)/g, '').replace(/\s+/g, '');
                                const u = new SpeechSynthesisUtterance(cleanText);
                                u.lang = 'zh-TW';
                                window.speechSynthesis.cancel();
                                window.speechSynthesis.speak(u);
                            }}
                            className="absolute top-2 right-2 pointer-events-auto text-cyan-500 hover:text-white"
                         >
                             <Volume2 className="w-4 h-4" />
                         </button>
                     )}

                    <div className="flex items-center justify-center space-x-2 mb-2 text-cyan-400 opacity-80 text-sm font-mono tracking-widest">
                        <HelpCircle className="w-4 h-4" /> 
                        <span>請填入正確的字</span>
                    </div>
                    <div className="text-4xl md:text-6xl font-black text-white font-serif drop-shadow-md">
                        {currentVocab.question}
                    </div>
                </div>
                
                {consecutiveIgnores >= 3 && (
                    <div className="mt-4 animate-bounce flex flex-col items-center">
                        <div className="text-xs text-yellow-300 mb-1 font-bold tracking-widest">提示: 正解為</div>
                        <div className="text-4xl font-black text-yellow-400 bg-black/80 px-4 py-1 rounded-lg border border-yellow-500 shadow-[0_0_15px_gold]">
                            {currentVocab.char}
                        </div>
                    </div>
                )}
             </div>
        )}

        {/* Active Skill Indicator */}
        {isImmortalityActive && (
             <div className="absolute top-48 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-xl md:text-2xl animate-pulse flex items-center drop-shadow-[0_0_10px_gold]">
                 <Shield className="mr-2 fill-yellow-400" /> 無敵狀態
             </div>
        )}
        
        {/* Render Mobile Controls */}
        <MobileControls />

        {/* Bottom Overlay Speed Indicator & Offline Status */}
        {/* Raised from bottom-20 to bottom-32 to avoid overlap with skill buttons */}
        <div className="w-full flex justify-end items-end absolute bottom-32 right-4 pointer-events-none flex-col items-end space-y-2">
             {isOffline && (
                 <div className="flex items-center space-x-2 text-red-400 bg-black/50 px-2 py-1 rounded">
                     <WifiOff className="w-4 h-4" />
                     <span className="text-xs font-bold">離線模式</span>
                 </div>
             )}
             <div className="flex items-center space-x-2 text-cyan-500 opacity-70">
                 <Zap className={`w-4 h-4 md:w-6 md:h-6 ${isManualSlowMotion ? '' : 'animate-pulse'}`} />
                 <span className={`font-mono text-base md:text-xl ${isManualSlowMotion ? 'text-yellow-400' : ''}`}>速度 {speedPercent}%</span>
                 
                 {devMode && (
                     <div className="flex space-x-1 ml-2 pointer-events-auto">
                         <button onClick={() => setSpeed(Math.max(0, speed - 10))} className="px-2 py-0.5 bg-gray-800 text-white text-xs rounded border border-gray-600 active:bg-gray-700">-</button>
                         <button onClick={() => setSpeed(speed + 10)} className="px-2 py-0.5 bg-gray-800 text-white text-xs rounded border border-gray-600 active:bg-gray-700">+</button>
                     </div>
                 )}
             </div>
        </div>
        
        {isManualSlowMotion && (
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-yellow-300 bg-yellow-900/40 px-4 py-1 rounded border border-yellow-500/30 pointer-events-none">
                手動減速中
            </div>
        )}
    </div>
  );
};
