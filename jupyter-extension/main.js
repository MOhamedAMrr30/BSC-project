define([
    'base/js/namespace',
    'base/js/events'
], function(Jupyter, events) {
    function load_ipython_extension() {
        // Create the button
        var chatButton = $('<button/>')
            .addClass('btn btn-sm navbar-btn')
            .attr('id', 'ai_chat_button')
            .html('AI Chat')
            .on('click', function() {
                // Get the current cell's content or error
                var currentCell = Jupyter.notebook.get_selected_cell();
                var content = currentCell ? currentCell.get_text() : '';
                var error = currentCell ? currentCell.output_area.outputs.find(o => o.output_type === 'error') : null;
                
                // Open the chat interface in a new window
                var chatWindow = window.open('http://localhost:5173?content=' + encodeURIComponent(content), 
                    'AI Chat',
                    'width=400,height=600,resizable=yes'
                );
            });

        // Add the button to the notebook toolbar
        Jupyter.toolbar.add_buttons_group([{
            'label'   : 'AI Chat',
            'icon'    : 'fa-comments',
            'callback': function() {
                $('#ai_chat_button').click();
            }
        }]);
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});