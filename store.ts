




/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { create } from 'zustand';
import { GameStatus, RUN_SPEED_BASE, VocabItem, WrongAnswer, Difficulty, PetID } from './types';

// --- DATA DEFINITION ---
export const LESSON_DATA: Record<string, VocabItem[]> = {
    // -------------------------------------------------------------------------
    // 翰林版 (Hanlin)
    // -------------------------------------------------------------------------
    'HL_1': [
        { char: '待', question: '( )ㄉㄞˋ 遇' }, { char: '牠', question: '( )ㄊㄚ 們' }, { char: '吞', question: '( )ㄊㄨㄣ 食' }, { char: '寸', question: '( )ㄘㄨㄣˋ 步' }, { char: '碌', question: '忙( )ㄌㄨˋ' },
        { char: '奔', question: '( )ㄅㄣ 跑' }, { char: '斑', question: '( )ㄅㄢ 點' }, { char: '實', question: '( )ㄕˊ 在' }, { char: '彈', question: '( )ㄊㄢˊ 琴' }, { char: '樂', question: '快( )ㄌㄜˋ' },
        { char: '它', question: '( )ㄊㄚ 是' }, { char: '短', question: '長( )ㄉㄨㄢˇ' }, { char: '悲', question: '慈( )ㄅㄟ' }, { char: '傷', question: '受( )ㄕㄤ' }, { char: '永', question: '( )ㄩㄥˇ 遠' }
    ],
    'HL_2': [
        { char: '週', question: '( )ㄓㄡ 末' }, { char: '休', question: '( )ㄒㄧㄡ 息' }, { char: '假', question: '放( )ㄐㄧㄚˋ' }, { char: '連', question: '( )ㄌㄧㄢˊ 接' }, { char: '業', question: '作( )ㄧㄝˋ' },
        { char: '午', question: '中( )ㄨˇ' }, { char: '並', question: '( )ㄅㄧㄥˋ 且' }, { char: '提', question: '( )ㄊㄧˊ 高' }, { char: '醒', question: '叫( )ㄒㄧㄥˇ' }, { char: '拖', question: '( )ㄊㄨㄛ 地' },
        { char: '蜜', question: '( )ㄇㄧˋ 蜂' }, { char: '桃', question: '( )ㄊㄠˊ 子' }, { char: '嘟', question: '( )ㄉㄨ 嘴' }, { char: '嘴', question: '( )ㄗㄨㄟˇ 巴' }, { char: '房', question: '( )ㄈㄤˊ 間' }
    ],
    'HL_3': [
        { char: '統', question: '( )ㄊㄨㄥˇ 一' }, { char: '計', question: '( )ㄐㄧˋ 畫' }, { char: '票', question: '車( )ㄆㄧㄠˋ' }, { char: '角', question: '三( )ㄐㄧㄠˇ' }, { char: '板', question: '黑( )ㄅㄢˇ' },
        { char: '本', question: '課( )ㄅㄣˇ' }, { char: '況', question: '情( )ㄎㄨㄤˋ' }, { char: '因', question: '原( )ㄧㄣ' }, { char: '及', question: '以( )ㄐㄧˊ' }, { char: '文', question: '( )ㄨㄣˊ 章' },
        { char: '具', question: '工( )ㄐㄩˋ' }, { char: '理', question: '道( )ㄌㄧˇ' }, { char: '此', question: '因( )ㄘˇ' }, { char: '準', question: '( )ㄓㄨㄣˇ 備' }, { char: '備', question: '準( )ㄅㄟˋ' }
    ],
    'HL_4': [
        { char: '古', question: '( )ㄍㄨˇ 老' }, { char: '懂', question: '( )ㄉㄨㄥˇ 事' }, { char: '居', question: '鄰( )ㄐㄩ' }, { char: '群', question: '人( )ㄑㄩㄣˊ' }, { char: '省', question: '( )ㄕㄥˇ 錢' },
        { char: '費', question: '浪( )ㄈㄟˋ' }, { char: '商', question: '( )ㄕㄤ 店' }, { char: '量', question: '大( )ㄌㄧㄤˋ' }, { char: '窮', question: '貧( )ㄑㄩㄥˊ' }, { char: '桶', question: '水( )ㄊㄨㄥˇ' },
        { char: '怒', question: '憤( )ㄋㄨˋ' }, { char: '亂', question: '混( )ㄌㄨㄢˋ' }, { char: '增', question: '( )ㄗㄥ 加' }, { char: '胡', question: '( )ㄏㄨˊ 說' }, { char: '摸', question: '( )ㄇㄛ 索' }
    ],
    'HL_5': [
        { char: '貼', question: '( )ㄊㄧㄝ 心' }, { char: '年', question: '( )ㄋㄧㄢˊ 紀' }, { char: '級', question: '等( )ㄐㄧˊ' }, { char: '使', question: '( )ㄕˇ 用' }, { char: '何', question: '如( )ㄏㄜˊ' },
        { char: '隨', question: '( )ㄙㄨㄟˊ 時' }, { char: '隔', question: '( )ㄍㄜˊ 壁' }, { char: '睡', question: '( )ㄕㄨㄟˋ 覺' }, { char: '效', question: '( )ㄒㄧㄠˋ 果' }, { char: '序', question: '順( )ㄒㄩˋ' },
        { char: '而', question: '( )ㄦˊ 且' }, { char: '且', question: '而( )ㄑㄧㄝˇ' }, { char: '排', question: '( )ㄆㄞˊ 隊' }, { char: '箱', question: '紙( )ㄒㄧㄤ' }, { char: '條', question: '麵( )ㄊㄧㄠˊ' }
    ],
    'HL_6': [
        { char: '黏', question: '( )ㄋㄧㄢˊ 土' }, { char: '木', question: '( )ㄇㄨˋ 頭' }, { char: '製', question: '( )ㄓˋ 造' }, { char: '部', question: '( )ㄅㄨˋ 分' }, { char: '混', question: '( )ㄏㄨㄣˋ 合' },
        { char: '斷', question: '( )ㄉㄨㄢˋ 裂' }, { char: '解', question: '( )ㄐㄧㄝˇ 釋' }, { char: '機', question: '( )ㄐㄧ 器' }, { char: '器', question: '機( )ㄑㄧˋ' }, { char: '另', question: '( )ㄌㄧㄥˋ 外' },
        { char: '治', question: '( )ㄓˋ 療' }, { char: '枝', question: '樹( )ㄓ' }, { char: '桿', question: '欄( )ㄍㄢˇ' }, { char: '擦', question: '( )ㄘㄚ 拭' }, { char: '削', question: '( )ㄒㄧㄠ 皮' }
    ],
    'HL_7': [
        { char: '鹹', question: '( )ㄒㄧㄢˊ 味' }, { char: '蔚', question: '( )ㄨㄟˋ 藍' }, { char: '航', question: '( )ㄏㄤˊ 海' }, { char: '乘', question: '( )ㄔㄥˊ 客' }, { char: '橇', question: '雪( )ㄑㄧㄠ' },
        { char: '坡', question: '山( )ㄆㄛ' }, { char: '野', question: '( )ㄧㄝˇ 外' }, { char: '滾', question: '( )ㄍㄨㄣˇ 動' }, { char: '閉', question: '( )ㄅㄧˋ 眼' }, { char: '深', question: '( )ㄕㄣ 淺' },
        { char: '吸', question: '呼( )ㄒㄧ' }, { char: '欣', question: '( )ㄒㄧㄣ 賞' }, { char: '賞', question: '獎( )ㄕㄤˇ' }, { char: '瞞', question: '隱( )ㄇㄢˊ' }
    ],
    'HL_8': [
        { char: '寄', question: '( )ㄐㄧˋ 信' }, { char: '蟹', question: '螃( )ㄒㄧㄝˋ' }, { char: '螃', question: '( )ㄆㄤˊ 蟹' }, { char: '堆', question: '( )ㄉㄨㄟ 積' }, { char: '杯', question: '( )ㄅㄟ 子' },
        { char: '類', question: '種( )ㄌㄟˋ' }, { char: '撿', question: '( )ㄐㄧㄢˇ 起' }, { char: '瓶', question: '( )ㄆㄧㄥˊ 子' }, { char: '蓋', question: '( )ㄍㄞˋ 子' }, { char: '淨', question: '乾( )ㄐㄧㄥˋ' },
        { char: '志', question: '( )ㄓˋ 願' }, { char: '品', question: '作( )ㄆㄧㄣˇ' }, { char: '應', question: '( )ㄧㄥ 該' }
    ],
    'HL_9': [
        { char: '挑', question: '( )ㄊㄧㄠ 選' }, { char: '教', question: '( )ㄐㄧㄠˋ 室' }, { char: '導', question: '指( )ㄉㄠˇ' }, { char: '叢', question: '草( )ㄘㄨㄥˊ' }, { char: '喊', question: '叫( )ㄏㄢˇ' },
        { char: '投', question: '( )ㄊㄡˊ 球' }, { char: '繼', question: '( )ㄐㄧˋ 續' }, { char: '續', question: '繼( )ㄒㄩˋ' }, { char: '岸', question: '海( )ㄢˋ' }, { char: '淺', question: '深( )ㄑㄧㄢˇ' },
        { char: '捲', question: '( )ㄐㄩㄢˇ 起' }, { char: '沿', question: '( )ㄧㄢˊ 著' }, { char: '踩', question: '( )ㄘㄞˇ 踏' }, { char: '座', question: '( )ㄗㄨㄛˋ 位' }, { char: '般', question: '一( )ㄅㄢ' }
    ],
    'HL_10': [
        { char: '婚', question: '結( )ㄏㄨㄣ' }, { char: '禮', question: '( )ㄌㄧˇ 物' }, { char: '盪', question: '( )ㄉㄤˋ 鞦韆' }, { char: '服', question: '衣( )ㄈㄨˊ' }, { char: '代', question: '( )ㄉㄞˋ 表' },
        { char: '福', question: '幸( )ㄈㄨˊ' }, { char: '結', question: '( )ㄐㄧㄝˊ 束' }, { char: '束', question: '結( )ㄕㄨˋ' }, { char: '酒', question: '喝( )ㄐㄧㄡˇ' }, { char: '敬', question: '( )ㄐㄧㄥˋ 禮' },
        { char: '舞', question: '跳( )ㄨˇ' }, { char: '習', question: '學( )ㄒㄧˊ' }, { char: '俗', question: '習( )ㄙㄨˊ' }, { char: '惜', question: '愛( )ㄒㄧˊ' }, { char: '互', question: '( )ㄏㄨˋ 相' }
    ],
    'HL_11': [
        { char: '除', question: '( )ㄔㄨˊ 法' }, { char: '嬸', question: '( )ㄕㄣˇ 嬸' }, { char: '煙', question: '抽( )ㄧㄢ' }, { char: '炮', question: '鞭( )ㄆㄠˋ' }, { char: '附', question: '( )ㄈㄨˋ 近' },
        { char: '店', question: '商( )ㄉㄧㄢˋ' }, { char: '息', question: '休( )ㄒㄧˊ' }, { char: '修', question: '( )ㄒㄧㄡ 理' }, { char: '廠', question: '工( )ㄔㄤˇ' }, { char: '壞', question: '損( )ㄏㄨㄞˋ' },
        { char: '查', question: '檢( )ㄔㄚˊ' }, { char: '擺', question: '( )ㄅㄞˇ 放' }, { char: '幸', question: '( )ㄒㄧㄥˋ 福' }, { char: '零', question: '( )ㄌㄧㄥˊ 食' }
    ],
    'HL_12': [
        { char: '團', question: '( )ㄊㄨㄢˊ 隊' }, { char: '窗', question: '( )ㄔㄨㄤ 戶' }, { char: '剩', question: '( )ㄕㄥˋ 下' }, { char: '默', question: '( )ㄇㄛˋ 認' }, { char: '匆', question: '( )ㄘㄨㄥ 忙' },
        { char: '視', question: '電( )ㄕˋ' }, { char: '叔', question: '( )ㄕㄨˊ 叔' }, { char: '逗', question: '( )ㄉㄡˋ 留' }, { char: '堂', question: '食( )ㄊㄤˊ' }, { char: '娃', question: '( )ㄨㄚˊ 娃' },
        { char: '壓', question: '( )ㄧㄚ 力' }, { char: '錢', question: '金( )ㄑㄧㄢˊ' }, { char: '透', question: '( )ㄊㄡˋ 明' }, { char: '握', question: '( )ㄨㄛˋ 手' }
    ],

    // -------------------------------------------------------------------------
    // 康軒版 (Kangxuan)
    // -------------------------------------------------------------------------
    'KX_1': [
        { char: '字', question: '寫( )ㄗˋ' }, { char: '舟', question: '輕( )ㄓㄡ' }, { char: '灑', question: '( )ㄙㄚˇ 水' }, { char: '載', question: '( )ㄗㄞˋ 重' }, { char: '讓', question: '禮( )ㄖㄤˋ' },
        { char: '愁', question: '憂( )ㄔㄡˊ' }, { char: '嘆', question: '感( )ㄊㄢˋ' }, { char: '忌', question: '猜( )ㄐㄧˋ' }, { char: '妒', question: '嫉( )ㄉㄨˋ' }, { char: '訣', question: '祕( )ㄐㄩㄝˊ' },
        { char: '似', question: '相( )ㄙˋ' }, { char: '練', question: '( )ㄌㄧㄢˋ 習' }, { char: '習', question: '學( )ㄒㄧˊ' }
    ],
    'KX_2': [
        { char: '名', question: '( )ㄇㄧㄥˊ 字' }, { char: '窗', question: '( )ㄔㄨㄤ 戶' }, { char: '戶', question: '窗( )ㄏㄨˋ' }, { char: '板', question: '黑( )ㄅㄢˇ' }, { char: '答', question: '回( )ㄉㄚˊ' },
        { char: '案', question: '答( )ㄢˋ' }, { char: '專', question: '( )ㄓㄨㄢ 心' }, { char: '穫', question: '收( )ㄏㄨㄛˋ' }, { char: '已', question: '( )ㄧˇ 經' }, { char: '傘', question: '雨( )ㄙㄢˇ' },
        { char: '喊', question: '大( )ㄏㄢˇ' }, { char: '章', question: '文( )ㄓㄤ' }, { char: '詞', question: '語( )ㄘˊ' }, { char: '語', question: '成( )ㄩˇ' }
    ],
    'KX_3': [
        { char: '繞', question: '圍( )ㄖㄠˋ' }, { char: '由', question: '理( )ㄧㄡˊ' }, { char: '迷', question: '( )ㄇㄧˊ 路' }, { char: '失', question: '( )ㄕ 去' }, { char: '岸', question: '海( )ㄢˋ' },
        { char: '撞', question: '碰( )ㄓㄨㄤˋ' }, { char: '扶', question: '( )ㄈㄨˊ 手' }, { char: '急', question: '( )ㄐㄧˊ 忙' }, { char: '店', question: '商( )ㄉㄧㄢˋ' }, { char: '機', question: '飛( )ㄐㄧ' },
        { char: '料', question: '材( )ㄌㄧㄠào' }, { char: '實', question: '誠( )ㄕˊ' }, { char: '留', question: '( )ㄌㄧㄡˊ 下' }, { char: '觀', question: '參( )ㄍㄨㄢ' }
    ],
    'KX_4': [
        { char: '露', question: '( )ㄌㄨˋ 珠' }, { char: '懷', question: '( )ㄏㄨㄞˊ 疑' }, { char: '居', question: '鄰( )ㄐㄩ' }, { char: '準', question: '( )ㄓㄨㄣˇ 備' }, { char: '射', question: '發( )ㄕㄜˋ' },
        { char: '刺', question: '( )ㄘˋ 激' }, { char: '痛', question: '好( )ㄊㄨㄥˋ' }, { char: '使', question: '天( )ㄕˇ' }, { char: '毒', question: '( )ㄉㄨˊ 藥' }, { char: '欺', question: '( )ㄑㄧ 負' },
        { char: '負', question: '欺( )ㄈㄨˋ' }, { char: '感', question: '( )ㄍㄢˇ 覺' }, { char: '遇', question: '相( )ㄩˋ' }, { char: '危', question: '( )ㄨㄟˊ 險' }
    ],
    'KX_5': [
        { char: '朝', question: '( )ㄔㄠˊ 代' }, { char: '努', question: '( )ㄋㄨˇ 力' }, { char: '總', question: '( )ㄗㄨㄥˇ 是' }, { char: '段', question: '一( )ㄉㄨㄢˋ' }, { char: '利', question: '順( )ㄌㄧˋ' },
        { char: '害', question: '厲( )ㄏㄞˋ' }, { char: '整', question: '( )ㄓㄥˇ 齊' }, { char: '該', question: '應( )ㄍㄞ' }, { char: '紙', question: '報( )ㄓˇ' }, { char: '李', question: '行( )ㄌㄧˇ' },
        { char: '貴', question: '珍( )ㄍㄨㄟˋ' }, { char: '必', question: '( )ㄅㄧˋ 須' }, { char: '通', question: '交( )ㄊㄨㄥ' }, { char: '場', question: '廣( )ㄔㄤˇ' }
    ],
    'KX_6': [
        { char: '女', question: '( )ㄋㄩˇ 生' }, { char: '非', question: '是( )ㄈㄟ' }, { char: '關', question: '( )ㄍㄨㄢ 心' }, { char: '澡', question: '洗( )ㄗㄠˇ' }, { char: '怕', question: '害( )ㄆㄚˋ' },
        { char: '應', question: '回( )ㄧㄥˋ' }, { char: '平', question: '( )ㄆㄧㄥˊ 安' }, { char: '毛', question: '羽( )ㄇㄠˊ' }, { char: '肚', question: '( )ㄉㄨˋ 子' }, { char: '蓋', question: '( )ㄍㄞˋ 子' },
        { char: '摸', question: '觸( )ㄇㄛ' }, { char: '柔', question: '溫( )ㄖㄡˊ' }, { char: '揉', question: '( )ㄖㄡˊ 眼' }, { char: '副', question: '一( )ㄈㄨˋ' }
    ],
    'KX_7': [
        { char: '統', question: '( )ㄊㄨㄥˇ 計' }, { char: '商', question: '( )ㄕㄤ 業' }, { char: '阿', question: '( )ㄚ 姨' }, { char: '婆', question: '老( )ㄆㄛˊ' }, { char: '鐵', question: '鋼( )ㄊㄧㄝˇ' },
        { char: '硬', question: '堅( )ㄧㄥˋ' }, { char: '愈', question: '( )ㄩˋ 來' }, { char: '嚼', question: '咀( )ㄐㄩㄝˊ' }, { char: '蒼', question: '( )ㄘㄤ 白' }, { char: '坡', question: '山( )ㄆㄛ' },
        { char: '憶', question: '記( )ㄧˋ' }, { char: '夕', question: '( )ㄒㄧ 陽' }, { char: '盪', question: '搖( )ㄉㄤˋ' }, { char: '網', question: '漁( )ㄨㄤˇ' }
    ],
    'KX_8': [
        { char: '育', question: '教( )ㄩˋ' }, { char: '史', question: '歷( )ㄕˇ' }, { char: '型', question: '模( )ㄒㄧㄥˊ' }, { char: '功', question: '成( )ㄍㄨㄥ' }, { char: '敗', question: '失( )ㄅㄞˋ' },
        { char: '守', question: '( )ㄕㄡˇ 護' }, { char: '護', question: '保( )ㄏㄨˋ' }, { char: '勇', question: '( )ㄩㄥˇ 敢' }, { char: '兵', question: '士( )ㄅㄧㄥ' }, { char: '土', question: '泥( )ㄊㄨˇ' },
        { char: '附', question: '( )ㄈㄨˋ 近' }, { char: '瞭', question: '( )ㄌㄧㄠˇ 望' }, { char: '頂', question: '山( )ㄉㄧㄥˇ' }, { char: '標', question: '目( )ㄅㄧㄠ' }
    ],
    'KX_9': [
        { char: '溼', question: '潮( )ㄕ' }, { char: '族', question: '民( )ㄗㄨˊ' }, { char: '別', question: '特( )ㄅㄧㄝˊ' }, { char: '捕', question: '( )ㄅㄨˇ 魚' }, { char: '式', question: '方( )ㄕˋ' },
        { char: '造', question: '製( )ㄗㄠˋ' }, { char: '層', question: '樓( )ㄘㄥˊ' }, { char: '竹', question: '( )ㄓㄨˊ 子' }, { char: '植', question: '( )ㄓˊ 物' }, { char: '或', question: '( )ㄏㄨㄛˋ 者' },
        { char: '釣', question: '( )ㄉㄧㄠˋ 魚' }, { char: '智', question: '( )ㄓˋ 慧' }, { char: '慧', question: '智( )ㄏㄨㄟˋ' }, { char: '態', question: '形( )ㄊㄞˋ' }
    ],
    'KX_10': [
        { char: '狐', question: '( )ㄏㄨˊ 狸' }, { char: '里', question: '公( )ㄌㄧˇ' }, { char: '兄', question: '( )ㄒㄩㄥ 弟' }, { char: '密', question: '祕( )ㄇㄧˋ' }, { char: '入', question: '進( )ㄖㄨˋ' },
        { char: '呀', question: '哎( )ㄧㄚ' }, { char: '踢', question: '( )ㄊㄧ 球' }, { char: '棄', question: '放( )ㄑㄧˋ' }, { char: '酸', question: '( )ㄙㄨㄢ 味' }, { char: '鴉', question: '烏( )ㄧㄚ' },
        { char: '肉', question: '豬( )ㄖㄡˋ' }, { char: '塊', question: '一( )ㄎㄨㄞˋ' }, { char: '計', question: '算( )ㄐㄧˋ' }, { char: '壯', question: '強( )ㄓㄨㄤˋ' }
    ],
    'KX_11': [
        { char: '悅', question: '喜( )ㄩㄝˋ' }, { char: '拜', question: '( )ㄅㄞˋ 訪' }, { char: '訪', question: '拜( )ㄈㄤˇ' }, { char: '免', question: '( )ㄇㄧㄢˇ 費' }, { char: '離', question: '( )ㄌㄧˊ 開' },
        { char: '漫', question: '( )ㄇㄢˋ 長' }, { char: '盼', question: '期( )ㄆㄢˋ' }, { char: '枯', question: '( )ㄎㄨ 萎' }, { char: '鑽', question: '( )ㄗㄨㄢˋ 石' }, { char: '恍', question: '( )ㄏㄨㄤˇ 然' },
        { char: '悟', question: '覺( )ㄨˋ' }, { char: '拆', question: '( )ㄔㄞ 開' }, { char: '盛', question: '豐( )ㄕㄥˋ' }, { char: '隨', question: '( )ㄙㄨㄟˊ 意' }
    ],
    'KX_12': [
        { char: '障', question: '保( )ㄓㄤˋ' }, { char: '漠', question: '冷( )ㄇㄛˋ' }, { char: '綿', question: '( )ㄇㄧㄢˊ 羊' }, { char: '央', question: '中( )ㄧㄤ' }, { char: '男', question: '( )ㄋㄢˊ 生' },
        { char: '複', question: '重( )ㄈㄨˋ' }, { char: '疑', question: '懷( )ㄧˊ' }, { char: '算', question: '計( )ㄙㄨㄢˋ' }, { char: '歲', question: '幾( )ㄙㄨㄟˋ' }, { char: '帽', question: '( )ㄇㄠˋ 子' },
        { char: '退', question: '後( )ㄊㄨㄟˋ' }, { char: '吞', question: '( )ㄊㄨㄣ 嚥' }, { char: '蛇', question: '( )ㄕㄜˊ 蠍' }, { char: '訝', question: '驚( )ㄧㄚˋ' }
    ],

    // -------------------------------------------------------------------------
    // 南一版 (Nanyi)
    // -------------------------------------------------------------------------
    'NY_1': [
        { char: '泥', question: '( )ㄋㄧˊ 土' }, { char: '化', question: '變( )ㄏㄨㄚˋ' }, { char: '雀', question: '麻( )ㄑㄩㄝˋ' }, { char: '輕', question: '( )ㄑㄧㄥ 重' }, { char: '羽', question: '( )ㄩˇ 毛' },
        { char: '衣', question: '( )ㄧ 服' }, { char: '脆', question: '清( )ㄘㄨㄟˋ' }, { char: '髮', question: '頭( )ㄈㄚˇ' }, { char: '處', question: '到( )ㄔㄨˋ' }, { char: '旅', question: '( )ㄌㄩˇ 行' },
        { char: '行', question: '旅( )ㄒㄧㄥˊ' }, { char: '平', question: '( )ㄆㄧㄥˊ 安' }, { char: '男', question: '( )ㄋㄢˊ 孩' }, { char: '朗', question: '晴( )ㄌㄤˇ' }, { char: '足', question: '滿( )ㄗㄨˊ' }
    ],
    'NY_2': [
        { char: '廊', question: '走( )ㄌㄤˊ' }, { char: '訂', question: '( )ㄉㄧㄥˋ 正' }, { char: '班', question: '( )ㄅㄢ 級' }, { char: '級', question: '年( )ㄐㄧˊ' }, { char: '約', question: '( )ㄩㄝ 定' },
        { char: '紛', question: '繽( )ㄈㄣ' }, { char: '持', question: '堅( )ㄔˊ' }, { char: '記', question: '( )ㄐㄧˋ 錄' }, { char: '錄', question: '記( )ㄌㄨˋ' }, { char: '聊', question: '( )ㄌㄧㄠˊ 天' },
        { char: '言', question: '語( )ㄧㄢˊ' }, { char: '烈', question: '熱( )ㄌㄧㄝˋ' }, { char: '些', question: '一( )ㄒㄧㄝ' }, { char: '提', question: '( )ㄊㄧˊ 醒' }, { char: '愁', question: '憂( )ㄔㄡˊ' }
    ],
    'NY_3': [
        { char: '短', question: '長( )ㄉㄨㄢˇ' }, { char: '鐘', question: '時( )ㄓㄨㄥ' }, { char: '鬼', question: '魔( )ㄍㄨㄟˇ' }, { char: '鬧', question: '熱( )ㄋㄠˋ' }, { char: '準', question: '( )ㄓㄨㄣˇ 時' },
        { char: '朝', question: '( )ㄓㄠ 陽' }, { char: '蹈', question: '舞( )ㄉㄠˋ' }, { char: '表', question: '( )ㄅㄧㄠˇ 演' }, { char: '暢', question: '舒( )ㄔㄤˋ' }, { char: '無', question: '( )ㄨˊ 聊' },
        { char: '總', question: '( )ㄗㄨㄥˇ 共' }, { char: '響', question: '音( )ㄒㄧㄤˇ' }, { char: '忘', question: '( )ㄨㄤˋ 記' }, { char: '盡', question: '( )ㄐㄧㄣˋ 力' }, { char: '責', question: '( )ㄗㄜˊ 任' }
    ],
    'NY_4': [
        { char: '指', question: '手( )ㄓˇ' }, { char: '夕', question: '( )ㄒㄧ 陽' }, { char: '賽', question: '比( )ㄙㄞˋ' }, { char: '緊', question: '( )ㄐㄧㄣˇ 張' }, { char: '店', question: '商( )ㄉㄧㄢˋ' },
        { char: '逗', question: '( )ㄉㄡˋ 留' }, { char: '轉', question: '旋( )ㄓㄨㄢˇ' }, { char: '露', question: '( )ㄌㄨˋ 出' }, { char: '業', question: '作( )ㄧㄝˋ' }, { char: '專', question: '( )ㄓㄨㄢ 心' },
        { char: '勝', question: '( )ㄕㄥˋ 利' }, { char: '利', question: '順( )ㄌㄧˋ' }, { char: '悅', question: '喜( )ㄩㄝˋ' }, { char: '乖', question: '( )ㄍㄨㄞ 巧' }, { char: '溫', question: '( )ㄨㄣ 暖' }
    ],
    'NY_5': [
        { char: '龍', question: '恐( )ㄌㄨㄥˊ' }, { char: '沖', question: '( )ㄔㄨㄥ 洗' }, { char: '菱', question: '( )ㄌㄧㄥˊ 角' }, { char: '兄', question: '( )ㄒㄩㄥ 弟' }, { char: '吐', question: '( )ㄊㄨˇ 氣' },
        { char: '歪', question: '( )ㄨㄞ 斜' }, { char: '防', question: '( )ㄈㄤˊ 止' }, { char: '警', question: '( )ㄐㄧㄥˇ 察' }, { char: '鈴', question: '風( )ㄌㄧㄥˊ' }, { char: '注', question: '( )ㄓㄨˋ 意' },
        { char: '員', question: '人( )ㄩㄢˊ' }, { char: '傷', question: '受( )ㄕㄤ' }, { char: '死', question: '( )ㄙˇ 亡' }, { char: '諒', question: '原( )ㄌㄧㄤˋ' }, { char: '脾', question: '( )ㄆㄧˊ 氣' }
    ],
    'NY_6': [
        { char: '幕', question: '螢( )ㄇㄨˋ' }, { char: '杯', question: '( )ㄅㄟ 子' }, { char: '撞', question: '碰( )ㄓㄨㄤˋ' }, { char: '流', question: '( )ㄌㄧㄡˊ 水' }, { char: '溼', question: '潮( )ㄕ' },
        { char: '透', question: '( )ㄊㄡˋ 明' }, { char: '雙', question: '一( )ㄕㄨㄤ' }, { char: '胸', question: '( )ㄒㄩㄥ 膛' }, { char: '負', question: '欺( )ㄈㄨˋ' }, { char: '慌', question: '( )ㄏㄨㄤ 張' },
        { char: '逃', question: '( )ㄊㄠˊ 跑' }, { char: '辦', question: '( )ㄅㄢˋ 法' }, { char: '題', question: '問( )ㄊㄧˊ' }, { char: '灰', question: '( )ㄏㄨㄟ 色' }, { char: '剪', question: '( )ㄐㄧㄢˇ 刀' }
    ],
    'NY_7': [
        { char: '背', question: '( )ㄅㄟ 包' }, { char: '斑', question: '( )ㄅㄢ 馬' }, { char: '皺', question: '( )ㄓㄡˋ 紋' }, { char: '懂', question: '聽( )ㄉㄨㄥˇ' }, { char: '凡', question: '平( )ㄈㄢˊ' },
        { char: '梳', question: '( )ㄕㄨ 子' }, { char: '夾', question: '( )ㄐㄧㄚ 子' }, { char: '藏', question: '躲( )ㄘㄤˊ' }, { char: '捏', question: '( )ㄋㄧㄝ 陶' }, { char: '摺', question: '( )ㄓㄜˊ 紙' },
        { char: '仔', question: '( )ㄗˇ 細' }, { char: '藝', question: '( )ㄧˋ 術' }, { char: '術', question: '技( )ㄕㄨˋ' }, { char: '雖', question: '( )ㄙㄨㄟ 然' }, { char: '創', question: '( )ㄔㄨㄤˋ 作' }
    ],
    'NY_8': [
        { char: '魔', question: '( )ㄇㄛˊ 法' }, { char: '圍', question: '( )ㄨㄟˊ 巾' }, { char: '巾', question: '毛( )ㄐㄧㄣ' }, { char: '視', question: '電( )ㄕˋ' }, { char: '框', question: '相( )ㄎㄨㄤ' },
        { char: '誤', question: '錯( )ㄨˋ' }, { char: '愉', question: '( )ㄩˊ 快' }, { char: '數', question: '( )ㄕㄨˋ 學' }, { char: '桶', question: '水( )ㄊㄨㄥˇ' }, { char: '刀', question: '剪( )ㄉㄠ' },
        { char: '曾', question: '( )ㄘㄥˊ 經' }, { char: '機', question: '飛( )ㄐㄧ' }, { char: '解', question: '( )ㄐㄧㄝˇ 釋' }, { char: '鏡', question: '眼( )ㄐㄧㄥˋ' }, { char: '齊', question: '整( )ㄑㄧˊ' }
    ],
    'NY_9': [
        { char: '醫', question: '( )ㄧ 生' }, { char: '穿', question: '( )ㄔㄨㄢ 衣' }, { char: '袍', question: '長( )ㄆㄠˊ' }, { char: '戴', question: '( )ㄉㄞˋ 帽' }, { char: '筒', question: '筆( )ㄊㄨㄥˇ' },
        { char: '啄', question: '( )ㄓㄨㄛˊ 木鳥' }, { char: '備', question: '準( )ㄅㄟˋ' }, { char: '幹', question: '樹( )ㄍㄢˋ' }, { char: '敲', question: '( )ㄑㄧㄠ 門' }, { char: '毒', question: '病( )ㄉㄨˊ' },
        { char: '體', question: '身( )ㄊㄧˇ' }, { char: '淘', question: '( )ㄊㄠˊ 氣' }, { char: '蘋', question: '( )ㄆㄧㄥˊ 果' }, { char: '般', question: '一( )ㄅㄢ' }, { char: '藥', question: '吃( )ㄧㄠˋ' }
    ],
    'NY_10': [
        { char: '極', question: '北( )ㄐㄧˊ' }, { char: '熊', question: '貓( )ㄒㄩㄥˊ' }, { char: '雪', question: '下( )ㄒㄩㄝˇ' }, { char: '腦', question: '電( )ㄋㄠˇ' }, { char: '實', question: '誠( )ㄕˊ' },
        { char: '根', question: '樹( )ㄍㄣ' }, { char: '反', question: '相( )ㄈㄢˇ' }, { char: '射', question: '發( )ㄕㄜˋ' }, { char: '膚', question: '皮( )ㄈㄨ' }, { char: '豬', question: '小( )ㄓㄨ' },
        { char: '呆', question: '( )ㄉㄞ 住' }, { char: '印', question: '( )ㄧㄣˋ 象' }, { char: '象', question: '大( )ㄒㄧㄤˋ' }, { char: '憶', question: '記( )ㄧˋ' }, { char: '滾', question: '( )ㄍㄨㄣˇ 動' }
    ],
    'NY_11': [
        { char: '額', question: '( )ㄜˊ 頭' }, { char: '虎', question: '老( )ㄏㄨˇ' }, { char: '貓', question: '小( )ㄇㄠ' }, { char: '臺', question: '( )ㄊㄞˊ 灣' }, { char: '灣', question: '海( )ㄨㄢ' },
        { char: '獨', question: '( )ㄉㄨˊ 立' }, { char: '萬', question: '千( )ㄨㄢˋ' }, { char: '祖', question: '( )ㄗㄨˇ 先' }, { char: '蛙', question: '青( )ㄨㄚ' }, { char: '捉', question: '( )ㄓㄨㄛ 弄' },
        { char: '類', question: '種( )ㄌㄟˋ' }, { char: '占', question: '( )ㄓㄢˋ 領' }, { char: '雞', question: '母( )ㄐㄧ' }, { char: '肉', question: '牛( )ㄖㄡˋ' }, { char: '威', question: '( )ㄨㄟ 風' }
    ],
    'NY_12': [
        { char: '昆', question: '( )ㄎㄨㄣ 蟲' }, { char: '攻', question: '( )ㄍㄨㄥ 擊' }, { char: '擊', question: '打( )ㄐㄧˊ' }, { char: '演', question: '表( )ㄧㄢˇ' }, { char: '保', question: '( )ㄅㄠˇ 護' },
        { char: '命', question: '生( )ㄇㄧㄥˋ' }, { char: '翅', question: '( )ㄔˋ 膀' }, { char: '敵', question: '( )ㄉㄧˊ 人' }, { char: '周', question: '四( )ㄓㄡ' }, { char: '竹', question: '( )ㄓㄨˊ 子' },
        { char: '節', question: '季( )ㄐㄧㄝˊ' }, { char: '逼', question: '( )ㄅㄧ 近' }, { char: '技', question: '( )ㄐㄧˋ 術' }, { char: '退', question: '後( )ㄊㄨㄟˋ' }, { char: '屁', question: '放( )ㄆㄧˋ' }
    ]
};

