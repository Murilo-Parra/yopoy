const fs = require('fs');
['src/utils/sefaz_events/SefazEventAuditService.ts', 
 'src/utils/sefaz_events/SefazEventQueue.ts', 
 'src/utils/sefaz_events/SefazEventMonitor.ts',
 'src/utils/sefaz_events/SefazEventsService.ts',
 'src/utils/sefaz_events/SefazEventRetryManager.ts'
].forEach(f => {
  let file = fs.readFileSync(f, 'utf8');
  file = file.replace(/\\`/g, '`');
  file = file.replace(/\\\${/g, '${');
  fs.writeFileSync(f, file, 'utf8');
})
console.log("Fixed escaped backticks");
