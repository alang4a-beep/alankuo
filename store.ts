
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { create } from 'zustand';
import { GameStatus, RUN_SPEED_BASE, VocabItem, WrongAnswer, Difficulty, PetID } from './types';

// IDs format: PUBLISHER_GRADE_LESSON (e.g., KX_1_1, HL_3_12)
export const LESSON_DATA: Record<string, VocabItem[]> = {
    // =========================================================================
    // 康軒 (Kangxuan) - Grade 1
    // =========================================================================
    'KX_1_1': [
        { char: '拍', question: '( )ㄆㄞ 手' }, { char: '手', question: '雙( )ㄕㄡˇ' }, { char: '左', question: '( )ㄗㄨㄛˇ 邊' }, 
        { char: '右', question: '( )ㄧㄡˋ 邊' }, { char: '你', question: '( )ㄋㄧˇ 好' }, { char: '他', question: '( )ㄊㄚ 們' }, 
        { char: '也', question: '( )ㄧㄝˇ 是' }, { char: '上', question: '( )ㄕㄤˋ 面' }, { char: '下', question: '( )ㄒㄧㄚˋ 面' }
    ],
    'KX_1_2': [
        { char: '這', question: '( )ㄓㄜˋ 裡' }, { char: '是', question: '不( )ㄕˋ' }, { char: '誰', question: '( )ㄕㄟˊ 的' }, 
        { char: '的', question: '我( )ㄉㄜ˙' }, { char: '我', question: '( )ㄨㄛˇ 們' }, { char: '分', question: '( )ㄈㄣ 開' }, 
        { char: '好', question: '( )ㄏㄠˇ 人' }, { char: '了', question: '走( )ㄌㄜ˙' }, { char: '啊', question: '好( )ㄚ' }, 
        { char: '多', question: '很( )ㄉㄨㄛ' }, { char: '個', question: '一( )ㄍㄜ˙' }
    ],
    'KX_1_3': [
        { char: '秋', question: '( )ㄑㄧㄡ 千' }, { char: '千', question: '( )ㄑㄧㄢ 萬' }, { char: '和', question: '( )ㄏㄜˊ 平' }, 
        { char: '玩', question: '( )ㄨㄢˊ 具' }, { char: '陪', question: '( )ㄆㄟˊ 伴' }, { char: '高', question: '( )ㄍㄠ 興' }, 
        { char: '山', question: '爬( )ㄕㄢ' }, { char: '到', question: '遲( )ㄉㄠˋ' }, { char: '大', question: '( )ㄉㄚˋ 象' }, 
        { char: '海', question: '( )ㄏㄞˇ 邊' }, { char: '朋', question: '( )ㄆㄥˊ 友' }, { char: '友', question: '好( )ㄧㄡˇ' }, 
        { char: '們', question: '人( )ㄇㄣ˙' }, { char: '起', question: '一( )ㄑㄧˇ' }
    ],
    'KX_1_4': [
        { char: '子', question: '孩( )ㄗ˙' }, { char: '小', question: '( )ㄒㄧㄠˇ 孩' }, { char: '課', question: '上( )ㄎㄜˋ' }, 
        { char: '兩', question: '( )ㄌㄧㄤˇ 個' }, { char: '人', question: '大( )ㄖㄣˊ' }, { char: '拉', question: '( )ㄌㄚ 手' }, 
        { char: '看', question: '( )ㄎㄢˋ 見' }, { char: '找', question: '尋( )ㄓㄠˇ' }, { char: '隻', question: '一( )ㄓ' }, 
        { char: '青', question: '( )ㄑㄧㄥ 蛙' }, { char: '蛙', question: '青( )ㄨㄚ' }, { char: '開', question: '( )ㄎㄞ 門' }, 
        { char: '心', question: '( )ㄒㄧㄣ 臟' }
    ],
    'KX_1_5': [
        { char: '比', question: '( )ㄅㄧˇ 較' }, { char: '門', question: '大( )ㄇㄣˊ' }, { char: '裡', question: '( )ㄌㄧˇ 面' }, 
        { char: '外', question: '( )ㄨㄞˋ 面' }, { char: '有', question: '擁( )ㄧㄡˇ' }, { char: '什', question: '( )ㄕㄣˊ 麼' }, 
        { char: '麼', question: '什( )ㄇㄜ˙' }, { char: '不', question: '( )ㄅㄨˊ 是' }, { char: '同', question: '( )ㄊㄨㄥˊ 學' }, 
        { char: '早', question: '( )ㄗㄠˇ 上' }, { char: '晚', question: '( )ㄨㄢˇ 上' }, { char: '王', question: '國( )ㄨㄤˊ' }, 
        { char: '主', question: '( )ㄓㄨˇ 人' }, { char: '又', question: '( )ㄧㄡˋ 來' }
    ],
    'KX_1_6': [
        { char: '路', question: '馬( )ㄌㄨˋ' }, { char: '長', question: '( )ㄔㄤˊ 短' }, { char: '白', question: '( )ㄅㄞˊ 色' }, 
        { char: '花', question: '紅( )ㄏㄨㄚ' }, { char: '紅', question: '( )ㄏㄨㄥˊ 花' }, { char: '走', question: '( )ㄗㄡˇ 路' }, 
        { char: '在', question: '現( )ㄗㄞˋ' }, { char: '向', question: '方( )ㄒㄧㄤˋ' }, { char: '說', question: '( )ㄕㄨㄛ 話' }, 
        { char: '朵', question: '花( )ㄉㄨㄛ˙' }, { char: '從', question: '( )ㄘㄨㄥˊ 前' }, { char: '頭', question: '( )ㄊㄡˊ 髮' }, 
        { char: '那', question: '( )ㄋㄚˋ 裡' }
    ],

    // =========================================================================
    // 康軒 (Kangxuan) - Grade 2
    // =========================================================================
    'KX_2_1': [
        { char: '年', question: '新( )ㄋㄧㄢˊ' }, { char: '希', question: '( )ㄒㄧ 望' }, { char: '望', question: '願( )ㄨㄤˋ' }, { char: '坐', question: '( )ㄗㄨㄛˋ 下' },
        { char: '位', question: '座( )ㄨㄟˋ' }, { char: '本', question: '課( )ㄅㄣˇ' }, { char: '淡', question: '平( )ㄉㄢˋ' }, { char: '書', question: '讀( )ㄕㄨ' },
        { char: '老', question: '( )ㄌㄠˇ 師' }, { char: '師', question: '老( )ㄕ' }, { char: '以', question: '所( )ㄧˇ' }, { char: '為', question: '因( )ㄨㄟˋ' },
        { char: '故', question: '( )ㄍㄨˋ 事' }, { char: '用', question: '( )ㄩㄥˋ 功' }, { char: '力', question: '用( )ㄌㄧˋ' }, { char: '只', question: '( )ㄓˇ 是' },
        { char: '現', question: '( )ㄒㄧㄢˋ 在' }, { char: '還', question: '( )ㄏㄞˊ 有' }
    ],
    'KX_2_2': [
        { char: '全', question: '( )ㄑㄩㄢˊ 部' }, { char: '蛋', question: '雞( )ㄉㄢˋ' }, { char: '煎', question: '( )ㄐㄧㄢ 蛋' }, { char: '圓', question: '( )ㄩㄢˊ 形' },
        { char: '番', question: '( )ㄈㄢ 茄' }, { char: '茄', question: '番( )ㄑㄧㄝˊ' }, { char: '切', question: '( )ㄑㄧㄝ 菜' }, { char: '輪', question: '車( )ㄌㄨㄣˊ' },
        { char: '司', question: '土( )ㄙ' }, { char: '夾', question: '( )ㄐㄧㄚ 裡' }, { char: '吐', question: '( )ㄊㄨˇ 司' }, { char: '中', question: '( )ㄓㄨㄥ 間' },
        { char: '方', question: '( )ㄈㄤ 形' }, { char: '城', question: '( )ㄔㄥˊ 堡' }, { char: '堡', question: '漢( )ㄅㄠˇ' }, { char: '接', question: '( )ㄐㄧㄝ 著' },
        { char: '畫', question: '( )ㄏㄨㄚˋ 圖' }, { char: '臉', question: '洗( )ㄌㄧㄢˇ' }
    ],
    'KX_2_3': [
        { char: '巷', question: '( )ㄒㄧㄤˋ 子' }, { char: '叔', question: '( )ㄕㄨˊ 叔' }, { char: '貓', question: '小( )ㄇㄠ' }, { char: '屋', question: '( )ㄨ 子' },
        { char: '捧', question: '( )ㄆㄥˇ 著' }, { char: '蝴', question: '( )ㄏㄨˊ 蝶' }, { char: '蝶', question: '蝴( )ㄉㄧㄝˊ' }, { char: '忙', question: '幫( )ㄇㄤˊ' },
        { char: '娶', question: '嫁( )ㄑㄩˇ' }, { char: '娘', question: '新( )ㄋㄧㄤˊ' }, { char: '黃', question: '( )ㄏㄨㄤˊ 色' }, { char: '筆', question: '鉛( )ㄅㄧˇ' },
        { char: '打', question: '( )ㄉㄚˇ 扮' }, { char: '扮', question: '裝( )ㄅㄢˋ' }, { char: '樣', question: '( )ㄧㄤˋ 子' }, { char: '越', question: '( )ㄩㄝˋ 來' },
        { char: '美', question: '( )ㄇㄟˇ 麗' }, { char: '麗', question: '美麗( )ㄌㄧˋ' }
    ],
    'KX_2_4': [
        { char: '運', question: '( )ㄩㄣˋ 動' }, { char: '動', question: '活( )ㄉㄨㄥˋ' }, { char: '飄', question: '( )ㄆㄧㄠ 揚' }, { char: '熱', question: '( )ㄖㄜˋ 鬧' },
        { char: '鬧', question: '吵( )ㄋㄠˋ' }, { char: '舞', question: '跳( )ㄨˇ' }, { char: '哇', question: '( )ㄨㄚ 賽' }, { char: '往', question: '來( )ㄨㄤˇ' },
        { char: '容', question: '笑( )ㄖㄨㄥˊ' }, { char: '步', question: '跑( )ㄅㄨˋ' }, { char: '汗', question: '流( )ㄏㄢˋ' }, { char: '腳', question: '( )ㄐㄧㄠˇ 步' },
        { char: '協', question: '( )ㄒㄧㄝˊ 力' }, { char: '聲', question: '大( )ㄕㄥ' }, { char: '河', question: '拔( )ㄏㄜˊ' }, { char: '氣', question: '生( )ㄑㄧˋ' },
        { char: '最', question: '( )ㄗㄨㄟˋ 好' }, { char: '可', question: '( )ㄎㄜˇ 愛' }
    ],
    'KX_2_5': [
        { char: '竹', question: '( )ㄓㄨˊ 子' }, { char: '籃', question: '( )ㄌㄢˊ 球' }, { char: '鄉', question: '故( )ㄒㄧㄤ' }, { char: '南', question: '( )ㄋㄢˊ 部' },
        { char: '暑', question: '( )ㄕㄨˇ 假' }, { char: '假', question: '放( )ㄐㄧㄚˋ' }, { char: '帶', question: '( )ㄉㄞˋ 領' }, { char: '等', question: '( )ㄉㄥˇ 待' },
        { char: '跨', question: '( )ㄎㄨㄚˋ 越' }, { char: '划', question: '( )ㄏㄨㄚˊ 船' }, { char: '吹', question: '( )ㄔㄨㄟ 風' }, { char: '邊', question: '旁( )ㄅㄧㄢ' },
        { char: '叫', question: '( )ㄐㄧㄠˋ 聲' }, { char: '原', question: '( )ㄩㄢˊ 來' }, { char: '近', question: '靠( )ㄐㄧㄣˋ' }, { char: '捕', question: '( )ㄅㄨˇ 魚' },
        { char: '活', question: '生( )ㄏㄨㄛˊ' }, { char: '識', question: '認( )ㄕˋ' }
    ],
    'KX_2_6': [
        { char: '鎮', question: '小( )ㄓㄣˋ' }, { char: '餅', question: '月( )ㄅㄧㄥˇ' }, { char: '節', question: '( )ㄐㄧㄝˊ 日' }, { char: '因', question: '( )ㄧㄣ 為' },
        { char: '此', question: '從( )ㄘˇ' }, { char: '進', question: '( )ㄐㄧㄣˋ 入' }, { char: '排', question: '( )ㄆㄞˊ 隊' }, { char: '遠', question: '遙( )ㄩㄢˇ' },
        { char: '色', question: '顏( )ㄙㄜˋ' }, { char: '愛', question: '親( )ㄞˋ' }, { char: '月', question: '( )ㄩㄝˋ 亮' }, { char: '乾', question: '餅( )ㄍㄢ' },
        { char: '甜', question: '( )ㄊㄧㄢˊ 蜜' }, { char: '客', question: '( )ㄎㄜˋ 人' }, { char: '買', question: '購( )ㄇㄞˇ' }, { char: '親', question: '( )ㄑㄧㄣ 人' },
        { char: '如', question: '( )ㄖㄨˊ 果' }, { char: '意', question: '願( )ㄧˋ' }
    ],
    'KX_2_7': [
        { char: '衣', question: '( )ㄧ 服' }, { char: '胖', question: '肥( )ㄆㄤˋ' }, { char: '針', question: '( )ㄓㄣ 線' }, { char: '簡', question: '( )ㄐㄧㄢˇ 單' },
        { char: '單', question: '簡( )ㄉㄢ' }, { char: '聰', question: '( )ㄘㄨㄥ 明' }, { char: '明', question: '聰( )ㄇㄧㄥˊ' }, { char: '臣', question: '大( )ㄔㄣˊ' },
        { char: '敢', question: '勇( )ㄍㄢˇ' }, { char: '東', question: '( )ㄉㄨㄥ 西' }, { char: '西', question: '東( )ㄒㄧ' }, { char: '直', question: '一( )ㄓˊ' },
        { char: '棒', question: '好( )ㄅㄤˋ' }, { char: '街', question: '大( )ㄐㄧㄝ' }, { char: '滿', question: '( )ㄇㄢˇ 意' }, { char: '眼', question: '( )ㄧㄢˇ 睛' },
        { char: '哪', question: '( )ㄋㄚˇ 裡' }, { char: '思', question: '意( )ㄙ˙' }
    ],
    'KX_2_8': [
        { char: '渴', question: '口( )ㄎㄜˇ' }, { char: '烏', question: '( )ㄨ 鴉' }, { char: '喝', question: '( )ㄏㄜ 水' }, { char: '瓶', question: '( )ㄆㄧㄥˊ 子' },
        { char: '法', question: '辦( )ㄈㄚˇ' }, { char: '森', question: '( )ㄙㄣ 林' }, { char: '林', question: '樹( )ㄌㄧㄣˊ' }, { char: '物', question: '禮( )ㄨˋ' },
        { char: '旅', question: '( )ㄌㄩˇ 行' }, { char: '行', question: '旅( )ㄒㄧㄥˊ' }, { char: '午', question: '中( )ㄨˇ' }, { char: '裝', question: '( )ㄓㄨㄤ 滿' },
        { char: '許', question: '( )ㄒㄩˇ 多' }, { char: '石', question: '( )ㄕˊ 頭' }, { char: '難', question: '困( )ㄋㄢˊ' }, { char: '忘', question: '( )ㄨㄤˋ 記' },
        { char: '哈', question: '( )ㄏㄚ 氣' }, { char: '但', question: '( )ㄉㄢˋ 是' }
    ],
    'KX_2_9': [
        { char: '象', question: '大( )ㄒㄧㄤˋ' }, { char: '操', question: '( )ㄘㄠ 場' }, { char: '粗', question: '( )ㄘㄨ 細' }, { char: '腿', question: '大( )ㄊㄨㄟˇ' },
        { char: '柱', question: '圓( )ㄓㄨˋ' }, { char: '砍', question: '( )ㄎㄢˇ 樹' }, { char: '幾', question: '( )ㄐㄧˇ 個' }, { char: '部', question: '( )ㄅㄨˋ 分' },
        { char: '搖', question: '( )ㄧㄠˊ 頭' }, { char: '沖', question: '( )ㄔㄨㄥ 水' }, { char: '首', question: '( )ㄕㄡˇ 先' }, { char: '牽', question: '( )ㄑㄧㄢ 手' },
        { char: '沉', question: '下( )ㄔㄣˊ' }, { char: '少', question: '多( )ㄕㄠˇ' }, { char: '沿', question: '( )ㄧㄢˊ 著' }, { char: '然', question: '忽( )ㄖㄢˊ' },
        { char: '紀', question: '年( )ㄐㄧˋ' }, { char: '竟', question: '畢( )ㄐㄧㄥˋ' }
    ],
    'KX_2_10': [
        { char: '雪', question: '下( )ㄒㄩㄝˇ' }, { char: '梨', question: '( )ㄌㄧˊ 子' }, { char: '夜', question: '半( )ㄧㄝˋ' }, { char: '卻', question: '冷( )ㄑㄩㄝˋ' },
        { char: '冷', question: '寒( )ㄌㄥˇ' }, { char: '冬', question: '( )ㄉㄨㄥ 天' }, { char: '臺', question: '( )ㄊㄞˊ 灣' }, { char: '季', question: '( )ㄐㄧˋ 節' },
        { char: '相', question: '( )ㄒㄧㄤ 信' }, { char: '反', question: '( )ㄈㄢˇ 對' }, { char: '煙', question: '( )ㄧㄢ 火' }, { char: '火', question: '著( )ㄏㄨㄛˇ' },
        { char: '待', question: '期( )ㄉㄞˋ' }, { char: '雖', question: '( )ㄙㄨㄟ 然' }, { char: '春', question: '( )ㄔㄨㄣ 天' }, { char: '貨', question: '( )ㄏㄨㄛˋ 物' },
        { char: '期', question: '星( )ㄑㄧˊ' }, { char: '飯', question: '吃( )ㄈㄢˋ' }
    ],
    'KX_2_11': [
        { char: '皮', question: '( )ㄆㄧˊ 膚' }, { char: '具', question: '工( )ㄐㄩˋ' }, { char: '飛', question: '( )ㄈㄟ 行' }, { char: '者', question: '作( )ㄓㄜˇ' },
        { char: '洋', question: '海( )ㄧㄤˊ' }, { char: '寒', question: '( )ㄏㄢˊ 冷' }, { char: '北', question: '( )ㄅㄟˇ 風' }, { char: '嘴', question: '( )ㄗㄨㄟˇ 巴' },
        { char: '伸', question: '( )ㄕㄣ 手' }, { char: '飽', question: '吃( )ㄅㄠˇ' }, { char: '沙', question: '( )ㄕㄚ 灘' }, { char: '急', question: '著( )ㄐㄧˊ' },
        { char: '服', question: '衣( )ㄈㄨˊ' }, { char: '站', question: '( )ㄓㄢˋ 立' }, { char: '翅', question: '( )ㄔˋ 膀' }, { char: '膀', question: '肩( )ㄅㄤˇ' },
        { char: '充', question: '( )ㄔㄨㄥ 電' }, { char: '念', question: '思( )ㄋㄧㄢˋ' }
    ],
    'KX_2_12': [
        { char: '灰', question: '( )ㄏㄨㄟ 色' }, { char: '涼', question: '冰( )ㄌㄧㄤˊ' }, { char: '牠', question: '( )ㄊㄚ 們' }, { char: '鼓', question: '( )ㄍㄨˇ 勵' },
        { char: '絡', question: '聯( )ㄌㄨㄛˋ' }, { char: '欣', question: '( )ㄒㄧㄣ 賞' }, { char: '發', question: '( )ㄈㄚ 現' }, { char: '居', question: '鄰( )ㄐㄩ' },
        { char: '冒', question: '( )ㄇㄠˋ 險' }, { char: '冰', question: '( )ㄅㄧㄥ 箱' }, { char: '圍', question: '( )ㄨㄟˊ 巾' }, { char: '咪', question: '貓( )ㄇㄧ' },
        { char: '幸', question: '( )ㄒㄧㄥˋ 福' }, { char: '團', question: '( )ㄊㄨㄢˊ 圓' }, { char: '聚', question: '相( )ㄐㄩˋ' }, { char: '愉', question: '( )ㄩˊ 快' },
        { char: '鍋', question: '火( )ㄍㄨㄛ' }, { char: '妙', question: '奇( )ㄇㄧㄠˋ' }
    ],
    
    // =========================================================================
    // 康軒 (Kangxuan) - Grade 3
    // =========================================================================
    'KX_3_1': [
        { char: '字', question: '生( )ㄗˋ' }, { char: '舟', question: '輕( )ㄓㄡ' }, { char: '灑', question: '( )ㄙㄚˇ 水' }, { char: '載', question: '( )ㄗㄞˋ 重' },
        { char: '讓', question: '禮( )ㄖㄤˋ' }, { char: '愁', question: '憂( )ㄔㄡˊ' }, { char: '嘆', question: '讚( )ㄊㄢˋ' }, { char: '忌', question: '( )ㄐㄧˋ 妒' },
        { char: '妒', question: '嫉( )ㄉㄨˋ' }, { char: '訣', question: '祕( )ㄐㄩㄝˊ' }, { char: '似', question: '相( )ㄙˋ' }, { char: '練', question: '( )ㄌㄧㄢˋ 習' },
        { char: '習', question: '學( )ㄒㄧˊ' }
    ],
    'KX_3_2': [
        { char: '名', question: '( )ㄇㄧㄥˊ 字' }, { char: '窗', question: '( )ㄔㄨㄤ 戶' }, { char: '戶', question: '門( )ㄏㄨˋ' }, { char: '板', question: '老( )ㄅㄢˇ' },
        { char: '答', question: '回( )ㄉㄚˊ' }, { char: '案', question: '圖( )ㄢˋ' }, { char: '專', question: '( )ㄓㄨㄢ 心' }, { char: '穫', question: '收( )ㄏㄨㄛˋ' },
        { char: '已', question: '( )ㄧˇ 經' }, { char: '傘', question: '雨( )ㄙㄢˇ' }, { char: '喊', question: '叫( )ㄏㄢˇ' }, { char: '章', question: '文( )ㄓㄤ' },
        { char: '詞', question: '語( )ㄘˊ' }, { char: '語', question: '國( )ㄩˇ' }
    ],
    'KX_3_3': [
        { char: '繞', question: '( )ㄖㄠˋ 圈' }, { char: '由', question: '理( )ㄧㄡˊ' }, { char: '迷', question: '( )ㄇㄧˊ 路' }, { char: '失', question: '遺( )ㄕ' },
        { char: '岸', question: '海( )ㄢˋ' }, { char: '撞', question: '( )ㄓㄨㄤˋ 擊' }, { char: '扶', question: '( )ㄈㄨˊ 手' }, { char: '急', question: '緊( )ㄐㄧˊ' },
        { char: '店', question: '商( )ㄉㄧㄢˋ' }, { char: '機', question: '飛( )ㄐㄧ' }, { char: '料', question: '材( )ㄌㄧㄠˋ' }, { char: '實', question: '誠( )ㄕˊ' },
        { char: '留', question: '保( )ㄌㄧㄡˊ' }, { char: '觀', question: '( )ㄍㄨㄢ 察' }
    ],
    'KX_3_4': [
        { char: '露', question: '( )ㄌㄨˋ 營' }, { char: '懷', question: '( )ㄏㄨㄞˊ 念' }, { char: '居', question: '鄰( )ㄐㄩ' }, { char: '準', question: '( )ㄓㄨㄣˇ 備' },
        { char: '射', question: '發( )ㄕㄜˋ' }, { char: '刺', question: '( )ㄘˋ 痛' }, { char: '痛', question: '頭( )ㄊㄨㄥˋ' }, { char: '使', question: '( )ㄕˇ 用' },
        { char: '毒', question: '( )ㄉㄨˊ 藥' }, { char: '欺', question: '( )ㄑㄧ 負' }, { char: '負', question: '負( )ㄉㄢ' }, { char: '感', question: '( )ㄍㄢˇ 謝' },
        { char: '遇', question: '遭( )ㄩˋ' }, { char: '危', question: '( )ㄨㄟˊ 險' }
    ],
    'KX_3_5': [
        { char: '朝', question: '( )ㄔㄠˊ 向' }, { char: '努', question: '( )ㄋㄨˇ 力' }, { char: '總', question: '( )ㄗㄨㄥˇ 是' }, { char: '段', question: '一( )ㄉㄨㄢˋ' },
        { char: '利', question: '( )ㄌㄧˋ 益' }, { char: '害', question: '厲( )ㄏㄞˋ' }, { char: '整', question: '( )ㄓㄥˇ 齊' }, { char: '該', question: '應( )ㄍㄞ' },
        { char: '紙', question: '色( )ㄓˇ' }, { char: '李', question: '行( )ㄌㄧˇ' }, { char: '貴', question: '珍( )ㄍㄨㄟˋ' }, { char: '必', question: '( )ㄅㄧˋ 須' },
        { char: '通', question: '交( )ㄊㄨㄥ' }, { char: '場', question: '廣( )ㄔㄤˇ' }
    ],
    'KX_3_6': [
        { char: '女', question: '( )ㄋㄩˇ 生' }, { char: '非', question: '( )ㄈㄟ 常' }, { char: '關', question: '( )ㄍㄨㄢ 門' }, { char: '澡', question: '洗( )ㄗㄠˇ' },
        { char: '怕', question: '害( )ㄆㄚˋ' }, { char: '應', question: '( )ㄧㄥ 應該' }, { char: '平', question: '( )ㄆㄧㄥˊ 安' }, { char: '毛', question: '羽( )ㄇㄠˊ' },
        { char: '肚', question: '( )ㄉㄨˋ 子' }, { char: '蓋', question: '( )ㄍㄞˋ 子' }, { char: '摸', question: '觸( )ㄇㄛ' }, { char: '柔', question: '溫( )ㄖㄡˊ' },
        { char: '揉', question: '( )ㄖㄡˊ 麵' }, { char: '副', question: '一( )ㄈㄨˋ' }
    ],
    'KX_3_7': [
        { char: '統', question: '傳( )ㄊㄨㄥˇ' }, { char: '商', question: '( )ㄕㄤ 店' }, { char: '阿', question: '( )ㄚ 姨' }, { char: '婆', question: '外( )ㄆㄛˊ' },
        { char: '鐵', question: '鋼( )ㄊㄧㄝˇ' }, { char: '硬', question: '堅( )ㄧㄥˋ' }, { char: '愈', question: '( )ㄩˋ 來愈' }, { char: '嚼', question: '咀( )ㄐㄩㄝˊ' },
        { char: '蒼', question: '( )ㄘㄤ 老' }, { char: '坡', question: '山( )ㄆㄛ' }, { char: '憶', question: '回( )ㄧˋ' }, { char: '夕', question: '( )ㄒㄧ 陽' },
        { char: '盪', question: '( )ㄉㄤˋ 鞦韆' }, { char: '網', question: '魚( )ㄨㄤˇ' }
    ],
    'KX_3_8': [
        { char: '育', question: '教( )ㄩˋ' }, { char: '史', question: '歷( )ㄕˇ' }, { char: '型', question: '模( )ㄒㄧㄥˊ' }, { char: '功', question: '成( )ㄍㄨㄥ' },
        { char: '敗', question: '失( )ㄅㄞˋ' }, { char: '守', question: '遵( )ㄕㄡˇ' }, { char: '護', question: '保( )ㄏㄨˋ' }, { char: '勇', question: '( )ㄩㄥˇ 氣' },
        { char: '兵', question: '士( )ㄅㄧㄥ' }, { char: '土', question: '泥( )ㄊㄨˇ' }, { char: '附', question: '( )ㄈㄨˋ 近' }, { char: '瞭', question: '( )ㄌㄧㄠˇ 望' },
        { char: '頂', question: '山( )ㄉㄧㄥˇ' }, { char: '標', question: '目( )ㄅㄧㄠ' }
    ],
    'KX_3_9': [
        { char: '溼', question: '潮( )ㄕ' }, { char: '族', question: '家( )ㄗㄨˊ' }, { char: '別', question: '特( )ㄅㄧㄝˊ' }, { char: '捕', question: '逮( )ㄅㄨˇ' },
        { char: '式', question: '方( )ㄕˋ' }, { char: '造', question: '創( )ㄗㄠˋ' }, { char: '層', question: '樓( )ㄘㄥˊ' }, { char: '竹', question: '( )ㄓㄨˊ 子' },
        { char: '植', question: '( )ㄓˊ 物' }, { char: '或', question: '( )ㄏㄨㄛˋ 許' }, { char: '釣', question: '( )ㄉㄧㄠˋ 魚' }, { char: '智', question: '( )ㄓˋ 慧' },
        { char: '慧', question: '聰( )ㄏㄨㄟˋ' }, { char: '態', question: '生( )ㄊㄞˋ' }
    ],
    'KX_3_10': [
        { char: '狐', question: '( )ㄏㄨˊ 狸' }, { char: '里', question: '公( )ㄌㄧˇ' }, { char: '兄', question: '( )ㄒㄩㄥ 弟' }, { char: '密', question: '祕( )ㄇㄧˋ' },
        { char: '入', question: '進( )ㄖㄨˋ' }, { char: '呀', question: '唉( )ㄧㄚ˙' }, { char: '踢', question: '( )ㄊㄧ 球' }, { char: '棄', question: '放( )ㄑㄧˋ' },
        { char: '酸', question: '( )ㄙㄨㄢ 味' }, { char: '鴉', question: '烏( )ㄧㄚ' }, { char: '肉', question: '豬( )ㄖㄡˋ' }, { char: '塊', question: '一( )ㄎㄨㄞˋ' },
        { char: '計', question: '詭( )ㄐㄧˋ' }, { char: '壯', question: '強( )ㄓㄨㄤˋ' }
    ],
    'KX_3_11': [
        { char: '悅', question: '喜( )ㄩㄝˋ' }, { char: '拜', question: '( )ㄅㄞˋ 訪' }, { char: '訪', question: '探( )ㄈㄤˇ' }, { char: '免', question: '( )ㄇㄧㄢˇ 費' },
        { char: '離', question: '( )ㄌㄧˊ 開' }, { char: '漫', question: '浪( )ㄇㄢˋ' }, { char: '盼', question: '期( )ㄆㄢˋ' }, { char: '枯', question: '( )ㄎㄨ 萎' },
        { char: '鑽', question: '( )ㄗㄨㄢ 洞' }, { char: '恍', question: '( )ㄏㄨㄤˇ 然' }, { char: '悟', question: '覺( )ㄨˋ' }, { char: '拆', question: '( )ㄔㄞ 開' },
        { char: '盛', question: '茂( )ㄕㄥˋ' }, { char: '隨', question: '跟( )ㄙㄨㄟˊ' }
    ],
    'KX_3_12': [
        { char: '障', question: '保( )ㄓㄤˋ' }, { char: '漠', question: '沙( )ㄇㄛˋ' }, { char: '綿', question: '( )ㄇㄧㄢˊ 羊' }, { char: '央', question: '中( )ㄧㄤ' },
        { char: '男', question: '( )ㄋㄢˊ 生' }, { char: '複', question: '重( )ㄈㄨˋ' }, { char: '疑', question: '懷( )ㄧˊ' }, { char: '算', question: '計( )ㄙㄨㄢˋ' },
        { char: '歲', question: '幾( )ㄙㄨㄟˋ' }, { char: '帽', question: '( )ㄇㄠˋ 子' }, { char: '退', question: '後( )ㄊㄨㄟˋ' }, { char: '吞', question: '( )ㄊㄨㄣ 下' },
        { char: '蛇', question: '蟒( )ㄕㄜˊ' }, { char: '訝', question: '驚( )ㄧㄚˋ' }
    ],

    // =========================================================================
    // 南一 (Nanyi) - Grade 1
    // =========================================================================
    'NY_1_1': [
        { char: '小', question: '( )ㄒㄧㄠˇ 狗' }, { char: '上', question: '樓( )ㄕㄤˋ' }, { char: '走', question: '( )ㄗㄡˇ 路' }, 
        { char: '左', question: '( )ㄗㄨㄛˇ 右' }, { char: '右', question: '左( )ㄧㄡˋ' }, { char: '向', question: '方( )ㄒㄧㄤˋ' }, 
        { char: '魚', question: '( )ㄩˊ 兒' }, { char: '也', question: '( )ㄧㄝˇ 許' }, { char: '來', question: '( )ㄌㄞˊ 去' }, 
        { char: '加', question: '( )ㄐㄧㄚ 油' }
    ],
    'NY_1_2': [
        { char: '開', question: '( )ㄎㄞ 車' }, { char: '出', question: '( )ㄔㄨ 去' }, { char: '招', question: '( )ㄓㄠ 手' }, 
        { char: '車', question: '汽( )ㄔㄜ' }, { char: '子', question: '椅( )ㄗ˙' }, { char: '地', question: '土( )ㄉㄧˋ' }, 
        { char: '花', question: '( )ㄏㄨㄚ 園' }, { char: '朵', question: '耳( )ㄉㄨㄛ˙' }, { char: '在', question: '正( )ㄗㄞˋ' }, 
        { char: '笑', question: '微( )ㄒㄧㄠˋ' }
    ],
    'NY_1_3': [
        { char: '泡', question: '( )ㄆㄠˋ 泡' }, { char: '玩', question: '好( )ㄨㄢˊ' }, { char: '大', question: '( )ㄉㄚˋ 家' }, 
        { char: '起', question: '( )ㄑㄧˇ 床' }, { char: '好', question: '( )ㄏㄠˇ 看' }, { char: '多', question: '許( )ㄉㄨㄛ' }, 
        { char: '我', question: '( )ㄨㄛˇ 的' }, { char: '的', question: '你( )ㄉㄜ˙' }, { char: '你', question: '祝( )ㄋㄧˇ' }, 
        { char: '抱', question: '( )ㄅㄠˋ 抱' }
    ],
    'NY_1_4': [
        { char: '爸', question: '( )ㄅㄚˋ 爸' }, { char: '到', question: '遲( )ㄉㄠˋ' }, { char: '青', question: '( )ㄑㄧㄥ 山' }, 
        { char: '叫', question: '( )ㄐㄧㄠˋ 喊' }, { char: '下', question: '樓( )ㄒㄧㄚˋ' }, { char: '那', question: '( )ㄋㄚˋ 邊' }, 
        { char: '和', question: '我( )ㄏㄢˋ 你' }, { char: '要', question: '想( )ㄧㄠˋ' }, { char: '他', question: '( )ㄊㄚ 人' }, 
        { char: '朋', question: '( )ㄆㄥˊ 友' }, { char: '友', question: '朋( )ㄧㄡˇ' }
    ],
    'NY_1_5': [
        { char: '外', question: '( )ㄨㄞˋ 頭' }, { char: '住', question: '居( )ㄓㄨˋ' }, { char: '個', question: '一( )ㄍㄜ˙' }, 
        { char: '們', question: '它( )ㄇㄣ˙' }, { char: '這', question: '( )ㄓㄜˋ 個' }, { char: '裡', question: '家( )ㄌㄧˇ' }, 
        { char: '有', question: '沒( )ㄧㄡˇ' }, { char: '沒', question: '( )ㄇㄟˊ 有' }, { char: '是', question: '都( )ㄕˋ' }, 
        { char: '什', question: '( )ㄕㄣˊ 麼' }, { char: '麼', question: '什( )ㄇㄜ˙' }
    ],
    'NY_1_6': [
        { char: '金', question: '( )ㄐㄧㄣ 魚' }, { char: '說', question: '( )ㄕㄨㄛ 話' }, { char: '句', question: '造( )ㄐㄩˋ' }, 
        { char: '話', question: '笑( )ㄏㄨㄚˋ' }, { char: '兩', question: '( )ㄌㄧㄤˇ 隻' }, { char: '都', question: '( )ㄉㄡ 是' }, 
        { char: '悄', question: '( )ㄑㄧㄠˇ 悄' }, { char: '尾', question: '( )ㄨㄟˇ 巴' }, { char: '巴', question: '尾( )ㄅㄚ˙' }, 
        { char: '滿', question: '( )ㄇㄢˇ 意' }, { char: '紅', question: '( )ㄏㄨㄥˊ 色' }
    ],
    'NY_1_7': [
        { char: '春', question: '( )ㄔㄨㄣ 節' }, { char: '貼', question: '( )ㄊㄧㄝ 紙' }, { char: '呢', question: '你( )ㄋㄜ' }, 
        { char: '了', question: '好( )ㄌㄜ˙' }, { char: '請', question: '( )ㄑㄧㄥˇ 客' }, { char: '天', question: '( )ㄊㄧㄢ 氣' }, 
        { char: '家', question: '回( )ㄐㄧㄚ' }, { char: '把', question: '門( )ㄅㄚˇ' }, { char: '不', question: '( )ㄅㄨˊ 要' }, 
        { char: '房', question: '( )ㄈㄤˊ 子' }, { char: '福', question: '幸( )ㄈㄨˊ' }
    ],

    // =========================================================================
    // 南一 (Nanyi) - Grade 2
    // =========================================================================
    'NY_2_1': [
        { char: '呼', question: '( )ㄏㄨ 吸' }, { char: '白', question: '( )ㄅㄞˊ 雲' }, { char: '雲', question: '烏( )ㄩㄣˊ' }, { char: '柔', question: '溫( )ㄖㄡˊ' },
        { char: '前', question: '( )ㄑㄧㄢˊ 面' }, { char: '游', question: '( )ㄧㄡˊ 泳' }, { char: '噴', question: '( )ㄆㄣ 水' }, { char: '美', question: '( )ㄇㄟˇ 女' },
        { char: '麗', question: '壯( )ㄌㄧˋ' }, { char: '柱', question: '石( )ㄓㄨˋ' }, { char: '試', question: '考( )ㄕˋ' }, { char: '吸', question: '( )ㄒㄧ 管' },
        { char: '用', question: '利( )ㄩㄥˋ' }, { char: '力', question: '努( )ㄌㄧˋ' }, { char: '哇', question: '( )ㄨㄚ 哇叫' }, { char: '又', question: '( )ㄧㄡˋ 是' },
        { char: '第', question: '( )ㄉㄧˋ 一' }, { char: '功', question: '( )ㄍㄨㄥ 課' }
    ],
    'NY_2_2': [
        { char: '爬', question: '( )ㄆㄚˊ 山' }, { char: '梯', question: '樓( )ㄊㄧ' }, { char: '紙', question: '報( )ㄓˇ' }, { char: '條', question: '麵( )ㄊㄧㄠˊ' },
        { char: '線', question: '電( )ㄒㄧㄢˋ' }, { char: '像', question: '好( )ㄒㄧㄤˋ' }, { char: '身', question: '( )ㄕㄣ 體' }, { char: '生', question: '( )ㄕㄥ 日' },
        { char: '迫', question: '( )ㄆㄛˋ 切' }, { char: '及', question: '來不( )ㄐㄧˊ' }, { char: '待', question: '期( )ㄉㄞˋ' }, { char: '站', question: '車( )ㄓㄢˋ' },
        { char: '沿', question: '( )ㄧㄢˊ 路' }, { char: '頂', question: '山( )ㄉㄧㄥˇ' }, { char: '格', question: '方( )ㄍㄜˊ' }, { char: '哪', question: '( )ㄋㄚˇ 裡' },
        { char: '才', question: '人( )ㄘㄞˊ' }, { char: '最', question: '( )ㄗㄨㄟˋ 後' }
    ],
    'NY_2_3': [
        { char: '勇', question: '( )ㄩㄥˇ 氣' }, { char: '教', question: '( )ㄐㄧㄠˋ 室' }, { char: '室', question: '教( )ㄕˋ' }, { char: '棵', question: '一( )ㄎㄜ' },
        { char: '葉', question: '樹( )ㄧㄝˋ' }, { char: '克', question: '( )ㄎㄜˋ 服' }, { char: '服', question: '衣( )ㄈㄨˊ' }, { char: '害', question: '( )ㄏㄞˋ 怕' },
        { char: '怕', question: '害( )ㄆㄚˋ' }, { char: '努', question: '( )ㄋㄨˇ 力' }, { char: '完', question: '( )ㄨㄢˊ 成' }, { char: '事', question: '故( )ㄕˋ' },
        { char: '倒', question: '( )ㄉㄠˇ 下' }, { char: '時', question: '( )ㄕˊ 間' }, { char: '黑', question: '( )ㄏㄟ 色' }, { char: '低', question: '( )ㄉㄧ 頭' },
        { char: '聲', question: '聲( )ㄧㄣ' }, { char: '故', question: '緣( )ㄍㄨˋ' }
    ],
    'NY_2_4': [
        { char: '塊', question: '一( )ㄎㄨㄞˋ' }, { char: '圓', question: '( )ㄩㄢˊ 圈' }, { char: '形', question: '圖( )ㄒㄧㄥˊ' }, { char: '芝', question: '( )ㄓ 麻' },
        { char: '麻', question: '芝( )ㄇㄚˊ' }, { char: '餅', question: '餅( )ㄍㄢ' }, { char: '咬', question: '( )ㄧㄠˇ 一口' }, { char: '飯', question: '米( )ㄈㄢˋ' },
        { char: '做', question: '( )ㄗㄨㄛˋ 菜' }, { char: '課', question: '下( )ㄎㄜˋ' }, { char: '洗', question: '( )ㄒㄧˇ 手' }, { char: '澡', question: '洗( )ㄗㄠˇ' },
        { char: '拾', question: '收( )ㄕˊ' }, { char: '整', question: '( )ㄓㄥˇ 理' }, { char: '包', question: '書( )ㄅㄠ' }, { char: '遊', question: '( )ㄧㄡˊ 戲' },
        { char: '戲', question: '遊( )ㄒㄧˋ' }, { char: '剩', question: '( )ㄕㄥˋ 下' }
    ],
    'NY_2_5': [
        { char: '蟲', question: '毛毛( )ㄔㄨㄥˊ' }, { char: '森', question: '( )ㄙㄣ 林' }, { char: '動', question: '( )ㄉㄨㄥˋ 物' }, { char: '物', question: '人( )ㄨˋ' },
        { char: '王', question: '國( )ㄨㄤˊ' }, { char: '坐', question: '( )ㄗㄨㄛˋ 下' }, { char: '午', question: '中( )ㄨˇ' }, { char: '停', question: '( )ㄊㄧㄥˊ 車' },
        { char: '座', question: '( )ㄗㄨㄛˋ 位' }, { char: '急', question: '著( )ㄐㄧˊ' }, { char: '百', question: '一( )ㄅㄞˇ 分' }, { char: '科', question: '( )ㄎㄜ 學' },
        { char: '全', question: '( )ㄑㄩㄢˊ 部' }, { char: '原', question: '草( )ㄩㄢˊ' }, { char: '從', question: '( )ㄘㄨㄥˊ 前' }, { char: '此', question: '因( )ㄘˇ' },
        { char: '管', question: '吸( )ㄍㄨㄢˇ' }, { char: '種', question: '( )ㄓㄨㄥˋ 樹' }
    ],
    'NY_2_6': [
        { char: '自', question: '( )ㄗˋ 己' }, { char: '己', question: '自( )ㄐㄧˇ' }, { char: '沙', question: '( )ㄕㄚ 發' }, { char: '撿', question: '( )ㄐㄧㄢˇ 起來' },
        { char: '垃', question: '( )ㄌㄜˋ 圾' }, { char: '圾', question: '垃( )ㄙㄜˋ' }, { char: '眼', question: '( )ㄧㄢˇ 睛' }, { char: '膠', question: '塑( )ㄐㄧㄠ' },
        { char: '對', question: '( )ㄉㄨㄟˋ 錯' }, { char: '牠', question: '( )ㄊㄚ 們' }, { char: '安', question: '( )ㄢ 全' }, { char: '吧', question: '好( )ㄅㄚ˙' },
        { char: '如', question: '( )ㄖㄨˊ 果' }, { char: '該', question: '應( )ㄍㄞ' }, { char: '留', question: '( )ㄌㄧㄡˊ 下' }, { char: '便', question: '方( )ㄅㄧㄢˋ' },
        { char: '減', question: '( )ㄐㄧㄢˇ 少' }, { char: '少', question: '多( )ㄕㄠˇ' }
    ],
    'NY_2_7': [
        { char: '等', question: '( )ㄉㄥˇ 待' }, { char: '兔', question: '( )ㄊㄨˋ 子' }, { char: '撞', question: '( )ㄓㄨㄤˋ 到' }, { char: '農', question: '( )ㄋㄨㄥˊ 夫' },
        { char: '夫', question: '功( )ㄈㄨ' }, { char: '夏', question: '( )ㄒㄧㄚˋ 天' }, { char: '剛', question: '( )ㄍㄤ 才' }, { char: '趕', question: '( )ㄍㄢˇ 緊' },
        { char: '路', question: '馬( )ㄌㄨˋ' }, { char: '幸', question: '( )ㄒㄧㄥˋ 福' }, { char: '運', question: '好( )ㄩㄣˋ' }, { char: '以', question: '所( )ㄧˇ' },
        { char: '耕', question: '( )ㄍㄥ 田' }, { char: '守', question: '( )ㄕㄡˇ 護' }, { char: '夜', question: '( )ㄧㄝˋ 晚' }, { char: '晚', question: '夜( )ㄨㄢˇ' },
        { char: '北', question: '( )ㄅㄟˇ 方' }, { char: '搖', question: '( )ㄧㄠˊ 頭' }
    ],
    'NY_2_8': [
        { char: '角', question: '三( )ㄐㄧㄠˇ' }, { char: '腳', question: '手( )ㄐㄧㄠˇ' }, { char: '渴', question: '口( )ㄎㄜˇ' }, { char: '鹿', question: '長頸( )ㄌㄨˋ' },
        { char: '喝', question: '( )ㄏㄜ 水' }, { char: '影', question: '電( )ㄧㄥˇ' }, { char: '意', question: '( )ㄧˋ 思' }, { char: '卻', question: '冷( )ㄑㄩㄝˋ' },
        { char: '獅', question: '( )ㄕ 子' }, { char: '追', question: '( )ㄓㄨㄟ 跑' }, { char: '被', question: '棉( )ㄅㄟˋ' }, { char: '枝', question: '樹( )ㄓ' },
        { char: '掙', question: '( )ㄓㄥ 扎' }, { char: '脫', question: '( )ㄊㄨㄛ 掉' }, { char: '速', question: '快( )ㄙㄨˋ' }, { char: '度', question: '程( )ㄉㄨˋ' },
        { char: '直', question: '一( )ㄓˊ' }, { char: '救', question: '( )ㄐㄧㄡˋ 命' }
    ],
    'NY_2_9': [
        { char: '赤', question: '( )ㄔˋ 腳' }, { char: '國', question: '( )ㄍㄨㄛˊ 家' }, { char: '熱', question: '( )ㄖㄜˋ 鬧' }, { char: '宮', question: '皇( )ㄍㄨㄥ' },
        { char: '涼', question: '冰( )ㄌㄧㄤˊ' }, { char: '踩', question: '( )ㄘㄞˇ 踏' }, { char: '毯', question: '地( )ㄊㄢˇ' }, { char: '暖', question: '溫( )ㄋㄨㄢˇ' },
        { char: '馬', question: '( )ㄇㄚˇ 上' }, { char: '壞', question: '( )ㄏㄨㄞˋ 人' }, { char: '難', question: '困( )ㄋㄢˊ' }, { char: '決', question: '決( )ㄉㄧㄥˋ' },
        { char: '更', question: '( )ㄍㄥˋ 好' }, { char: '隨', question: '( )ㄙㄨㄟˊ 便' }, { char: '主', question: '( )ㄓㄨˇ 人' }, { char: '法', question: '方( )ㄈㄚˇ' },
        { char: '於', question: '終( )ㄩˊ' }, { char: '舒', question: '( )ㄕㄨ 服' }
    ],
    'NY_2_10': [
        { char: '群', question: '一( )ㄑㄩㄣˊ' }, { char: '靜', question: '安( )ㄐㄧㄥˋ' }, { char: '抬', question: '( )ㄊㄞˊ 頭' }, { char: '非', question: '( )ㄈㄟ 常' },
        { char: '趣', question: '有( )ㄑㄩˋ' }, { char: '近', question: '附( )ㄐㄧㄣˋ' }, { char: '堆', question: '土( )ㄉㄨㄟ' }, { char: '棉', question: '( )ㄇㄧㄢˊ 花' },
        { char: '遠', question: '遙( )ㄩㄢˇ' }, { char: '景', question: '風( )ㄐㄧㄥˇ' }, { char: '忽', question: '( )ㄏㄨ 忽然' }, { char: '聽', question: '( )ㄊㄧㄥ 見' },
        { char: '揮', question: '( )ㄏㄨㄟ 手' }, { char: '慢', question: '( )ㄇㄢˋ 跑' }, { char: '依', question: '( )ㄧ 然' }, { char: '捨', question: '( )ㄕㄜˇ 得' },
        { char: '放', question: '( )ㄈㄤˋ 假' }, { char: '假', question: '暑( )ㄐㄧㄚˋ' }
    ],
    'NY_2_11': [
        { char: '湯', question: '喝( )ㄊㄤ' }, { char: '今', question: '( )ㄐㄧㄣ 天' }, { char: '至', question: '冬( )ㄓˋ' }, { char: '妹', question: '姐( )ㄇㄟˋ' },
        { char: '升', question: '上( )ㄕㄥ' }, { char: '陽', question: '太( )ㄧㄤˊ' }, { char: '因', question: '原( )ㄧㄣ' }, { char: '期', question: '星( )ㄑㄧˊ' },
        { char: '盯', question: '( )ㄉㄧㄥ 著' }, { char: '米', question: '( )ㄇㄧˇ 飯' }, { char: '團', question: '( )ㄊㄨㄢˊ 結' }, { char: '粉', question: '麵( )ㄈㄣˇ' },
        { char: '南', question: '( )ㄋㄢˊ 瓜' }, { char: '黃', question: '( )ㄏㄨㄤˊ 色' }, { char: '真', question: '天( )ㄓㄣ' }, { char: '呵', question: '笑( )ㄏㄜ' },
        { char: '接', question: '( )ㄐㄧㄝ 受' }, { char: '牛', question: '( )ㄋㄧㄡˊ 肉' }
    ],
    'NY_2_12': [
        { char: '野', question: '( )ㄧㄝˇ 外' }, { char: '本', question: '課( )ㄅㄣˇ' }, { char: '模', question: '( )ㄇㄛˊ 範' }, { char: '型', question: '造( )ㄒㄧㄥˊ' },
        { char: '蜜', question: '( )ㄇㄧˋ 蜂' }, { char: '蜂', question: '蜜( )ㄈㄥ' }, { char: '蝴', question: '( )ㄏㄨˊ 蝶' }, { char: '蝶', question: '蝴( )ㄉㄧㄝˊ' },
        { char: '飛', question: '( )ㄈㄟ 機' }, { char: '活', question: '生( )ㄏㄨㄛˊ' }, { char: '圖', question: '( )ㄊㄨˊ 畫' }, { char: '筆', question: '毛( )ㄅㄧˇ' },
        { char: '料', question: '顏( )ㄌㄧㄠˋ' }, { char: '湖', question: '( )ㄏㄨˊ 泊' }, { char: '調', question: '( )ㄊㄧㄠˊ 色' }, { char: '迷', question: '( )ㄇㄧˊ 路' },
        { char: '逛', question: '( )ㄍㄨㄤˋ 街' }, { char: '兒', question: '嬰( )ㄦˊ' }
    ],
    
    // =========================================================================
    // 南一 (Nanyi) - Grade 3
    // =========================================================================
    'NY_3_1': [
        { char: '泥', question: '爛( )ㄋㄧˊ' }, { char: '化', question: '變( )ㄏㄨㄚˋ' }, { char: '雀', question: '麻( )ㄑㄩㄝˋ' }, { char: '輕', question: '年( )ㄑㄧㄥ' },
        { char: '羽', question: '( )ㄩˇ 毛' }, { char: '衣', question: '( )ㄧ 服' }, { char: '脆', question: '清( )ㄘㄨㄟˋ' }, { char: '髮', question: '頭( )ㄈㄚˇ' },
        { char: '處', question: '到( )ㄔㄨˋ' }, { char: '旅', question: '( )ㄌㄩˇ 行' }, { char: '行', question: '進( )ㄒㄧㄥˊ' }, { char: '平', question: '( )ㄆㄧㄥˊ 安' },
        { char: '男', question: '( )ㄋㄢˊ 生' }, { char: '朗', question: '開( )ㄌㄤˇ' }, { char: '足', question: '( )ㄗㄨˊ 夠' }
    ],
    'NY_3_2': [
        { char: '廊', question: '走( )ㄌㄤˊ' }, { char: '訂', question: '( )ㄉㄧㄥˋ 正' }, { char: '班', question: '( )ㄅㄢ 級' }, { char: '級', question: '等( )ㄐㄧˊ' },
        { char: '約', question: '( )ㄩㄝ 定' }, { char: '紛', question: '繽( )ㄈㄣ' }, { char: '持', question: '堅( )ㄔˊ' }, { char: '記', question: '日( )ㄐㄧˋ' },
        { char: '錄', question: '( )ㄌㄨˋ 音' }, { char: '聊', question: '( )ㄌㄧㄠˊ 天' }, { char: '言', question: '語( )ㄧㄢˊ' }, { char: '烈', question: '熱( )ㄌㄧㄝˋ' },
        { char: '些', question: '一( )ㄒㄧㄝ' }, { char: '提', question: '( )ㄊㄧˊ 醒' }, { char: '愁', question: '憂( )ㄔㄡˊ' }
    ],
    'NY_3_3': [
        { char: '短', question: '長( )ㄉㄨㄢˇ' }, { char: '鐘', question: '時( )ㄓㄨㄥ' }, { char: '鬼', question: '( )ㄍㄨㄟˇ 臉' }, { char: '鬧', question: '熱( )ㄋㄠˋ' },
        { char: '準', question: '( )ㄓㄨㄣˇ 備' }, { char: '朝', question: '( )ㄓㄠ 氣' }, { char: '蹈', question: '舞( )ㄉㄠˋ' }, { char: '表', question: '( )ㄅㄧㄠˇ 演' },
        { char: '暢', question: '舒( )ㄔㄤˋ' }, { char: '無', question: '( )ㄨˊ 聊' }, { char: '總', question: '( )ㄗㄨㄥˇ 是' }, { char: '響', question: '影( )ㄒㄧㄤˇ' },
        { char: '忘', question: '( )ㄨㄤˋ 記' }, { char: '盡', question: '( )ㄐㄧㄣˋ 力' }, { char: '責', question: '( )ㄗㄜˊ 任' }
    ],
    'NY_3_4': [
        { char: '指', question: '( )ㄓˇ 頭' }, { char: '夕', question: '( )ㄒㄧˋ 陽' }, { char: '賽', question: '比( )ㄙㄞˋ' }, { char: '緊', question: '( )ㄐㄧㄣˇ 張' },
        { char: '店', question: '商( )ㄉㄧㄢˋ' }, { char: '逗', question: '( )ㄉㄡˋ 留' }, { char: '轉', question: '( )ㄓㄨㄢˇ 彎' }, { char: '露', question: '( )ㄌㄡˋ 出' },
        { char: '業', question: '作( )ㄧㄝˋ' }, { char: '專', question: '( )ㄓㄨㄢ 心' }, { char: '勝', question: '( )ㄕㄥˋ 利' }, { char: '利', question: '便( )ㄌㄧˋ' },
        { char: '悅', question: '喜( )ㄩㄝˋ' }, { char: '乖', question: '( )ㄍㄨㄞ 巧' }, { char: '溫', question: '( )ㄨㄣ 暖' }
    ],
    'NY_3_5': [
        { char: '龍', question: '( )ㄌㄨㄥˊ 頭' }, { char: '沖', question: '( )ㄔㄨㄥ 洗' }, { char: '菱', question: '( )ㄌㄧㄥˊ 形' }, { char: '兄', question: '( )ㄒㄩㄥ 弟' },
        { char: '吐', question: '嘔( )ㄊㄨˋ' }, { char: '歪', question: '( )ㄨㄞ 斜' }, { char: '防', question: '預( )ㄈㄤˊ' }, { char: '警', question: '( )ㄐㄧㄥˇ 察' },
        { char: '鈴', question: '電( )ㄌㄧㄥˊ' }, { char: '注', question: '( )ㄓㄨˋ 意' }, { char: '員', question: '人( )ㄩㄢˊ' }, { char: '傷', question: '受( )ㄕㄤ' },
        { char: '死', question: '( )ㄙˇ 亡' }, { char: '諒', question: '原( )ㄌㄧㄤˋ' }, { char: '脾', question: '( )ㄆㄧˊ 氣' }
    ],
    'NY_3_6': [
        { char: '幕', question: '閉( )ㄇㄨˋ' }, { char: '杯', question: '( )ㄅㄟ 子' }, { char: '撞', question: '( )ㄓㄨㄤˋ 倒' }, { char: '流', question: '( )ㄌㄧㄡˊ 汗' },
        { char: '溼', question: '潮( )ㄕ' }, { char: '透', question: '溼( )ㄊㄡˋ' }, { char: '雙', question: '一( )ㄕㄨㄤ' }, { char: '胸', question: '( )ㄒㄩㄥ 膛' },
        { char: '負', question: '背( )ㄈㄨˋ' }, { char: '慌', question: '( )ㄏㄨㄤ 張' }, { char: '逃', question: '( )ㄊㄠˊ 跑' }, { char: '辦', question: '( )ㄅㄢˋ 法' },
        { char: '題', question: '問( )ㄊㄧˊ' }, { char: '灰', question: '( )ㄏㄨㄟ 色' }, { char: '剪', question: '( )ㄐㄧㄢˇ 刀' }
    ],
    'NY_3_7': [
        { char: '背', question: '( )ㄅㄟ 包' }, { char: '斑', question: '( )ㄅㄢ 馬' }, { char: '皺', question: '( )ㄓㄡˋ 紋' }, { char: '懂', question: '( )ㄉㄨㄥˇ 得' },
        { char: '凡', question: '平( )ㄈㄢˊ' }, { char: '梳', question: '( )ㄕㄨ 頭' }, { char: '夾', question: '( )ㄐㄧㄚˊ 子' }, { char: '藏', question: '躲( )ㄘㄤˊ' },
        { char: '捏', question: '( )ㄋㄧㄝ 麵人' }, { char: '摺', question: '( )ㄓㄜˊ 紙' }, { char: '仔', question: '( )ㄗˇ 細' }, { char: '藝', question: '( )ㄧˋ 術' },
        { char: '術', question: '美( )ㄕㄨˋ' }, { char: '雖', question: '( )ㄙㄨㄟ 然' }, { char: '創', question: '( )ㄔㄨㄤˋ 作' }
    ],
    'NY_3_8': [
        { char: '魔', question: '( )ㄇㄛˊ 法' }, { char: '圍', question: '周( )ㄨㄟˊ' }, { char: '巾', question: '毛( )ㄐㄧㄣ' }, { char: '視', question: '近( )ㄕˋ' },
        { char: '框', question: '鏡( )ㄎㄨㄤ' }, { char: '誤', question: '錯( )ㄨˋ' }, { char: '愉', question: '( )ㄩˊ 快' }, { char: '數', question: '( )ㄕㄨˇ 落' },
        { char: '桶', question: '水( )ㄊㄨㄥˇ' }, { char: '刀', question: '剪( )ㄉㄠ' }, { char: '曾', question: '( )ㄘㄥˊ 經' }, { char: '機', question: '飛( )ㄐㄧ' },
        { char: '解', question: '了( )ㄐㄧㄝˇ' }, { char: '鏡', question: '眼( )ㄐㄧㄥˋ' }, { char: '齊', question: '整( )ㄑㄧˊ' }
    ],
    'NY_3_9': [
        { char: '醫', question: '( )ㄧ 生' }, { char: '穿', question: '( )ㄔㄨㄢ 著' }, { char: '袍', question: '旗( )ㄆㄠˊ' }, { char: '戴', question: '( )ㄉㄞˋ 帽子' },
        { char: '筒', question: '筆( )ㄊㄨㄥˇ' }, { char: '啄', question: '( )ㄓㄨㄛˊ 木鳥' }, { char: '備', question: '準( )ㄅㄟˋ' }, { char: '幹', question: '樹( )ㄍㄢˋ' },
        { char: '敲', question: '( )ㄑㄧㄠ 門' }, { char: '毒', question: '( )ㄉㄨˊ 藥' }, { char: '體', question: '身( )ㄊㄧˇ' }, { char: '淘', question: '( )ㄊㄠˊ 氣' },
        { char: '蘋', question: '( )ㄆㄧㄥˊ 果' }, { char: '般', question: '一( )ㄅㄢ' }, { char: '藥', question: '吃( )ㄧㄠˋ' }
    ],
    'NY_3_10': [
        { char: '極', question: '北( )ㄐㄧˊ' }, { char: '熊', question: '( )ㄒㄩㄥˊ 貓' }, { char: '雪', question: '下( )ㄒㄩㄝˇ' }, { char: '腦', question: '電( )ㄋㄠˇ' },
        { char: '實', question: '( )ㄕˊ 在' }, { char: '根', question: '樹( )ㄍㄣ' }, { char: '反', question: '( )ㄈㄢˇ 對' }, { char: '射', question: '( )ㄕㄜˋ 擊' },
        { char: '膚', question: '皮( )ㄈㄨ' }, { char: '豬', question: '小( )ㄓㄨ' }, { char: '呆', question: '發( )ㄉㄞ' }, { char: '印', question: '( )ㄧㄣˋ 刷' },
        { char: '象', question: '印( )ㄒㄧㄤˋ' }, { char: '憶', question: '回( )ㄧˋ' }, { char: '滾', question: '( )ㄍㄨㄣˇ 動' }
    ],
    'NY_3_11': [
        { char: '額', question: '( )ㄜˊ 頭' }, { char: '虎', question: '老( )ㄏㄨˇ' }, { char: '貓', question: '( )ㄇㄠ 咪' }, { char: '臺', question: '( )ㄊㄞˊ 灣' },
        { char: '灣', question: '海( )ㄨㄢ' }, { char: '獨', question: '( )ㄉㄨˊ 特' }, { char: '萬', question: '千( )ㄨㄢˋ' }, { char: '祖', question: '( )ㄗㄨˇ 先' },
        { char: '蛙', question: '青( )ㄨㄚ' }, { char: '捉', question: '( )ㄓㄨㄛ 拿' }, { char: '類', question: '種( )ㄌㄟˋ' }, { char: '占', question: '( )ㄓㄢˋ 領' },
        { char: '雞', question: '公( )ㄐㄧ' }, { char: '肉', question: '豬( )ㄖㄡˋ' }, { char: '威', question: '( )ㄨㄟ 風' }
    ],
    'NY_3_12': [
        { char: '昆', question: '( )ㄎㄨㄣ 蟲' }, { char: '攻', question: '( )ㄍㄨㄥ 擊' }, { char: '擊', question: '打( )ㄐㄧˊ' }, { char: '演', question: '表( )ㄧㄢˇ' },
        { char: '保', question: '( )ㄅㄠˇ 護' }, { char: '命', question: '生( )ㄇㄧㄥˋ' }, { char: '翅', question: '( )ㄔˋ 膀' }, { char: '敵', question: '( )ㄉㄧˊ 人' },
        { char: '周', question: '四( )ㄓㄡ' }, { char: '竹', question: '( )ㄓㄨˊ 林' }, { char: '節', question: '( )ㄐㄧㄝˊ 日' }, { char: '逼', question: '( )ㄅㄧ 近' },
        { char: '技', question: '( )ㄐㄧˋ 術' }, { char: '退', question: '後( )ㄊㄨㄟˋ' }, { char: '屁', question: '放( )ㄆㄧˋ' }
    ],

    // =========================================================================
    // 翰林 (Hanlin) - Grade 1
    // =========================================================================
    'HL_1_1': [
        { char: '起', question: '( )ㄑㄧˇ 立' }, { char: '走', question: '( )ㄗㄡˇ 路' }, { char: '你', question: '( )ㄋㄧˇ 好' }, 
        { char: '在', question: '現( )ㄗㄞˋ' }, { char: '左', question: '( )ㄗㄨㄛˇ 邊' }, { char: '我', question: '( )ㄨㄛˇ 們' }, 
        { char: '右', question: '( )ㄧㄡˋ 手' }, { char: '和', question: '( )ㄏㄜˊ 平' }, { char: '向', question: '方( )ㄒㄧㄤˋ' }, 
        { char: '前', question: '( )ㄑㄧㄢˊ 面' }
    ],
    'HL_1_2': [
        { char: '大', question: '( )ㄉㄚˋ 象' }, { char: '風', question: '颳( )ㄈㄥ' }, { char: '吹', question: '( )ㄔㄨㄟ 氣' }, 
        { char: '們', question: '他( )ㄇㄣ˙' }, { char: '來', question: '( )ㄌㄞˊ 去' }, { char: '玩', question: '( )ㄨㄢˊ 具' }, 
        { char: '不', question: '( )ㄅㄨˊ 是' }, { char: '停', question: '( )ㄊㄧㄥˊ 車' }, { char: '的', question: '好( )ㄉㄜ˙' }, 
        { char: '跑', question: '( )ㄆㄠˇ 步' }
    ],
    'HL_1_3': [
        { char: '火', question: '( )ㄏㄨㄛˇ 車' }, { char: '車', question: '汽( )ㄔㄜ' }, { char: '山', question: '爬( )ㄕㄢ' }, 
        { char: '洞', question: '( )ㄉㄨㄥˋ 穴' }, { char: '個', question: '一( )ㄍㄜ˙' }, { char: '又', question: '( )ㄧㄡˋ 來' }, 
        { char: '出', question: '( )ㄔㄨ 門' }, { char: '小', question: '( )ㄒㄧㄠˇ 狗' }, { char: '堆', question: '土( )ㄉㄨㄟ' }, 
        { char: '開', question: '( )ㄎㄞ 心' }, { char: '心', question: '愛( )ㄒㄧㄣ' }
    ],
    'HL_1_4': [
        { char: '請', question: '( )ㄑㄧㄥˇ 問' }, { char: '問', question: '學( )ㄨㄣˋ' }, { char: '草', question: '( )ㄘㄠˇ 地' }, 
        { char: '天', question: '( )ㄊㄧㄢ 空' }, { char: '有', question: '沒( )ㄧㄡˇ' }, { char: '多', question: '許( )ㄉㄨㄛ' }, 
        { char: '高', question: '( )ㄍㄠ 興' }, { char: '星', question: '( )ㄒㄧㄥ 星' }, { char: '少', question: '減( )ㄕㄠˇ' }, 
        { char: '太', question: '( )ㄊㄞˋ 陽' }, { char: '了', question: '走( )ㄌㄜ˙' }, { char: '水', question: '喝( )ㄕㄨㄟˇ' }, 
        { char: '去', question: '過( )ㄑㄩˋ' }
    ],
    'HL_1_5': [
        { char: '彩', question: '( )ㄘㄞˇ 虹' }, { char: '上', question: '樓( )ㄕㄤˋ' }, { char: '好', question: '( )ㄏㄠˇ 人' }, 
        { char: '想', question: '( )ㄒㄧㄤˇ 念' }, { char: '爬', question: '( )ㄆㄚˊ 山' }, { char: '看', question: '( )ㄎㄢˋ 書' }, 
        { char: '沒', question: '( )ㄇㄟˊ 有' }, { char: '棉', question: '( )ㄇㄧㄢˊ 被' }, { char: '花', question: '( )ㄏㄨㄚ 朵' }, 
        { char: '下', question: '樓( )ㄒㄧㄚˋ' }, { char: '泡', question: '( )ㄆㄠˋ 泡' }, { char: '池', question: '水( )ㄔˊ' }
    ],
    'HL_1_6': [
        { char: '秋', question: '( )ㄑㄧㄡ 天' }, { char: '千', question: '( )ㄑㄧㄢ 萬' }, { char: '子', question: '兒( )ㄗ˙' }, 
        { char: '空', question: '( )ㄎㄨㄥ 氣' }, { char: '說', question: '聽( )ㄕㄨㄛ' }, { char: '早', question: '( )ㄗㄠˇ 安' }, 
        { char: '田', question: '農( )ㄊㄧㄢˊ' }, { char: '是', question: '就( )ㄕˋ' }, { char: '誰', question: '( )ㄕㄟˊ 的' }, 
        { char: '陪', question: '( )ㄆㄟˊ 伴' }, { char: '他', question: '其( )ㄊㄚ' }
    ],
    'HL_1_7': [
        { char: '回', question: '( )ㄏㄨㄟˊ 家' }, { char: '音', question: '聲( )ㄧㄣ' }, { char: '到', question: '來( )ㄉㄠˋ' }, 
        { char: '谷', question: '山( )ㄍㄨˇ' }, { char: '叫', question: '尖( )ㄐㄧㄠˋ' }, { char: '人', question: '大( )ㄖㄣˊ' }, 
        { char: '嗎', question: '好( )ㄇㄚ ' }, { char: '也', question: '( )ㄧㄝˇ 是' }, { char: '笑', question: '微( )ㄒㄧㄠˋ' }, 
        { char: '哈', question: '( )ㄏㄚ 哈' }
    ],

    // =========================================================================
    // 翰林 (Hanlin) - Grade 2
    // =========================================================================
    'HL_2_1': [
        { char: '候', question: '時( )ㄏㄡˋ' }, { char: '颳', question: '( )ㄍㄨㄚ 風' }, { char: '冷', question: '( )ㄌㄥˇ 氣' }, { char: '躲', question: '( )ㄉㄨㄛˇ 避' },
        { char: '閃', question: '( )ㄕㄢˇ 電' }, { char: '電', question: '( )ㄉㄧㄢˋ 燈' }, { char: '難', question: '困( )ㄋㄢˊ' }, { char: '烏', question: '( )ㄨ 雲' },
        { char: '雲', question: '白( )ㄩㄣˊ' }, { char: '密', question: '祕( )ㄇㄧˋ' }, { char: '布', question: '( )ㄅㄨˋ 料' }, { char: '盆', question: '臉( )ㄆㄣˊ' },
        { char: '充', question: '( )ㄔㄨㄥ 電' }, { char: '滿', question: '裝( )ㄇㄢˇ' }, { char: '放', question: '( )ㄈㄤˋ 學' }, { char: '晴', question: '( )ㄑㄧㄥˊ 天' },
        { char: '現', question: '( )ㄒㄧㄢˋ 在' }, { char: '虹', question: '彩( )ㄏㄨㄥˊ' }
    ],
    'HL_2_2': [
        { char: '老', question: '( )ㄌㄠˇ 師' }, { char: '師', question: '老( )ㄕ' }, { char: '新', question: '( )ㄒㄧㄣ 衣' }, { char: '希', question: '( )ㄒㄧ 望' },
        { char: '望', question: '失( )ㄨㄤˋ' }, { char: '卻', question: '忘( )ㄑㄩㄝˋ' }, { char: '始', question: '開( )ㄕˇ' }, { char: '緊', question: '( )ㄐㄧㄣˇ 張' },
        { char: '因', question: '( )ㄧㄣ 為' }, { char: '為', question: '因( )ㄨㄟˋ' }, { char: '知', question: '( )ㄓ 道' }, { char: '道', question: '知( )ㄉㄠˋ' },
        { char: '怎', question: '( )ㄗㄣˇ 麼' }, { char: '消', question: '( )ㄒㄧㄠ 失' }, { char: '失', question: '損( )ㄕ' }, { char: '習', question: '學( )ㄒㄧˊ' },
        { char: '最', question: '( )ㄗㄨㄟˋ 好' }, { char: '掛', question: '( )ㄍㄨㄚˋ 念' }
    ],
    'HL_2_3': [
        { char: '國', question: '( )ㄍㄨㄛˊ 家' }, { char: '王', question: '大( )ㄨㄤˊ' }, { char: '喜', question: '歡( )ㄒㄧˇ' }, { char: '歡', question: '喜( )ㄏㄨㄢ' },
        { char: '穿', question: '( )ㄔㄨㄢ 衣' }, { char: '只', question: '( )ㄓˇ 是' }, { char: '件', question: '一( )ㄐㄧㄢˋ' }, { char: '點', question: '( )ㄉㄧㄢˇ 心' },
        { char: '改', question: '( )ㄍㄞˇ 變' }, { char: '領', question: '本( )ㄌㄧㄥˇ' }, { char: '越', question: '( )ㄩㄝˋ 來' }, { char: '設', question: '( )ㄕㄜˋ 計' },
        { char: '計', question: '算( )ㄐㄧˋ' }, { char: '發', question: '( )ㄈㄚ 現' }, { char: '方', question: '( )ㄈㄤ 法' }, { char: '法', question: '辦( )ㄈㄚˇ' },
        { char: '分', question: '( )ㄈㄣ 享' }, { char: '享', question: '分( )ㄒㄧㄤˇ' }
    ],
    'HL_2_4': [
        { char: '呱', question: '頂( )ㄍㄨㄚ呱' }, { char: '聞', question: '新( )ㄨㄣˊ' }, { char: '聲', question: '( )ㄕㄥ 音' }, { char: '猜', question: '( )ㄘㄞ 謎' },
        { char: '蛙', question: '青( )ㄨㄚ' }, { char: '別', question: '( )ㄅㄧㄝˊ 人' }, { char: '靠', question: '依( )ㄎㄠˋ' }, { char: '近', question: '遠( )ㄐㄧㄣˋ' },
        { char: '抓', question: '( )ㄓㄨㄚ 住' }, { char: '如', question: '( )ㄖㄨˊ 果' }, { char: '果', question: '水( )ㄍㄨㄛˇ' }, { char: '乖', question: '( )ㄍㄨㄞ 巧' },
        { char: '腦', question: '電( )ㄋㄠˇ' }, { char: '袋', question: '口( )ㄉㄞˋ' }, { char: '瓜', question: '西( )ㄍㄨㄚ' }, { char: '證', question: '( )ㄓㄥˋ 明' },
        { char: '明', question: '聰( )ㄇㄧㄥˊ' }, { char: '頂', question: '屋( )ㄉㄧㄥˇ' }
    ],
    'HL_2_5': [
        { char: '沙', question: '( )ㄕㄚ 灘' }, { char: '灘', question: '海( )ㄊㄢ' }, { char: '海', question: '( )ㄏㄞˇ 邊' }, { char: '邊', question: '旁( )ㄅㄧㄢ' },
        { char: '退', question: '後( )ㄊㄨㄟˋ' }, { char: '遠', question: '遙( )ㄩㄢˇ' }, { char: '螃', question: '( )ㄆㄤˊ 蟹' }, { char: '蟹', question: '螃( )ㄒㄧㄝˋ' },
        { char: '愛', question: '可( )ㄞˋ' }, { char: '注', question: '( )ㄓㄨˋ 意' }, { char: '夕', question: '( )ㄒㄧˋ 陽' }, { char: '腳', question: '( )ㄐㄧㄠˇ 步' },
        { char: '丫', question: '腳( )ㄧㄚ' }, { char: '橫', question: '( )ㄏㄥˊ 線' }, { char: '留', question: '( )ㄌㄧㄡˊ 下' }, { char: '印', question: '( )ㄧㄣˋ 章' },
        { char: '挖', question: '( )ㄨㄚ 土' }, { char: '麗', question: '美( )ㄌㄧˋ' }
    ],
    'HL_2_6': [
        { char: '月', question: '( )ㄩㄝˋ 亮' }, { char: '奶', question: '牛( )ㄋㄞˇ' }, { char: '晚', question: '( )ㄨㄢˇ 餐' }, { char: '飯', question: '米( )ㄈㄢˋ' },
        { char: '散', question: '( )ㄙㄢˋ 步' }, { char: '屋', question: '( )ㄨ 子' }, { char: '竹', question: '( )ㄓㄨˊ 林' }, { char: '林', question: '森( )ㄌㄧㄣˊ' },
        { char: '頭', question: '點( )ㄊㄡˊ' }, { char: '溪', question: '小( )ㄒㄧ' }, { char: '旁', question: '路( )ㄆㄤˊ' }, { char: '暗', question: '黑( )ㄢˋ' },
        { char: '眼', question: '( )ㄧㄢˇ 睛' }, { char: '睛', question: '眼( )ㄐㄧㄥ' }, { char: '那', question: '( )ㄋㄚˋ 裡' }, { char: '聚', question: '相( )ㄐㄩˋ' },
        { char: '成', question: '完( )ㄔㄥˊ' }, { char: '顆', question: '一( )ㄎㄜ' }
    ],
    'HL_2_7': [
        { char: '樣', question: '一( )ㄧㄤˋ' }, { char: '食', question: '( )ㄕˊ 物' }, { char: '郊', question: '( )ㄐㄧㄠ 遊' }, { char: '活', question: '生( )ㄏㄨㄛˊ' },
        { char: '奇', question: '好( )ㄑㄧˊ' }, { char: '筒', question: '筆( )ㄊㄨㄥˇ' }, { char: '香', question: '( )ㄒㄧㄤ 味' }, { char: '味', question: '味( )ㄉㄠˋ' },
        { char: '便', question: '方( )ㄅㄧㄢˋ' }, { char: '當', question: '便( )ㄉㄤ' }, { char: '盒', question: '禮( )ㄏㄜˊ' }, { char: '客', question: '請( )ㄎㄜˋ' },
        { char: '清', question: '( )ㄑㄧㄥ 水' }, { char: '節', question: '( )ㄐㄧㄝˊ 省' }, { char: '保', question: '( )ㄅㄠˇ 護' }, { char: '平', question: '( )ㄆㄧㄥˊ 安' },
        { char: '安', question: '平( )ㄢ' }, { char: '南', question: '( )ㄋㄢˊ 部' }
    ],
    'HL_2_8': [
        { char: '介', question: '( )ㄐㄧㄝˋ 紹' }, { char: '圓', question: '( )ㄩㄢˊ 形' }, { char: '形', question: '圖( )ㄒㄧㄥˊ' }, { char: '白', question: '( )ㄅㄞˊ 色' },
        { char: '紙', question: '報( )ㄓˇ' }, { char: '米', question: '( )ㄇㄧˇ 飯' }, { char: '變', question: '改( )ㄅㄧㄢˋ' }, { char: '軟', question: '柔( )ㄖㄨㄢˇ' },
        { char: '搶', question: '( )ㄑㄧㄤˇ 答' }, { char: '材', question: '( )ㄘㄞˊ 料' }, { char: '蝦', question: '( )ㄒㄧㄚ 子' }, { char: '線', question: '毛( )ㄒㄧㄢˋ' },
        { char: '各', question: '( )ㄍㄜˋ 位' }, { char: '種', question: '各( )ㄓㄨㄥˇ' }, { char: '菜', question: '青( )ㄘㄞˋ' }, { char: '接', question: '( )ㄐㄧㄝ 著' },
        { char: '聽', question: '( )ㄊㄧㄥ 見' }, { char: '更', question: '( )ㄍㄥˋ 加' }
    ],
    'HL_2_9': [
        { char: '黃', question: '( )ㄏㄨㄤˊ 色' }, { char: '沖', question: '( )ㄔㄨㄥ 水' }, { char: '澡', question: '洗( )ㄗㄠˇ' }, { char: '蘿', question: '( )ㄌㄨㄛˊ 蔔' },
        { char: '蔔', question: '蘿( )ㄅㄛ˙' }, { char: '哪', question: '( )ㄋㄚˇ 裡' }, { char: '粒', question: '米( )ㄌㄧˋ' }, { char: '熱', question: '( )ㄖㄜˋ 鬧' },
        { char: '浴', question: '( )ㄩˋ 室' }, { char: '蒸', question: '( )ㄓㄥ 氣' }, { char: '胖', question: '肥( )ㄆㄤˋ' }, { char: '名', question: '( )ㄇㄧㄥˊ 字' },
        { char: '苔', question: '青( )ㄊㄞˊ' }, { char: '蛋', question: '雞( )ㄉㄢˋ' }, { char: '蔬', question: '( )ㄕㄨ 菜' }, { char: '通', question: '交( )ㄊㄨㄥ' },
        { char: '細', question: '仔( )ㄒㄧˋ' }, { char: '淡', question: '平( )ㄉㄢˋ' }
    ],
    'HL_2_10': [
        { char: '減', question: '( )ㄐㄧㄢˇ 少' }, { char: '表', question: '手( )ㄅㄧㄠˇ' }, { char: '讀', question: '( )ㄉㄨˊ 書' }, { char: '認', question: '( )ㄖㄣˋ 識' },
        { char: '識', question: '知( )ㄕˋ' }, { char: '謎', question: '猜( )ㄇㄧˊ' }, { char: '答', question: '回( )ㄉㄚˊ' }, { char: '搖', question: '( )ㄧㄠˊ 頭' },
        { char: '百', question: '一( )ㄅㄞˇ' }, { char: '嘴', question: '( )ㄗㄨㄟˇ 巴' }, { char: '哥', question: '( )ㄍㄜ 哥' }, { char: '數', question: '( )ㄕㄨˋ 字' },
        { char: '題', question: '問( )ㄊㄧˊ' }, { char: '趕', question: '( )ㄍㄢˇ 快' }, { char: '突', question: '( )ㄊㄨˊ 然' }, { char: '異', question: '奇( )ㄧˋ' },
        { char: '口', question: '( )ㄎㄡˇ 渴' }, { char: '對', question: '( )ㄉㄨㄟˋ 錯' }
    ],
    'HL_2_11': [
        { char: '怪', question: '奇( )ㄍㄨㄞˋ' }, { char: '門', question: '大( )ㄇㄣˊ' }, { char: '扇', question: '電風( )ㄕㄢˋ' }, { char: '立', question: '站( )ㄌㄧˋ' },
        { char: '刻', question: '雕( )ㄎㄜˋ' }, { char: '閒', question: '( )ㄒㄧㄢˊ 暇' }, { char: '馬', question: '( )ㄇㄚˇ 上' }, { char: '闖', question: '( )ㄔㄨㄤˇ 關' },
        { char: '耳', question: '( )ㄦˇ 朵' }, { char: '主', question: '( )ㄓㄨˇ 人' }, { char: '播', question: '傳( )ㄅㄛˋ' }, { char: '報', question: '( )ㄅㄠˋ 紙' },
        { char: '力', question: '努( )ㄌㄧˋ' }, { char: '竟', question: '畢( )ㄐㄧㄥˋ' }, { char: '巴', question: '尾( )ㄅㄚ˙' }, { char: '東', question: '( )ㄉㄨㄥ 西' },
        { char: '西', question: '東( )ㄒㄧ' }, { char: '底', question: '海( )ㄉㄧˇ' }
    ],
    'HL_2_12': [
        { char: '思', question: '思( )ㄋㄧㄢˋ' }, { char: '歌', question: '歌( )ㄑㄩˇ' }, { char: '品', question: '品( )ㄒㄧㄤˋ' }, { char: '浮', question: '( )ㄈㄨˊ 沉' },
        { char: '手', question: '手( )ㄓㄤˇ' }, { char: '撥', question: '( )ㄅㄛ 開' }, { char: '波', question: '( )ㄅㄛ 浪' }, { char: '詩', question: '( )ㄕ 歌' },
        { char: '作', question: '( )ㄗㄨㄛˋ 業' }, { char: '首', question: '一( )ㄕㄡˇ' }, { char: '指', question: '( )ㄓˇ 頭' }, { char: '伸', question: '( )ㄕㄣ 手' },
        { char: '脖', question: '( )ㄅㄛˊ 子' }, { char: '身', question: '( )ㄕㄣ 體' }, { char: '體', question: '育( )ㄊㄧˇ' }, { char: '隻', question: '一( )ㄓ' },
        { char: '倒', question: '( )ㄉㄠˋ 車' }, { char: '肚', question: '( )ㄉㄨˋ 子' }
    ],

    // =========================================================================
    // 翰林 (Hanlin) - Grade 3
    // =========================================================================
    'HL_3_1': [
        { char: '待', question: '等( )ㄉㄞˋ' }, { char: '牠', question: '( )ㄊㄚ 們(動物)' }, { char: '吞', question: '( )ㄊㄨㄣ 嚥' }, { char: '寸', question: '一( )ㄘㄨㄣˋ' },
        { char: '碌', question: '忙( )ㄌㄨˋ' }, { char: '奔', question: '( )ㄅㄣ 跑' }, { char: '斑', question: '( )ㄅㄢ 馬' }, { char: '實', question: '誠( )ㄕˊ' },
        { char: '彈', question: '( )ㄊㄢˊ 琴' }, { char: '樂', question: '快( )ㄌㄜˋ' }, { char: '它', question: '( )ㄊㄚ 們(物品)' }, { char: '短', question: '長( )ㄉㄨㄢˇ' },
        { char: '悲', question: '慈( )ㄅㄟ' }, { char: '傷', question: '受( )ㄕㄤ' }, { char: '永', question: '( )ㄩㄥˇ 遠' }
    ],
    'HL_3_2': [
        { char: '週', question: '一( )ㄓㄡ' }, { char: '休', question: '( )ㄒㄧㄡ 息' }, { char: '假', question: '( )ㄐㄧㄚˋ 期' }, { char: '連', question: '( )ㄌㄧㄢˊ 接' },
        { char: '業', question: '作( )ㄧㄝˋ' }, { char: '午', question: '中( )ㄨˇ' }, { char: '並', question: '( )ㄅㄧㄥˋ 且' }, { char: '提', question: '( )ㄊㄧˊ 醒' },
        { char: '醒', question: '叫( )ㄒㄧㄥˇ' }, { char: '拖', question: '( )ㄊㄨㄛ 地' }, { char: '蜜', question: '( )ㄇㄧˋ 蜂' }, { char: '桃', question: '( )ㄊㄠˊ 子' },
        { char: '嘟', question: '( )ㄉㄨ 嘴' }, { char: '嘴', question: '( )ㄗㄨㄟˇ 巴' }, { char: '房', question: '( )ㄈㄤˊ 間' }
    ],
    'HL_3_3': [
        { char: '統', question: '( )ㄊㄨㄥˇ 一' }, { char: '計', question: '( )ㄐㄧˋ 算' }, { char: '票', question: '車( )ㄆㄧㄠˋ' }, { char: '角', question: '三( )ㄐㄧㄠˇ' },
        { char: '板', question: '黑( )ㄅㄢˇ' }, { char: '本', question: '課( )ㄅㄣˇ' }, { char: '況', question: '情( )ㄎㄨㄤˋ' }, { char: '因', question: '原( )ㄧㄣ' },
        { char: '及', question: '以( )ㄐㄧˊ' }, { char: '文', question: '( )ㄨㄣˊ 章' }, { char: '具', question: '玩( )ㄐㄩˋ' }, { char: '理', question: '道( )ㄌㄧˇ' },
        { char: '此', question: '因( )ㄘˇ' }, { char: '準', question: '( )ㄓㄨㄣˇ 備' }, { char: '備', question: '準( )ㄅㄟˋ' }
    ],
    'HL_3_4': [
        { char: '古', question: '( )ㄍㄨˇ 老' }, { char: '懂', question: '( )ㄉㄨㄥˇ 事' }, { char: '居', question: '鄰( )ㄐㄩ' }, { char: '群', question: '一( )ㄑㄩㄣˊ' },
        { char: '省', question: '節( )ㄕㄥˇ' }, { char: '費', question: '浪( )ㄈㄟˋ' }, { char: '商', question: '( )ㄕㄤ 店' }, { char: '量', question: '力( )ㄌㄧㄤˋ' },
        { char: '窮', question: '貧( )ㄑㄩㄥˊ' }, { char: '桶', question: '水( )ㄊㄨㄥˇ' }, { char: '怒', question: '憤( )ㄋㄨˋ' }, { char: '亂', question: '髒( )ㄌㄨㄢˋ' },
        { char: '增', question: '( )ㄗㄥ 加' }, { char: '胡', question: '( )ㄏㄨˊ 鬧' }, { char: '摸', question: '觸( )ㄇㄛ' }
    ],
    'HL_3_5': [
        { char: '貼', question: '( )ㄊㄧㄝ 紙' }, { char: '年', question: '今( )ㄋㄧㄢˊ' }, { char: '級', question: '年( )ㄐㄧˊ' }, { char: '使', question: '( )ㄕˇ 用' },
        { char: '何', question: '幾( )ㄏㄜˊ' }, { char: '隨', question: '( )ㄙㄨㄟˊ 便' }, { char: '隔', question: '( )ㄍㄜˊ 壁' }, { char: '睡', question: '( )ㄕㄨㄟˋ 覺' },
        { char: '效', question: '( )ㄒㄧㄠˋ 果' }, { char: '序', question: '順( )ㄒㄩˋ' }, { char: '而', question: '( )ㄦˊ 且' }, { char: '且', question: '並( )ㄑㄧㄝˇ' },
        { char: '排', question: '( )ㄆㄞˊ 隊' }, { char: '箱', question: '冰( )ㄒㄧㄤ' }, { char: '條', question: '麵( )ㄊㄧㄠˊ' }
    ],
    'HL_3_6': [
        { char: '黏', question: '( )ㄋㄧㄢˊ 貼' }, { char: '木', question: '( )ㄇㄨˋ 頭' }, { char: '製', question: '( )ㄓˋ 造' }, { char: '部', question: '( )ㄅㄨˋ 分' },
        { char: '混', question: '( )ㄏㄨㄣˋ 合' }, { char: '斷', question: '折( )ㄉㄨㄢˋ' }, { char: '解', question: '( )ㄐㄧㄝˇ 釋' }, { char: '機', question: '飛( )ㄐㄧ' },
        { char: '器', question: '機( )ㄑㄧˋ' }, { char: '另', question: '( )ㄌㄧㄥˋ 外' }, { char: '治', question: '( )ㄓˋ 療' }, { char: '枝', question: '樹( )ㄓ' },
        { char: '桿', question: '旗( )ㄍㄢ' }, { char: '擦', question: '( )ㄘㄚ 掉' }, { char: '削', question: '( )ㄒㄧㄠ 鉛筆' }
    ],
    'HL_3_7': [
        { char: '鹹', question: '( )ㄒㄧㄢˊ 味' }, { char: '蔚', question: '( )ㄨㄟˋ 藍' }, { char: '航', question: '( )ㄏㄤˊ 行' }, { char: '乘', question: '( )ㄔㄥˊ 客' },
        { char: '橇', question: '雪( )ㄑㄧㄠ' }, { char: '坡', question: '山( )ㄆㄛ' }, { char: '野', question: '原( )ㄧㄝˇ' }, { char: '滾', question: '( )ㄍㄨㄣˇ 動' },
        { char: '閉', question: '關( )ㄅㄧˋ' }, { char: '深', question: '( )ㄕㄣ 淺' }, { char: '吸', question: '( )ㄒㄧ 氣' }, { char: '欣', question: '( )ㄒㄧㄣ 賞' },
        { char: '賞', question: '獎( )ㄕㄤˇ' }, { char: '瞞', question: '隱( )ㄇㄢˊ' }
    ],
    'HL_3_8': [
        { char: '寄', question: '( )ㄐㄧˋ 信' }, { char: '蟹', question: '螃( )ㄒㄧㄝˋ' }, { char: '灘', question: '海( )ㄊㄢ' }, { char: '螃', question: '( )ㄆㄤˊ 蟹' },
        { char: '堆', question: '( )ㄉㄨㄟ 積' }, { char: '杯', question: '( )ㄅㄟ 子' }, { char: '類', question: '種( )ㄌㄟˋ' }, { char: '撿', question: '( )ㄐㄧㄢˇ 到' },
        { char: '瓶', question: '( )ㄆㄧㄥˊ 子' }, { char: '蓋', question: '( )ㄍㄞˋ 子' }, { char: '淨', question: '乾( )ㄐㄧㄥˋ' }, { char: '志', question: '( )ㄓˋ 工' },
        { char: '品', question: '作( )ㄆㄧㄣˇ' }, { char: '應', question: '( )ㄧㄥ 應該' }, { char: '幕', question: '屏( )ㄇㄨˋ' }, { char: '殼', question: '貝( )ㄎㄜˊ' },
        { char: '垃', question: '( )ㄌㄜˋ 圾' }, { char: '圾', question: '垃( )ㄙㄜˋ' }, { char: '護', question: '保( )ㄏㄨˋ' }
    ],
    'HL_3_9': [
        { char: '挑', question: '( )ㄊㄧㄠ 選' }, { char: '教', question: '( )ㄐㄧㄠˋ 導' }, { char: '導', question: '指( )ㄉㄠˇ' }, { char: '叢', question: '草( )ㄘㄨㄥˊ' },
        { char: '喊', question: '大( )ㄏㄢˇ' }, { char: '投', question: '( )ㄊㄡˊ 資' }, { char: '繼', question: '( )ㄐㄧˋ 續' }, { char: '續', question: '繼( )ㄒㄩˋ' },
        { char: '岸', question: '海( )ㄢˋ' }, { char: '淺', question: '( )ㄑㄧㄢˇ 色' }, { char: '捲', question: '( )ㄐㄩㄢˇ 起' }, { char: '沿', question: '( )ㄧㄢˊ 著' },
        { char: '踩', question: '( )ㄘㄞˇ 踏' }, { char: '座', question: '( )ㄗㄨㄛˋ 位' }, { char: '般', question: '一( )ㄅㄢ' }
    ],
    'HL_3_10': [
        { char: '婚', question: '結( )ㄏㄨㄣ' }, { char: '禮', question: '( )ㄌㄧˇ 物' }, { char: '盪', question: '( )ㄉㄤˋ 鞦韆' }, { char: '服', question: '衣( )ㄈㄨˊ' },
        { char: '代', question: '( )ㄉㄞˋ 表' }, { char: '福', question: '幸( )ㄈㄨˊ' }, { char: '結', question: '( )ㄐㄧㄝˊ 婚' }, { char: '束', question: '結( )ㄕㄨˋ' },
        { char: '酒', question: '喝( )ㄐㄧㄡˇ' }, { char: '敬', question: '( )ㄐㄧㄥˋ 禮' }, { char: '舞', question: '跳( )ㄨˇ' }, { char: '習', question: '( )ㄒㄧˊ 慣' },
        { char: '俗', question: '習( )ㄙㄨˊ' }, { char: '惜', question: '可( )ㄒㄧˊ' }, { char: '互', question: '( )ㄏㄨˋ 相' }
    ],
    'HL_3_11': [
        { char: '除', question: '( )ㄔㄨˊ 非' }, { char: '嬸', question: '大( )ㄕㄣˇ' }, { char: '煙', question: '抽( )ㄧㄢ' }, { char: '炮', question: '鞭( )ㄆㄠˋ' },
        { char: '附', question: '( )ㄈㄨˋ 近' }, { char: '店', question: '商( )ㄉㄧㄢˋ' }, { char: '息', question: '休( )ㄒㄧˊ' }, { char: '修', question: '( )ㄒㄧㄡ 理' },
        { char: '廠', question: '工( )ㄔㄤˇ' }, { char: '壞', question: '( )ㄏㄨㄞˋ 掉' }, { char: '查', question: '檢( )ㄔㄚˊ' }, { char: '擺', question: '( )ㄅㄞˇ 放' },
        { char: '幸', question: '( )ㄒㄧㄥˋ 福' }, { char: '零', question: '( )ㄌㄧㄥˊ 食' }
    ],
    'HL_3_12': [
        { char: '團', question: '( )ㄊㄨㄢˊ 隊' }, { char: '窗', question: '( )ㄔㄨㄤ 戶' }, { char: '剩', question: '( )ㄕㄥˋ 下' }, { char: '默', question: '沈( )ㄇㄛˋ' },
        { char: '匆', question: '( )ㄘㄨㄥ 忙' }, { char: '視', question: '電( )ㄕˋ' }, { char: '叔', question: '( )ㄕㄨˊ 叔' }, { char: '逗', question: '( )ㄉㄡˋ 趣' },
        { char: '堂', question: '食( )ㄊㄤˊ' }, { char: '娃', question: '( )ㄨㄚˊ 娃' }, { char: '壓', question: '( )ㄧㄚ 力' }, { char: '錢', question: '金( )ㄑㄧㄢˊ' },
        { char: '透', question: '( )ㄊㄡˋ 明' }, { char: '握', question: '( )ㄨㄛˋ 手' }
    ],
};


