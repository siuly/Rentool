export class User {
  constructor({ FirstName, LastName, phone = '-', email = '-', address = '-', profileUrl = '' }) {
    this.firstName = FirstName;
    this.lastName = LastName;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.profileUrl = profileUrl;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  };
}