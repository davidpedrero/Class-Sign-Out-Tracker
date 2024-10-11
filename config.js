const USER_EMAIL = Session.getActiveUser().getEmail();

const TIMEZONE = Session.getScriptTimeZone();

const DATE = new Date().toLocaleDateString();

const ROOT_FOLDER_ID = "1fVt-nAhndHNfjr6giBaIPZKcR0DSxFT0";

const TEMPLATE_SHEET_ID = "1uRlKj8JDA42it0MwVSyxE9MrNmbXy8oPkLpp3tKjTGY";

const LOOKUP_SHEET_ID = "1ZhwR6_YsHn8RaOVX04AkGFBeh1Nay11du6K2vO8D-6o";

const SAVED_DATA = JSON.parse(PropertiesService.getScriptProperties().getProperty(USER_EMAIL)) ?? [];

const ID_DICTIONARY = JSON.parse(PropertiesService.getScriptProperties().getProperty("ID Dictionary")) ?? {};