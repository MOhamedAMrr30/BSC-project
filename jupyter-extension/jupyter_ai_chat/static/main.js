define([
    'base/js/namespace',
    'base/js/events'
], function(Jupyter, events) {
    function load_ipython_extension() {
        // Create the toolbar button
        var button_group = Jupyter.toolbar.add_buttons_group([{
            'label': 'AI Chat',
            'icon': 'fa-comments',
            'callback': function() {
                // Get the current cell's content or error
                var currentCell = Jupyter.notebook.get_selected_cell();
                var content = '';
                var error = null;

                if (currentCell) {
                    content = currentCell.get_text();
                    if (currentCell.output_area) {
                        error = currentCell.output_area.outputs.find(o => 
                            o.output_type === 'error' || 
                            (o.output_type === 'stream' && o.name === 'stderr')
                        );
                    }
                }

                // Prepare the context
                var context = {
                    code: content,
                    error: error ? JSON.stringify(error) : null
                };

                // Open the chat interface in a new window
                var chatWindow = window.open(
                    'http://localhost:5173?context=' + encodeURIComponent(JSON.stringify(context)),
                    'AI Chat',
                    'width=400,height=600,resizable=yes,scrollbars=yes'
                );
            }
        }]);
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});