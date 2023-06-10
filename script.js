//Global変数宣言 ---------------------------------------------------------------------->

 //論文ゼミ
 // TODO 年度・学期ごとに修正（url, next_role_table）
const paper = {
    vote:               "[投票画面 https://hsymlab.github.io/votesys/index.html]\n\n",
    result:             "[*** --結果--]\n\n\n",
    // next:            "[** 〜次回の担当〜]\n" + "全体FG（買い出し係）：\n" + "希望お菓子：\n" + "英語論文：\n",
    next:               "[** 〜次回の担当〜]\n" + "全体FG：\n" + "英語論文：\n",
    next_role_table:    "[https://scrapbox.io/files/64743def089b43001b52ed78.png]\n\n",
    tag:                "#論文ゼミ"
}

//進捗ゼミ
// TODO　年度・学期ごとに修正(url, next_role_table)
const progress = {
    vote:               "\n",
    result:             "",
    next:               "[** 〜次回の担当〜]\n" + "全体FG：\n",
    // next_role_table:   "[研究室ブログ執筆 https://scrapbox.io/hsym2022/%E7%A0%94%E7%A9%B6%E5%AE%A4%E3%83%96%E3%83%AD%E3%82%B0%E5%9F%B7%E7%AD%86]\n" + "[https://scrapbox.io/files/633bc6392bdd29001df90e22.png]\n\n",
    next_role_table:    "[https://scrapbox.io/files/64743def089b43001b52ed78.png]\n\n",
    tag:                "#進捗ゼミ"
}


// メンバーリスト(2023)
// TODO グループ決めて、各メンバー書き換える。いないところは"--"
const paper_member = [
    ["小川","出口", "東川","武田", "吉岡"],
    ["小原","笹川","名執", "細川", "--"],
    ["ギータ","林", "新妻","柳谷", "--"]
];

const progress_member = [
    ["小川","出口", "東川","武田", "吉岡"],
    ["小原","笹川","名執", "細川", "--"],
    ["ギータ","林", "新妻","柳谷", "--"]
];

// M2
const m2_member = ['小川', '笹川', '林'];




//ページ作成 ---------------------------------------------------------------------->

// ページ内テキスト生成
const gen_page = (member, number, seminar) => {

    const { result, next, next_role_table, tag } = seminar;

    // 全体FG
    let text = '[** 全体FG：]\n\n';

    // 欠席・遠隔参加者
    text += '[* 欠席：]\n[* 遠隔参加：]\n[* 早退（h:min）：]\n\n\n'

    text += shuffle_members(member, number);

    text += `${result}${next}${next_role_table}[*** --連絡--]\n\n\n${tag}`;

    return text;
}


// P/FGの組み合わせと順番をランダムに決定
const shuffle_members = (member, number) => {
    let text = ""

    for(let i = member.length -1 ; i > -1 ; i-- ){
        //Fisher–Yatesアルゴリズムでシャッフル(既存のものは偏りがあるらしい)
        for(let j = member[i].length - 1; j > -1; j--){
               let r = Math.floor(Math.random() * (j + 1));
            [member[i][r], member[i][j]] = [member[i][j], member[i][r]];
        }
    }

    // 個人スペース
    for(let i = 0; i < member[0].length; i++)  {
        //PかFGかの分岐
        text += `[** ${member[number][i]}(FG：${member[number<2 ? number+1: 0][i]})]\n`

        text += `[**_ Q&A]\n\n[**_ Comment]\n\n\n`;
    };

    return text
}




//論文ゼミ用ボタン ---------------------------------------------------------------------->

//ボタンを押した際の処理(論文ゼミ/'GroupA'の)
scrapbox.PopupMenu.addButton({
    title: '論文A',
    onClick: () => {return gen_page(paper_member, 0, paper);}
});

//ボタンを押した際の処理(論文ゼミ/'GroupB'の)
scrapbox.PopupMenu.addButton({
    title: '論文B',
    onClick: () => {return gen_page(paper_member, 1, paper);}
});

//ボタンを押した際の処理(論文ゼミ/'GroupC'の)
scrapbox.PopupMenu.addButton({
    title: '論文C',
    onClick: () => {return gen_page(paper_member, 2, paper);}
});


//進捗ゼミ用ボタン ---------------------------------------------------------------------->

//ボタンを押した際の処理(進捗ゼミ/'GroupA'の)
scrapbox.PopupMenu.addButton({
    title: '進捗A',
    onClick: () => {return gen_page(progress_member, 0, progress);}
});

//ボタンを押した際の処理(進捗ゼミ/'GroupB'の)
scrapbox.PopupMenu.addButton({
    title: '進捗B',
    onClick: () => {return gen_page(progress_member, 1, progress);}
});

//ボタンを押した際の処理(進捗ゼミ/'GroupC'の)
scrapbox.PopupMenu.addButton({
    title: '進捗C',
    onClick: () => {return gen_page(progress_member, 2, progress);}
});




//Pゼミ ---------------------------------------------------------------------->

//ボタンを押した際の処理('Pゼミ'の)
scrapbox.PopupMenu.addButton({
    title: 'Pゼミ',
    onClick: () => {return gen_page_p();}
});

//新しいPゼミのページを作る
const gen_page_p = () => {

    // TODO GitのURLは適宜変更
    let text = `[Github(hsymlab-uec) https://github.com/2023-hsymlab]\n\n`;

    // 班一覧
    // TODO Pゼミの班が決まり次第変更
    const group=[
        "01:Virtual Stock Trade Systemを作ろう！",
        // "02:カーナビ（簡易版） iOS/Android を作ろう！",
        // "03:Virtual ゼミ室を作ろう！",
        // "04:投票システムの改善",
        // "05:研究室のwebページの管理",
        // "06:学生部屋在室情報システムを作ろう！",
    ];

    // 各班のDONE・TODOリスト
    group.map((value) => {
        text += `[** ${value}]\n[**_ DONE]\n\n[**_ TODO]\n\n\n`;
    });

    // 連絡・タグ
    text += `[*** --連絡--]\n\n\n#Pゼミ`;

    return text;
};


//M2ゼミ ---------------------------------------------------------------------->

//ボタンを押した際の処理('M2ゼミ'の)
scrapbox.PopupMenu.addButton({
    title: 'M2ゼミ',
    onClick: () => {return gen_page_m2(m2_member);}
});

//新しいM2ゼミのページを作る
const gen_page_m2 = (member) => {

    let text = ""

    // 発表順をランダムに決定
    const order = shuffle_arr(member)

    for(let i = 0; i < member.length; i++) {
        text += `[** ${order[i]}]\n[**_ NOTE]\n\n\n`;
    }

    // 連絡・タグ
    text += `[*** --連絡--]\n\n\n#M2ゼミ`;

    return text;
};


// 配列の中身をシャッフル
const shuffle_arr = (arr) => {
    for(let i = (arr.length - 1); 0 < i; i--){

        // 0〜(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i + 1));

        // 要素の並び替えを実行
        let tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
    return arr;
}