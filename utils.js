function include(file_name) {
  // Create and return HTML output using file name
  return HtmlService.createHtmlOutputFromFile(file_name).getContent();
}


function getScriptProperty(key) {
  const value = PropertiesService.getScriptProperties().getProperty(key);

  return value ? JSON.parse(value) : {};
}

function getTimeDifference(startTime, stopTime) {
  // Helper function to convert time string to a Date object
  function convertToTime(timeString) {
    const time = new Date(`1970-01-01 ${timeString}`);
    return time.getTime(); // Return the time in milliseconds
  }

  // Convert start and end times to milliseconds
  const startTimeMs = convertToTime(startTime);
  const stopTimeMs = convertToTime(stopTime);

  // Calculate the difference in milliseconds
  const differenceInMs = stopTimeMs - startTimeMs;

  // Convert difference to seconds
  let seconds = Math.floor(differenceInMs / 1000);

  // Extract hours, minutes, and seconds
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');

  seconds %= 3600;

  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');

  seconds = String(seconds % 60).padStart(2, '0');

  // Return the time difference in 00:00:00 format
  return `${hours}:${minutes}:${seconds}`;
}

function getLogSheetID() {
  const logSheets = JSON.parse(PropertiesService.getScriptProperties().getProperty("Log Sheets")) ?? {};

  if (DATE in logSheets) return logSheets[DATE];

  const rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);

  const year = Utilities.formatDate(new Date(), TIMEZONE, "YYYY");
  const monthNo = Utilities.formatDate(new Date(), TIMEZONE, "MM");
  const monthName = Utilities.formatDate(new Date(), TIMEZONE, "MMMM");

  const yearFolder = mkdir(rootFolder, year, "-p");
  const monthFolder = mkdir(yearFolder, `${monthNo}. ${monthName}`, "-p");

  const newSheetID = DriveApp.getFileById(TEMPLATE_SHEET_ID).makeCopy(`${DATE} Sign Out Logs`, monthFolder).getId();

  logSheets[DATE] = newSheetID;

  PropertiesService.getScriptProperties().setProperty("Log Sheets", JSON.stringify(logSheets));

  Logger.log(`New Sheet ID created for ${DATE}: ${newSheetID}`);

  return newSheetID;
}

function mkdir(parentfolder, folderName, option) {
  let parentFolderContents = parentfolder.getFoldersByName(folderName);

  if (parentFolderContents.hasNext()) {

    return parentFolderContents.next();
  }
  else {
    if (option == "-p") {
      const new_folder = parentfolder.createFolder(folderName);

      return new_folder;
    }

    return false;
  }
}