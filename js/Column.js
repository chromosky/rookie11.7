/*function Column(name) {
	var self = this;
	
	this.id = randomString();
	this.name = name;
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});
		
		columnAddCard.click(function(event) {
			event.preventDefault();
			self.createCard(new Card(prompt("Wpisz nazwę karty")));
		});
			
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
	  this.element.remove();
	}
}; */


function Column(id, name) {
  var self = this; 

  this.id = id;
  this.name = name || 'N/A';
  this.$element = createColumn();

//  jQuery addClass() Method

  function createColumn() {
  var $column = $('<div>').addClass('column').attr('data-id', self.id),
    $columnTitle = $('<h2>').addClass('column-title').text(self.name),
    $columnCardList = $('<ul>').addClass('column-list'),
    $columnDelete = $('<button>').addClass('btn-delete').text('x'),
    $columnAddCard = $('<button>').addClass('add-card').text('Add card');

  $columnDelete.click(function() {
    self.removeColumn();
  });
  $columnAddCard.click(function(event) {
    var cardName = prompt("Card name");
    event.preventDefault();
      $.ajax({
        url: baseUrl + '/card',
        method: 'POST',
        data: {
        name: cardName,
        bootcamp_kanban_column_id: self.id
        },
        success: function(response) {
            var card = new Card(response.id, cardName);
            self.createCard(card);
        }
      });
  });

  $column.append($columnTitle)
    .append($columnDelete)
    .append($columnAddCard)
    .append($columnCardList);
    return $column;
  }
}

Column.prototype = {
  createCard: function(card) {
    this.$element.children('ul').append(card.$element);
  },
  removeColumn: function() {
    var self = this;
      $.ajax({
        url: baseUrl + '/column/' + self.id,
        method: 'DELETE',
        success: function(response){
          self.$element.remove();
        }
      });
  }
};