export const LESSON_NAMES: Record<string, string> = {
    'HL': '翰林',
    'KX': '康軒',
    'NY': '南一'
};

interface GameState {
  status: GameStatus;
  score: number;
  highScore: number;
  lives: number;
  maxLives: number;
  distance: number;
  speed: number;
  level: number;
  laneCount: number;
  
  // --- SETTINGS ---
  difficulty: Difficulty;
  victoryTarget: number;
  maxSpeedSetting: number; // 100, 150, 0
  startingLivesSetting: number; // 3, 5, 8
  ttsEnabled: boolean;
  devMode: boolean;

  // --- PROGRESS ---
  selectedLessonIds: string[];
  totalCorrectAnswers: number;
  consecutiveIgnores: number;
  wrongAnswers: WrongAnswer[];
  
  // --- SKILLS ---
  hasDoubleJump: boolean;
  hasImmortality: boolean;
  isImmortalityActive: boolean;
  hasFireball: boolean;
  lastFireballTime: number;
  hasFlight: boolean;
  isFlying: boolean;
  flightStartTime: number;
  lastFlightEndTime: number;
  hasPassiveHeal: boolean;
  correctCountForHeal: number;
  hasGemDoubler: boolean;
  hasMagnet: boolean;

  // --- PETS ---
  ownedPets: PetID[];
  activePets: PetID[]; 
  lastPetActionTime: number;

