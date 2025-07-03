function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function processForm(formObject) {
  if (!formObject.searchtext) return [];

  return search(formObject.searchtext);
}

function search(searchtext) {
  const spreadsheetId = '1w4PLHZ_HxEsmbjiccrgkZQxT6H9zvKuEJa7uMKy2lgQ'; // ID Spreadsheet kamu
  const range = 'BotLucky!A2:C';
  const values = Sheets.Spreadsheets.Values.get(spreadsheetId, range).values || [];
  
  const keyword = searchtext.toString().toLowerCase();
  const result = [];

  values.forEach(row => {
    const userId = row[0]?.toString().toLowerCase() || "";
    if (userId.includes(keyword)) {
      result.push(row); // [UserID, Kode, Tanggal]
    }
  });

  return result;
}
