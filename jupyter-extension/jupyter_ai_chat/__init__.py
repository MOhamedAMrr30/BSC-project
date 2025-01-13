def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter_ai_chat',
        'require': 'jupyter_ai_chat/main'
    }]