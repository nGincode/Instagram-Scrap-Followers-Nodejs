const Nightmare = require('nightmare');
const XlsxPopulate = require('xlsx-populate');
const username = '6289509133696';
const password = 'fni91199';


const nighmare = Nightmare({
    show: true,
    waitTimeout: 36000,
    goTimeout: 36000,
    loadTimeout: 36000,
    executionTimeout: 36000,
    webPreferences: {
        partition: 'nopersist',
        images: false,
    }
});

console.log('Mencoba Login Instagram');

nighmare
    .goto('http://instagram.com')
    .wait('input[name=username]')
    .insert('input[name=username]', username)
    .insert('input[name=password]', password)
    .click('button[type="submit"]')
    .wait('input[placeholder=Search')
    // .wait(3000)
    .goto('https://instagram.com/hidroponikuntuksemua/')
    .wait('#react-root > section > main > div > header > section > ul > li:nth-child(3) > a')
    .inject('js', 'klikfollowing.js')
    .wait('.m82CD')
    .wait(2000);

for (let i = 0; i < 20; i++) {
    nighmare
        .inject('js', 'scroolfollowers.js')
        .wait(1000);
}

nighmare
    .evaluate(
        function () {
            var d = document.getElementsByClassName('d7ByH'); //div > span > a
            var e = [];

            for (var xx = 0; xx < 100; xx++) {
                e.push(d[xx].innerText);
            }
            return e;
            console.log(e);
        }
    )
    .then(function (data) {
        XlsxPopulate.fromBlankAsync()
            .then(workbook => {
                workbook.sheet("Sheet1").cell("A1").value([data]);
                return workbook.toFileAsync("./out.xlsx")
            });
        console.dir(data);
        console.log("data berhasil di scrap");
    })
    .catch(
        function (err) {
            console.log(err);
        }
    )

nighmare
    .wait(5000)
    .end()