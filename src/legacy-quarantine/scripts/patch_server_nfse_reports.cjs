const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const nfseReportEndpoint = `
app.get("/relatorio-nfse.pdf", (req: express.Request, res: express.Response) => {
  const manualPath = path.join(process.cwd(), "RELATORIO_NFSE_INTEGRACAO.pdf");
  if (fs.existsSync(manualPath)) {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="RELATORIO_NFSE_INTEGRACAO.pdf"');
    res.sendFile(manualPath);
  } else {
    res.status(404).send("Relatório PDF não encontrado no servidor.");
  }
});
`;

code = code.replace(/app\.get\("\/relatorio-eventos\.pdf"/, nfseReportEndpoint + '\napp.get("/relatorio-eventos.pdf"');
fs.writeFileSync('server.ts', code, 'utf8');
console.log("Patched server.ts with NFSE Report Endpoints.");
