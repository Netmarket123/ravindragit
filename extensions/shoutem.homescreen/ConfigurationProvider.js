import { configuration } from 'shoutem.application';
import ConfigurationReader from './ConfigurationReader';

const configurationReader = new ConfigurationReader(configuration);

export default (configurationReader);
