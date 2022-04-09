/*────────────────────────────────────────────────────────────────────────────────────────────────*/

const path = require('path');
const express = require('express');
const pathProject = process.mainModule.path;
const Storage = new $.Files('.');

/*┌─────────┐
  │ Статика │
  └─────────┘*/
const app = express();
app.use('/demo', express.static(path.resolve(pathProject, 'demo')));

/*┌──────┐
  │ Пути │
  └──────┘*/
const router = express.Router();
router.get('/', async (req, res) => {
// Чтение каталога
    dirResult = await Storage.readdir('demo');
    
// Ошибка 
    if (dirResult.status == 'error') {
        return res.send(
            'Ошибка:' +
            '<pre>' +
            JSON.stringify(dirResult, 4, '    ') +
            '</pre>'
        );
    }
    
// Контент
    let content = [];
    
// Добавляем начальный тег
    content.push('<div align="center">');
    
// Содержимое каталога
    dirResult.content.forEach(file => {
        content.push('<div>');
        content.push('<a href="demo/'+ file.name +'" target="_blank">');
        content.push(file.name);
        content.push('</a>');
        content.push('</div>');
    });
    
// Добавляем конечный тег
    content.push('</div>');
    
// Возвращаем результат
    return res.send(content.join('\n'));
});
app.use('/', router);

/*┌────────┐
  │ Сервер │
  └────────┘*/
app.listen(process.env.PORT, function() {
    console.log('Server -> http://' + process.env.IP + ':' + process.env.PORT);
});
/*────────────────────────────────────────────────────────────────────────────────────────────────*/