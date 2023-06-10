//Global変数宣言 ---------------------------------------------------------------------->

 //論文ゼミ
 //TODO 年度ごとに修正（url, info）
const paper = {
    doc:    "`[Title URL]`->これでURLを添付できる\n" + "[発表スライドをアップするGoogleDrive ",
    url:    "https://drive.google.com/drive/folders/1J88G1_RtQPMsm0t0oWfodScm_8cTNlZ2]\n",
    vote:   "[投票画面 https://hsymlab.github.io/votesys/index.html]\n\n",
    link:   "[]\n\n",
    result: "[*** --結果--]\n\n\n",
    // next:   "[** 〜次回の担当〜]\n" + "全体FG（買い出し係）：\n" + "希望お菓子：\n" + "英語論文：\n",
    next:   "[** 〜次回の担当〜]\n" + "全体FG：\n" + "英語論文：\n",
    info:   "[https://scrapbox.io/files/64743def089b43001b52ed78.png]\n\n",
    tag:    "#論文ゼミ"
}

//進捗ゼミ
//TODO　年度ごとに修正(url, info)
const progress = {
    doc:    "[進捗資料をアップするGoogleDrive ",
    url:    "https://drive.google.com/drive/folders/1T0XMcyBZSgA9xW8Lj63Rj39c7G23xiFv]\n",
    vote:   "\n",
    link:   "",
    result: "",
    next:   "[** 〜次回の担当〜]\n" + "全体FG：\n",
    // + "ブログ執筆者：\n" + "査読者:\n",
    // info:   "[研究室ブログ執筆 https://scrapbox.io/hsym2022/%E7%A0%94%E7%A9%B6%E5%AE%A4%E3%83%96%E3%83%AD%E3%82%B0%E5%9F%B7%E7%AD%86]\n" + "[https://scrapbox.io/files/633bc6392bdd29001df90e22.png]\n\n",
    info:   "[https://scrapbox.io/files/64743def089b43001b52ed78.png]\n\n",
    tag:    "#進捗ゼミ"
}


//ページ作成 ---------------------------------------------------------------------->

//順番のためのルーレットjs
const shuffle = (member, number, seminar) => {

    const { doc, url, vote, link, result, next, info, tag } = seminar;

    // 資料・使用するツールのリンクなど
    // let text = `${doc}${url}${vote}[** 全体FG：]\n\n`;
    let text = '[** 全体FG：]\n\n';

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
        text += `${link}[**_ Q&A]\n\n[**_ Comment]\n\n\n`;
    };
    // if (seminar == progress) {
        //text += `[** 今週のブログ担当者：(査読者：)]\n`;
        // text += `[PullRequest https://github.com/hsymlab/LabWeb/pulls]\n[**_ Q&A]\n\n[**_ Comment]\n\n\n`
    // }

    // 結果・次回の担当・連絡・タグ
    // text += `${result}${next}${info}[*** --連絡--]\n\n\n${tag}`;
    text += `${result}${next}${info}[*** --連絡--]\n\n\n${tag}`;

    return text;
}

function shuffle_text_seminar(member){
    let pgList = [];
    while(member.length >= 1){
           let r = Math.floor(Math.random() * (member.length));
        pgList.push(member[r]);
        member = member.filter(n => n !== member[r]);
    }

    let text = 'FG: '+pgList[0]+'\n'+'FG: '+pgList[1]+'\n'+'FG: '+pgList[2]+'\n'+'FG: 	'+pgList[3]+'\n'+'FG: '+pgList[4]+'\n';

    return text
}

//メンバーリスト(2023)
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


//論文ゼミ用ボタン ---------------------------------------------------------------------->

//ボタンを押した際の処理(論文ゼミ/'GroupA'の)
scrapbox.PopupMenu.addButton({
    title: '論文A',
    onClick: () => {return shuffle(paper_member, 0, paper);}
});

//ボタンを押した際の処理(論文ゼミ/'GroupB'の)
scrapbox.PopupMenu.addButton({
    title: '論文B',
    onClick: () => {return shuffle(paper_member, 1, paper);}
});

//ボタンを押した際の処理(論文ゼミ/'GroupC'の)
scrapbox.PopupMenu.addButton({
    title: '論文C',
    onClick: () => {return shuffle(paper_member, 2, paper);}
});


//進捗ゼミ用ボタン ---------------------------------------------------------------------->

//ボタンを押した際の処理(進捗ゼミ/'GroupA'の)
scrapbox.PopupMenu.addButton({
    title: '進捗A',
    onClick: () => {return shuffle(progress_member, 0, progress);}
});

//ボタンを押した際の処理(進捗ゼミ/'GroupB'の)
scrapbox.PopupMenu.addButton({
    title: '進捗B',
    onClick: () => {return shuffle(progress_member, 1, progress);}
});

//ボタンを押した際の処理(進捗ゼミ/'GroupC'の)
scrapbox.PopupMenu.addButton({
    title: '進捗C',
    onClick: () => {return shuffle(progress_member, 2, progress);}
});


//Pゼミ ---------------------------------------------------------------------->

//ボタンを押した際の処理('Pゼミ'の)
scrapbox.PopupMenu.addButton({
    title: 'Pゼミ',
    onClick: () => {return createNewSeminarPage_P();}
});

//新しいPゼミのページを作る
const createNewSeminarPage_P = () => {

    let text = `[Github(hsymlab-uec) https://github.com/2023-hsymlab]\n\n`;

    // 班一覧
    const group=[
        "01:Virtual Stock Trade Systemを作ろう！",
        // "02:カーナビ（簡易版） iOS/Android を作ろう！",
        // "03:Virtual ゼミ室を作ろう！",
        // "04:投票システムの改善",
        // "05:研究室のwebページの管理",
        // "06:学生部屋在室情報システムを作ろう！",
    ];

    // 各班のDONE・TODO
    group.map((value) => {
        text += `[** ${value}]\n[**_ DONE]\n\n[**_ TODO]\n\n\n`;
    });

    // 連絡・タグ
    text += `[*** --連絡--]\n\n\n#Pゼミ`;

    return text;
};
