import {io} from 'socket.io-client';
import {serverUrl} from '../../../common/constant';
const socket = io(serverUrl);
export default socket;
