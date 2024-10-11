function refreshDictionary() {
  const LOOKUP_SHEET = SpreadsheetApp.openById(LOOKUP_SHEET_ID).getSheetByName("Lookup");
  const sheetData = LOOKUP_SHEET.getDataRange().getValues();

  const headers = sheetData[0];

  const dictionary = {};

  for (const student of sheetData) {
    const id = student[headers.indexOf("ID Number")];
    const name = `${student[headers.indexOf("First Name")]} ${student[headers.indexOf("Last Name")]}`;
    const classNo = student[headers.indexOf("Class")];

    dictionary[id] = { name, classNo };
  }

  Logger.log(dictionary);

  PropertiesService.getScriptProperties().setProperty("ID Dictionary", JSON.stringify(dictionary));
}