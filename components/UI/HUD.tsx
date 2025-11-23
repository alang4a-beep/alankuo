
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { Heart, Zap, Trophy, MapPin, Diamond, Rocket, ArrowUpCircle, Shield, Activity, PlusCircle, Play, HelpCircle, BookOpen, AlertCircle, Flame, Wind, Target, CheckSquare, Square, WifiOff } from 'lucide-react';
import { useStore } from '../../store';
import { GameStatus, ShopItem, RUN_SPEED_BASE } from '../../types';
import { audio } from '../System/Audio';
import { LESSON_NAMES } from '../../store';

// Available Shop Items (Traditional Chinese)
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
        id: 'MAX_LIFE',
        name: '提升生命上限',
        description: '永久增加一個生命格並恢復生命。',
        cost: 1500,
        icon: Activity
    },
    {
        id: 'HEAL',
        name: '修復工具包',
        description: '立即恢復 1 點生命值。',
        cost: 1000,
        icon: PlusCircle
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
        id: 'FIREBALL',
        name: '烈焰衝擊',
        description: '解鎖技能：按下 X 發射火焰摧毀障礙，並獲得 500 寶石 (冷卻 5 秒)。',
        cost: 1500,
        icon: Flame,
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
        id: 'PASSIVE_HEAL',
        name: '生命充能',
        description: '被動技能：每答對 3 題自動恢復 1 點生命。',
        cost: 3000,
        icon: Heart,
        oneTime: true
    },
    {
        id: 'GEM_DOUBLER',
        name: '寶石增幅器',
        description: '解鎖技能：按下「下」鍵，20秒內獲得寶石翻倍 (冷卻 3 秒)。',
        cost: 3000,
        icon: Diamond,
        oneTime: true
    }
];

const ShopScreen: React.FC = () => {
    const { score, buyItem, closeShop, hasDoubleJump, hasImmortality, hasFireball, hasFlight, hasPassiveHeal, hasGemDoubler } = useStore();
    const [items, setItems] = useState<ShopItem[]>([]);

    useEffect(() => {
        let pool = SHOP_ITEMS.filter(item => {
            if (item.id === 'DOUBLE_JUMP' && hasDoubleJump) return false;
            if (item.id === 'IMMORTAL' && hasImmortality) return false;
            if (item.id === 'FIREBALL' && hasFireball) return false;
            if (item.id === 'FLIGHT' && hasFlight) return false;
            if (item.id === 'PASSIVE_HEAL' && hasPassiveHeal) return false;
            if (item.id === 'GEM_DOUBLER' && hasGemDoubler) return false;
            return true;
        });

        pool = pool.sort(() => 0.5 - Math.random());
        setItems(pool.slice(0, 3));
    }, []);

    return (
        <div className="absolute inset-0 bg-black/90 z-[100] text-white pointer-events-auto backdrop-blur-md overflow-y-auto">
             <div className="flex flex-col items-center justify-center min-h-full py-8 px-4">
                 <h2 className="text-3xl md:text-4xl font-black text-cyan-400 mb-2 font-cyber tracking-widest text-center">虛擬商店</h2>
                 <div className="flex items-center text-yellow-400 mb-6 md:mb-8">
                     <span className="text-base md:text-lg mr-2">目前寶石:</span>
                     <span className="text-xl md:text-2xl font-bold">{score.toLocaleString()}</span>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full mb-8">
                     {items.map(item => {
                         const Icon = item.icon;
                         const canAfford = score >= item.cost;
                         return (
                             <div key={item.id} className="bg-gray-900/80 border border-gray-700 p-4 md:p-6 rounded-xl flex flex-col items-center text-center hover:border-cyan-500 transition-colors">
                                 <div className="bg-gray-800 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                                     <Icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                                 </div>
                                 <h3 className="text-lg md:text-xl font-bold mb-2">{item.name}</h3>
                                 <p className="text-gray-400 text-xs md:text-sm mb-4 h-10 md:h-12 flex items-center justify-center">{item.description}</p>
                                 <button 
                                    onClick={() => buyItem(item.id as any, item.cost)}
                                    disabled={!canAfford}
                                    className={`px-4 md:px-6 py-2 rounded font-bold w-full text-sm md:text-base ${canAfford ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110' : 'bg-gray-700 cursor-not-allowed opacity-50'}`}
                                 >
                                     {item.cost} 寶石
                                 </button>
                             </div>
                         );
                     })}
                 </div>

                 <button 
                    onClick={closeShop}
                    className="flex items-center px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg md:text-xl rounded hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                 >
                     繼續挑戰 <Play className="ml-2 w-5 h-5" fill="white" />
                 </button>
             </div>
        </div>
    );
};

