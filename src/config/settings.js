import { LOCAL_API_HOST } from './api';

export const DEFAULT_LANG = 'fr';
export const DEFAULT_MODE = 'student';
export const DEFAULT_THEME_COLOR = 'rgb(0, 150, 136)';
export const DEFAULT_API_HOST = window.parent.location.hostname === 'localhost' ? LOCAL_API_HOST : null;
