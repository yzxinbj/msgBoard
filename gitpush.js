var exec = require('child_process').exec;
process.stdin.on('data',function(data){
    exec('git add -A',function(err,stdout,stderr){
        exec('git commit -m"'+data.toString()+'"',function(err,stdout,stderr){
            exec('git push origin master',function(err,stdout,stderr){
                console.log(stdout);
                console.log('提交完毕');
                process.exit(0);
            });
        });
    });
});