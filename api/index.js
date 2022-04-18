require('dotenv').config();
cors = require('cors')
const express = require('express')
const routes = require('./routes')

const app = express()

app.use(cors())

const port = process.env.PORT || 3000;
const nome = process.env.name;

routes(app)

app.get('/', function(req, res) {
    
    var exec = require('child_process').exec;

const commands = [
	'npx sequelize-cli db:migrate',
	'npx sequelize-cli db:seed:all'
];

function runCommand(cmds, cb){
	const next = cmds.shift();
	if (!next) return cb();
	exec(next, {
		cwd: __dirname
	}, (err, stdout, stderr) => {
		console.log(stdout);
		if (err && !next.match(/\-s$/)) {
			console.log(`O commando "${next}" falhou.`, err);
			cb(err);
		}
		else runCommand(cmds, cb);
	});
}

runCommand(commands, err => {
	console.log('Script corrido');
});


    res.send('hello world');
  });

app.listen(port, () => console.log(`Rodando na porta: ${port}`))

module.exports = app