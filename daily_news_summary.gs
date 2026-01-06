function fetchNewsTest() {

  const NEWS_API_KEY = 'xxxxxxxxxxxxxxxxxxx';
  const SEND_TO = 'xxxxxxxxxxxxxx'; // ←ここだけ自分のに変える

  const url =
    'https://newsapi.org/v2/top-headlines' +
    '?country=us' +
    '&category=business' +
    '&pageSize=30' +
    '&apiKey=' + NEWS_API_KEY;

  const response = UrlFetchApp.fetch(url);
  const data = JSON.parse(response.getContentText());
  const articles = data.articles;

  Logger.log('総取得件数: ' + articles.length);

  if (articles.length === 0) {
    Logger.log('記事が取得できていません');
    return;
  }

  // シャッフル
  articles.sort(() => Math.random() - 0.5);

  // ランダム5件
  const selected = articles.slice(0, 5);

  Logger.log('===== AI要約結果 =====');

  let mailBody = '';
  mailBody += 'Daily News Summary\n\n';

  selected.forEach((article, index) => {

    const textForAI =
      article.title + '\n' +
      (article.description ? article.description : '');

    const summary = summarizeWithAI(textForAI);

    Logger.log('【' + (index + 1) + '】' + article.title);
    Logger.log(summary);
    Logger.log('----------------------');

    // メール本文に追加
    mailBody += `【${index + 1}】${article.title}\n`;
    mailBody += summary + '\n';
    mailBody += article.url + '\n';
    mailBody += '----------------------\n';
    
  });
  // 🔗 信頼できるニュースソースを最後に追加
mailBody += '\n';
mailBody += '────────────────\n';
mailBody += 'Trusted News Sources\n';
mailBody += 'BBC       : https://www.bbc.com/news\n';
mailBody += 'CNN       : https://edition.cnn.com\n';
mailBody += 'Economist : https://www.economist.com\n';
mailBody += '────────────────\n';


  // Gmail送信
  GmailApp.sendEmail(
    SEND_TO,
    'Daily News Summary',
    mailBody
  );
}


function summarizeWithAI(text) {

  const HF_API_KEY = 'xxxxxxxxxxxx';

  const url =
    'https://router.huggingface.co/hf-inference/models/sshleifer/distilbart-cnn-12-6';

  const payload = {
    inputs: text,
    parameters: {
      max_length: 130,
      min_length: 50,
      do_sample: false
    }
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + HF_API_KEY
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const raw = response.getContentText();
  const data = JSON.parse(raw);

  if (data.error) {
    Logger.log('HFエラー: ' + raw);
    return '（要約を取得できませんでした）';
  }

  return data[0].summary_text;
}