// --- LESSON NAMES MAPPING ---
export const LESSON_NAMES: Record<string, string> = {};

// Helper to generate names
const generateNames = (prefix: string, publisherName: string, count: number) => {
    for (let i = 1; i <= count; i++) {
        LESSON_NAMES[`${prefix}_${i}`] = `第 ${i} 課`;
    }
}

generateNames('HL', '翰林', 12);
generateNames('KX', '康軒', 12);
generateNames('NY', '南一', 12);

// --- Store Logic ---

const ANSWERS_PER_LEVEL = 5; 
const SAVE_KEY = 'gemini-runner-save-v4'; // Bumped version for multi-pet support

interface GameState {
  status: GameStatus;
  score: number;
  highScore: number;
  lives: number;
  maxLives: number;
  speed: number;
  
  // Vocabulary State
  selectedLessonIds: string[]; 
  victoryTarget: number; 
  
  currentVocabList: VocabItem[];
  currentVocab: VocabItem | null;
  consecutiveIgnores: number; 
  
  correctAnswersCount: number; 
  totalCorrectAnswers: number; 
  targetCountForLevel: number;
  
  wrongAnswers: WrongAnswer[]; 
  
  level: number;
  laneCount: number;
  gemsCollected: number;
  distance: number;
  
  // Settings
  startingLivesSetting: number;
  maxSpeedSetting: number;
  difficulty: Difficulty;
  ttsEnabled: boolean;
  
