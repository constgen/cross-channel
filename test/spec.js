'use strict';
'format cjs';
describe('CrossChannel', function () {
	require('./spec/index.js')
	require('./spec/constructor.js')
	require('./spec/channel.js')
	require('./spec/types/handlers-collection.js')
	require('./spec/types/message-event.js')
})