  // --- GAMEPLAY ---
  currentVocab: VocabItem | null;
  
  // --- ACTIONS ---
  setStatus: (status: GameStatus) => void;
  startGame: () => void;
  restartGame: () => void;
  returnToMenu: () => void; 
  takeDamage: () => void;
  collectGem: (amount: number, isMarioBonus?: boolean) => void;
  addScore: (amount: number) => void;
  submitAnswer: (char: string) => boolean;
  registerIgnore: () => void;
  setDistance: (dist: number) => void;
  activateImmortality: () => void;
  buyItem: (itemId: string, cost: number, petId?: PetID) => void;
  openShop: () => void;
  closeShop: () => void;
  setManualSlowMotion: (active: boolean) => void;
  isManualSlowMotion: boolean;
  useFireball: () => void;
  startFlight: () => void;
  endFlight: () => void;
  toggleLesson: (lessonId: string) => void;
  getRandomDistractor: () => string;
  setVictoryTarget: (target: number) => void;
  setMaxSpeed: (speed: number) => void;
  setStartingLives: (lives: number) => void;
  setDifficulty: (diff: Difficulty) => void;
  loadData: () => void;
  togglePet: (petId: PetID) => void;
  updatePetActionTime: () => void;
  setTtsEnabled: (enabled: boolean) => void;
  toggleDevMode: () => void;
}