  // Developer Mode
  devMode: boolean;

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
  
  hasPassiveHeal: boolean;
  passiveHealCounter: number;

  hasGemDoubler: boolean;
  
  hasMagnet: boolean;
  
  // Pets
  ownedPets: PetID[];
  activePets: PetID[]; // Multiple pets allowed
  lastPetActionTime: number; // For Pikachu lightning cooldown
  
  isManualSlowMotion: boolean;

  // Actions
  toggleLesson: (id: string) => void;
  setVictoryTarget: (target: number) => void;
  setStartingLives: (lives: number) => void;
  setMaxSpeed: (speed: number) => void;
  setDifficulty: (diff: Difficulty) => void;
  setTtsEnabled: (enabled: boolean) => void;
  
  toggleDevMode: () => void;

  togglePet: (pet: PetID) => void;
  updatePetActionTime: () => void;

  registerIgnore: () => void;
  
  startGame: () => void;
  restartGame: () => void;
  takeDamage: () => void;
  addScore: (amount: number) => void;
  collectGem: (value: number, isMarioBonus?: boolean) => void;
  submitAnswer: (char: string) => boolean;
  setStatus: (status: GameStatus) => void;
  setDistance: (dist: number) => void;
  
  setManualSlowMotion: (active: boolean) => void;
  
