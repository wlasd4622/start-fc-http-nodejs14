var getRawBody = require('raw-body');
var getFormBody = require('body/form');
var body = require('body');
const fs = require('fs');

/*
To enable the initializer feature (https://help.aliyun.com/document_detail/156876.html)
please implement the initializer function as below：
exports.initializer = (context, callback) => {
  console.log('initializing');
  callback(null, '');
};
*/

exports.handler = (req, resp, context) => {
  console.log('hello world');

  var params = {
    path: req.path,
    queries: req.queries,
    headers: req.headers,
    method: req.method,
    requestURI: req.url,
    clientIP: req.clientIP,
  }

  getRawBody(req, function (err, body) {
    for (var key in req.queries) {
      var value = req.queries[key];
      resp.setHeader(key, value);
    }
    let time = '';
    try {
      fs.writeFileSync('./text.txt', Date.now().toString());
      time = fs.readFileSync('./text.txt').toString();
    } catch (error) {
      console.log(error);
      time = error.message
    }

    {
      const iterations = 100000000; // 要执行的迭代次数

      // 记录开始时间
      const startTime = new Date();

      // 执行计算密集型操作
      let result = 0;
      for (let i = 0; i < iterations; i++) {
        result += Math.sqrt(i);
      }

      // 记录结束时间
      const endTime = new Date();

      // 计算耗时
      params.elapsedTime = endTime - startTime;
    }
    resp.setHeader('Content-Type', 'application/json');
    body.aaa = 11;
    params.body = body.toString();
    params.ccc = '11'
    params.time = time;
    resp.send(JSON.stringify(params, null, '    '));
  });

  /*
  getFormBody(req, function(err, formBody) {
      for (var key in req.queries) {
        var value = req.queries[key];
        resp.setHeader(key, value);
      }
      params.body = formBody;
      console.log(formBody);
      resp.send(JSON.stringify(params));
  });
  */
}