const WrongAnswerReview: React.FC = () => {
    const { wrongAnswers } = useStore();
    if (wrongAnswers.length === 0) return null;

    return (
        <div className="w-full max-w-2xl mt-6 bg-red-900/20 border border-red-500/50 rounded-xl p-4 overflow-hidden">
             <div className="flex items-center text-red-400 mb-2 font-bold">
                 <AlertCircle className="w-5 h-5 mr-2" />
                 <span>答錯題目複習</span>
             </div>
             <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                 {wrongAnswers.map((item, idx) => (
                     <div key={idx} className="bg-black/40 p-3 rounded flex justify-between items-center text-sm">
                         <div className="text-gray-300 font-serif text-lg">{item.question}</div>
                         <div className="flex items-center space-x-4">
                             <div className="flex flex-col items-center">
                                 <span className="text-xs text-red-500">您的答案</span>
                                 <span className="text-xl font-bold text-red-400">{item.playerChar}</span>
                             </div>
                             <div className="flex flex-col items-center">
                                 <span className="text-xs text-green-500">正確答案</span>
                                 <span className="text-xl font-bold text-green-400">{item.correctChar}</span>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
}

// --- New Mobile Virtual Controls ---
const MobileControls: React.FC = () => {
    const { 
        setManualSlowMotion, 
        hasFireball, lastFireballTime,
        hasFlight, isFlying, flightStartTime, lastFlightEndTime,
        hasGemDoubler, isGemDoublerActive, nextGemDoublerAvailableTime, gemDoublerEndTime,
        hasImmortality
    } = useStore();
    
    // Status Calculation helpers (Duplicated locally for button visual states)
    const [fireballCooldown, setFireballCooldown] = useState(0);
    const [flightCooldown, setFlightCooldown] = useState(0);
    const [gemCooldown, setGemCooldown] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            if (hasFireball) setFireballCooldown(Math.max(0, 5000 - (now - lastFireballTime))); // Cooldown reduced to 5000ms
            if (hasFlight) {
                if (!isFlying) setFlightCooldown(Math.max(0, 20000 - (now - lastFlightEndTime)));
                else setFlightCooldown(0);
            }
            if (hasGemDoubler) {
                if (!isGemDoublerActive) setGemCooldown(Math.max(0, nextGemDoublerAvailableTime - now));
                else setGemCooldown(0);
            }
        }, 200);
        return () => clearInterval(interval);
    }, [hasFireball, lastFireballTime, hasFlight, isFlying, lastFlightEndTime, hasGemDoubler, isGemDoublerActive, nextGemDoublerAvailableTime]);

    return (
        // Updated padding to be safe from bottom bars (pb-8) and added style for safe-area support
        <div 
            className="absolute inset-0 pointer-events-none flex flex-col justify-end pb-8 px-4 z-[60]"
            style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
        >
            <div className="flex justify-between items-end w-full">
                {/* Left: Slow Motion Button (Hold) */}
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

                    {hasGemDoubler && (
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('cmd-gem-doubler'))}
                                disabled={gemCooldown > 0 || isGemDoublerActive}
                                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center active:scale-95 transition-all backdrop-blur-sm ${
                                    isGemDoublerActive ? 'bg-pink-500/50 border-pink-300 animate-pulse' :
                                    gemCooldown > 0 ? 'bg-gray-800/60 border-gray-600 opacity-50' : 
                                    'bg-purple-600/40 border-purple-400 hover:bg-purple-500/50'
                                }`}
                            >
                                <Diamond className={`w-7 h-7 ${isGemDoublerActive ? 'text-white' : 'text-purple-200'}`} />
                            </button>
                            {gemCooldown > 0 && <span className="text-[10px] text-gray-300 font-mono mt-1">{(gemCooldown/1000).toFixed(0)}s</span>}
                        </div>
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
                            {fireballCooldown > 0 && <span className="text-[10px] text-gray-300 font-mono mt-1">{(fireballCooldown/1000).toFixed(0)}s</span>}
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

export const HUD: React.FC = () => {
  const { score, lives, maxLives, status, level, restartGame, startGame, gemsCollected, distance, isImmortalityActive, speed, currentVocab, totalCorrectAnswers, isManualSlowMotion, toggleLesson, selectedLessonIds, victoryTarget, setVictoryTarget, highScore } = useStore();
  const [imageError, setImageError] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
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

  if (status === GameStatus.SHOP) {
      return <ShopScreen />;
  }

  if (status === GameStatus.MENU) {
      return (
          <div className="absolute inset-0 flex items-center justify-center z-[100] bg-black/80 backdrop-blur-sm p-4 pointer-events-auto overflow-y-auto">
              <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.2)] border border-white/10 animate-in zoom-in-95 duration-500 my-8">
                <div className="relative w-full bg-gray-900 flex flex-col">
                     <div className="relative h-48 md:h-64 overflow-hidden bg-gray-900">
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
                        
                        {/* Game Goal Selector */}
                        <div className="mb-6">
                            <div className="flex items-center justify-center text-yellow-400 mb-4 font-bold text-lg">
                                <Target className="w-5 h-5 mr-2" /> 
                                <span>設定挑戰題數</span>
                            </div>
                            <div className="flex justify-center gap-4">
                                {[20, 30, 40].map((target) => (
                                    <button
                                        key={target}
                                        onClick={() => setVictoryTarget(target)}
                                        className={`px-6 py-2 rounded-full font-bold text-sm md:text-base transition-all ${
                                            victoryTarget === target 
                                            ? 'bg-yellow-500 text-black shadow-[0_0_15px_gold] scale-105' 
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                        }`}
                                    >
                                        {target} 題
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Lesson Selector (Multi-select) */}
                        <div className="mb-8">
                            <div className="flex items-center justify-center text-cyan-400 mb-4 font-bold text-lg">
                                <BookOpen className="w-5 h-5 mr-2" /> 
                                <span>請選擇題庫 (可複選)</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {Object.entries(LESSON_NAMES).map(([id, name]) => {
                                    const isSelected = selectedLessonIds.includes(id);
                                    return (
                                        <button
                                            key={id}
                                            onClick={() => toggleLesson(id)}
                                            className={`p-3 rounded-lg border text-sm font-bold transition-all flex items-center justify-between ${isSelected 
                                                ? 'bg-cyan-900/60 border-cyan-400 text-white shadow-[0_0_10px_rgba(0,255,255,0.2)]' 
                                                : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:bg-gray-800'}`}
                                        >
                                            <span>{name}</span>
                                            {isSelected ? <CheckSquare className="w-5 h-5 text-cyan-400" /> : <Square className="w-5 h-5 text-gray-600" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <button 
                          onClick={() => { audio.init(); startGame(); }}
                          className="w-full group relative px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-xl rounded-xl hover:bg-white/20 transition-all shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] hover:border-cyan-400 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <span className="relative z-10 tracking-widest flex items-center justify-center">
                                開始遊戲 <Play className="ml-2 w-5 h-5 fill-white" />
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
                        <div className="text-xl md:text-2xl font-bold font-mono">{totalCorrectAnswers} / {victoryTarget}</div>
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
                
                {/* WRONG ANSWER REVIEW LIST */}
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

                {/* WRONG ANSWER REVIEW LIST */}
                <WrongAnswerReview />
            </div>
        </div>
    );
  }

  return (
    <div className={containerClass}>
        {/* Top Bar */}
        <div className="flex justify-between items-start w-full">
            <div className="flex flex-col">
                <div className="text-3xl md:text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_#00ffff] font-cyber">
                    {score.toLocaleString()}
                </div>
            </div>
            
            <div className="flex space-x-1 md:space-x-2">
                {[...Array(maxLives)].map((_, i) => (
                    <Heart 
                        key={i} 
                        className={`w-6 h-6 md:w-8 md:h-8 ${i < lives ? 'text-pink-500 fill-pink-500' : 'text-gray-800 fill-gray-800'} drop-shadow-[0_0_5px_#ff0054]`} 
                    />
                ))}
            </div>
        </div>
        
        {/* Progress Indicator - NOW SHOWS TOTAL / TARGET */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50">
             <div className="text-sm md:text-lg text-purple-300 font-bold tracking-wider font-mono bg-black/50 px-3 py-1 rounded-full border border-purple-500/30 backdrop-blur-sm">
                答題進度: {totalCorrectAnswers} / {victoryTarget}
             </div>
             <div className="text-[10px] text-gray-400 mt-1">{selectedLessonIds.length > 1 ? `多重題庫 (${selectedLessonIds.length})` : LESSON_NAMES[selectedLessonIds[0]]}</div>
        </div>

        {/* QUESTION DISPLAY */}
        {currentVocab && (
             <div className="absolute top-20 md:top-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="bg-black/80 backdrop-blur-md border border-cyan-500/50 rounded-2xl p-4 md:p-6 shadow-[0_0_30px_rgba(0,255,255,0.3)] min-w-[280px] md:min-w-[400px] text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2 text-cyan-400 opacity-80 text-sm font-mono tracking-widest">
                        <HelpCircle className="w-4 h-4" /> 
                        <span>請填入正確的字</span>
                    </div>
                    <div className="text-4xl md:text-6xl font-black text-white font-serif drop-shadow-md">
                        {currentVocab.question}
                    </div>
                </div>
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
        <div className="w-full flex justify-end items-end absolute bottom-20 right-4 pointer-events-none flex-col items-end space-y-2">
             {isOffline && (
                 <div className="flex items-center space-x-2 text-red-400 bg-black/50 px-2 py-1 rounded">
                     <WifiOff className="w-4 h-4" />
                     <span className="text-xs font-bold">離線模式</span>
                 </div>
             )}
             <div className="flex items-center space-x-2 text-cyan-500 opacity-70">
                 <Zap className={`w-4 h-4 md:w-6 md:h-6 ${isManualSlowMotion ? '' : 'animate-pulse'}`} />
                 <span className={`font-mono text-base md:text-xl ${isManualSlowMotion ? 'text-yellow-400' : ''}`}>速度 {speedPercent}%</span>
             </div>
        </div>
        
        {/* Manual Slow Motion UI Hint */}
        {isManualSlowMotion && (
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-yellow-300 bg-yellow-900/40 px-4 py-1 rounded border border-yellow-500/30 pointer-events-none">
                手動減速中
            </div>
        )}
    </div>
  );
};