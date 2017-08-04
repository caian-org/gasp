/**
 * @script export-gmail-attachments-to-google-drive
 * @author Caian R. Ertl <caianrais@protonmail.com>
 * @revision Jan. 17, 2017.
 */


/**
 * Returns a Gmail Label object based on the name of it.
 * @param {string} name: The label name.
 * @return {object}: The Gmail Label object.
 */
function getGmailLabelByName(name) {
	 return GmailApp.getUserLabelByName(name);
}

/**
 * Export Gmail attachments under a specific criteria to Google Drive.
 * @return {bool}: A boolean value accordingly to the function execution.
 */
function export() {
	try {
		var driveFolderId = 'abcdefghijklmnopqrstuvwxyz12',
		    driveFolderObj = DriveApp.getFolderById(driveFolderId);
				      
		var gmailQuery = 'from:email@domain.com label:tagName',
			gmailThreads = GmailApp.search(gmailQuery),
			gmailLabel = getGmailLabelByName('tagName');
				      
		for (threadIndex = 0; threadIndex < gmailThreads.length; threadIndex++) {
			var gmailThreadMessages = gmailThreads[threadIndex].getMessages();
							        
			for (messageIndex = 0; messageIndex < gmailThreadMessages.length; messageIndex++) {
				var gmailMessage = gmailThreadMessages[messageIndex],
					gmailMessageAttachments = gmailMessage.getAttachments();
											        
					for (attachmentIndex = 0; attachmentIndex < gmailMessageAttachments.length; attachmentIndex++) {
						var gmailAttachment = gmailMessageAttachments[attachmentIndex];
															          
						try {
							driveFolderObj.createFile(gmailAttachment);
						}
						catch (error) {
							Logger.log(JSON.stringify(error));
						}
					}

				// Gmail API is very, very slow. And it often crashes when it receive a lot of requests.
				// This sleep function prevents the script to fail.
				Utilities.sleep(750);
			}
							        
			gmailThreads[threadIndex].removeLabel(gmailLabel);
			Utilities.sleep(750);
		}

		return true;
	}
	catch (e) {
		Logger.log(JSON.stringify(e));
		return false;
	}
}

/**
 * The main function of the program. Triggers the export() function.
 * There's not much implementation here. I just decided to keep it separately.
 */
function main() {
	if (!export() {
		Logger.log("Something went wrong!");
	}
}
