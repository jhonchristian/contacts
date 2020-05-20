//#region Variables
let btn_submit         = document.getElementById("btn-submit");
let btn_add_contact    = document.getElementById("btn-add");
let btn_cancel_contact = document.getElementById("btn-cancel");
let contact_form       = document.getElementById("new-contact-form");
let display_contact    = 0;
//#endregion

//#region Contacts, Actions

let contacts = []

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  	event.preventDefault();
  
  	let form    = event.target;
  	let contact = {
						id               : generateId(),
						name             : form.name.value,
						phone            : form.phone.value,
						emergency_contact: form.emergency_contact.checked
					}
	contacts.push(contact);
	saveContacts();
	form.reset();
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
	window.localStorage.setItem("contacts", JSON.stringify(contacts));
	drawContacts();
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
	let data = JSON.parse(window.localStorage.getItem("contacts"));
	contacts = data ? data : [];
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
	let template = "";

	contacts.forEach(contact => {
		template += `
						<div class="card mt-1 mb-1 ${contact.emergency_contact ? "emergency-contact" : ""}">
							<h3 class="mt-1 mb-1">${contact.name}</h3>
							<div class="d-flex space-between">
							<p>
								<i class="fa fa-fw fa-phone"></i>
								<span>${contact.phone}</span>
							</p>
							<i class="action fa fa-trash text-danger" onclick="removeContact('${contact.id}')" alt="remove"></i>
							</div>
						</div>
					`;

	});

	document.getElementById("contact-list").innerHTML = template;

}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
	let index = contacts.findIndex(contact => contact.id === contactId);

	if(index === -1) {
		throw new Error("Invalid Contact ID");
	}

	contacts.splice(index, 1);
	saveContacts();
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
	contact_form.classList.toggle("hidden");
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()

//#endregion

//#region Register Events
register_event(btn_submit, "click", saveContacts);
register_event(btn_add_contact, "click", toggleAddContactForm);
register_event(btn_cancel_contact, "click", toggleAddContactForm);
//#endregion