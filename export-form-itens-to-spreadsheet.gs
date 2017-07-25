/**
 * @script export-form-itens-to-spreadsheet
 * @author Caian R. Ertl <caianrais@protonmail.com>
 * @revision Jul 25, 2017.
 *
 * Google made it very easy to create quizzes with Google Forms.
 * It is even more easy to insert questions: you just have to
 * copy and paste the content from a text editor or such to the
 * browser, where the form is open and its done. Google automagically
 * will convert each line into a new option.
 *
 * But for some reason, it is not that easy to copy it back.
 * Some months ago, in a summer day, I had to deal with this huge
 * Google Forms (about 20 questions, each one of them with 5 multiple
 * options). What I needed was simple: export every single question
 * and their options to plain text.
 *
 * Now calculate the manual work...
 *
 * This script was created with that in mind.
 */


/**
 * Inserts a new row in the spreadsheet with a given text.
 * @param {object} sheet: The Google Spreadsheet.
 * @param {string} message: The text.
 */
function insert(sheet, message) {
	var nextRow = sheet.getLastRow() + 1;
	sheet.getRange("A" + nextRow).setValue(message);
}


/**
 * Exports the form questions and their options to a given spreadsheet.
 * @param {string} formId: The Google Form id.
 * @param {string} sheetId: The Google Spreadsheet id.
 */
function export(formId, sheetId) {
	var testForm = FormApp.openById(formId),
		  testItems = testForm.getItems();
	  
	var sheet = SpreadsheetApp.openById(sheetId);
	  
	for (i = 1; i < testItems.length; i++) {
		Logger.log(testItems[i].getTitle());
		insert(sheet, testItems[i].getTitle());
			    
		var choices = testItems[i].asMultipleChoiceItem().getChoices();
			    
		for (j = 0; j < choices.length; j++) {
      Logger.log(choices[j].getValue());
			insert(sheet, choices[j].getValue());
	  }
	}  
}


/**
 * The main function of the program. Triggers the export() function.
 */
function main() {
	var formId = 'abcdefghijklmnopqrstuvwxzy12',
		  sheetId = '21zyxwvutsrqponmlkjihgfedcba';

	export(formId, sheetId);
}
