import os from 'os';
import chalk from 'chalk';
import packageJson from '../../../package.json'; // App version

export const startupLogger = (port: number) => {
  const line = chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const thinLine = chalk.gray('────────────────────────────────────────────────────────');

  console.log(`
${line}

${chalk.cyanBright(`
  
██████╗ ██╗  ██╗      ██████╗  █████╗ ████████╗██╗  ██╗██╗██╗  ██╗
██╔══██╗██║  ██║     ██╔════╝ ██╔══██╗╚══██╔══╝██║  ██║██║╚██╗██╔╝
██████╔╝███████║     ██║  ███╗███████║   ██║   ███████║██║ ╚███╔╝ 
██╔═══╝ ██╔══██║     ██║   ██║██╔══██║   ██║   ██╔══██║██║ ██╔██╗ 
██║     ██║  ██║     ╚██████╔╝██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
╚═╝     ╚═╝  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
`)}

                 ${chalk.yellow.bold('👑 Developer By: RK RAFIK RIDOY 👑')}

${thinLine}

${chalk.greenBright('✨ Status        : RUNNING')}
${chalk.greenBright('🌍 Environment   :')} ${chalk.white(process.env.NODE_ENV || 'development')}
${chalk.greenBright('🔗 Local URL     :')} ${chalk.white(`http://localhost:${port}`)}
${chalk.greenBright('🗄️  Database     :')} ${chalk.white('Connected')}
${chalk.greenBright('🕒 Started At    :')} ${chalk.white(new Date().toLocaleString())}
${chalk.greenBright('📦 Version       :')} ${chalk.white(packageJson.version)}
${chalk.greenBright('🌿 Git Branch    :')} ${chalk.white(process.env.GIT_BRANCH || 'main')}

${chalk.greenBright('💻 Machine       :')} ${chalk.white(os.hostname())}
${chalk.greenBright('🧩 Platform      :')} ${chalk.white(`${os.platform()} (${os.arch()})`)}
${chalk.greenBright('👤 System User   :')} ${chalk.white(os.userInfo().username)}

${line}

${chalk.blueBright('✅ Server is live & ready to accept requests')}
`);
};