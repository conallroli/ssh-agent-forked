const os = require('os');

if (process.env['OS'] != 'Windows_NT') {
    console.log(`process.env['OS'] != 'Windows_NT' === true, using POSIX-like ssh / git`)
    module.exports = {
        // Use getent() system call, since this is what ssh does; makes a difference in Docker-based
        // Action runs, where $HOME is different from the pwent
        homePath: os.userInfo().homedir,
        sshAgentCmdDefault: 'ssh-agent',
        sshAddCmdDefault: 'ssh-add',
        gitCmdDefault: 'git'
    };
} else {
    console.log(`process.env['OS'] != 'Windows_NT' === false, using Windows-like ssh / git`)
    module.exports = {
        // Assuming GitHub hosted `windows-*` runners for now
        homePath: os.homedir(),
        sshAgentCmdDefault: 'c://progra~1//git//usr//bin//ssh-agent.exe',
        sshAddCmdDefault: 'c://progra~1//git//usr//bin//ssh-add.exe',
        gitCmdDefault: 'c://progra~1//git//bin//git.exe'
    };
}
