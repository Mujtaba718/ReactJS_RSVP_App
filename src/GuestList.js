import React from 'react';	
import PropTypes from 'prop-types';
import PendingGuest from './PendingGuest';


import Guest from './Guest';

const GuestList = props => 
    <ul>
    	<PendingGuest name={props.pendingGuest}/>
    	{props.guests
    	  .filter(guest => !props.isFiltered || guest.isConfirmed) //filter method will look at the state and decide on each guest wether it should be displayed
    	  .map((guest, index) =>
          <Guest 
	          	key={index} // help identify which items have changed, added, or removed
	          	name={guest.name} 
	          	isConfirmed={guest.isConfirmed}
	          	isEditing={guest.isEditing} 
	          	handleConfirmation={() => props.toggleConfirmationAt(index)}
	          	handleToggleEditing={() => props.toggleEditingAt(index)}
	          	setName={text => props.setNameAt(text,index)} //This function accepts a new name and sets that guests state. we need the index to find the right name to change
	          	handleRemove={() => props.removeGuestAt(index)}
           />
        )}
    </ul>


GuestList.propTypes = {
	guests: PropTypes.array.isRequired,
	toggleConfirmationAt: PropTypes.func.isRequired,
	toggleEditingAt: PropTypes.func.isRequired,
	setNameAt: PropTypes.func.isRequired,
	isFiltered: PropTypes.bool.isRequired,
	removeGuestAt: PropTypes.func.isRequired,
	pendingGuest: PropTypes.string.isRequired
}

export default GuestList;