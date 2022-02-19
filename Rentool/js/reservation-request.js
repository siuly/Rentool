document.getElementById('page1-btn').addEventListener('click', () => {
  console.log('Click');
  document.getElementById('page1').classList.remove('shown');
  document.getElementById('page2').classList.add('shown');

	// Shown class will be set {display: block}, while others set {display: none}

});