function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setTitle("Class Sign Out Tracker")
    .setFaviconUrl("https://cdn-icons-png.flaticon.com/512/4033/4033019.png");
}


function main(params) {
  Logger.log(`Current User: ${USER_EMAIL}`);

  const { id, startTime, stopTime, reason, initiator } = params;
  Logger.log(`Initiator: ${initiator}`);
  Logger.log(`Lunch ID: ${id}`);
  Logger.log(`Start Time: ${startTime}`);
  Logger.log(`Stop Time: ${reason}`);
  Logger.log(`Reason for leaving: ${id}`);

  if (initiator === "fetchData") {
    return { savedData: SAVED_DATA, responseCode: 200 };
  }

  if (!(id in ID_DICTIONARY)) {
    return { savedData: SAVED_DATA, responseCode: 404 };
  }

  const index = SAVED_DATA.findIndex((student) => {
    return student.id == id;
  });

  const { name, classNo } = ID_DICTIONARY[id];

  const sheetID = getLogSheetID();

  const LOGS_SHEET = SpreadsheetApp.openById(sheetID).getSheetByName(classNo);
  
  const headers = LOGS_SHEET.getRange(1, 1, 1, LOGS_SHEET.getLastColumn()).getValues()[0];

  if (initiator === "startTimer") {
    Logger.log("Running startTimer option...");

    if (index !== -1) {
      return { savedData: SAVED_DATA, responseCode: 409 };
    }

    let sheetData = [];

    sheetData[headers.indexOf("ID")] = id;
    sheetData[headers.indexOf("NAME")] = name;
    sheetData[headers.indexOf("REASON")] = reason;
    sheetData[headers.indexOf("START_TIME")] = startTime;

    LOGS_SHEET.getRange(LOGS_SHEET.getLastRow() + 1, 1, 1, sheetData.length).setValues([sheetData]);

    SAVED_DATA.push({ id, startTime, name, classNo, reason });
  }

  if (initiator === "stopTimer") {
    Logger.log("Running stopTimer option...");

    const row = LOGS_SHEET.createTextFinder(id).findPrevious().getRow();
    Logger.log(`Found record in row: ${row}`);

    const timeOut = getTimeDifference(SAVED_DATA[index]["startTime"], stopTime);

    LOGS_SHEET.getRange(row, headers.indexOf("STOP_TIME") + 1).setValue(stopTime);
    LOGS_SHEET.getRange(row, headers.indexOf("TIME_OUT") + 1).setValue(timeOut);

    SAVED_DATA.splice(index, 1);
  }

  PropertiesService.getScriptProperties().setProperty(USER_EMAIL, JSON.stringify(SAVED_DATA));

  return { savedData: SAVED_DATA, responseCode: 200 };
}