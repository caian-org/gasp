/**
 * @script export-form-itens-to-spreadsheet
 * @author Caian R. Ertl <caianrais@protonmail.com>
 * @revision Mar 3, 2019.
 */


/**
 * Inserts a new row in the spreadsheet with a given text.
 * @param {object} sheet: The Google Spreadsheet.
 * @param {string} message: The text.
 */
function insert(sheet, message)
{
    var nextRow = sheet.getLastRow() + 1;
    sheet.getRange("A" + nextRow).setValue(message);
}


/**
 * Exports the form questions and their options to a given spreadsheet.
 * @param {string} formId: The Google Form id.
 * @param {string} sheetId: The Google Spreadsheet id.
 */
function export(formId, sheetId)
{
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
function main()
{
	var formId = 'abcdefghijklmnopqrstuvwxzy12',
        sheetId = '21zyxwvutsrqponmlkjihgfedcba';

	export(formId, sheetId);
}
