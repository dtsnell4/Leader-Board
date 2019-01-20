import React from 'react';
import LocalForage from 'localforage';
import BoardPresentational from '../components/board';

class BoardComponent extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
    	players: [],
      modalOpen: false,
      loadingPlayers: false,
      editing: false
    };

    // Bind handlers that will be passed as props
    this.handleAdd = this.handleAdd.bind(this);
	  this.handleDelete = this.handleDelete.bind(this);
	  this.handleValidate = this.handleValidate.bind(this);
	  this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
  	// On initialization, displays a "loading" message while checking localStorage for saved players
  	this.setState(prevState => ({
      loadingPlayers: true
    }));
  	const this2 = this;

  	LocalForage.getItem('players').then(function(savedPlayers) {
		  if (savedPlayers) {
			  this2.setState(prevState => ({
		      players: savedPlayers.players ? savedPlayers.players : [],
		    }), function () {
				  this2.setState(prevState => ({
			      loadingPlayers: false
			    }));
				});
			} else {
				this2.setState(prevState => ({
		      loadingPlayers: false
		    }));
			}
		}).catch(function(err) {
		  console.log('Error getting players from localStorage:', err);
		});
	}

  toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  }

  saveToLocalStorage = (players) => {
  	const this2 = this;
		LocalForage.setItem('players', this2.state).then(function (value) {
	    console.log('Players successfully saved');
		}).catch(function(err) {
	    alert('Error saving players to localStorage:', err);
		});
	}

	// Utilitiy function to sort objects when adding/updating players
	compareObjects = () => {
	  return function (a, b) {
	    let comparison = 0;
	    if (a['score'] > b['score']) {
	      comparison = 1;
	    } else if (a['score'] < b['score']) {
	      comparison = -1;
	    } else if (a['score'] === b['score']) {  // Scores are equal, sort by last name
  	    if (a['name'].toUpperCase() > b['name'].toUpperCase()) {
		      comparison = 1;
		    } else if (a['name'].toUpperCase() < b['name'].toUpperCase()) {
		      comparison = -1;
		    }
	    }

	    return comparison;
	  };
	}

  handleValidate = (fieldInput) => {
  	let errors = {};
    if (!fieldInput.firstName) {
      errors.firstName = 'First Name is Required';
    }
    if (!fieldInput.lastName) {
      errors.lastName = 'Last Name is Required';
    }
    if (!fieldInput.score) {
      errors.score = 'Score is Required';
    }
    return errors;
  }

	handleAdd = (player, setSubmitting, resetForm) => {
		const name = `${player.lastName}, ${player.firstName}`; 
		const newscore = player.score;

		// Updating score of an existing player
		if (this.state.editing) {
		 	const newState = this.state.players
			const editPlayer = newState.find(f => f.name === name);

			if (editPlayer) editPlayer.score = newscore;
			newState.sort(this.compareObjects());

			this.setState(prevState => ({ 
		    editing: false,
		    players: newState
		  }), function () {
				this.saveToLocalStorage();
				this.setState({ modalOpen: false });
			  setSubmitting(false);
			  resetForm();
			});

			return;
		}

		// Adding a new player
		const myObj = { name: name, score: player.score }
		const myArr = [...this.state.players, myObj];
		myArr.sort(this.compareObjects());

		this.setState(prevState => ({
      players: myArr
    }), function () {
			this.saveToLocalStorage();
		  setSubmitting(false);
		  resetForm();
		});
  }

  handleDelete = (name) => {
  	const resp = window.confirm("Are you sure you want to remove this player from the leader board?");
		if (resp === true) {
	  	const filteredPlayers = this.state.players.filter(function( obj ) {
			  return obj.name !== name;
			});

			this.setState(prevState => ({
	      players: filteredPlayers
	    }), function () {
				this.saveToLocalStorage();
			});
		}
  }

  handleEdit = (name, setSubmitting, resetForm) => {
  	// Get the player that is being edited to populate the fields, open Edit Score modal
  	const editPlayer = this.state.players.filter(player => player.name === name);

  	this.setState(prevState => ({
	      editing: editPlayer[0]
	  }), function() {
	  	this.toggleModal();
	  });
  }

	render() {
    return <BoardPresentational 
    	players={this.state.players}
    	loadingPlayers={this.state.loadingPlayers}
    	handleAdd={this.handleAdd} 
    	handleValidate={this.handleValidate}
    	handleDelete={this.handleDelete}
    	handleEdit={this.handleEdit}
    	modalOpen={this.state.modalOpen} 
    	toggleModal={this.toggleModal} 
    	editing={this.state.editing}
    />;
  }
}

export default BoardComponent;
