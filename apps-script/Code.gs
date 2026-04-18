/**
 * Divergents · 6 Geniuses Test — Google Sheets backend
 *
 * HOW TO DEPLOY (one-time, ~3 minutes):
 * 1. Open your Google Sheets file.
 * 2. Extensions → Apps Script. Delete the default code, paste this entire file.
 * 3. Update SHEET_NAME below if your tab is named differently.
 * 4. Click "Deploy" → "New deployment" → type "Web app".
 *    - Description: "6 Geniuses submissions"
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Click "Deploy" and authorize.
 * 5. Copy the Web app URL.
 * 6. Paste it into config.js as SHEETS_WEBHOOK_URL.
 *
 * After that, every completed test on the website will append a row with
 * the participant's info, scores, and ranking.
 */

const SHEET_NAME = 'Результаты';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet_();

    const row = [
      new Date(payload.timestamp || Date.now()),
      payload.name || '',
      payload.email || '',
      payload.scores.W,
      payload.scores.I,
      payload.scores.D,
      payload.scores.G,
      payload.scores.E,
      payload.scores.T,
      payload.topGeniuses || '',
      payload.frustrations || '',
      (payload.answers || []).join(',')
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Divergents 6 Geniuses endpoint is live. POST JSON results here.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Дата', 'Имя', 'Email',
      'Задумка (W)', 'Изобретение (I)', 'Оценка (D)',
      'Гальванизация (G)', 'Поддержка (E)', 'Доводка (T)',
      'Ведущие таланты', 'Фрустрации', 'Ответы (1..42)'
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange('A1:L1').setFontWeight('bold');
  }
  return sheet;
}