  // Shop / Abilities
  buyItem: (type: 'DOUBLE_JUMP' | 'MAX_LIFE' | 'HEAL' | 'IMMORTAL' | 'FIREBALL' | 'FLIGHT' | 'PASSIVE_HEAL' | 'GEM_DOUBLER' | 'MAGNET' | 'PET', cost: number, petId?: PetID) => boolean;
  advanceLevel: () => void;
  openShop: () => void;
  closeShop: () => void;
  activateImmortality: () => void;
  useFireball: () => void;
  startFlight: () => void;
  endFlight: () => void;
  
  saveData: () => void;
  loadData: () => void;
  
  getRandomDistractor: () => string;
}

// Text to Speech Helper
const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    const cleanText = text.replace(/\(\s*\)/g, '').replace(/\s+/g, '');
    const u = new SpeechSynthesisUtterance(cleanText);
    u.lang = 'zh-TW';
    u.rate = 0.9;
    window.speechSynthesis.cancel(); 
    window.speechSynthesis.speak(u);
};

export const useStore = create<GameState>((set, get) => ({
  status: GameStatus.MENU,
  score: 0,
  highScore: 0,
  lives: 3,
  maxLives: 3,
  speed: 0,
  
  selectedLessonIds: ['HL_6'], 
  victoryTarget: 20,
  
  currentVocabList: LESSON_DATA['HL_6'],
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
  difficulty: Difficulty.SIMPLE,
  ttsEnabled: false,
  
  devMode: false,

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
  
  hasMagnet: false,
  ownedPets: [],
  activePets: [],
  lastPetActionTime: 0,
  
  isManualSlowMotion: false,

  toggleLesson: (id) => {
      set((state) => {
          const ids = state.selectedLessonIds;
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
  setDifficulty: (diff) => set({ difficulty: diff }),
  setTtsEnabled: (enabled) => set({ ttsEnabled: enabled }),
  
  toggleDevMode: () => set((state) => {
      const newMode = !state.devMode;
      if (newMode) {
          // ACTIVATE CHEATS
          return {
              devMode: true,
              score: 999999,
              hasDoubleJump: true,
              hasImmortality: true,
              hasFireball: true,
              hasFlight: true,
              hasPassiveHeal: true,
              hasGemDoubler: true,
              hasMagnet: true,
              ownedPets: [PetID.MARIO, PetID.PIKACHU, PetID.MECHA],
              activePets: [PetID.MARIO, PetID.PIKACHU, PetID.MECHA] // Equip all in dev mode
          };
      } else {
          // DISABLE MODE - RESET TO FRESH STATE
          return {
              devMode: false,
              score: 0,
              // Reset Skills
              hasDoubleJump: false,
              hasImmortality: false,
              hasFireball: false,
              hasFlight: false,
              hasPassiveHeal: false,
              hasGemDoubler: false,
              hasMagnet: false,
              // Reset Pets
              ownedPets: [],
              activePets: [],
              // Reset Stats
              lives: 3,
              maxLives: 3,
              // Stop active states
              isFlying: false,
              isImmortalityActive: false
          };
      }
  }),
  
  togglePet: (pet) => set((state) => {
      if (state.activePets.includes(pet)) {
          return { activePets: state.activePets.filter(p => p !== pet) };
      } else {
          return { activePets: [...state.activePets, pet] };
      }
  }),
  
  updatePetActionTime: () => set({ lastPetActionTime: Date.now() }),

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
          hasMagnet: state.hasMagnet,
          maxLives: state.maxLives,
          ownedPets: state.ownedPets,
          activePets: state.activePets,
          ttsEnabled: state.ttsEnabled
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
                  hasMagnet: data.hasMagnet || false,
                  maxLives: data.maxLives || 3,
                  ownedPets: data.ownedPets || [],
                  activePets: data.activePets || [],
                  ttsEnabled: data.ttsEnabled || false
              });
          }
      } catch (e) {
          console.warn('Failed to load game data', e);
      }
  },

  startGame: () => {
    const { selectedLessonIds, startingLivesSetting, maxLives, ttsEnabled } = get();
    
    // Aggregate Vocabulary
    let combinedList: VocabItem[] = [];
    selectedLessonIds.forEach(id => {
        if (LESSON_DATA[id]) {
            combinedList = [...combinedList, ...LESSON_DATA[id]];
        }
    });
    
    if (combinedList.length === 0) {
        combinedList = LESSON_DATA['HL_6'];
    }

    const randomVocab = combinedList[Math.floor(Math.random() * combinedList.length)];
    
    if (ttsEnabled && randomVocab) {
        speak(randomVocab.question);
    }
    
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
        isManualSlowMotion: false,
        lastPetActionTime: 0
      });
      
      // If dev mode is active, override score immediately
      if (get().devMode) {
          set({ score: 999999 });
      }
  },

  restartGame: () => {
    const { startingLivesSetting, maxLives, ttsEnabled, devMode } = get();
    const list = get().currentVocabList;
    const randomVocab = list[Math.floor(Math.random() * list.length)];
    
    if (ttsEnabled && randomVocab) {
        speak(randomVocab.question);
    }

    const actualLives = startingLivesSetting;
    const newMaxLives = Math.max(maxLives, actualLives);

    set({ 
        status: GameStatus.PLAYING, 
        score: devMode ? 999999 : 0, 
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
        isManualSlowMotion: false,
        lastPetActionTime: 0
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
          saveData(); 
      }
  },
  
  collectGem: (value, isMarioBonus = false) => {
      // GEM COLLECTION LOGIC
      const { hasGemDoubler, addScore } = get();
      
      let multiplier = 1;

      // 1. Passive Skill: Gem Doubler (2x)
      if (hasGemDoubler) multiplier *= 2;
      
      // 2. Pet Bonus: Mario (2x)
      // If Mario is equipped, LevelManager sends isMarioBonus=true.
      // This STACKS with Gem Doubler (e.g., 2 * 2 = 4x).
      if (isMarioBonus) multiplier *= 2;
      
      addScore(value * multiplier);
      set((state) => ({ gemsCollected: state.gemsCollected + 1 }));
  },

  setDistance: (dist) => set({ distance: dist }),
  
  setManualSlowMotion: (active) => set({ isManualSlowMotion: active }),

  submitAnswer: (char) => {
    const { currentVocab, correctAnswersCount, totalCorrectAnswers, targetCountForLevel, speed, takeDamage, currentVocabList, wrongAnswers, hasPassiveHeal, passiveHealCounter, lives, maxLives, victoryTarget, addScore, maxSpeedSetting, ttsEnabled, activePets } = get();
    
    if (currentVocab && char === currentVocab.char) {
        // CORRECT
        const newLevelCount = correctAnswersCount + 1;
        const newTotalCount = totalCorrectAnswers + 1;
        
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
        
        const speedCap = maxSpeedSetting > 0 ? (RUN_SPEED_BASE * (maxSpeedSetting / 100)) : Infinity;
        if (nextSpeed > speedCap) {
            nextSpeed = speedCap;
        }

        const nextVocab = currentVocabList[Math.floor(Math.random() * currentVocabList.length)];
        
        // TTS Trigger for next question
        if (ttsEnabled && nextVocab) {
            speak(nextVocab.question);
        }

        addScore(500); 

        set({
            correctAnswersCount: newLevelCount,
            totalCorrectAnswers: newTotalCount,
            currentVocab: nextVocab,
            consecutiveIgnores: 0, 
            speed: nextSpeed,
            passiveHealCounter: newHealCounter
        });

        if (newTotalCount >= victoryTarget) {
             addScore(10000); 
             set({ status: GameStatus.VICTORY });
             return true;
        }

        if (newLevelCount >= targetCountForLevel) {
             get().advanceLevel();
        }
        return true;
    } else {
        // WRONG
        // MECHA PROTECTION LOGIC
        if (!activePets.includes(PetID.MECHA)) {
            takeDamage();
        }

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
      
      const speedCap = maxSpeedSetting > 0 ? (RUN_SPEED_BASE * (maxSpeedSetting / 100)) : Infinity;
      
      if (newSpeed > speedCap) {
          newSpeed = speedCap;
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

  buyItem: (type, cost, petId) => {
      const { score, maxLives, lives, saveData, ownedPets, activePets } = get();
      
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
              case 'MAGNET': changes = { hasMagnet: true }; break;
              case 'PET': 
                if (petId && !ownedPets.includes(petId)) {
                    // When buying, automatically equip it
                    changes = { 
                        ownedPets: [...ownedPets, petId], 
                        activePets: [...activePets, petId] 
                    };
                }
                break;
          }
          
          set({ score: score - cost, ...changes });
          saveData(); 
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
  
  setStatus: (status) => set({ status }),
}));
