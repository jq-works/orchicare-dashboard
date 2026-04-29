fetch('https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=35.73.01.1001')
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data).substring(0, 1000)))
  .catch(console.error);
