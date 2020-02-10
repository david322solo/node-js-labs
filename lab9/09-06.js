

let http = require('http');
let fs = require('fs');

let bound = 'smw60-smw60-smw60';

let options = {
    host: 'localhost',
    path: '/sixth',
    port: 5000,
    method: 'POST',
    headers: {'content-type':'multipart/form-data; boundary='+bound}
};
let req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => { console.log('Buffer lenght: ', Buffer.byteLength(data)); console.log(data.toString()); });
});
//req.write(body);
let stream = new fs.ReadStream(__dirname+"\\MyFile.txt");
stream.on('data', (chunk) => { req.write(chunk); console.log(Buffer.byteLength(chunk))});
stream.on('end', () => { req.end(`\r\n--${bound}--\r\n`) });
