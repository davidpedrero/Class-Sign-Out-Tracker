function testFetchData() {
  const savedData = JSON.parse(PropertiesService.getScriptProperties().getProperty("Saved Data")) ?? {};

  Logger.log(savedData);

  fetchData();
}


function testReverseSearch() {
  const searchKey = "David";

  const sheet = SPREADSHEET.getSheetByName(SHEET_NAME);

  const next = sheet.createTextFinder(searchKey).findNext().getRow();
  Logger.log(`next: ${next}`);

  const previous = sheet.createTextFinder(searchKey).findPrevious().getRow();
  Logger.log(`previous: ${previous}`);
}


function testStopTimer() {
  stopTimer("664898");
}


function testSpliceData() {
  Logger.log("SAVED_DATA:");
  Logger.log(SAVED_DATA);

  const index = 0;

  SAVED_DATA.splice(index, 1);
  Logger.log("Final SAVED_DATA:");
  Logger.log(SAVED_DATA);
}


function testResponseCode() {
  Logger.log("SAVED_DATA:");
  Logger.log(SAVED_DATA);

  const { responseCode } = SAVED_DATA;

  Logger.log(responseCode);

}


function testLocaleDateString() {
  Logger.log(new Date().toLocaleDateString());
}


function testObjSpread() {
  const obj = {
    name: "Lucky",
    age: 10
  }

  const newObj = {
    ...obj,
    cute: true
  }

  Logger.log(newObj);
}


function testTimeDifference() {
  const startTime = "2:11:11 PM";
  const endTime = "2:11:17 PM";

  console.log(getTimeDifference(startTime, endTime)); // Outputs: "00:00:06"
}


function testGetsheetByName() {
  const year = Utilities.formatDate(new Date(), TIMEZONE, "YYYY");
  const monthNo = Utilities.formatDate(new Date(), TIMEZONE, "MM");
  const monthName = Utilities.formatDate(new Date(), TIMEZONE, "MMMM");
  
  Logger.log(year)
  Logger.log(monthNo)
  Logger.log(monthName)
}