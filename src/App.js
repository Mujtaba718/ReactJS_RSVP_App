// This line of code creates a new variable. That variable's name is React, 
// and its value is a particular, imported JavaScript object: 
// This imported object contains methods that you need in order to use React
import React, { Component } from 'react';
import GuestList from './GuestList';
import Counter from "./Counter";


class App extends Component {
  // list of guests. Every guest in the array will be a tile in the page
  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {
        name: 'John',
        isConfirmed: false,
        isEditing: false
      },
      {
        name: 'Mujtaba',
        isConfirmed: true,
        isEditing: false
      }
    ]
  }

  // Flip the value of checkbox everytime this event handler is run
  toggleGuessPropertyAt = (property, indexToChange) => 
    this.setState({
      //iterating through all items' indexes and checking whether the iterated index equals to indexToChange
      guests: this.state.guests.map((guest, index) => {
        if(index === indexToChange){
          return {
            ...guest, //one way to copy all of an object's properties into a new object literal
            [property]: !guest[property]
          }
        }
        //if the index doesnt match , return the same object leaving it untouched
        return guest;
      })
    });
 
  toggleConfirmationAt = index => 
    this.toggleGuessPropertyAt("isConfirmed", index);

  toggleEditingAt = index => 
    this.toggleGuessPropertyAt("isEditing", index);

  //Removing Guest
  removeGuestAt = index => 
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index), //This array will hold all the guests before the one we want to remove
        ...this.state.guests.slice(index + 1) // This array will be every array after the removed element
      ]
    })


  toggleFilter = () => 
    this.setState({
      isFiltered: !this.state.isFiltered  
    });

  // Event handler that will fire when user inputs new guest  
  handleNameInput = event => 
    this.setState({
      pendingGuest: event.target.value
    });
 
  newGuestSubmitHandler = event => {
    event.preventDefault(); // Preventing page to reload when clicking submit button
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: "" //Because form needs to clear
    })
   }


  setNameAt = (name, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if(index === indexToChange){
          return {
            ...guest, //one way to copy all of an object's properties into a new object literal
            name // key value pair shortcut, so name: name
          }
        }
        //if the index doesnt match , return the same object leaving it untouched
        return guest;
      })
    });

  // Method to find the current total of invited guests
  getTotalInvited = () => this.state.guests.length;

  //Get attending guests
  getAttendingGuests = () =>
    this.state.guests.reduce((total, guest) => guest.isConfirmed ? total + 1 : total, 0)

  render() {
    const totalInvited = this.getTotalInvited(); // Calling in the render method because we want the count to update whenever the app component re-renders
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Mujtaba Iqbal App</p>
          <form onSubmit={this.newGuestSubmitHandler}>
              <input 
                type="text" 
                onChange={this.handleNameInput}
                value={this.state.pendingGuest} 
                placeholder="Invite Someone" />
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input 
                type="checkbox"
                onChange={this.toggleFilter} 
                checked={this.state.isFiltered}
              /> Hide those who haven't responded
            </label>
          </div>
          <Counter 
            totalInvited={totalInvited}
            numberAttending={numberAttending}
            numberUnconfirmed={numberUnconfirmed}
          />

          <GuestList 
            guests={this.state.guests}
            toggleConfirmationAt={this.toggleConfirmationAt} 
            toggleEditingAt={this.toggleEditingAt}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest}
          />

        </div>
      </div>
    );
  }
}

export default App;
