// KLASA KANBAN CARD
/*function Card(description) {
	var self = this;
	
	this.id = randomString();
	this.description = description;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.description);
		card.append(cardDescription)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
	  this.element.remove();
	}
}    */



function Card(id, name) {
  var self = this;

  this.id = id;
  this.name = name || 'N/A';
  this.$element = createCard(); 

  function createCard() {
    var $card = $('<li>').addClass('card').attr('data-id', self.id),
      $cardDescription = $('<p>').addClass('card-description').text(self.name),
      $cardDelete = $('<button>').addClass('btn-delete1').text('x');

  $cardDelete.click(function(){
      self.removeCard();
  });

  $card.append($cardDelete)
    .append($cardDescription);
    return $card;
  }
}

Card.prototype = {
  removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      success: function(){
        self.$element.remove();
      }
    });
}};
