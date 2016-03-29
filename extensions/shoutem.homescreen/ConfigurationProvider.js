import { settings } from 'shoutem.application';
import HomeScreenSettingsReader from './HomeScreenSettingsReader';

const settingsReader = new HomeScreenSettingsReader(settings);

export default (settingsReader);
