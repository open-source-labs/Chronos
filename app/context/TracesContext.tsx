import React, { useState } from 'react';
import Electron from 'electron';

const { ipcRenderer } = window.require('electron');

export const CommsContext = React.createContext<any>(null);