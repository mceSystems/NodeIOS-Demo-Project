/**
 * This source code is licensed under the terms found in the LICENSE file in 
 * the root directory of this project.
 */

const ios = require("./node-native-script");

function readAllContacts() {
    const contactStore = new ios.CNContactStore();
    
    const keys = [ios.CNContactEmailAddressesKey, ios.CNContactPhoneNumbersKey, ios.CNContactFamilyNameKey, ios.CNContactGivenNameKey, ios.CNContactPostalAddressesKey];
    const request = ios.CNContactFetchRequest.alloc().initWithKeysToFetch(keys);
    
    const contacts = [];
    contactStore.enumerateContactsWithFetchRequestErrorUsingBlock(request, null, function (contact, stop) {
        contacts.push({
            firstName: contact.givenName,
            lastName: contact.familyName,
            email: contact.emailAddresses.length > 0 ? contact.emailAddresses[0].value : null,
            phoneNumber: contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].value.stringValue : null
        });
    });

    return contacts;
}

function getContacts(callback) {
    const status = ios.CNContactStore.authorizationStatusForEntityType(ios.CNEntityTypeContacts);
    if (ios.CNAuthorizationStatusNotDetermined == status) {
        const contactStore = new ios.CNContactStore();
        contactStore.requestAccessForEntityTypeCompletionHandler(ios.CNEntityTypeContacts, function (granted, error) {
            console.log("requestAccessForEntityTypeCompletionHandler " + granted);
            callback(readAllContacts());
        });
    } else if (ios.CNAuthorizationStatusAuthorized) {
        callback(readAllContacts());
    }
}

getContacts((contacts) => {
    console.log(contacts);
});
