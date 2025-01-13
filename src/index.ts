import { ICommandPalette } from '@jupyterlab/apputils';
import { JupyterFrontEnd } from '@jupyterlab/application';

export function activate(app: JupyterFrontEnd, palette: ICommandPalette) {
  const command = 'ai-chat:open';
  app.commands.addCommand(command, {
    label: 'Open AI Chat',
    execute: () => {
      // Use the same URL as other components
      const chatURL = 'http://localhost:5173';
      window.open(chatURL, '_blank');
    }
  });

  
  // Add a toolbar button
  palette.addItem({
    command,
    category: 'AI Tools',
    args: { isPalette: true }
  });
}