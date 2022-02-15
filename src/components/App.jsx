import { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section';
import Form from './Form';
import Filter from './Filter';
import Contacts from './Contacns';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  
  handleContact = userData => {
    const contacsListOfState = this.state.contacts;
    let inputName = userData.name;

    const isIncludesName = contacsListOfState.find(
      contact => contact.name.toLowerCase() === inputName.toLowerCase()
    );

    if (isIncludesName) {
      return alert(`${inputName} is already is contacts`);
    }

    const contact = { ...userData, id: nanoid() };
    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };

  handleFilterChange = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  handlesFilterOfContacts = () => {
    const value = this.state.filter.toLowerCase();
    const { contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(value)
    );
  };

  deleteContact = e => {
    const { contacts } = this.state;
    const contactId = e.currentTarget.parentNode.id;
    const contactForDeletion = contacts.filter(
      contact => contact.id !== contactId
    );

    return this.setState({ contacts: contactForDeletion });
  };

  render() {
    const contactsList = this.handlesFilterOfContacts();
    const value = this.state.filter;

    return (
      <Section title="Phonebook">
        <Form onSubmit={this.handleContact} />
        <h2>Contacts</h2>
        <Filter value={value} filterChange={this.handleFilterChange} />
        <Contacts contacts={contactsList} onDelete={this.deleteContact} />
      </Section>
    );
  }
}

export default App;
