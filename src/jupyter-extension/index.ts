import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { ToolbarButton } from '@jupyterlab/apputils';
import { NotebookPanel } from '@jupyterlab/notebook';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'ai-chat-toolbar:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    const { commands } = app;

    // Add command for AI Chat
    const command = 'ai-chat:open';
    commands.addCommand(command, {
      label: 'Open AI Chat',
      execute: () => {
        window.open('http://localhost:5173', '_blank');
      }
    });

    // Add the command to the palette
    palette.addItem({
      command,
      category: 'AI Tools'
    });

    // Add toolbar button
    const button = new ToolbarButton({
      onClick: () => commands.execute(command),
      icon: 'ai-chat-icon', // You'll need to add this icon
      tooltip: 'Open AI Chat Interface'
    });

    // Add the button to the notebook toolbar
    app.docRegistry.addWidgetExtension('Notebook', {
      createNew: (widget: NotebookPanel) => {
        if ('toolbar' in widget) {
          widget.toolbar.insertItem(10, 'aiChat', button);
        }
        return button;
      }
    });
  }
};

export default plugin; 