export const useStore = create<GameState>((set, get) => ({
  status: GameStatus.MENU,
  score: 0,
  highScore: 0,
  lives: 3,
  maxLives: 3,
  distance: 0,
  speed: 0,
  level: 1,
  laneCount: 3,
  
  // Settings
  difficulty: Difficulty.SIMPLE,
  victoryTarget: 20,
  maxSpeedSetting: 100,
  startingLivesSetting: 3,
  ttsEnabled: false,
  devMode: false,

  // Progress
  selectedLessonIds: [], 
  totalCorrectAnswers: 0,
  consecutiveIgnores: 0,
  wrongAnswers: [],

  // Skills
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
  correctCountForHeal: 0,
  hasGemDoubler: false,
  hasMagnet: false,

  // Pets
  ownedPets: [],
  activePets: [],
  lastPetActionTime: 0,

  currentVocab: null,
  isManualSlowMotion: false,

  setStatus: (status) => set({ status }),
  
  setDifficulty: (diff) => set({ difficulty: diff }),
  setVictoryTarget: (target) => set({ victoryTarget: target }),
  setMaxSpeed: (val) => set({ maxSpeedSetting: val }),
  setStartingLives: (val) => set({ startingLivesSetting: val }),
  setTtsEnabled: (enabled) => set({ ttsEnabled: enabled }),

  toggleDevMode: () => {
      const currentMode = get().devMode;
      if (!currentMode) {
          // Enable Dev Mode: Unlock everything
          set({ 
              devMode: true,
              score: 999999,
              hasDoubleJump: true,
              hasImmortality: true,
              hasFireball: true,
              hasFlight: true,
              hasPassiveHeal: true,
              hasGemDoubler: true,
              hasMagnet: true,
              ownedPets: [PetID.MARIO, PetID.PIKACHU, PetID.MECHA]
          });
      } else {
          // Disable Dev Mode: Reset everything to fresh state
          set({
              devMode: false,
              score: 0,
              hasDoubleJump: false,
              hasImmortality: false,
              hasFireball: false,
              hasFlight: false,
              hasPassiveHeal: false,
              hasGemDoubler: false,
              hasMagnet: false,
              ownedPets: [],
              activePets: [],
              lives: get().startingLivesSetting,
              maxLives: get().startingLivesSetting
          });
      }
  },

  loadData: () => {
      const saved = localStorage.getItem('gemini_runner_save');
      if (saved) {
          try {
              const data = JSON.parse(saved);
              set({
                  highScore: data.highScore || 0,
                  hasDoubleJump: data.hasDoubleJump || false,
                  hasImmortality: data.hasImmortality || false,
                  hasFireball: data.hasFireball || false,
                  hasFlight: data.hasFlight || false,
                  hasPassiveHeal: data.hasPassiveHeal || false,
                  hasGemDoubler: data.hasGemDoubler || false,
                  hasMagnet: data.hasMagnet || false,
                  ownedPets: data.ownedPets || [],
                  activePets: data.activePets || [] 
              });
          } catch (e) {
              console.error("Failed to load save", e);
          }
      }
  },

  toggleLesson: (lessonId) => set((state) => {
      const current = state.selectedLessonIds;
      if (current.includes(lessonId)) {
          return { selectedLessonIds: current.filter(id => id !== lessonId) };
      } else {
          return { selectedLessonIds: [...current, lessonId] };
      }
  }),

  startGame: () => {
      const { startingLivesSetting, speak, ttsEnabled } = get();

      // Combine vocab from all selected lessons
      const selectedIds = get().selectedLessonIds;
      let pool: VocabItem[] = [];
      
      selectedIds.forEach(id => {
          if (LESSON_DATA[id]) {
              pool = pool.concat(LESSON_DATA[id]);
          }
      });
      
      // Fallback if empty - but UI prevents this now
      if (pool.length === 0) {
          // Safe fallback to prevent crash if somehow bypassed
          // We'll try to find ANY key
          const anyKey = Object.keys(LESSON_DATA)[0];
          if (anyKey) pool = LESSON_DATA[anyKey];
          else pool = [{char: '無', question: '無題庫'}];
      }

      const firstVocab = pool[Math.floor(Math.random() * pool.length)];
      
      if (ttsEnabled) {
          setTimeout(() => {
             import('./components/System/Audio').then(mod => mod.audio.speak(firstVocab.question));
          }, 500);
      }

      set({ 
          status: GameStatus.PLAYING, 
          lives: startingLivesSetting,
          maxLives: startingLivesSetting,
          score: 0,
          distance: 0,
          speed: RUN_SPEED_BASE,
          level: 1,
          laneCount: 3,
          currentVocab: firstVocab,
          totalCorrectAnswers: 0,
          consecutiveIgnores: 0,
          wrongAnswers: [],
          correctCountForHeal: 0
      });
  },

  restartGame: () => {
      get().startGame();
  },

  returnToMenu: () => {
      set({
          status: GameStatus.MENU,
          score: 0,
          distance: 0,
          currentVocab: null,
          wrongAnswers: []
      });
  },

  takeDamage: () => {
      const { lives, status, score, highScore, hasImmortality, isImmortalityActive, difficulty } = get();
      if (status !== GameStatus.PLAYING) return;
      if (isImmortalityActive) return;

      // Super Simple Difficulty: No Damage
      if (difficulty === Difficulty.SUPER_SIMPLE) return;

      const newLives = lives - 1;
      set({ lives: newLives });

      if (newLives <= 0) {
          // Save High Score
          if (score > highScore) {
              localStorage.setItem('gemini_runner_save', JSON.stringify({
                  highScore: score,
                  hasDoubleJump: get().hasDoubleJump,
                  hasImmortality: get().hasImmortality,
                  hasFireball: get().hasFireball,
                  hasFlight: get().hasFlight,
                  hasPassiveHeal: get().hasPassiveHeal,
                  hasGemDoubler: get().hasGemDoubler,
                  hasMagnet: get().hasMagnet,
                  ownedPets: get().ownedPets,
                  activePets: get().activePets
              }));
          }
          set({ status: GameStatus.GAME_OVER, highScore: Math.max(score, highScore) });
      }
  },

  collectGem: (amount, isMarioBonus = false) => {
      let multiplier = 1;
      // Passive Gem Doubler
      if (get().hasGemDoubler) {
          multiplier *= 2; // Base 2x
      }
      // Mario Bonus (Stacks!)
      if (isMarioBonus) {
          multiplier *= 2; // Another 2x
      }
      // Total could be 1x, 2x, or 4x

      set((state) => ({ score: state.score + (amount * multiplier) }));
  },

  addScore: (amount) => set((state) => ({ score: state.score + amount })),

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

  submitAnswer: (char) => {
      const { currentVocab, score, selectedLessonIds, totalCorrectAnswers, hasPassiveHeal, correctCountForHeal, victoryTarget, maxSpeedSetting, activePets, ttsEnabled } = get();
      
      if (!currentVocab) return false;

      if (char === currentVocab.char) {
          // Correct
          let newLives = get().lives;
          let newHealCount = correctCountForHeal;
          
          // Passive Heal Logic
          if (hasPassiveHeal) {
              newHealCount++;
              if (newHealCount >= 3) {
                  if (newLives < get().maxLives) newLives++;
                  newHealCount = 0;
              }
          }

          const newTotal = totalCorrectAnswers + 1;
          
          // Check Victory Condition
          if (newTotal >= victoryTarget) {
             set({ status: GameStatus.VICTORY, totalCorrectAnswers: newTotal, score: score + 5000 }); // Bonus for winning
             return true;
          }
          
          // Speed Up Logic (Respect Max Speed Setting)
          let newSpeed = get().speed + 1.5;
          // maxSpeedSetting is a percentage of base (100 = 1.0x, 150 = 1.5x, 0 = infinite)
          if (maxSpeedSetting > 0) {
              const maxAllowed = RUN_SPEED_BASE * (maxSpeedSetting / 100);
              if (newSpeed > maxAllowed) newSpeed = maxAllowed;
          }

          // Level Up Logic (every 5 correct)
          const newLevel = Math.floor(newTotal / 5) + 1;
          const newLaneCount = Math.min(9, 3 + Math.floor((newLevel - 1) / 2) * 2);

          // Pick new vocab
          let pool: VocabItem[] = [];
          selectedLessonIds.forEach(id => { if (LESSON_DATA[id]) pool = pool.concat(LESSON_DATA[id]); });
          // Fallback if pool empty logic handled
          if (pool.length === 0) {
              const anyKey = Object.keys(LESSON_DATA)[0];
              if (anyKey) pool = LESSON_DATA[anyKey];
              else pool = [{char: '無', question: '無題庫'}];
          }
          
          // Simple weighting: Try not to repeat immediately
          let nextVocab = pool[Math.floor(Math.random() * pool.length)];
          while(pool.length > 1 && nextVocab === currentVocab) {
             nextVocab = pool[Math.floor(Math.random() * pool.length)];
          }
          
          if (ttsEnabled) {
             import('./components/System/Audio').then(mod => mod.audio.speak(nextVocab.question));
          }

          // Activate invincibility if leveled up (multiple of 5)
          const isLevelUp = newTotal % 5 === 0;

          set({
              score: score + 200,
              speed: newSpeed,
              level: newLevel,
              laneCount: newLaneCount,
              currentVocab: nextVocab,
              totalCorrectAnswers: newTotal,
              lives: newLives,
              correctCountForHeal: newHealCount,
              consecutiveIgnores: 0, // Reset hint counter
              // Grant invincibility immediately on level up (running towards shop)
              // It will be cleared 3s after the shop closes
              isImmortalityActive: isLevelUp ? true : get().isImmortalityActive
          });
          return true;
      } else {
          // Wrong
          const isMechaEquipped = activePets.includes(PetID.MECHA);
          
          // If Mecha is equipped, we SKIP taking damage
          if (!isMechaEquipped) {
              get().takeDamage();
          }

          set((state) => ({
             wrongAnswers: [...state.wrongAnswers, { 
                 question: currentVocab.question, 
                 correctChar: currentVocab.char, 
                 playerChar: char 
             }]
          }));
          return false;
      }
  },

  registerIgnore: () => {
      set((state) => ({ consecutiveIgnores: state.consecutiveIgnores + 1 }));
  },

  setDistance: (dist) => set({ distance: dist }),
  
  setManualSlowMotion: (active) => set({ isManualSlowMotion: active }),

  openShop: () => set({ status: GameStatus.SHOP, isImmortalityActive: true }),
  
  closeShop: () => {
      // Save when leaving shop
       localStorage.setItem('gemini_runner_save', JSON.stringify({
          highScore: get().highScore,
          hasDoubleJump: get().hasDoubleJump,
          hasImmortality: get().hasImmortality,
          hasFireball: get().hasFireball,
          hasFlight: get().hasFlight,
          hasPassiveHeal: get().hasPassiveHeal,
          hasGemDoubler: get().hasGemDoubler,
          hasMagnet: get().hasMagnet,
          ownedPets: get().ownedPets,
          activePets: get().activePets
      }));
      set({ status: GameStatus.PLAYING, isImmortalityActive: true });
      setTimeout(() => {
        set({ isImmortalityActive: false });
      }, 3000);
  },

  buyItem: (itemId, cost, petId) => {
      const { score } = get();
      if (score >= cost) {
          const updates: any = { score: score - cost };
          
          if (petId) {
              const currentOwned = get().ownedPets;
              if (!currentOwned.includes(petId)) {
                  updates.ownedPets = [...currentOwned, petId];
                  // Auto equip on buy
                  updates.activePets = [...get().activePets, petId];
              }
          } else {
            switch (itemId) {
                case 'DOUBLE_JUMP': updates.hasDoubleJump = true; break;
                case 'IMMORTAL': updates.hasImmortality = true; break;
                case 'FIREBALL': updates.hasFireball = true; break;
                case 'FLIGHT': updates.hasFlight = true; break;
                case 'PASSIVE_HEAL': updates.hasPassiveHeal = true; break;
                case 'GEM_DOUBLER': updates.hasGemDoubler = true; break;
                case 'MAGNET': updates.hasMagnet = true; break;
                case 'MAX_LIFE': 
                    updates.maxLives = get().maxLives + 1; 
                    updates.lives = get().lives + 1;
                    break;
                case 'HEAL':
                    if (get().lives < get().maxLives) {
                        updates.lives = get().lives + 1;
                    }
                    break;
            }
          }
          set(updates);
      }
  },

  togglePet: (petId) => {
      const currentActive = get().activePets;
      if (currentActive.includes(petId)) {
          set({ activePets: currentActive.filter(p => p !== petId) });
      } else {
          set({ activePets: [...currentActive, petId] });
      }
  },

  updatePetActionTime: () => set({ lastPetActionTime: Date.now() }),

  getRandomDistractor: () => {
      // Get a random char from ALL loaded lessons to be a distractor
      const allKeys = Object.keys(LESSON_DATA);
      const randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
      const lesson = LESSON_DATA[randomKey];
      const item = lesson[Math.floor(Math.random() * lesson.length)];
      return item.char;
  }
}));
