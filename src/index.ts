import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab-mobile-menu extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab-mobile-menu',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyterlab-mobile-menu is activated!');
  }
};

export default extension;
