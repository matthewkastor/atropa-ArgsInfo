var ArgsInfo = require('../src/atropa-ArgsInfo.js');

try {
    Object.keys(ArgsInfo).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = ArgsInfo[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-ArgsInfo.js');
}

Object.keys(ArgsInfo.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = ArgsInfo.data[prop];
    }
);
