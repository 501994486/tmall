/**
 * 
 */
function setNewStructureItemSelectedIsNewN(idClicked) {
	var newStructureItemSelected = localStorage.getItem('newStructureItemSelected'), newStructureItemSelectedJSON = {"currId": idClicked, "isNew": 'N'};
	localStorage.setItem('newStructureItemSelected', JSON.stringify(newStructureItemSelectedJSON));
}

function setNewStructureItemSelectedIsNewY(idClicked) {
	var newStructureItemSelected = localStorage.getItem('newStructureItemSelected'), newStructureItemSelectedJSON = {"currId": idClicked, "isNew": 'Y'};
	localStorage.setItem('newStructureItemSelected', JSON.stringify(newStructureItemSelectedJSON));
}

function setNewStructureItemSelected() {
	var newStructureItemSelected = localStorage.getItem('newStructureItemSelected'), newStructureItemSelectedJSON;
	
	if (newStructureItemSelected != null && typeof newStructureItemSelected == "string") {
		newStructureItemSelectedJSON  = JSON.parse(newStructureItemSelected);
		$('#newStructureItemSelected').val(newStructureItemSelectedJSON["isNew"]);
	}
}

function getNewStructureItemSelected() {
	var newStructureItemSelected = localStorage.getItem('newStructureItemSelected'), newStructureItemSelectedJSON;
	
	if (newStructureItemSelected != null && typeof newStructureItemSelected == "string") {
	        newStructureItemSelectedJSON  = JSON.parse(newStructureItemSelected);
	    return newStructureItemSelectedJSON["isNew"];
	}
	return "Y";
}

function handleNewStructureItemSelected(idClicked) {
	var newStructureItemSelected = localStorage.getItem('newStructureItemSelected'), newStructureItemSelectedJSON;
	
	if (newStructureItemSelected == null) {
		newStructureItemSelectedJSON = {"currId": idClicked, "isNew": 'Y'};
	}
	else if (typeof newStructureItemSelected == "string") {
		newStructureItemSelectedJSON = JSON.parse(newStructureItemSelected);
		
		if (idClicked != newStructureItemSelectedJSON["currId"]) {
			newStructureItemSelectedJSON["isNew"] = 'Y';
			newStructureItemSelectedJSON["currId"] = idClicked;
		}
	}
	
	localStorage.setItem('newStructureItemSelected', JSON.stringify(newStructureItemSelectedJSON));
}
