/* var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column')
	.click(function(){
		board.createColumn(new Column(prompt('Wpisz nazwę kolumny')));
	});
	
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }     */


     var board = {
    name: 'Kanban Board',
    createColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container')
};

function initSortable() {
    $('.column-list').sortable({
        connectWith: '.column-list',
        placeholder: 'card-placeholder',
        receive: function(event, ui) {
            var $card = $(ui.item[0]),
                cardId = $card.attr('data-id'),
                columnId = $(event.target).parent().attr('data-id');

            $.ajax({
                url: baseUrl + '/card/'+cardId,
                method: 'PUT',
                data: {
                    name: $card.find('.card-description').text(),
                    bootcamp_kanban_column_id: columnId,
                },
            });
        },
    }).disableSelection();
}

$('.create-column')
    .click(function() {
        var columnName = prompt('Column name');
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: function(response){
                var column = new Column(response.id, columnName);
                board.createColumn(column);
            }
        });
});

